'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { dashboardTemplates } from '@/lib/template';
import { LayoutTemplate, Check } from 'lucide-react';

export default function TemplatesDialog({ open, onOpenChange, onSelect }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleApply = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
      onOpenChange(false);
      setSelectedTemplate(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Dashboard Templates</DialogTitle>
          <DialogDescription>
            Choose a pre-built template to quickly set up your dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {dashboardTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                selectedTemplate?.id === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <LayoutTemplate className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  {selectedTemplate?.id === template.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {template.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {template.widgets.length} widgets included
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={!selectedTemplate}
          >
            Apply Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}