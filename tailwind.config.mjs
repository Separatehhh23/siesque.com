/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			colors: {
				'text': 'var(--text)',
				'background': 'var(--background)',
				'primary': 'var(--primary)',
				'secondary': 'var(--secondary)',
				'accent': 'var(--accent)',
				'bg-accent': 'var()--bg-accent'
			},
		},

	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					"primary": "#0465dc",
					"secondary": "#04a6ff",
					"accent": "#3c00ff",
					"neutral": "#262626",
					"base-100": "#dedede",
					"bg-accent": "#444444"
				},
				dark: {
					"primary": "#2384fb",
					"secondary": "#003169",
					"accent": "#3a00ff",
					"neutral": "#262626",
					"base-100": "#222222",
					"bg-accent": "#333333"
				},
			},
		],
	},
}
