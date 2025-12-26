# 📊 FinBoard - Customizable Finance Dashboard

A modern, real-time finance dashboard built with Next.js 15, shadcn/ui, and Recharts. Create your personalized stock monitoring experience with drag-and-drop widgets, live data updates, and beautiful visualizations.

![FinBoard Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-green?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📈 Widget Management
- **Stock Table** - Paginated list with search, filters, and real-time prices
- **Finance Cards** - Quick overview of watchlist, gainers, and performance
- **Stock Charts** - Interactive line/candle charts with multiple timeframes
- **Live Price** - Real-time WebSocket updates for instant price tracking

### 🎨 Customization
- **Drag & Drop** - Rearrange widgets to suit your workflow
- **Theme Toggle** - Seamless dark/light mode switching
- **Widget Configuration** - Customize each widget's symbol and settings
- **Dashboard Templates** - Pre-built layouts for traders and investors

### 💾 Data & Persistence
- **LocalStorage** - Auto-save dashboard configuration
- **Export/Import** - Backup and restore your dashboard
- **Data Caching** - Intelligent API call optimization
- **Real-time Updates** - WebSocket integration for live data

### 🎯 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Loading States** - Smooth transitions and skeleton loaders
- **Error Handling** - Graceful fallbacks with mock data
- **Accessibility** - WCAG compliant with keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/finboard.git
cd finboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local file
echo "NEXT_PUBLIC_FINNHUB_API_KEY=your_api_key_here" > .env.local
```

Get your free API key from [Finnhub.io](https://finnhub.io/)

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
fin-board/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WidgetGrid.jsx
│   │   │   ├── AddWidgetDialog.jsx
│   │   │   ├── TemplatesDialog.jsx
│   │   │   └── ConfigureWidgetDialog.jsx
│   │   ├── widgets/           # Widget components
│   │   │   ├── StockTable.jsx
│   │   │   ├── FinanceCard.jsx
│   │   │   ├── StockChart.jsx
│   │   │   ├── LivePrice.jsx
│   │   │   └── WidgetWrapper.jsx
│   │   ├── ui/                # shadcn/ui components
│   │   ├── Footer.jsx
│   │   └── theme-provider.jsx
│   ├── lib/
│   │   ├── api/               # API integration
│   │   │   ├── finnhub.js
│   │   │   └── websocket.js
│   │   ├── store.js           # Zustand state management
│   │   ├── templates.js       # Dashboard templates
│   │   └── utils.js           # Utility functions
│   └── hooks/
│       ├── useFinanceData.js
│       └── useWebSocket.js
├── public/                     # Static assets
└── package.json
```

## 🛠️ Tech Stack

### Core
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### State & Data
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[Recharts](https://recharts.org/)** - Chart library
- **[Axios](https://axios-http.com/)** - HTTP client

### APIs
- **[Finnhub](https://finnhub.io/)** - Stock market data
- **WebSocket** - Real-time price updates

## 📖 Usage Guide

### Adding Widgets

1. Click the **"Add Widget"** button in the header
2. Enter a widget title
3. Select a widget type:
   - **Stock Table** - View multiple stocks at once
   - **Finance Cards** - Quick metrics overview
   - **Stock Chart** - Price history visualization
   - **Live Price** - Real-time price tracking
4. Click **"Add Widget"**

### Configuring Widgets

1. Click the **⚙️ Settings** icon on any widget
2. Select a stock symbol
3. Choose time interval (for charts)
4. Set refresh rate
5. Click **"Save Changes"**

### Using Templates

1. Click the **📋 Template** icon in the header
2. Choose from pre-built templates:
   - **Day Trader** - Real-time monitoring
   - **Long-term Investor** - Portfolio tracking
   - **Market Overview** - General market trends
3. Click **"Apply Template"**

### Export/Import

**Export:**
1. Click the **⬇️ Download** icon
2. JSON file will be downloaded

**Import:**
1. Click the **⬆️ Upload** icon
2. Select your JSON configuration file
3. Confirm replacement

## 🎨 Customization

### Theme

Toggle between light and dark modes using the **🌙/☀️** button in the header.

### Colors

Edit `src/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: oklch(0.648 0.2 131.684);
  --secondary: oklch(0.967 0.001 286.375);
  /* ... more colors */
}
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FINNHUB_API_KEY` | Finnhub API key for stock data | Yes |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Finnhub](https://finnhub.io/) for the financial data API
- [Vercel](https://vercel.com/) for hosting

## 📧 Contact

For support or inquiries:
- **Email:** adyashananda105@gmail.com
- **GitHub:** [@Adyasha56](https://github.com/Adyasha56)


---

Made with ❤️ by [Adyasha56]
