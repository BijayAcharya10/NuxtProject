export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "client",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],
  axios: {},
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    // theme: {
    //   dark: false,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // },
    defaultAssets: {
      font: {
        family: "Quicksand"
      }
    }
  },

  //Block user from accessing any other pages than login globally
  router: {
    middleware: ["auth"]
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "http://localhost:8000",
        endpoints: {
          login: {
            url: "/api/login"
          },
          logout: {
            url: "/api/logout"
          },
          user: {
            url: "/api/user"
          }
        },
        user: {
          property: false
        }
      }
    },
    redirect: {
      login: "/",
      logout: "/",
      home: "/home" //redirect user to some page after login
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
