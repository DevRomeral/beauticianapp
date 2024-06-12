import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // TODO: Reemplazar con paleta de colores finales
        'accent': {
          '50': '#fef1f7',
          '100': '#fee5f0',
          '200': '#fecce3',
          '300': '#ffa2cb',
          '400': '#fe68a7',
          '500': '#f83c86',
          '600': '#e91f64',
          '700': '#ca0c47',
          '800': '#a70d3b',
          '900': '#8b1034',
          '950': '#55021a',
        },
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
  purge: {
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
  },
};
export default config;
