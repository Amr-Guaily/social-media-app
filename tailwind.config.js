/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '400px',
      // => @media (min-width: 400px) { ... }

      mobile: '576px',
      // => @media (min-width: 576px) { ... }

      tablet: '768px',
      // => @media (min-width: 768px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      boxShadow: {
        form: '0 5px 30px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            transform: 'translateX(-200px)',
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },

        'show-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        bulging: {
          '0%': {
            transform: 'scale(0)',
            opacity: 0.5,
          },
          '80%': {
            transform: 'scale(0)',
            opacity: 0.5,
          },
          '100%': {
            transform: 'scale(0)',
            opacity: 0.5,
          },
          '40%': {
            transform: 'scale(1)',
            opacity: 1,
          },
        },

        'slide-fwd': {
          '0%': {
            transform: 'translateZ(0px)',
          },
          '100%': {
            transform: 'translateZ(160px)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd':
          ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'show-in': 'show-in 0.6s ease-out',
        bulging: 'bulging 1.3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
