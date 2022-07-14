export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        htmlAttrs: {
            lang: "en"
        },
        titleTemplate: "%s",
        title: "SEO Debate",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                name: "google-site-verification",
                content: "MQQZrhAxMKL0nEuKQJyDK8K_Yit-BCYFCRcoF2IrjWk"
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/img/favicon.ico" }]
    },

    render: {
        bundleRenderer: {
            etag: false,
            shouldPreload: (file, type) => {
                return ["font"].includes(type);
            }
        }
    },
    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ["~/assets/scss/style.scss"],
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: "DodgerBlue",
        height: "5px",
        continuous: true,
        duration: 3000
    },

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: "~/plugins/stickey.js", ssr: false },
        { src: "~/plugins/TiptapVuetify", mode: "client" },
        { src: "~/plugins/scrolltop", ssr: false }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
        '@nuxtjs/html-validator'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "@nuxtjs/redirect-module",
        "@nuxtjs/gtm",
        [
            "vue-sweetalert2/nuxt",
            {
                confirmButtonColor: "#2d6adf",
                cancelButtonColor: "#d11025"
            }
        ],
        [
            "@nuxtjs/recaptcha",
            {
                siteKey: "6LcEMacaAAAAAHiLqXu2EBxCY5n1A72ilhIqU73T",
                version: 3,
                size: "invisible",
                hideBadge: true
            }
        ]
    ],
    auth: {
        strategies: {
            laravelJWT: {
                provider: "laravel/jwt",
                url: `${
                    process.server
                        ? "http://127.0.0.1:8000/api/v1"
                        : process.env.NODE_ENV == "production"
                        ? "https://seodebate.com/api/v1"
                        : "http://127.0.0.1:8000/api/v1"
                }`,
                endpoints: {
                    login: { url: "/login", method: "post" },
                    logout: { url: "/logout", method: "post" },
                    user: { url: "/user", method: "get" },
                    refresh: { url: "/refresh", method: "post" }
                },
                redirect: {
                    login: "/login",
                    logout: false,
                    callback: false,
                    home: false
                },
                token: {
                    property: "accessToken",
                    maxAge: 60,
                    type: "bearer"
                },
                refreshToken: {
                    maxAge: 20160
                }
            }
        },
        plugins: ["~/plugins/axios"]
    },

    gtm: {
        enabled: undefined,
        // enabled: true,
        // debug: true,

        id: "GTM-TJX7QZT",
        layer: "dataLayer",
        variables: {},

        pageTracking: true,
        pageViewEventName: "nuxtRoute",

        autoInit: true,
        respectDoNotTrack: true,

        scriptId: "gtm-script",
        scriptDefer: false,
        scriptURL: "https://www.googletagmanager.com/gtm.js",
        crossOrigin: false,

        noscript: true,
        noscriptId: "gtm-noscript",
        noscriptURL: "https://www.googletagmanager.com/ns.html"
    },

    // HTTP options here
    axios: {
        baseURL: `${
            process.server
                ? "http://127.0.0.1:8000/api/v1"
                : process.env.NODE_ENV == "production"
                ? "https://seodebate.com/api/v1"
                : "http://127.0.0.1:8000/api/v1"
        }`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    },

    // Add Trail Slash
    router: {
        trailingSlash: true
    },
    redirect: [
        {
            from: "^.*(?<!/|.txt)$",
            to: (from, req) => req.url + "/"
        }
    ],

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        customVariables: ["~/assets/scss/variables.scss"],
        optionsPath: "./vuetify.options.js",
        treeShake: true,
        defaultAssets: false,
        options: {
            customProperties: true
        }
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        analyze: true,
        extractCSS: { ignoreOrder: true },
        // extend(config, ctx) {},
        splitChunks: {
            pages: false,
            vendor: false,
            commons: false,
            runtime: false,
            layouts: false
        },
        transpile: ["tiptap-vuetify"]
    }
};
