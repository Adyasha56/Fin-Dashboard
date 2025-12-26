import { useState, useEffect, useCallback } from 'react';
import { finnhubAPI } from '@/lib/api/finnhub';

export const useFinanceData = (symbol, type = 'quote', refreshInterval = 60000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);
      
      let result;
      switch (type) {
        case 'quote':
          result = await finnhubAPI.getQuote(symbol);
          break;
        case 'profile':
          result = await finnhubAPI.getProfile(symbol);
          break;
        case 'candles':
          const to = Math.floor(Date.now() / 1000);
          const from = to - (30 * 24 * 60 * 60); // 30 days
          result = await finnhubAPI.getCandles(symbol, 'D', from, to);
          break;
        default:
          result = await finnhubAPI.getQuote(symbol);
      }
      
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [symbol, type]);

  useEffect(() => {
    fetchData();

    // Set up auto-refresh
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};