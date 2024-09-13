// const withMT = require("@material-tailwind/html/utils/withMT");
import withMT from '@material-tailwind/html/utils/withMT'

/** @type {import('tailwindcss').Config} */
export default withMT({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [],
})
