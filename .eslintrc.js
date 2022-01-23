module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/this-in-template': 'off',

    // [
    //   'error',
    //   {
    //     ignores: [
    //       'default',
    //       'Default',
    //       'login',
    //       'Login',
    //       'index',
    //       'Index',
    //       'create',
    //       'Create',
    //       'edit',
    //       'Edit',
    //       'loader',
    //       'Loader',
    //     ],
    //   },
    // ],
  },
}
