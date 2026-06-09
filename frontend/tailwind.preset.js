// tailwind.preset.js

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'on-success': 'var(--color-on-success)',
        'on-warning': 'var(--color-on-warning)',
        'on-danger': 'var(--color-on-danger)',
        'on-info': 'var(--color-on-info)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        'gray-light': 'var(--color-gray-light)',
        'gray-medium': 'var(--color-gray-medium)',
        'gray-dark': 'var(--color-gray-dark)',
      },
      fontFamily: {
        headers: 'var(--font-family-headers)',
        base: 'var(--font-family-base)',
        system: 'var(--font-platform-system)',
      },
      fontSize: {
        xsmall: 'var(--size-font-xsmall)',
        small: 'var(--size-font-small)',
        md: 'var(--size-font-medium)',
        lg: 'var(--size-font-large)',
        xl: 'var(--size-font-xlarge)',
        '2xl': 'var(--size-font-2xlarge)',
        '3xl': 'var(--size-font-3xlarge)',
        '4xl': 'var(--size-font-4xlarge)',
        '5xl': 'var(--size-font-5xlarge)',
        '6xl': 'var(--size-font-6xlarge)',
        '7xl': 'var(--size-font-7xlarge)',
        '8xl': 'var(--size-font-8xlarge)',
        '9xl': 'var(--size-font-9xlarge)',
        '10xl': 'var(--size-font-10xlarge)',
        base: 'var(--size-font-base)',
        button: 'var(--button-text-size)',
      },
      borderRadius: {
        button: 'var(--button-border-radius)',
      },
      height: {
        button: 'var(--button-height)',
      }
    },
  },
  corePlugins: {
    textColor: true,
    backgroundColor: true,
    fontFamily: true,
    fontSize: true,
    borderRadius: true,
    borderColor: true,
  }
};