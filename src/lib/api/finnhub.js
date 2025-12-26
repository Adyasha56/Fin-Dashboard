import axios from 'axios';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'demo';
const BASE_URL = 'https://finnhub.io/api/v1';
const USE_MOCK_DATA = !process.env.NEXT_PUBLIC_FINNHUB_API_KEY || process.env.NEXT_PUBLIC_FINNHUB_API_KEY === 'demo';

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 60000; // 1 minute

const getCacheKey = (endpoint, params) => {
  return `${endpoint}-${JSON.stringify(params)}`;
};

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Mock data generators with realistic prices
const STOCK_PRICES = {
  'AAPL': 178.50,
  'GOOGL': 142.30,
  'MSFT': 384.20,
  'AMZN': 151.80,
  'TSLA': 242.60,
  'META': 468.50,
  'NVDA': 495.30,
  'NFLX': 485.20,
  'AMD': 165.40,
  'INTC': 43.20,
};

const generateMockQuote = (symbol) => {
  const basePrice = STOCK_PRICES[symbol] || (Math.random() * 400 + 50);
  const change = (Math.random() - 0.5) * 10;
  const changePercent = (change / basePrice) * 100;

  return {
    c: parseFloat(basePrice.toFixed(2)),
    d: parseFloat(change.toFixed(2)),
    dp: parseFloat(changePercent.toFixed(2)),
    h: parseFloat((basePrice + Math.random() * 5).toFixed(2)),
    l: parseFloat((basePrice - Math.random() * 5).toFixed(2)),
    o: parseFloat((basePrice + (Math.random() - 0.5) * 3).toFixed(2)),
    pc: parseFloat((basePrice - change).toFixed(2)),
  };
};

const generateMockProfile = (symbol) => ({
  name: `${symbol} Inc.`,
  ticker: symbol,
  exchange: 'NASDAQ',
  country: 'US',
  currency: 'USD',
  marketCapitalization: Math.floor(Math.random() * 1000000),
});

const generateMockCandles = (symbol, days = 30) => {
  const now = Math.floor(Date.now() / 1000);
  const basePrice = STOCK_PRICES[symbol] || 150;
  const data = {
    c: [],
    h: [],
    l: [],
    o: [],
    t: [],
    v: [],
    s: 'ok'
  };

  for (let i = 0; i < days; i++) {
    const dayVariation = (Math.random() - 0.5) * 20;
    const price = basePrice + dayVariation;
    
    data.c.push(parseFloat((price + (Math.random() - 0.5) * 5).toFixed(2)));
    data.h.push(parseFloat((price + Math.random() * 5).toFixed(2)));
    data.l.push(parseFloat((price - Math.random() * 5).toFixed(2)));
    data.o.push(parseFloat((price + (Math.random() - 0.5) * 3).toFixed(2)));
    data.t.push(now - (days - i - 1) * 24 * 60 * 60);
    data.v.push(Math.floor(Math.random() * 10000000 + 1000000));
  }

  return data;
};

export const finnhubAPI = {
  // Get stock quote
  getQuote: async (symbol) => {
    const cacheKey = getCacheKey('quote', { symbol });
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    // Use mock data if no API key
    if (USE_MOCK_DATA) {
      console.log(`Using mock data for ${symbol} quote`);
      const mockData = generateMockQuote(symbol);
      setCache(cacheKey, mockData);
      return mockData;
    }

    try {
      const response = await axios.get(`${BASE_URL}/quote`, {
        params: { symbol, token: FINNHUB_API_KEY },
        timeout: 5000
      });
      
      if (response.data && response.data.c !== 0) {
        setCache(cacheKey, response.data);
        return response.data;
      } else {
        throw new Error('Invalid response or no data');
      }
    } catch (error) {
      console.warn(`API failed for ${symbol}, using mock data:`, error.response?.status || error.message);
      const mockData = generateMockQuote(symbol);
      setCache(cacheKey, mockData);
      return mockData;
    }
  },

  // Get company profile
  getProfile: async (symbol) => {
    const cacheKey = getCacheKey('profile', { symbol });
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (USE_MOCK_DATA) {
      console.log(`Using mock data for ${symbol} profile`);
      const mockData = generateMockProfile(symbol);
      setCache(cacheKey, mockData);
      return mockData;
    }

    try {
      const response = await axios.get(`${BASE_URL}/stock/profile2`, {
        params: { symbol, token: FINNHUB_API_KEY },
        timeout: 5000
      });
      
      if (response.data && response.data.name) {
        setCache(cacheKey, response.data);
        return response.data;
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.warn(`API failed for ${symbol}, using mock data:`, error.response?.status || error.message);
      const mockData = generateMockProfile(symbol);
      setCache(cacheKey, mockData);
      return mockData;
    }
  },

  // Get market news
  getMarketNews: async (category = 'general') => {
    const cacheKey = getCacheKey('news', { category });
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (USE_MOCK_DATA) {
      console.log('Using empty news array (mock mode)');
      return [];
    }

    try {
      const response = await axios.get(`${BASE_URL}/news`, {
        params: { category, token: FINNHUB_API_KEY },
        timeout: 5000
      });
      setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.warn('News API failed:', error.response?.status || error.message);
      return [];
    }
  },

  // Get candles (historical data)
  getCandles: async (symbol, resolution = 'D', from, to) => {
    const cacheKey = getCacheKey('candles', { symbol, resolution, from, to });
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (USE_MOCK_DATA) {
      console.log(`Using mock data for ${symbol} candles`);
      const days = Math.floor((to - from) / (24 * 60 * 60));
      const mockData = generateMockCandles(symbol, Math.min(days, 90));
      setCache(cacheKey, mockData);
      return mockData;
    }

    try {
      const response = await axios.get(`${BASE_URL}/stock/candle`, {
        params: { 
          symbol, 
          resolution, 
          from, 
          to, 
          token: FINNHUB_API_KEY 
        },
        timeout: 5000
      });
      
      if (response.data && response.data.s === 'ok') {
        setCache(cacheKey, response.data);
        return response.data;
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.warn(`Candles API failed for ${symbol}, using mock data:`, error.response?.status || error.message);
      const days = Math.floor((to - from) / (24 * 60 * 60));
      const mockData = generateMockCandles(symbol, Math.min(days, 90));
      setCache(cacheKey, mockData);
      return mockData;
    }
  },

  // Get multiple quotes at once
  getMultipleQuotes: async (symbols) => {
    try {
      const promises = symbols.map(symbol => finnhubAPI.getQuote(symbol));
      const results = await Promise.all(promises);
      return symbols.map((symbol, index) => ({
        symbol,
        ...results[index]
      }));
    } catch (error) {
      console.error('Error fetching multiple quotes:', error);
      throw error;
    }
  }
};  