const isDarkMode = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export const THEMES = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

export const getDefaultColor = (forceTheme) => {
  if (forceTheme === THEMES.LIGHT) return 'black';
  if (forceTheme === THEMES.DARK) return 'white';
  return isDarkMode() ? 'white' : 'black';
};
