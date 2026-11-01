export const mahoeColors = {
  // Primary brand colors
  brand: {
    50: '#f0f5ff',
    100: '#e0ebff',
    200: '#c7d9ff',
    300: '#a3c0ff',
    400: '#7a9eff',
    500: '#5a7fff',
    600: '#4263eb',
    700: '#364fc8',
    800: '#3140a3',
    900: '#2e3882',
    950: '#1e2155',
  },

  // Accent colors for user selection
  accents: {
    default: {
      name: 'Mahoe Blue',
      light: '#5a7fff',
      DEFAULT: '#4263eb',
      dark: '#364fc8',
      foreground: '#ffffff',
    },
    emerald: {
      name: 'Emerald',
      light: '#34d399',
      DEFAULT: '#10b981',
      dark: '#059669',
      foreground: '#ffffff',
    },
    amber: {
      name: 'Amber',
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
      foreground: '#1f2937',
    },
    rose: {
      name: 'Rose',
      light: '#fb7185',
      DEFAULT: '#f43f5e',
      dark: '#e11d48',
      foreground: '#ffffff',
    },
    violet: {
      name: 'Violet',
      light: '#a78bfa',
      DEFAULT: '#8b5cf6',
      dark: '#7c3aed',
      foreground: '#ffffff',
    },
    cyan: {
      name: 'Cyan',
      light: '#22d3ee',
      DEFAULT: '#06b6d4',
      dark: '#0891b2',
      foreground: '#ffffff',
    },
  },

  // Semantic colors - Dark theme (default)
  dark: {
    background: {
      primary: '#0d0d0f',
      secondary: '#141418',
      tertiary: '#1c1c22',
      elevated: '#23232b',
      overlay: 'rgba(13, 13, 15, 0.85)',
    },
    surface: {
      primary: '#18181e',
      secondary: '#1f1f26',
      tertiary: '#282830',
      hover: '#2d2d36',
      active: '#33333e',
    },
    border: {
      primary: '#2a2a33',
      secondary: '#33333e',
      focus: '#4263eb',
      error: '#ef4444',
    },
    text: {
      primary: '#f4f4f5',
      secondary: '#a1a1aa',
      tertiary: '#71717a',
      inverse: '#0d0d0f',
      link: '#7a9eff',
    },
    accent: {
      DEFAULT: '#4263eb',
      hover: '#5a7fff',
      light: 'rgba(66, 99, 235, 0.15)',
      foreground: '#ffffff',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
      inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      glow: '0 0 20px rgba(66, 99, 235, 0.3)',
    },
  },

  // Semantic colors - Light theme
  light: {
    background: {
      primary: '#fafafa',
      secondary: '#f4f4f5',
      tertiary: '#eaeaea',
      elevated: '#ffffff',
      overlay: 'rgba(250, 250, 250, 0.9)',
    },
    surface: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f4f4f5',
      hover: '#f0f0f0',
      active: '#e8e8e8',
    },
    border: {
      primary: '#e4e4e7',
      secondary: '#d4d4d8',
      focus: '#4263eb',
      error: '#ef4444',
    },
    text: {
      primary: '#18181b',
      secondary: '#52525b',
      tertiary: '#71717a',
      inverse: '#fafafa',
      link: '#364fc8',
    },
    accent: {
      DEFAULT: '#4263eb',
      hover: '#364fc8',
      light: 'rgba(66, 99, 235, 0.1)',
      foreground: '#ffffff',
    },
    status: {
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#2563eb',
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      glow: '0 0 20px rgba(66, 99, 235, 0.2)',
    },
  },
} as const;

export const mahoeTypography = {
  fontFamilies: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  },
  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },
  letterSpacings: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
    widest: '0.04em',
  },
} as const;

export const mahoeSpacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

export const mahoeBorderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const mahoeTransitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  DEFAULT: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const mahoeShadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  glow: '0 0 20px rgba(66, 99, 235, 0.3)',
} as const;

export const mahoeZIndex = {
  hide: -1,
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
} as const;

export const mahoeBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type ThemeMode = 'dark' | 'light' | 'system';
export type AccentColor = keyof typeof mahoeColors.accents;

export interface MahoeTheme {
  mode: ThemeMode;
  accent: AccentColor;
  reducedMotion: boolean;
}

export const defaultTheme: MahoeTheme = {
  mode: 'system',
  accent: 'default',
  reducedMotion: false,
};

export function getThemeColors(mode: 'dark' | 'light', accent: AccentColor) {
  const base = mahoeColors[mode];
  const accentColors = mahoeColors.accents[accent];
  return {
    ...base,
    accent: {
      DEFAULT: accentColors.DEFAULT,
      hover: accentColors.dark,
      light: `${accentColors.DEFAULT}26`,
      foreground: accentColors.foreground,
    },
  };
}

export function cssVar(name: string, value: string) {
  return `${name}: ${value};`;
}

export function generateCSSVariables(mode: 'dark' | 'light', accent: AccentColor) {
  const colors = getThemeColors(mode, accent);
  const vars: Record<string, string> = {};

  // Background
  vars['--color-bg-primary'] = colors.background.primary;
  vars['--color-bg-secondary'] = colors.background.secondary;
  vars['--color-bg-tertiary'] = colors.background.tertiary;
  vars['--color-bg-elevated'] = colors.background.elevated;
  vars['--color-bg-overlay'] = colors.background.overlay;

  // Surface
  vars['--color-surface-primary'] = colors.surface.primary;
  vars['--color-surface-secondary'] = colors.surface.secondary;
  vars['--color-surface-tertiary'] = colors.surface.tertiary;
  vars['--color-surface-hover'] = colors.surface.hover;
  vars['--color-surface-active'] = colors.surface.active;

  // Border
  vars['--color-border-primary'] = colors.border.primary;
  vars['--color-border-secondary'] = colors.border.secondary;
  vars['--color-border-focus'] = colors.border.focus;
  vars['--color-border-error'] = colors.border.error;

  // Text
  vars['--color-text-primary'] = colors.text.primary;
  vars['--color-text-secondary'] = colors.text.secondary;
  vars['--color-text-tertiary'] = colors.text.tertiary;
  vars['--color-text-inverse'] = colors.text.inverse;
  vars['--color-text-link'] = colors.text.link;

  // Accent
  vars['--color-accent'] = colors.accent.DEFAULT;
  vars['--color-accent-hover'] = colors.accent.hover;
  vars['--color-accent-light'] = colors.accent.light;
  vars['--color-accent-foreground'] = colors.accent.foreground;

  // Status
  vars['--color-success'] = colors.status.success;
  vars['--color-warning'] = colors.status.warning;
  vars['--color-error'] = colors.status.error;
  vars['--color-info'] = colors.status.info;

  // Shadows
  vars['--shadow-sm'] = colors.shadow.sm;
  vars['--shadow-md'] = colors.shadow.md;
  vars['--shadow-lg'] = colors.shadow.lg;
  vars['--shadow-xl'] = colors.shadow.xl;
  vars['--shadow-inner'] = colors.shadow.inner;
  vars['--shadow-glow'] = colors.shadow.glow;

  return vars;
}