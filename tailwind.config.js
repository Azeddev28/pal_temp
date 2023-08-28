/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                trueWhite: '#FFFFFF',
                blue: '#0000FF',
                background: '#C5C6D0',
                black: '#151D23',
                brandBlue: '#005382',
                brandSecondaryBlue: '#D2EFFF',
                'theme-border': '#DFDFDF',
                'blue-60': '#25B2F8',
                carbon: '#B6C3CC',
                hoverBlue: '#00446A',
                pressedBlue: '#002B43',
                disabledBlue: '#CCDDE6',
                grey0: '#F0F0F0',
                grey10: '#CACACA',
                grey20: '#939393',
                grey30: '#555555',
                grey40: '#2F2F2F',
                error: '#eb5757',
                success: '#27AE60',
                warning: '#EF8943',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',

                    /* Firefox */
                    'scrollbar-width': 'none',

                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            });
        }),
    ],
};
