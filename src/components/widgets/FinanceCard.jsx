'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Eye, Award, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/utils';

export default function FinanceCard({ config }) {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Watchlist',
      value: '12 Stocks',
      subtitle: 'Avg +2.34%',
      trend: 'up',
      icon: Eye,
      color: 'blue',
    },
    {
      id: 2,
      title: 'Market Gainers',
      value: 'NVDA',
      subtitle: '+12.45%',
      trend: 'up',
      icon: Award,
      color: 'green',
    },
    {
      id: 3,
      title: 'Portfolio Value',
      value: '$45,320',
      subtitle: '+$2,450 this week',
      trend: 'up',
      icon: DollarSign,
      color: 'purple',
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={card.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <TrendIcon className={`h-4 w-4 ${
                card.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className={`text-sm ${
                card.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.subtitle}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}