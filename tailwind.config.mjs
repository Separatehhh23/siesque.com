/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [
    require("@tailwindcss/typography"),
      require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark"],
    base: true,
    styled: true,
    logs: false
  },
};
