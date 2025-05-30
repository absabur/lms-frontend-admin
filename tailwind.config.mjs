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
        bgl1: "var(--bgl1)",
        bgl2: "var(--bgl2)",
        borl: "var(--borl)",
        shadl: "var(--shadl)",
        textl: "var(--textl)",

        bgd1: "var(--bgd1)",
        bgd2: "var(--bgd2)",
        bord: "var(--bord)",
        shadd: "var(--shadd)",
        textd: "var(--textd)",

        buttonp: "var(--buttonp)",
        buttons: "var(--buttons)",
        buttona: "var(--buttona)",
        buttonw: "var(--buttonw)",
      },
    },
  },
  plugins: [],
};
