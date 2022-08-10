module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"],
  safelist: ["primary", "skyA"],
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('pages/custom-enquiry/logo.svg')",
      },
      colors: {
        primary: "#004441",
        skyA: "rgb(2, 132, 199)",
        crema: "#FFF3E5",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "320px",
        standing: "1920px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
