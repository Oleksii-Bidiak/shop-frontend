export type ThemeName = 'light' | 'dark';

export const colors = {
  light: {
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    text: '#0f172a',
    muted: '#475569',
    accent: '#7c3aed',
    accentStrong: '#5b21b6',
    border: '#e2e8f0',
    contrast: '#0f172a',
    contrastForeground: '#e2e8f0',
    white: '#ffffff',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#0ea5e9',
    overlay: 'rgba(15, 23, 42, 0.55)'
  },
  dark: {
    background: '#0b1222',
    surface: '#0f172a',
    card: '#111827',
    text: '#e2e8f0',
    muted: '#94a3b8',
    accent: '#a78bfa',
    accentStrong: '#7c3aed',
    border: '#1f2937',
    contrast: '#e2e8f0',
    contrastForeground: '#0b1222',
    white: '#ffffff',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#f87171',
    info: '#38bdf8',
    overlay: 'rgba(0, 0, 0, 0.6)'
  }
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px'
} as const;

export const radii = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px'
} as const;

export const typography = {
  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  sizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '22px',
    display: '32px'
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
} as const;

const sharedCssVariables = {
  '--ds-space-1': spacing[1],
  '--ds-space-2': spacing[2],
  '--ds-space-3': spacing[3],
  '--ds-space-4': spacing[4],
  '--ds-space-5': spacing[5],
  '--ds-space-6': spacing[6],
  '--ds-space-7': spacing[7],
  '--ds-space-8': spacing[8],
  '--ds-space-9': spacing[9],
  '--ds-space-10': spacing[10],
  '--ds-space-11': spacing[11],
  '--ds-space-12': spacing[12],
  '--ds-radius-xs': radii.xs,
  '--ds-radius-sm': radii.sm,
  '--ds-radius-md': radii.md,
  '--ds-radius-lg': radii.lg,
  '--ds-radius-xl': radii.xl,
  '--ds-radius-full': radii.full,
  '--ds-font-family': typography.fontFamily,
  '--ds-font-xs': typography.sizes.xs,
  '--ds-font-sm': typography.sizes.sm,
  '--ds-font-md': typography.sizes.md,
  '--ds-font-lg': typography.sizes.lg,
  '--ds-font-xl': typography.sizes.xl,
  '--ds-font-display': typography.sizes.display,
  '--ds-font-regular': typography.weights.regular,
  '--ds-font-medium': typography.weights.medium,
  '--ds-font-semibold': typography.weights.semibold,
  '--ds-font-bold': typography.weights.bold,
  '--ds-shadow-soft': '0 10px 40px rgba(15, 23, 42, 0.08)',
  '--ds-shadow-strong': '0 20px 45px rgba(15, 23, 42, 0.14)'
} as const;

export const cssVariables: Record<ThemeName, Record<string, string>> = {
  light: {
    '--ds-color-background': colors.light.background,
    '--ds-color-surface': colors.light.surface,
    '--ds-color-card': colors.light.card,
    '--ds-color-text': colors.light.text,
    '--ds-color-muted': colors.light.muted,
    '--ds-color-accent': colors.light.accent,
    '--ds-color-accent-strong': colors.light.accentStrong,
    '--ds-color-border': colors.light.border,
    '--ds-color-contrast': colors.light.contrast,
    '--ds-color-contrast-foreground': colors.light.contrastForeground,
    '--ds-color-white': colors.light.white,
    '--ds-color-success': colors.light.success,
    '--ds-color-warning': colors.light.warning,
    '--ds-color-danger': colors.light.danger,
    '--ds-color-info': colors.light.info,
    '--ds-color-overlay': colors.light.overlay,
    ...sharedCssVariables
  },
  dark: {
    '--ds-color-background': colors.dark.background,
    '--ds-color-surface': colors.dark.surface,
    '--ds-color-card': colors.dark.card,
    '--ds-color-text': colors.dark.text,
    '--ds-color-muted': colors.dark.muted,
    '--ds-color-accent': colors.dark.accent,
    '--ds-color-accent-strong': colors.dark.accentStrong,
    '--ds-color-border': colors.dark.border,
    '--ds-color-contrast': colors.dark.contrast,
    '--ds-color-contrast-foreground': colors.dark.contrastForeground,
    '--ds-color-white': colors.dark.white,
    '--ds-color-success': colors.dark.success,
    '--ds-color-warning': colors.dark.warning,
    '--ds-color-danger': colors.dark.danger,
    '--ds-color-info': colors.dark.info,
    '--ds-color-overlay': colors.dark.overlay,
    ...sharedCssVariables
  }
};

export const designTokens = {
  colors,
  spacing,
  radii,
  typography,
  cssVariables
};
