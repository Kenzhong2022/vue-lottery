const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 最关键的一行！
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 允许外部访问
    port: 8080, // 端口号
    allowedHosts: 'all' // 允许所有主机访问
  }
})

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  }
}
