export const dashboardTemplates = [
  {
    id: 'day-trader',
    name: 'Day Trader',
    description: 'Real-time monitoring for active traders',
    widgets: [
      {
        type: 'live',
        title: 'AAPL Live',
        config: { symbol: 'AAPL' },
        position: { x: 0, y: 0, w: 3, h: 3 }
      },
      {
        type: 'live',
        title: 'TSLA Live',
        config: { symbol: 'TSLA' },
        position: { x: 3, y: 0, w: 3, h: 3 }
      },
      {
        type: 'chart',
        title: 'NVDA Chart',
        config: { symbol: 'NVDA', interval: '5' },
        position: { x: 6, y: 0, w: 6, h: 4 }
      },
      {
        type: 'table',
        title: 'Watchlist',
        config: {},
        position: { x: 0, y: 3, w: 6, h: 4 }
      },
    ]
  },
  {
    id: 'long-term',
    name: 'Long-term Investor',
    description: 'Track portfolio performance and market trends',
    widgets: [
      {
        type: 'cards',
        title: 'Portfolio Summary',
        config: {},
        position: { x: 0, y: 0, w: 12, h: 3 }
      },
      {
        type: 'chart',
        title: 'S&P 500 Trend',
        config: { symbol: 'SPY', interval: 'W' },
        position: { x: 0, y: 3, w: 6, h: 4 }
      },
      {
        type: 'table',
        title: 'My Holdings',
        config: {},
        position: { x: 6, y: 3, w: 6, h: 4 }
      },
    ]
  },
  {
    id: 'market-overview',
    name: 'Market Overview',
    description: 'General market monitoring dashboard',
    widgets: [
      {
        type: 'cards',
        title: 'Market Status',
        config: {},
        position: { x: 0, y: 0, w: 12, h: 3 }
      },
      {
        type: 'chart',
        title: 'NASDAQ',
        config: { symbol: 'QQQ', interval: 'D' },
        position: { x: 0, y: 3, w: 6, h: 4 }
      },
      {
        type: 'chart',
        title: 'DOW JONES',
        config: { symbol: 'DIA', interval: 'D' },
        position: { x: 6, y: 3, w: 6, h: 4 }
      },
      {
        type: 'table',
        title: 'Top Movers',
        config: {},
        position: { x: 0, y: 7, w: 12, h: 4 }
      },
    ]
  }
];