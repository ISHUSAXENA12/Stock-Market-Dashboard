# 📈 Stock Market Dashboard

A modern, responsive web application for tracking and analyzing stock market data with AI-powered predictions. Built for the JarNox technical assessment.

![Stock Market Dashboard](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop)

## 🚀 Features

### Core Features
- **Responsive Design**: Clean, modern interface that works seamlessly across desktop, tablet, and mobile devices
- **Real-time Stock Data**: Interactive dashboard displaying stock prices, changes, and market statistics
- **Company Browser**: Scrollable sidebar with 12+ Indian companies (NSE/BSE stocks)
- **Interactive Charts**: Dynamic line charts showing 30-day historical stock price data
- **AI Predictions**: Machine learning-powered next-day price forecasts with confidence levels
- **Market Status**: Live market open/close status and trading hours

### Technical Features
- **REST API**: Complete backend with CRUD operations for stocks and predictions
- **Database Integration**: SQLite/PostgreSQL support with migration scripts
- **Real-time Updates**: Live price updates and market statistics
- **Error Handling**: Comprehensive error handling and validation
- **Type Safety**: Full TypeScript implementation
- **Responsive Charts**: Charts that adapt to different screen sizes

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Responsive charting library
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **SQLite** - Lightweight database for development
- **PostgreSQL** - Production database support

### DevOps & Deployment
- **Docker** - Containerization
- **Vercel** - Deployment platform
- **Railway** - Alternative deployment option

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
\`\`\`bash
git clone <your-repo-url>
cd stock-market-dashboard
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up the database**
\`\`\`bash
# Run database creation script
npm run db:create

# Seed with sample data
npm run db:seed
\`\`\`

4. **Start the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="file:./dev.db"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Optional: For production
POSTGRES_URL="your-postgres-connection-string"
\`\`\`

## 🐳 Docker Setup

### Development with Docker

\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individual commands
docker build -t stock-dashboard .
docker run -p 3000:3000 stock-dashboard
\`\`\`

### Production Deployment

\`\`\`bash
# Build production image
docker build -f Dockerfile.prod -t stock-dashboard:prod .

# Run production container
docker run -p 3000:3000 -e NODE_ENV=production stock-dashboard:prod
\`\`\`

## 🌐 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### Endpoints

#### Stocks
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/[symbol]` - Get specific stock
- `GET /api/stocks/[symbol]/historical` - Get historical data
- `PUT /api/stocks/[symbol]` - Update stock price

#### Predictions
- `POST /api/predictions` - Generate AI prediction
- `GET /api/predictions` - Get recent predictions

#### Market
- `GET /api/market/status` - Get market status

### Example API Usage

\`\`\`javascript
// Get all stocks
const response = await fetch('/api/stocks');
const { data } = await response.json();

// Generate prediction
const prediction = await fetch('/api/predictions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ symbol: 'RELIANCE' })
});
\`\`\`

## 📱 Responsive Design

The dashboard is built with a mobile-first approach:

- **Mobile (< 768px)**: Collapsible sidebar, stacked layout, touch-friendly interactions
- **Tablet (768px - 1024px)**: Adaptive grid, optimized spacing
- **Desktop (> 1024px)**: Full sidebar, multi-column layout, hover effects

## 🤖 AI Prediction Engine

The AI prediction feature uses a simulated machine learning model that considers:

- **Technical Indicators**: Moving averages, RSI, MACD
- **Market Sentiment**: Volume analysis and price patterns
- **Historical Correlation**: Past price movements and trends
- **Risk Assessment**: Volatility and market conditions

**Note**: This is a demonstration feature using algorithmic predictions, not actual ML models.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

2. **Configure environment variables** in Vercel dashboard

3. **Deploy**
\`\`\`bash
vercel --prod
\`\`\`

### Railway

1. **Connect to Railway**
\`\`\`bash
npm i -g @railway/cli
railway login
railway init
\`\`\`

2. **Deploy**
\`\`\`bash
railway up
\`\`\`

### Manual Deployment

1. **Build the application**
\`\`\`bash
npm run build
\`\`\`

2. **Start production server**
\`\`\`bash
npm start
\`\`\`

## 📊 Sample Data

The application includes realistic mock data for 12 Indian companies:

- **Large Cap**: Reliance Industries, TCS, HDFC Bank, Infosys
- **Mid Cap**: Asian Paints, Bajaj Finance, ICICI Bank
- **IT Sector**: Wipro, HCL Technologies
- **Banking**: SBI, Axis Bank
- **FMCG**: Hindustan Unilever

Each stock includes:
- Current price and daily changes
- 30 days of historical data
- Market cap and 52-week high/low
- Volume and trading statistics

## 🧪 Testing

### Manual Testing
\`\`\`bash
# Test API endpoints
curl http://localhost:3000/api/stocks
curl http://localhost:3000/api/market/status

# Test predictions
curl -X POST http://localhost:3000/api/predictions \
  -H "Content-Type: application/json" \
  -d '{"symbol": "RELIANCE"}'
\`\`\`

### Browser Testing
- Test responsive design across different screen sizes
- Verify chart interactions and data updates
- Check mobile touch interactions
- Validate form submissions and error handling

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **API Caching**: Efficient data fetching and caching strategies
- **Bundle Analysis**: Optimized bundle size and tree shaking
- **Responsive Images**: Adaptive image sizing for different devices

## 🔒 Security Features

- **Input Validation**: Server-side validation for all API endpoints
- **Type Safety**: TypeScript for compile-time error prevention
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Secure configuration management
- **Error Handling**: Graceful error handling without exposing internals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Approach

### Architecture Decisions
- **Next.js App Router**: Modern React framework with server-side rendering
- **Component-Based Design**: Reusable, maintainable UI components
- **API-First Approach**: RESTful API design with proper HTTP methods
- **Mobile-First Responsive**: Progressive enhancement for larger screens

### Challenges Encountered
- **Chart Responsiveness**: Ensuring charts work well across all screen sizes
- **Real-time Data Simulation**: Creating realistic stock price movements
- **Mobile UX**: Optimizing complex financial data for mobile interfaces
- **Performance**: Balancing feature richness with loading speed

### Future Enhancements
- WebSocket integration for real-time updates
- Advanced charting with technical indicators
- User authentication and portfolio tracking
- Integration with real stock market APIs
- Advanced AI/ML prediction models

## 📄 License

This project is created for the JarNox technical assessment. All rights reserved.

## 👨‍💻 Author

**Your Name**
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- **JarNox Team** for the comprehensive technical assessment
- **Shadcn/ui** for the beautiful component library
- **Recharts** for the powerful charting capabilities
- **Vercel** for the excellent deployment platform

---

**Built with ❤️ for JarNox Technical Assessment**

For questions or support, please contact: shaktijarnox@outlook.com
