export default {
  head: {
    title: 'practical_10',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
        integrity:
          'sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
      },
    ],
  },

  css: [
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '~assets/styles/main.css',
  ],

  plugins: ['~/plugins/vee-validate.js'],

  components: true,

  buildModules: [],

  transition: {
    name: 'slide-fade',
  },

  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: process.env.BASE_URL || 'https://testapi.io/api/dartya/resource',
  },

  build: {
    transpile: ['vee-validate'],
  },
  env: {
    APIKey: 'AIzaSyBHRnzzAMiBH9OJdGVAmNsdMHgH8q4-9jo',
  },
}
