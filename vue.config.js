const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8080
  },
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
