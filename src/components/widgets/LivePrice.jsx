'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { Activity, TrendingUp, TrendingDown, Wifi, WifiOff } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function LivePrice({ config }) {
  const symbol = config?.symbol || 'AAPL';
  const { data, connected } = useWebSocket(symbol, true);
  const [prevPrice, setPrevPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  useEffect(() => {
    if (data?.price) {
      if (prevPrice) {
        setPriceChange(data.price - prevPrice);
      }
      setPrevPrice(data.price);
      setUpdateCount(prev => prev + 1);
      setLastUpdateTime(new Date());
    }
  }, [data?.price]);

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          {connected ? (
            <>
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">WebSocket Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-600">Disconnected</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`h-4 w-4 ${data ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
          <span className="text-xs text-muted-foreground">
            {updateCount} updates
          </span>
        </div>
      </div>

      {/* Symbol Info */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{symbol}</span>
        {lastUpdateTime && (
          <span className="text-xs text-muted-foreground">
            Last: {lastUpdateTime.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Price Display */}
      {data ? (
        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold">
              {formatCurrency(data.price)}
            </span>
            {priceChange !== null && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                priceChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {priceChange >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-bold">
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="text-lg font-semibold">{data.volume?.toLocaleString() || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Timestamp</p>
              <p className="text-lg font-semibold">
                {new Date(data.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-3 bg-muted/30 rounded text-xs font-mono">
            <div className="text-muted-foreground">Debug Info:</div>
            <div>Symbol: {data.symbol}</div>
            <div>Price: ${data.price}</div>
            <div>Updates: {updateCount}</div>
            <div>Connected: {connected ? 'Yes' : 'No'}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 space-y-4">
          <Activity className="h-12 w-12 text-muted-foreground animate-pulse" />
          <div className="text-center">
            <p className="font-medium">Waiting for live data...</p>
            <p className="text-sm text-muted-foreground mt-1">
              WebSocket: {connected ? 'Connected' : 'Connecting...'}
            </p>
          </div>
          {!connected && (
            <div className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded">
               Check API key in .env.local
            </div>
          )}
        </div>
      )}
    </div>
  );
}