
const { DateTime } = require("luxon");

module.exports = function 
(eleventyConfig) {
  // year shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  
  // 11ty dirs
  return {
    dir: {
      input: "src",
      output: "public"
    },
  };

};