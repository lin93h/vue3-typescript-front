module.exports = {
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://192.168.250.108:8086',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug'
      }
    }
  }
}