const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"); 
const { DateTime } = require("luxon");
 

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  // base.njk aliased to base for easier access
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

  // Adds syntax highlighting
  // https://www.11ty.dev/docs/plugins/syntaxhighlight/
  eleventyConfig.addPlugin(syntaxHighlight);

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("./.build/css/style.css");
  // Copy CSS build changes to dist css/style.css
  eleventyConfig.addPassthroughCopy({ "./.build/css/style.css": "css/style.css" });

  // Open localhost url on runtime
  eleventyConfig.setBrowserSyncConfig({
    open: true
  });

  // Date shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
