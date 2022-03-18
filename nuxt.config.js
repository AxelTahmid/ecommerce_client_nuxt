export default {
  ssr: 'true',
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Online Shop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap.min.css' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/css/font-awesome.min.css',
      },
      { rel: 'stylesheet', type: 'text/css', href: '/css/prettyPhoto.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/main.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/responsive.css' },
    ],
    script: [
      { src: '/js/jquery.js', type: 'text/javascript' },
      { src: '/js/bootstrap.min.js', type: 'text/javascript' },
      { src: '/js/jquery.scrollUp.min.js', type: 'text/javascript' },
      { src: '/js/jquery.prettyPhoto.js', type: 'text/javascript' },
      { src: '/js/main.js', type: 'text/javascript' },
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
    baseURL: process.env.API_BASEURL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },
  },
  srcDir: __dirname,
  buildDir: '.nuxt/frontend',
  env: {
    PAYPAL_CLIENT_ID: 'Your Client ID', // add your client ID that you created in the previous step
  },
}
