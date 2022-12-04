/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/layouts/*.hbs", "./src/partials/*.hbs", "./src/js/*.js"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
      sans: ['"Open Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      serif: ["ui-serif", "serif"],
      mono: ['"Source Code Pro"', "ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        fp: {
          gray: {
            lightest: "#eff0f1",
            lighter: "#dfe0e3",
            light: "#c5c7cc",
            DEFAULT: "#9a9fa6",
            dark: "#79818b",
            darkest: "#535961",
          },
          blue: {
            light: "#51a2da",
            DEFAULT: "#3c6eb4",
            dark: "#294172",
            darker: "#0c1420",
            darkest: "#080d15",
          },
          green: {
            lighest: "#e9f9dd",
            light: "#bbed97",
            DEFAULT: "#79db32",
          },
          magenta: {
            lightest: "#f9dde9",
            light: "#dc97bb",
            DEFAULT: "#db3279",
          },
          orange: {
            lightest: "#fbeedb",
            light: "#f2ca92",
            DEFAULT: "#e59728",
          },
          purple: {
            lightest: "#ece5f1",
            light: "#cfbddd",
            DEFAULT: "#a07cbc",
          },
        },
      },
    },
  },
  plugins: [],
}
