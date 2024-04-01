module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, ts}", // Adicionando extensões de arquivo JS/TS usadas em componentes Vue
  ],
  theme: {
    extend: {
      colors: {
        bgblue: '#4F9BE8',
      },
    },
  },
  plugins: [],
}