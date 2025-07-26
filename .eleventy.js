const { DateTime } = require("luxon");
const path = require('path');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyRssPlugin = require("@11ty/eleventy-plugin-rss");
const eleventySitemapPlugin = require("@quasibit/eleventy-plugin-sitemap");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyRssPlugin);
  eleventyConfig.addPlugin(eleventySitemapPlugin, {
    sitemap: {
      hostname: "https://transtimeline.org", // Replace with your domain
    },
  });

  // Markdown-it configuration
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
      level: [1, 2, 3],
    }),
  });
  eleventyConfig.setLibrary("md", markdownLib);

  // Date and time filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL d, yyyy');
  });
  eleventyConfig.addFilter('w3cDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
  });

  // Custom split filter
  eleventyConfig.addFilter("split", (string, separator) => {
    return string.split(separator);
  });

  // Shortcode for current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // Add build information from Netlify environment variables
  eleventyConfig.addGlobalData("build", {
    id: process.env.BUILD_ID || 'local',
    commit: process.env.COMMIT_REF || 'dev',
    commitShort: (process.env.COMMIT_REF || 'dev').substring(0, 7),
    timestamp: new Date().toISOString()
  });

  // Watch the content directory for changes
  eleventyConfig.addWatchTarget("./content/");
  
  // Ignore files we don't want to process as pages
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add(".git/**");

  // Collections
  eleventyConfig.addCollection("figuresByYear", (collectionApi) => {
    const glob = require('glob');
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    
    // Get markdown files directly from the content/figures directory
    const figureFiles = glob.sync('content/figures/*.md');
    console.log(`Found ${figureFiles.length} figure files`);
    figureFiles.forEach(fig => console.log(`- ${fig}`));
    
    // Process each file and create figure objects
    const figures = figureFiles.map(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      const fileSlug = path.basename(filePath, '.md');
      
      return {
        data: parsed.data,
        content: parsed.content,
        fileSlug: fileSlug,
        inputPath: filePath,
        url: `/figures/${fileSlug}/`
      };
    });
    
    // Sort figures by year in the filename
    return figures.sort((a, b) => {
      const yearA = parseInt(a.fileSlug.split('-')[0], 10) || 0;
      const yearB = parseInt(b.fileSlug.split('-')[0], 10) || 0;
      return yearA - yearB;
    });
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({"src/assets/images": "images"});
  eleventyConfig.addPassthroughCopy({"src/assets/css": "css"});
  eleventyConfig.addPassthroughCopy({"src/assets/js": "js"});
  eleventyConfig.addPassthroughCopy({"src/favicon.ico": "/"});

  // Directory configuration
  return {
    dir: {
      input: "src/pages",  // Keep src/pages as main input for templates
      
      includes: "../_includes",
      layouts: "../_includes/layouts",
      data: "../_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
