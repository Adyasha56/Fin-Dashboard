'use client';

import { useState, useEffect } from 'react';
import { finnhubAPI } from '@/lib/api/finnhub';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

const INTERVALS = [
  { label: '1D', value: '1', resolution: '5' },
  { label: '1W', value: '7', resolution: '30' },
  { label: '1M', value: '30', resolution: 'D' },
  { label: '3M', value: '90', resolution: 'D' },
  { label: '1Y', value: '365', resolution: 'W' },
];

export default function StockChart({ config }) {
  const [selectedInterval, setSelectedInterval] = useState(INTERVALS[2]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const symbol = config?.symbol || 'AAPL';
  const theme = useDashboardStore((state) => state.theme);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const to = Math.floor(Date.now() / 1000);
      const from = to - (parseInt(selectedInterval.value) * 24 * 60 * 60);
      
      const data = await finnhubAPI.getCandles(symbol, selectedInterval.resolution, from, to);

      if (data.s === 'ok') {
        const formattedData = data.t.map((timestamp, index) => ({
          time: new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: data.c[index],
          high: data.h[index],
          low: data.l[index],
          open: data.o[index],
        }));
        setChartData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedInterval, symbol]);

  // Dynamic colors based on theme
  const chartColors = {
    grid: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    text: theme === 'dark' ? '#e5e7eb' : '#374151',
    line: theme === 'dark' ? '#60a5fa' : '#3b82f6',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Symbol:</span>
          <span className="text-lg font-bold">{symbol}</span>
        </div>
        <div className="flex gap-1">
          {INTERVALS.map((interval) => (
            <Button
              key={interval.value}
              variant={selectedInterval.value === interval.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedInterval(interval)}
            >
              {interval.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full" style={{ height: '300px' }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: chartColors.text, fontSize: 12 }}
                stroke={chartColors.grid}
              />
              <YAxis 
                tick={{ fill: chartColors.text, fontSize: 12 }}
                stroke={chartColors.grid}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${chartColors.grid}`,
                  borderRadius: '8px',
                  color: chartColors.text
                }}
                labelStyle={{ color: chartColors.text }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={chartColors.line}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: chartColors.line }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>

      {!loading && chartData.length > 0 && (
        <div className="text-xs text-muted-foreground text-center">
          Showing {chartData.length} data points
        </div>
      )}
    </div>
  );
}