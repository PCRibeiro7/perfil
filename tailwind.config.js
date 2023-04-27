/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/views/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' },
            // => @media (max-width: 639px) { ... }
        },
        fontFamily: {
            sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        },
    },
    plugins: [],
};
