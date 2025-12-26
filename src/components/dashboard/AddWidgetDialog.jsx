'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/lib/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table2, LayoutGrid, LineChart, Activity } from 'lucide-react';

const widgetTypes = [
  {
    id: 'table',
    name: 'Stock Table',
    icon: Table2,
    description: 'Paginated list of stocks with filters and search',
  },
  {
    id: 'cards',
    name: 'Finance Cards',
    icon: LayoutGrid,
    description: 'Watchlist, Market Gainers, Performance Data',
  },
  {
    id: 'chart',
    name: 'Stock Chart',
    icon: LineChart,
    description: 'Candle or Line graphs with different intervals',
  },
  {
    id: 'live',
    name: 'Live Price',
    icon: Activity,
    description: 'Real-time stock price with WebSocket',
  },
];

export default function AddWidgetDialog({ open, onOpenChange }) {
  const { addWidget } = useDashboardStore();
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!selectedType || !title) return;

    addWidget({
      type: selectedType,
      title: title,
      config: {},
    });

    setSelectedType('');
    setTitle('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-sm border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Widget</DialogTitle>
          <DialogDescription className="text-base">
            Choose a widget type and give it a name to add to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Widget Title</Label>
            <Input
              id="title"
              placeholder="Enter widget title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base">Widget Type</Label>
            <div className="grid gap-3">
              {widgetTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                      selectedType === type.id
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      selectedType === type.id ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        selectedType === type.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-base mb-1">
                        {type.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!selectedType || !title}
            className="h-11"
          >
            Add Widget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}