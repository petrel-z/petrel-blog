// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF', // 自定义主色调
        secondary: '#6B7280', // 自定义次要色调
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // 自定义字体
      },
    },
  },
  plugins: [],
}