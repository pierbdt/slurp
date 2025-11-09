/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#FF4458',
        secondary: '#FFC629',
        background: '#FFFFFF',
        text: '#424242',
      },
    },
  },
  plugins: [],
}

