const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:
      "http://www.mockbin.org/bin/cfbeadb5-3269-49af-ade2-515996af364c?foo=bar&foo=baz",
  },
});
