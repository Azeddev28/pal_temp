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
                trueBlack: '#000',
                hoverBlue: '#00446A',
                pressedBlue: '#002B43',
                disabledBlue: '#CCDDE6',
                grey0: '#F0F0F0',
                grey10: '#CACACA',
                grey10V2: '#D5D4DC',
                grey20: '#939393',
                grey30: '#555555',
                grey40: '#2F2F2F',
                error: '#eb5757',
                success: '#27AE60',
                warning: '#EF8943',
                whiteSmoke: '#F5F5F5',
                neutralBlack: '#0B0B0B',
                bluishCyan: '#005382',
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                marquee2: 'marquee2 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            boxShadow: {
                custom: '0px 4px 4px 0px rgba(0, 0, 0, 0.10)',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.heading': {
                    color: '#005382',
                    fontSize: '42px',
                    fontWeight: 600,
                    lineHeight: '100%',
                    letterSpacing: '-0.84px',
                    '@media (max-width: 768px)': {
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '100%',
                        letterSpacing: '-0.48px',
                    },
                },
                '.subHeading1': {
                    color: '#005382',
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '100%',
                    letterSpacing: '-0.48px',
                },
                '.subHeading2': {
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '110%',
                    letterSpacing: '0.6px',
                    '@media (max-width: 768px)': {
                        fontSize: '14px',
                        fontWeight: 400,
                        letterSpacing: '0.42px',
                    },
                },
                '.subHeading3': {
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '130%',
                    letterSpacing: '-0.28px',
                },

                '.subHeading4': {
                    color: '#2F2F2F',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    letterSpacing: '0.4px',
                    '@media (min-width: 768px)': {
                        fontSize: '12px',
                    },
                },
                '.subHeading5': {
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                },
                '.subHeading6': {
                    color: '#939393',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '130%',
                    letterSpacing: '-0.24px',
                },
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
