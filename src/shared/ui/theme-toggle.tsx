'use client';

import { Button } from './button';
import { useTheme } from '../providers/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';

  return (
    <Button variant="secondary" onClick={toggleTheme} aria-label={`Увімкнути ${next} тему`}>
      {theme === 'light' ? '🌙' : '☀️'} Перемкнути на {next}
    </Button>
  );
}
