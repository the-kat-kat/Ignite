const { linkPropDefs } = require("@radix-ui/themes/props");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        salmon: "#e3715b",
        lightGreen: "#ffe0d9",
        darkGreen: "#227851",
        darkYellow: "#bf8d3b"
      },
    }
  },
  plugins: []
}
