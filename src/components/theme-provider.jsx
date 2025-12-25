'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/lib/store';

export function ThemeProvider({ children }) {
  const theme = useDashboardStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}