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

        themacolor1: '#F6F1E3', // 연노랑
        themacolor15: '#F5E8B6',
        themacolor2: '#FAAD1A', // 진노랑
        themacolor3: '#344C36', // 진녹색
      },
      height: {
        '43': '43rem'
      },
      minHeight: {
        '35': '35rem', // 35rem을 'min-h-35'로 사용
      },
    },
  },
  plugins: [],
};
export default config;
