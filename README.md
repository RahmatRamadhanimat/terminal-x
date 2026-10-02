# TERMINAL-X

## Real-Time Market Intelligence Terminal

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20FastAPI-purple)

TERMINAL-X is a professional financial market terminal application for real-time market data analysis, technical analysis, paper trading simulation, and portfolio tracking. Built with React + TypeScript + Vite on the frontend and Python + FastAPI on the backend.

> **⚠️ DISCLAIMER:** TERMINAL-X is an **information and simulation tool only**. It does NOT execute real financial transactions. All trading features are paper trading / simulation only. This is NOT financial advice software.

---

## Features

| Feature | Description |
|---------|-------------|
| **Multi-Asset Watchlist** | Track XAUUSD, Forex, Crypto, Indices, Commodities |
| **Professional Charts** | Candlestick, Line, Bar with technical indicators |
| **Technical Indicators** | EMA, SMA, RSI, MACD, Bollinger Bands, ATR, VWAP |
| **Market Screener** | Filter by momentum, RSI, volume, trend, volatility |
| **Financial News** | Real-time news feed with category filtering |
| **Economic Calendar** | Track economic events with impact ratings |
| **Price Alerts** | Set alerts for price levels and conditions |
| **Paper Trading** | Simulated trading with Market/Limit/Stop orders |
| **Portfolio Tracking** | Track balance, equity, P/L, and performance |
| **Market Heatmap** | Visual heatmap across asset classes |
| **Correlation Matrix** | Cross-asset correlation analysis |
| **Command Palette** | Quick navigation with Ctrl+K |
| **Multi-Workspace** | Save and switch between workspace configurations |
| **Mock Mode** | Full demo experience without API keys |

---

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite 6** for build tooling
- **Zustand** for state management
- **Lightweight Charts** (TradingView) for financial charts
- **Lucide React** for icons

### Backend
- **Python 3.12+** with FastAPI
- **Pydantic** for data validation
- **SQLAlchemy** for database abstraction
- **WebSocket** for real-time data
- **SQLite** (local) / **PostgreSQL** (production)

### Deployment
- **Vercel** with Services configuration
- **GitHub** for version control

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/terminal-x.git
cd terminal-x
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Start the backend server
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Open the Application

Open your browser and navigate to: **http://localhost:5173**

The application runs in **Mock Mode** by default — no API keys required!

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Mode
MOCK_MODE=true

# API Keys (optional - only needed for live data)
MARKET_DATA_API_KEY=
NEWS_API_KEY=
CALENDAR_API_KEY=

# Database
DATABASE_URL=sqlite+aiosqlite:///./terminal_x.db

# Security
SECRET_KEY=change-me-in-production

# URLs
FRONTEND_URL=http://localhost:5173
API_BASE_URL=http://localhost:8000
```

> **🔒 SECURITY:** Never commit `.env` files to Git. API keys and secrets must be stored as environment variables in your deployment platform.

---

## Project Structure

```
terminal-x/
│
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # Loading, Error, Empty states
│   │   │   └── layout/          # Terminal layout, TopBar, Ticker
│   │   ├── features/            # Feature modules
│   │   │   ├── watchlist/       # Market watchlist
│   │   │   ├── chart/           # Financial charts
│   │   │   ├── news/            # News feed
│   │   │   ├── screener/        # Market screener
│   │   │   ├── orderbook/       # Order book
│   │   │   ├── alerts/          # Price alerts
│   │   │   ├── paper-trading/   # Paper trading simulation
│   │   │   ├── portfolio/       # Portfolio tracking
│   │   │   ├── calendar/        # Economic calendar
│   │   │   ├── heatmap/         # Market heatmap
│   │   │   ├── correlation/     # Correlation matrix
│   │   │   ├── command-palette/ # Command palette (Ctrl+K)
│   │   │   ├── settings/        # App settings
│   │   │   ├── debug-panel/     # Developer debug panel
│   │   │   ├── instrument-header/ # Current instrument display
│   │   │   └── market-analysis/ # XAUUSD analysis panel
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API & WebSocket clients
│   │   ├── stores/              # Zustand state stores
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   └── styles/              # Global CSS styles
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     # Python + FastAPI
│   ├── app/
│   │   ├── api/                 # API route handlers
│   │   ├── core/                # Config, database
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── services/            # Business logic
│   │   ├── providers/           # Data provider abstraction
│   │   │   ├── base.py          # Abstract interfaces
│   │   │   ├── mock_market.py   # Mock data provider
│   │   │   └── real_market.py   # Real API provider (stub)
│   │   ├── indicators/          # Technical analysis
│   │   ├── websocket/           # WebSocket handlers
│   │   └── utils/               # Utilities
│   ├── main.py                  # FastAPI entry point
│   ├── requirements.txt
│   └── .env.example
│
├── docs/                        # Documentation
├── vercel.json                  # Vercel Services config
├── .gitignore
└── README.md
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open Command Palette |
| `Ctrl + /` | Search |
| `Ctrl + B` | Toggle Sidebar |
| `Ctrl + Shift + D` | Developer Debug Panel |
| `F11` | Fullscreen |
| `Escape` | Close Modal / Panel |

