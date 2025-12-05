import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const colorTokens = {
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
};

const spacingTokens = {
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
};

const radiusTokens = {
  none: '0',
  xs: 'var(--ds-radius-xs)',
  sm: 'var(--ds-radius-sm)',
  md: 'var(--ds-radius-md)',
  lg: 'var(--ds-radius-lg)',
  xl: 'var(--ds-radius-xl)',
  full: 'var(--ds-radius-full)'
};

const fontWeightTokens = {
  normal: 'var(--ds-font-regular)',
  medium: 'var(--ds-font-medium)',
  semibold: 'var(--ds-font-semibold)',
  bold: 'var(--ds-font-bold)'
};

const fontSizeTokens = {
  xs: ['var(--ds-font-xs)', { lineHeight: '1.5' }],
  sm: ['var(--ds-font-sm)', { lineHeight: '1.5' }],
  base: ['var(--ds-font-md)', { lineHeight: '1.6' }],
  lg: ['var(--ds-font-lg)', { lineHeight: '1.6' }],
  xl: ['var(--ds-font-xl)', { lineHeight: '1.5' }],
  '2xl': ['clamp(1.35rem, 2vw, 1.5rem)', { lineHeight: '1.35' }],
  '3xl': ['clamp(1.5rem, 2.3vw, 1.75rem)', { lineHeight: '1.2' }],
  display: ['clamp(2.2rem, 4vw, 3rem)', { lineHeight: '1.1' }]
};

const typographyPreflight = plugin(({ addBase, theme }) => {
  const [displaySize, displayProps] = theme('fontSize.display') as [string, { lineHeight?: string }];
  const [h2Size, h2Props] = theme('fontSize.3xl') as [string, { lineHeight?: string }];
  const [h3Size, h3Props] = theme('fontSize.2xl') as [string, { lineHeight?: string }];
  const [h4Size, h4Props] = theme('fontSize.xl') as [string, { lineHeight?: string }];
  const [bodySize, bodyProps] = theme('fontSize.base') as [string, { lineHeight?: string }];
  const fontFamily = (theme('fontFamily.sans') as string[]).join(', ');

  addBase({
    body: {
      backgroundColor: theme('colors.background'),
      color: theme('colors.text'),
      fontFamily,
      fontWeight: theme('fontWeight.normal'),
      lineHeight: bodyProps?.lineHeight ?? '1.6',
      textRendering: 'optimizeLegibility'
    },
    main: {
      paddingBlock: theme('spacing.6')
    },
    'h1, h2, h3, h4, h5, h6': {
      color: theme('colors.text'),
      fontWeight: theme('fontWeight.semibold'),
      letterSpacing: '-0.01em',
      margin: 0
    },
    h1: {
      fontSize: displaySize,
      lineHeight: displayProps?.lineHeight ?? '1.1'
    },
    h2: {
      fontSize: h2Size,
      lineHeight: h2Props?.lineHeight ?? '1.2'
    },
    h3: {
      fontSize: h3Size,
      lineHeight: h3Props?.lineHeight ?? '1.3'
    },
    h4: {
      fontSize: h4Size,
      lineHeight: h4Props?.lineHeight ?? '1.4'
    },
    p: {
      color: theme('colors.muted'),
      fontSize: bodySize,
      lineHeight: bodyProps?.lineHeight ?? '1.6',
      margin: 0
    },
    a: {
      color: 'currentColor',
      textDecoration: 'none'
    },
    ul: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  });
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: colorTokens,
    spacing: spacingTokens,
    borderRadius: radiusTokens,
    fontFamily: {
      sans: ['var(--ds-font-family)']
    },
    fontWeight: fontWeightTokens,
    fontSize: fontSizeTokens,
    extend: {
      boxShadow: {
        soft: 'var(--ds-shadow-soft)',
        strong: 'var(--ds-shadow-strong)'
      }
    }
  },
  plugins: [typographyPreflight]
};

export default config;
