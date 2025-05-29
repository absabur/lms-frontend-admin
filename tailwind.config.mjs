/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light1: "var(--light1)",
        dark1: "var(--dark1)",
        light2: "var(--light2)",
        dark2: "var(--dark2)",
        lshadow: "var(--lshadow)",
        dshadow: "var(--dshadow)",
        lborder: "var(--lborder)",
        mborder: "var(--mborder)",
        dborder: "var(--dborder)",
        button1: "var(--button1)",
        button3: "var(--button3)",
        button2: "var(--button2)",
        button4: "var(--button4)",
      },
    },
  },
  plugins: [],
};
