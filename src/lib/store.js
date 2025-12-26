import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      widgets: [],
      theme: 'light',
      
      addWidget: (widget) => {
        const newWidget = {
          ...widget,
          id: `widget-${Date.now()}`,
          position: widget.position || { x: 0, y: 0, w: 6, h: 4 }
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
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
          }
          return { theme: newTheme };
        });
      },
      
      clearAllWidgets: () => {
        set({ widgets: [] });
      },
      
      // New: Load template
      loadTemplate: (template) => {
        const widgets = template.widgets.map((widget, index) => ({
          ...widget,
          id: `widget-${Date.now()}-${index}`
        }));
        set({ widgets });
      },
      
      // New: Import configuration
      importConfiguration: (config) => {
        if (config.widgets) {
          const widgets = config.widgets.map((widget, index) => ({
            ...widget,
            id: `widget-${Date.now()}-${index}`
          }));
          set({ widgets });
        }
        if (config.theme) {
          set({ theme: config.theme });
        }
      }
    }),
    {
      name: 'finboard-dashboard-storage',
    }
  )
);