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
      hostname: "https://trans-history.netlify.app", // Replace with your domain
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

  // Collections
  eleventyConfig.addCollection("figuresByYear", (collectionApi) => {
    return collectionApi.getFilteredByGlob("../content/figures/*.md").sort((a, b) => {
      const yearA = a.fileSlug.split('-')[0];
      const yearB = b.fileSlug.split('-')[0];
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
      input: "src/pages",
      includes: "../_includes",
      data: "../_data",
      layouts: "../_includes/layouts",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
