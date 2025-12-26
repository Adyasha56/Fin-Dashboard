'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Plus, Moon, Sun, Download, Upload, Trash, LayoutTemplate } from 'lucide-react';
import WidgetGrid from './WidgetGrid';
import AddWidgetDialog from './AddWidgetDialog';
import TemplatesDialog from './TemplatesDialog';
import ConfigureWidgetDialog from './ConfigureWidgetDialog';
import Footer from '../Footer';

export default function Dashboard() {
  const { widgets, theme, toggleTheme, clearAllWidgets, loadTemplate, importConfiguration, updateWidget } = useDashboardStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  const [configureWidget, setConfigureWidget] = useState(null);

  const handleExport = () => {
    const config = {
      widgets,
      theme,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finboard-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target.result);
          if (config.widgets) {
            if (confirm('This will replace your current dashboard. Continue?')) {
              importConfiguration(config);
            }
          }
        } catch (error) {
          alert('Invalid configuration file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleTemplateSelect = (template) => {
    if (widgets.length > 0) {
      if (!confirm('This will replace your current dashboard. Continue?')) {
        return;
      }
    }
    loadTemplate(template);
  };

  const handleWidgetConfigure = (widgetId) => {
    const widget = widgets.find(w => w.id === widgetId);
    setConfigureWidget(widget);
  };

  const handleConfigSave = (config) => {
    if (configureWidget) {
      updateWidget(configureWidget.id, { config });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-foreground">
                FinBoard
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Customizable Finance Dashboard
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Templates */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTemplatesDialogOpen(true)}
                title="Load template"
              >
                <LayoutTemplate className="h-5 w-5" />
              </Button>

              {/* Export */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleExport}
                title="Export configuration"
                disabled={widgets.length === 0}
              >
                <Download className="h-5 w-5" />
              </Button>

              {/* Import */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleImport}
                title="Import configuration"
              >
                <Upload className="h-5 w-5" />
              </Button>

              {/* Clear All */}
              {widgets.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all widgets?')) {
                      clearAllWidgets();
                    }
                  }}
                  title="Clear all widgets"
                >
                  <Trash className="h-5 w-5" />
                </Button>
              )}
              
              {/* Add Widget */}
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Add Widget</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl font-bold text-foreground">
                Welcome to FinBoard
              </h2>
              <p className="text-muted-foreground text-lg">
                Start building your custom finance dashboard by adding widgets or choosing a pre-built template.
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Widget
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setIsTemplatesDialogOpen(true)}
                >
                  <LayoutTemplate className="h-5 w-5 mr-2" />
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <WidgetGrid widgets={widgets} onConfigure={handleWidgetConfigure} />
        )}
      </main>

       <Footer/>
      {/* Dialogs */}
      <AddWidgetDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      
      <TemplatesDialog
        open={isTemplatesDialogOpen}
        onOpenChange={setIsTemplatesDialogOpen}
        onSelect={handleTemplateSelect}
      />

      <ConfigureWidgetDialog
        open={!!configureWidget}
        onOpenChange={(open) => !open && setConfigureWidget(null)}
        widget={configureWidget}
        onSave={handleConfigSave}
      />
    </div>
  );
}