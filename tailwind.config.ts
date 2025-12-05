import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      background: 'var(--ds-color-background)',
      surface: 'var(--ds-color-surface)',
      card: 'var(--ds-color-card)',
      text: 'var(--ds-color-text)',
      muted: 'var(--ds-color-muted)',
      accent: 'var(--ds-color-accent)',
      'accent-strong': 'var(--ds-color-accent-strong)',
      border: 'var(--ds-color-border)',
      contrast: 'var(--ds-color-contrast)',
      'contrast-foreground': 'var(--ds-color-contrast-foreground)',
      success: 'var(--ds-color-success)',
      warning: 'var(--ds-color-warning)',
      danger: 'var(--ds-color-danger)',
      info: 'var(--ds-color-info)',
      overlay: 'var(--ds-color-overlay)',
      white: 'var(--ds-color-white)'
    },
    spacing: {
      px: '1px',
      0: '0',
      1: 'var(--ds-space-1)',
      2: 'var(--ds-space-2)',
      3: 'var(--ds-space-3)',
      4: 'var(--ds-space-4)',
      5: 'var(--ds-space-5)',
      6: 'var(--ds-space-6)',
      7: 'var(--ds-space-7)',
      8: 'var(--ds-space-8)',
      9: 'var(--ds-space-9)',
      10: 'var(--ds-space-10)',
      11: 'var(--ds-space-11)',
      12: 'var(--ds-space-12)'
    },
    borderRadius: {
      none: '0',
      xs: 'var(--ds-radius-xs)',
      sm: 'var(--ds-radius-sm)',
      md: 'var(--ds-radius-md)',
      lg: 'var(--ds-radius-lg)',
      xl: 'var(--ds-radius-xl)',
      full: 'var(--ds-radius-full)'
    },
    fontFamily: {
      sans: ['var(--ds-font-family)']
    },
    fontWeight: {
      normal: 'var(--ds-font-regular)',
      medium: 'var(--ds-font-medium)',
      semibold: 'var(--ds-font-semibold)',
      bold: 'var(--ds-font-bold)'
    },
    fontSize: {
      xs: ['var(--ds-font-xs)', { lineHeight: '1.5' }],
      sm: ['var(--ds-font-sm)', { lineHeight: '1.5' }],
      base: ['var(--ds-font-md)', { lineHeight: '1.6' }],
      lg: ['var(--ds-font-lg)', { lineHeight: '1.6' }],
      xl: ['var(--ds-font-xl)', { lineHeight: '1.5' }],
      '2xl': ['clamp(1.35rem, 2vw, 1.5rem)', { lineHeight: '1.35' }],
      '3xl': ['clamp(1.5rem, 2.3vw, 1.75rem)', { lineHeight: '1.2' }],
      display: ['clamp(2.2rem, 4vw, 3rem)', { lineHeight: '1.1' }]
    },
    extend: {
      boxShadow: {
        soft: 'var(--ds-shadow-soft)',
        strong: 'var(--ds-shadow-strong)'
      }
    }
  },
  plugins: []
};

export default config;
