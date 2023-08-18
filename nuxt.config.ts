// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
// @ts-ignore
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        '~/assets/scss/main.scss',
    ],
    modules: ['@pinia/nuxt'],
    build: {
        transpile: ['vuetify'],
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],
})
