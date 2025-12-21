/** @type {import('tailwindcss').Config} */
export default {
  // React 前端位于 `src/催眠APP前端/**`，需要扫描 tsx/jsx 才会生成对应的 Tailwind 工具类（含响应式变体）。
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],

  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
