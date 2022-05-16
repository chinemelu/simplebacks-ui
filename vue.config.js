module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/abstracts/_variables.scss"; @import "@/styles/abstracts/_mixins.scss"; @/styles/base/_base.scss; @import "@/styles/base/_utilities.scss";'
      }
    }
  }
}
