/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        backGround: "#131A25",
        mainColor: "#3BD671",
        lightBackGround: "#2D3340",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
