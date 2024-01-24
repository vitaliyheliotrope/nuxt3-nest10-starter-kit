// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-proxy"],
  runtimeConfig: {
    proxy: {
      options: {
        target: "http://localhost:3001",
        ...{
          changeOrigin: true,
          pathRewrite: {
            "^/api/todos": "/todos",
            "^/api/users": "/users",
          },
          pathFilter: ["/api/todos", "/api/users"],
        },
      },
    },
  },
});
