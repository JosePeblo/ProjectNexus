/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./page/public/*.{html, js}",
            "./page/public/scripts/*.js",
            "./page/views/*.{ejs, html, js}",
            "./page/views/components/*.{ejs, html, js}"],
  theme: {
    screens: {
      'phone': {'max': '800px'},
      'tablet':{'max': '1000px'},
      'laptop': {'min': '1024px'},
      'desktop': {'min': '1280px'},
    },
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif']
      },
      textColor: {
        membersFont: '#7fb096',
      },
      colors: {
        mainBg: '#eeeeee',
        dropZone: '#fbfcfd',
        dropBorder: '#0f27761a',
        members: {
          bg: {
            green: '#deede5',
            yellow: '#fdf8ce',
            red: '#e63946'
          },
          text: {
            green: '#427a5B',
            yellow: '#938406',
          }
        },
        accent: {
          1: '#ee3323',
          2: '#ff3120'
        },
        custom: {
          200: '#98a2b3'
        }
      }
    },
  },
  plugins: [
    require ('tailwindcss'),
  ]
}
