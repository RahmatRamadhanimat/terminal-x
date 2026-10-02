import TopBar from './TopBar';
import BottomTicker from './BottomTicker';
import Watchlist from '../../features/watchlist/Watchlist';
import MarketAnalysis from '../../features/market-analysis/MarketAnalysis';
import InstrumentHeader from '../../features/instrument-header/InstrumentHeader';
import Chart from '../../features/chart/Chart';
import PaperTrading from '../../features/paper-trading/PaperTrading';
import OrderBook from '../../features/orderbook/OrderBook';
import News from '../../features/news/News';
import Screener from '../../features/screener/Screener';

const TerminalLayout: React.FC = () => {
  return (
    <div className="terminal-layout w-full h-full flex flex-col overflow-hidden relative" style={{ backgroundColor: '#0f0f12', color: '#fff' }}>
      <TopBar />
      <div className="terminal-main flex-1 flex flex-row p-1 gap-1 overflow-hidden">
        <div className="terminal-column flex flex-col flex-1 gap-1 overflow-hidden">
          <div className="h-1/2 overflow-hidden"><Watchlist /></div>
          <div className="h-1/2 overflow-hidden"><MarketAnalysis /></div>
        </div>
        <div className="terminal-column flex flex-col flex-[2] gap-1 overflow-hidden">
          <InstrumentHeader />
          <div className="flex-1 overflow-hidden"><Chart /></div>
          <div className="h-1/3 overflow-hidden"><PaperTrading /></div>
        </div>
        <div className="terminal-column flex flex-col flex-1 gap-1 overflow-hidden">
          <div className="h-1/3 overflow-hidden"><OrderBook /></div>
          <div className="h-1/3 overflow-hidden"><News /></div>
          <div className="h-1/3 overflow-hidden"><Screener /></div>
        </div>
      </div>
      <BottomTicker />
    </div>
  );
};
export default TerminalLayout;