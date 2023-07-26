/** @type {import('tailwindcss').Config} */
const sizeRatios = () => {
  const map = { full: '100%' };
  for (let i = 1; i < 12; i++) {
    for (let j = 1; j < i; j++) {
      map[`${j}/${i}`] = `${(j / i) * 100}%`;
    }
  }
  return map;
};

const convertFn = (length, fn, keyFn) => {
  return Object.keys(Array.from(Array(length))).reduce((map, i) => {
    map[keyFn ? keyFn(i) : i] = fn(i);
    return map;
  }, {});
};
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}',
    'src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gray: {
        100: '#F9F9F9',
        200: '#D9D9D9',
        300: '#CDCDCD',
        700: '#808080',
        900: '#353535',
      },
      myBlack: {
        100: '#121212BF',
        200: '#222831',
      },
      black: '#000000',
      white: '#FFFFFF',
      myGray: {
        100: '#F3F3F3',
        200: '#222831',
      },
      indigo: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      green: '#449e48',
      muiError: '#d32f2f',
      transparent: 'transparent',
    },
    sizes: {
      px: '1px',
      ...sizeRatios(),
      ...convertFn(401, (i) => `${i / 4}rem`),
      ...convertFn(
        11,
        (i) => `${i * 10}vh`,
        (i) => `${i * 10}vh`
      ),
      ...convertFn(
        11,
        (i) => `${i * 10}vw`,
        (i) => `${i * 10}vw`
      ),
    },
    opacity: convertFn(11, (i) => `${i / 10}`),
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
    },
    minHeight: (theme) => theme('sizes'),
    minWidth: (theme) => theme('sizes'),
    maxHeight: (theme) => theme('sizes'),
    maxWidth: (theme) => theme('sizes'),
    height: (theme) => theme('sizes'),
    width: (theme) => theme('sizes'),
    gap: (theme) => theme('sizes'),
    backgroundColor: (theme) => theme('colors'),

    extend: {
      width: {
        productThumb: '300px',
      },
      height: {
        productThumb: '400px',
      },
      screens: {
        break1400: '1400px',
        break1300: '1300px',
        break1200: '1200px',
        break1100: '1100px',
        break1000: '1000px',
        break950: '950px',
        break900: '900px',
        break850: '850px',
        break800: '800px',
        break750: '750px',
        break600: '600px',
        break650: '650px',
        break550: '550px',
        break500: '500px',
        break450: '450px',
        break400: '400px',
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      textColor: ['hover'],
      maxWidth: ['hover', 'focus'],
      display: ['group-hover'],
    },
  },
  plugins: [],
};
