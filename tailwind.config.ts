import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        maincolor: '#6893b7',
        quotecolor: '#e2e4e4',

        themacolor1: 'var(--theme-1)', // base surface
        themacolor15: 'var(--theme-1-5)',
        themacolor2: 'var(--theme-2)', // accent
        themacolor3: 'var(--theme-3)', // deep surface
        themacolor4: 'var(--theme-4)', // primary
        darkbg: 'var(--theme-bg)',
        darkfg: 'var(--theme-fg)',
        custombg: 'var(--custom-bg)',
        customfg: 'var(--custom-fg)',
      },
      height: {
        '43': '43rem',
        '50': '50rem',
      },
      maxHeight: {
        '80p': '80%',
      },
      minHeight: {
        '35': '35rem', // 35rem을 'min-h-35'로 사용
      },
    },
  },
  plugins: [],
}
export default config
