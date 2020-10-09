// vue.config.js
const fs = require("fs-extra");
// const ConvertResourcePath = require('./build/html-webpack-plugin-convert-resource-path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

fs.removeSync("public");

const isNeedVConsole = !!process.env.VCONSOLE;

module.exports = {
  // 选项...
  pwa: {
    name: "vue"
  },

  //   devServer: {
  //     proxy: {

  //     }
  //   },
  pluginOptions: {
    // "style-resources-loader": {
    //   preProcessor: "less",
    //   patterns: [path.resolve(__dirname, "src/common/css/common.less")]
    // }
  },
  chainWebpack: config => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.resolve.alias
      .set("@/api", resolve("src/api"))
      .set("@/assets", resolve("src/assets"))
      .set("@/components", resolve("src/components"))
      .set("@/common", resolve("src/common"))
      .set("@/views", resolve("src/views"));
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
        options.limit = 30000;
        return options;
      });
    config.plugin("html").tap(args => {
      args[0].template = "./src/index.html";
      args[0].templateParameters = {
        vconsole: isNeedVConsole
          ? '<script type="text/javascript" src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script><script>var vConsole = new VConsole();</script>'
          : ""
      };
      return args;
    });
  },

  //   publicPath:
  //     process.env.NODE_ENV === "production"
  //       ? ""
  //       : "/",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          // new ConvertResourcePath()
          // new BundleAnalyzerPlugin(
          //          {
          //             analyzerMode: 'server',
          //             analyzerHost: '127.0.0.1',
          //             analyzerPort: 8889,
          //             reportFilename: 'report.html',
          //             defaultSizes: 'parsed',
          //             openAnalyzer: true,
          //             generateStatsFile: false,
          //             statsFilename: 'stats.json',
          //             statsOptions: null,
          //             logLevel: 'info'
          //           }
          //      )
        ]
      };
    } else {
      return {
        devtool: "source-map"
      };
    }
  }
};
