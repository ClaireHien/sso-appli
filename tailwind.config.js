/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,js}'],
  theme: {
    extend: {
      colors: {
        'black':'var(--black)',
        'dark-grey':'var(--dark-grey)',
        'light-grey':'var(--light-grey)',
        'white':'var(--white)',
        'white2':'var(--white2)',
        'white4':'var(--white4)',
        'white6':'var(--white6)',
        'black2':'var(--black2)',
        'black4':'var(--black4)',
        'black6':'var(--black6)',

        'light1':'var(--light1)',
        'light2':'var(--light2)',
        'light3':'var(--light3)',
        'light4':'var(--light4)',
        'light5':'var(--light5)',

        'mid1':'var(--mid1)',
        'mid2':'var(--mid2)',
        'mid3':'var(--mid3)',
        'mid4':'var(--mid4)',
        'mid5':'var(--mid5)',

        'dark1':'var(--dark1)',
        'dark2':'var(--dark2)',
        'dark3':'var(--dark3)',
        'dark4':'var(--dark4)',
        'dark5':'var(--dark5)'
      },
      fontFamily: {
        blakely: ["blakely", 'sans-serif'],
        sans: ["quasimoda", 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@fortawesome/fontawesome-free'),
  ],
  '@tailwindcss/jit': {}, 
}

