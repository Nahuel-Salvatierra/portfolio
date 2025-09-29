/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{html,js,jsx, ts, tsx}"],
	plugins: [],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					1: "var(--primary-1)",
					2: "var(--primary-2)",
					3: "var(--primary-3)",
					4: "var(--primary-4)",
				},
				secondary: {
					1: "var(--secondary-1)",
					2: "var(--secondary-2)",
				},
			},
		},
	},
};
