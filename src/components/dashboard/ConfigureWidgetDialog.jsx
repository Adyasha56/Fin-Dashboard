'use client';

import { useState, useEffect } from 'react';
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

const POPULAR_SYMBOLS = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 
  'META', 'NVDA', 'NFLX', 'AMD', 'INTC'
];

export default function ConfigureWidgetDialog({ open, onOpenChange, widget, onSave }) {
  const [config, setConfig] = useState({
    symbol: 'AAPL',
    interval: 'D',
    refreshInterval: 60,
  });

  useEffect(() => {
    if (widget?.config) {
      setConfig({ ...config, ...widget.config });
    }
  }, [widget]);

  const handleSave = () => {
    onSave(config);
    onOpenChange(false);
  };

  if (!widget) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Widget</DialogTitle>
          <DialogDescription>
            Customize the settings for {widget.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Symbol Selection */}
          {(widget.type === 'chart' || widget.type === 'live') && (
            <div className="space-y-2">
              <Label>Stock Symbol</Label>
              <select
                value={config.symbol}
                onChange={(e) => setConfig({ ...config, symbol: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                {POPULAR_SYMBOLS.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Chart Interval */}
          {widget.type === 'chart' && (
            <div className="space-y-2">
              <Label>Time Interval</Label>
              <select
                value={config.interval}
                onChange={(e) => setConfig({ ...config, interval: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="1">1 Minute</option>
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="D">Daily</option>
                <option value="W">Weekly</option>
                <option value="M">Monthly</option>
              </select>
            </div>
          )}

          {/* Refresh Interval */}
          <div className="space-y-2">
            <Label>Auto Refresh (seconds)</Label>
            <Input
              type="number"
              min="10"
              max="300"
              value={config.refreshInterval}
              onChange={(e) => setConfig({ ...config, refreshInterval: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}