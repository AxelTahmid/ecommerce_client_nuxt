export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/font-face.css' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/vendor/font-awesome-4.7/css/font-awesome.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/vendor/font-awesome-5/css/fontawesome-all.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/vendor/mdi-font/css/material-design-iconic-font.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/vendor/bootstrap-4.1/bootstrap.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/vendor/css-hamburgers/hamburgers.min.css',
      },
      { rel: 'stylesheet', type: 'text/css', href: '/css/theme.css' },
    ],
    script: [
      {
        src: '/vendor/jquery-3.2.1.min.js',
        type: 'text/javascript',
      },
      {
        src: '/vendor/bootstrap-4.1/popper.min.js',
        type: 'text/javascript',
      },
      {
        src: '/vendor/bootstrap-4.1/bootstrap.min.js',
        type: 'text/javascript',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost/ecommlumen/public/',
    
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  srcDir: __dirname,
  buildDir: '.nuxt/admin',
}
