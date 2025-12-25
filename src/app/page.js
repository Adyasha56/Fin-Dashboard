import Dashboard from '@/components/dashboard/Dashboard';
import { ThemeProvider } from '@/components/theme-provider';

export default function Home() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}