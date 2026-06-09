export const base = {
  "button": {
    "border": {
      "radius": "4px"
    },
    "text": {
      "size": "12pt"
    },
    "height": "40px"
  },
  "color": {
    "white": "#ffffff",
    "black": "#000000",
    "gray": {
      "light": "#cccccc",
      "medium": "#999999",
      "dark": "#111111"
    },
    "success": "#22bb33",
    "warning": "#f0ad4e",
    "danger": "#bb2124",
    "info": "#5bc0de",
    "primary": "#010413",
    "secondary": "#234a70",
    "tertiary": "#f958a8",
    "on": {
      "primary": "#ffffff",
      "secondary": "#ffffff",
      "tertiary": "#ffffff",
      "success": "#ffffff",
      "warning": "#ffffff",
      "danger": "#ffffff",
      "info": "#ffffff"
    }
  },
  "font": {
    "family": {
      "headers": "Montserrat, sans-serif",
      "base": "Tahoma, Arial, 'Helvetica Neue', sans"
    },
    "platform": {
      "system": "Tahoma, Arial, 'Helvetica Neue', sans"
    }
  },
  "size": {
    "font": {
      "xsmall": "8pt",
      "small": "10pt",
      "medium": "12pt",
      "large": "14pt",
      "xlarge": "18pt",
      "2xlarge": "24pt",
      "3xlarge": "32pt",
      "4xlarge": "40pt",
      "5xlarge": "48pt",
      "6xlarge": "56pt",
      "7xlarge": "64pt",
      "8xlarge": "72pt",
      "9xlarge": "80pt",
      "10xlarge": "88pt",
      "base": "12pt"
    }
  },
  "icon": {
    "content-copy": "url('/tokens/web/base/assets/icons/content-copy.svg')",
    "content-paste": "url('/tokens/web/base/assets/icons/content-paste.svg')",
    "check-circle": "url('/tokens/web/base/assets/icons/check-circle.svg')",
    "calendar-today": "url('/tokens/web/base/assets/icons/calendar-today.svg')",
    "payments": "url('/tokens/web/base/assets/icons/payments.svg')",
    "corporate-fare": "url('/tokens/web/base/assets/icons/corporate-fare.svg')",
    "management": "url('/tokens/web/base/assets/icons/management.svg')",
    "location-on": "url('/tokens/web/base/assets/icons/location-on.svg')"
  }
} as const;
