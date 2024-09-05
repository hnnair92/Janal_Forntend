// https://nuxt.com/docs/api/configuration/nuxt-config

import process from "process";

export default defineNuxtConfig({
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      baseURL: process.env.API_BASE_URL,
      useProduction: process.env.PRODUCTION || false,
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
  },
  pages:true,
  dev: process.env.NODE_ENV !== 'production',
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      title: "Janal | Shades4U",
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["Script"].includes(tag),
    },
  },
  devtools: { enabled: true },
  modules: [
    "nuxt-quasar-ui",
    "@nuxtjs/google-fonts",
    "@sidebase/nuxt-auth",
    "nuxt-permissions",
    "dayjs-nuxt",
    "@nuxtjs/turnstile",
  ],
  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_SITE_KEY,
    addValidateEndpoint: true,
  },
  router: {
    // Set scrollToTop to true to scroll to the top on page navigation
    // Set it to false to maintain the current scroll position
    scrollToTop: true,
  },
  css: ["@/assets/main.scss"],
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
  build: {},
  vite: {
    resolve: {
      alias: {
        "~": __dirname,
      },
    },
    hmr: {
      protocol: "ws",
      host: "0.0.0.0",
    },
    usePolling: true,
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    }
  },
  quasar: {
    config: {
      brand: {
        primary: "#EDCE68",
        secondary: "#2E5F9A",
        accent: "#ce68ed",
        positive: "#87ed68",
        primary_dark: "#d0a107",
      },
    },
    plugins: ["Notify", "Loading","Dialog"],
  },
  /* Auth */
  auth: {
    persistSession: true,
    globalAppMiddleware: false,
    baseURL: process.env.API_BASE_URL,
    enableSessionRefreshOnWindowFocus: true,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/identity/accounts/login/", method: "post" },
        signOut: { path: "/identity/accounts/logout", method: "post" },
        signUp: { path: "/identity/accounts/register/", method: "post" },
        getSession: { path: "/identity/me", method: "get" },
        refresh: { path: "/identity/refresh/", method: "post" },
      },
      pages: {
        login: "/account/login",
      },
      token: {
        signInResponseTokenPointer: "/access",
        maxAgeInSeconds: 60 * 60 * 2,
        sameSiteAttribute: "lax",
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/refresh",
      },
      sessionDataType: {},
    },
    enableSessionRefreshPeriodically: 5000,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: "/",
    },
  },
  dayjs: {
    locales: ["en", "fr"],
    plugins: ["relativeTime", "utc", "timezone", "localizedFormat"],
    defaultLocale: "en",
    defaultTimezone: "America/Toronto",
  },
});
