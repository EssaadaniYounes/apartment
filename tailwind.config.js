module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scale: {
          '0%': { transform: 'scaleY(0) translate(-50%,-50%) ', },
          '30%': { transform: 'scaleY(1.2) translate(-50%,-50%) ', },
          '40%': { transform: 'scaleY(1) translate(-50%,-50%) ', }
        },
        leftToRight: {
          '0%': { left: -30 },
          '100%': { left: '100%' }
        },
      }
    },
    animation: {
      scale: 'scale 1.3s ease-in-out ',
      leftToRight: 'leftToRight 1.2s ease infinite',
    },
  },
  plugins: [],
}
