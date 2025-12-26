import { useEffect, useState } from 'react';
import { financeWebSocket } from '@/lib/api/websocket';

export const useWebSocket = (symbol, enabled = true) => {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!enabled || !symbol) return;

    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'demo';
    
    console.log(`🔌 Connecting WebSocket for ${symbol}...`);
    
    financeWebSocket.connect(apiKey);
    setConnected(true);

    const unsubscribe = financeWebSocket.subscribe(symbol, (trade) => {
      console.log(`📊 Live data received for ${symbol}:`, trade);
      setData({
        symbol: trade.s,
        price: trade.p,
        volume: trade.v,
        timestamp: trade.t,
      });
    });

    return () => {
      console.log(`🔌 Unsubscribing from ${symbol}`);
      unsubscribe();
    };
  }, [symbol, enabled]);

  return { data, connected };
};