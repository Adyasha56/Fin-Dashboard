'use client';

import { useDashboardStore } from '@/lib/store';
import StockTable from '@/components/widgets/StockTable';
import FinanceCard from '@/components/widgets/FinanceCard';
import StockChart from '@/components/widgets/StockChart';
import LivePrice from '@/components/widgets/LivePrice';
import WidgetWrapper from '@/components/widgets/WidgetWrapper';
import { useState, useEffect } from 'react';

export default function WidgetGrid({ widgets, onConfigure }) {
  const { removeWidget } = useDashboardStore();
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const widgetComponents = {
    'table': StockTable,
    'cards': FinanceCard,
    'chart': StockChart,
    'live': LivePrice,
  };

  const handleDragStart = (e, widgetId) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedWidget && draggedWidget !== targetId) {
      // For now, just console log
      // In production, you'd reorder widgets here
      console.log(`Move ${draggedWidget} to ${targetId}`);
    }
    setDraggedWidget(null);
  };

  const renderWidget = (widget) => {
    const WidgetComponent = widgetComponents[widget.type];
    
    if (!WidgetComponent) {
      return null;
    }

    return (
      <div
        key={widget.id}
        draggable={mounted}
        onDragStart={(e) => handleDragStart(e, widget.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, widget.id)}
        className={`transition-all ${draggedWidget === widget.id ? 'opacity-50' : ''}`}
      >
        <WidgetWrapper
          widget={widget}
          onRemove={() => removeWidget(widget.id)}
          onConfigure={() => onConfigure && onConfigure(widget.id)}
        >
          <WidgetComponent config={widget.config} />
        </WidgetWrapper>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {widgets.map(renderWidget)}
    </div>
  );
}