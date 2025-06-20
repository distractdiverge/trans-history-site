module.exports = function(eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
  eleventyConfig.addPlugin(require("eleventy-plugin-rss"));
  eleventyConfig.addPlugin(require("eleventy-plugin-sitemap"));
  
  // Add markdown-it plugins for better markdown support
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  let markdownLib = markdownIt(options)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
        level: [1,2,3]
      })
    });
  
  eleventyConfig.setLibrary("md", markdownLib);
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