---

## Mock Mode

TERMINAL-X runs in **Mock Mode** by default (`MOCK_MODE=true`).

In Mock Mode:
- ✅ Prices move with realistic simulation
- ✅ Historical candles are generated
- ✅ Watchlist updates in real-time
- ✅ Charts render and update
- ✅ Order book shows simulated depth
- ✅ Screener has full data
- ✅ News shows demo headlines
- ✅ Economic calendar shows demo events
- ✅ Alerts can be created and tested
- ✅ Paper trading simulation works

All mock data is clearly labeled with **DEMO DATA** or **MOCK MODE** indicators.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/symbols` | List all symbols |
| GET | `/api/market/{symbol}` | Get market data for symbol |
| GET | `/api/candles/{symbol}` | Get OHLCV candles |
| GET | `/api/news` | Get financial news |
| GET | `/api/calendar` | Get economic calendar |
| GET | `/api/screener` | Get screener data |
| GET | `/api/portfolio` | Get portfolio summary |
| GET | `/api/alerts` | List alerts |
| POST | `/api/alerts` | Create alert |
| PUT | `/api/alerts/{id}` | Update alert |
| DELETE | `/api/alerts/{id}` | Delete alert |
| WS | `/ws/market` | Real-time market data stream |

---

## Deployment to GitHub

### 1. Create a GitHub Repository

Go to [github.com/new](https://github.com/new) and create a new repository named `terminal-x`.

### 2. Initialize and Push

```bash
cd terminal-x

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: TERMINAL-X Market Intelligence Terminal"

# Set main branch
git branch -M main

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/terminal-x.git

# Push to GitHub
git push -u origin main
```

---

## Deployment to Vercel

### 1. Login to Vercel

Go to [vercel.com](https://vercel.com) and log in with your GitHub account.

### 2. Import Repository

1. Click **"Add New..."** → **"Project"**
2. Select your `terminal-x` repository
3. Vercel will detect the monorepo structure

### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `MOCK_MODE` | `true` | All |
| `SECRET_KEY` | (generate a secure key) | Production |
| `DATABASE_URL` | (your PostgreSQL URL) | Production |
| `MARKET_DATA_API_KEY` | (your API key) | Production |
| `NEWS_API_KEY` | (your API key) | Production |
| `FRONTEND_URL` | (your Vercel URL) | Production |
| `API_BASE_URL` | (your Vercel URL) | Production |

### 4. Deploy

Click **"Deploy"** — Vercel will build and deploy both the frontend and backend.

### 5. Test Production

After deployment, verify:

- `https://your-app.vercel.app/` → Frontend loads
- `https://your-app.vercel.app/api/health` → Returns health status
- `https://your-app.vercel.app/api/symbols` → Returns symbol list
- `https://your-app.vercel.app/api/market/XAUUSD` → Returns market data

### Preview Deployments

Every push to a non-main branch creates a preview deployment with its own URL.

### Production Deployments

Every push to the `main` branch triggers a production deployment.

### Redeploy

Go to Vercel Dashboard → Your Project → Deployments → Click "..." → "Redeploy"

---

## Data Provider Architecture

TERMINAL-X uses an abstract provider pattern for data sources:

```
Frontend → Backend API → Provider Adapter → External Data Provider
                              ↓
                    MockProvider (default)
                    RealProvider (with API keys)
```

Providers can be swapped without changing frontend code:

```
MarketDataProvider (Abstract)
├── MockMarketDataProvider  ← Default
└── RealMarketDataProvider  ← With API key

NewsProvider (Abstract)
├── MockNewsProvider        ← Default
└── RealNewsProvider        ← With API key

CalendarProvider (Abstract)
├── MockCalendarProvider    ← Default
└── RealCalendarProvider    ← With API key
```

---

## WebSocket Architecture

Real-time data flows through WebSocket connections:

```
Client ←→ WebSocket Server ←→ Data Provider
         (auto-reconnect)
```

Connection states:
- 🟢 **CONNECTED** — Receiving live updates
- 🟡 **CONNECTING** — Establishing connection
- 🟠 **RECONNECTING** — Auto-reconnecting with backoff
- 🔴 **DISCONNECTED** — No connection

> **Note:** Vercel Serverless Functions have execution time limits. For persistent WebSocket connections in production, consider deploying the WebSocket server separately (e.g., Railway, Render, Fly.io) and configuring the frontend to connect to it.

---

## Security

- ✅ API keys stored in environment variables only
- ✅ No credentials in source code or Git
- ✅ Server-side API key usage only
- ✅ Input validation with Pydantic
- ✅ CORS configured appropriately
- ✅ Safe error messages (no stack traces in production)
- ✅ `.gitignore` excludes sensitive files

---

## License

MIT License — See [LICENSE](LICENSE) for details.

---

## Disclaimer

TERMINAL-X is provided for **informational and educational purposes only**. It is NOT financial advice. All trading features are **paper trading simulations** and do NOT execute real financial transactions. Use at your own risk.

---

Built with ❤️ by the TERMINAL-X Team
