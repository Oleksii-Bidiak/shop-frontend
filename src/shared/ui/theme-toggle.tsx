'use client';

import { useThemeProvider } from '@/shared/providers/theme-provider';
import { Button } from '@/shared/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeProvider();
  const next = theme === 'light' ? 'dark' : 'light';

  return (
    <Button variant="secondary" onClick={toggleTheme} aria-label={`Увімкнути ${next} тему`}>
      {theme === 'light' ? '🌙' : '☀️'} Перемкнути на {next}
    </Button>
  );
}
