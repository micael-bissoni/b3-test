const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind.preset.js')],
  content: [
    join(__dirname, 'src/**/!(*.spec).{ts,html}'),
    join(__dirname, 'design-system/components/src/**/!(*.spec).{ts,html}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

