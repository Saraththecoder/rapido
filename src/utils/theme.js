export const THEMES = {
  taxi: {
    primary: '#FF7A00',   // brand orange
    bg: '#FFFFFF',        // white theme
    text: '#111111',      // dark text
    textPrimary: '#000000', // black text on orange buttons
    accent: '#22C55E'     // success green
  },
  food: {
    primary: '#FF7A00',   // brand orange
    bg: '#FFFFFF',
    text: '#111111',
    textPrimary: '#000000',
    accent: '#22C55E'
  },
  parcel: {
    primary: '#FF7A00',   // brand orange
    bg: '#FFFFFF',
    text: '#111111',
    textPrimary: '#000000',
    accent: '#22C55E'
  },
  hub: {
    primary: '#FF7A00',   // brand orange
    bg: '#FFFFFF',
    text: '#111111',
    textPrimary: '#000000',
    accent: '#22C55E'
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
