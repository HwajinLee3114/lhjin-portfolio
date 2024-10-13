import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maincolor: "#6893b7",

        themacolor1: '#F6F1E3',
        themacolor2: '#FAAD1A',
        themacolor3: '#344C36',
      },
      minHeight: {
        '35': '35rem', // 35rem을 'min-h-35'로 사용
      },
    },
  },
  plugins: [],
};
export default config;
