/** @type {import('tailwindcss').Config} */

module.exports = { 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: "160px",
      maxPadding: "" 
    },
    fontFamily: {
      'goudy': ['OPTIGoudy Agency'],
      'common': ['Inter', 'sans-serif'],
      'context': ['Helvetica', 'Arial', 'sans-serif'],
      
    },
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #616250 0%, #464738 100%)',
      },
      borderColor: {
        'contact-color': 'rgba(218, 170, 78, 1)',
      },
      backgroundColor: {
        'admin-color': 'rgba(103, 106, 91, 1)',
        'awards-color': 'rgba(218, 170, 78, 1)',
        'contactbutton-color': 'rgba(218, 170, 78, 1)',
        'training-color': 'rgba(236, 236, 226, 1)',
      },
      placeholderColor: {
        'contact-color': 'rgba(218, 194, 148, 1)'
      },
      textColor: {
        'core-color': 'rgba(195, 197, 170, 1)',
        'contact-color': 'rgba(218, 170, 78, 1)',
      },
    },
  },
  plugins: [],
};