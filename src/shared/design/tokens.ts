export const colors = {
  light: {
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    primary: '#0f172a',
    muted: '#475569',
    accent: '#7c3aed',
    accentStrong: '#5b21b6',
    border: '#e2e8f0',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#0ea5e9'
  },
  dark: {
    background: '#0b1222',
    surface: '#0f172a',
    card: '#111827',
    primary: '#e2e8f0',
    muted: '#94a3b8',
    accent: '#a78bfa',
    accentStrong: '#7c3aed',
    border: '#1f2937',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#f87171',
    info: '#38bdf8'
  }
};

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px'
};

export const radii = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px'
};

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
};

export const designTokens = {
  colors,
  spacing,
  radii,
  typography
};

export type ThemeName = 'light' | 'dark';
