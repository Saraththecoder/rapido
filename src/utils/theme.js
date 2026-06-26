export const THEMES = {
  taxi: {
    primary: '#FDE047',   // lp-yellow
    bg: '#111827',        // lp-black
    text: '#FFFFFF',      // readable text color for dark mode (override of prompt's duplicate value)
    textPrimary: '#111827', // text color on top of primary yellow
    accent: '#F59E0B'     // amber accent
  },
  food: {
    primary: '#FC8019',   // lp-orange
    bg: '#FFFFFF',
    text: '#1C1C1C',
    textPrimary: '#FFFFFF',
    accent: '#FF6B35'
  },
  parcel: {
    primary: '#FDE047',
    bg: '#111827',
    text: '#FFFFFF',
    textPrimary: '#111827',
    accent: '#F59E0B'
  },
  hub: {
    primary: '#7C3AED',   // lp-purple
    bg: '#0F0A1E',
    text: '#FFFFFF',
    textPrimary: '#FFFFFF',
    accent: '#A78BFA'
  }
};

export function applyTheme(themeKey) {
  const theme = THEMES[themeKey] || THEMES.hub;
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-bg', theme.bg);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-text-on-primary', theme.textPrimary || '#FFFFFF');
}
