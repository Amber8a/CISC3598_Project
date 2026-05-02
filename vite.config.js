import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'pages/dashboard/dashboard.html'),
        login: resolve(__dirname, 'pages/login/login.html'),
        movie: resolve(__dirname, 'pages/movie/movie.html'),
        profile: resolve(__dirname, 'pages/profile/profile.html'),
        register: resolve(__dirname, 'pages/register/register.html'),
      },
    },
  },
})