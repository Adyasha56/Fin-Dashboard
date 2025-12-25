import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      // State
      widgets: [],
      theme: 'light',
      
      // Actions
      addWidget: (widget) => {
        const newWidget = {
          ...widget,
          id: `widget-${Date.now()}`,
          position: { x: 0, y: 0, w: 6, h: 4 }
        };
        set((state) => ({
          widgets: [...state.widgets, newWidget]
        }));
      },
      
      removeWidget: (id) => {
        set((state) => ({
          widgets: state.widgets.filter(w => w.id !== id)
        }));
      },
      
      updateWidget: (id, updates) => {
        set((state) => ({
          widgets: state.widgets.map(w => 
            w.id === id ? { ...w, ...updates } : w
          )
        }));
      },
      
      updateWidgetPosition: (id, position) => {
        set((state) => ({
          widgets: state.widgets.map(w =>
            w.id === id ? { ...w, position } : w
          )
        }));
      },
      
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Update document class
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
          }
          return { theme: newTheme };
        });
      },
      
      clearAllWidgets: () => {
        set({ widgets: [] });
      }
    }),
    {
      name: 'finboard-dashboard-storage',
    }
  )
);