import React, { useState, useEffect } from 'react';
import Panel from '../../components/layout/Panel';
import { api } from '../../services/api';
import { NewsItem } from '../../types';

const CATEGORIES = ['ALL', 'FOREX', 'GOLD', 'CRYPTO', 'MACRO', 'STOCKS', 'COMMODITIES'];

const News: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    api.getNews(filter).then(items => {
      if (active) {
        setNews(items);
        setLoading(false);
      }
    });

    return () => { active = false; };
  }, [filter]);

  const formatTimeAgo = (timestamp: number) => {
    const diffMin = Math.max(1, Math.floor((Date.now() - timestamp) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    return `${diffHours}h ago`;
  };

  return (
    <Panel title="NEWS">
      <div className="flex flex-col w-full h-full gap-2">
        <div className="flex flex-row gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(c => (
            <button 
              key={c} 
              className="text-xs px-2 py-1 rounded transition-colors whitespace-nowrap" 
              style={{ 
                backgroundColor: filter === c ? 'var(--accent-blue)' : '#2a2a3a', 
                color: filter === c ? '#fff' : 'var(--text-muted)' 
              }} 
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-4 text-xs text-muted">Loading news feed...</div>
          ) : news.length === 0 ? (
            <div className="text-center py-4 text-xs text-muted">No news in this category</div>
          ) : (
            news.map(n => (
              <div 
                key={n.id} 
                className="news-item flex flex-col py-2 px-1 border-b hover:bg-white/5 transition-colors cursor-pointer" 
                style={{ borderColor: '#1f1f2e' }}
              >
                <div className="news-headline text-xs font-semibold mb-1 text-white">
                  {n.headline}
                </div>
                <div className="news-meta flex flex-row items-center gap-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  <span>{formatTimeAgo(n.timestamp)}</span>
                  <span>•</span>
                  <span>{n.source}</span>
                  <span 
                    className="badge text-[9px] px-1 py-0.5 rounded font-bold uppercase" 
                    style={{ 
                      backgroundColor: n.impact === 'HIGH' ? 'rgba(255, 23, 68, 0.2)' : 'rgba(41, 121, 255, 0.2)',
                      color: n.impact === 'HIGH' ? 'var(--accent-red)' : 'var(--accent-blue)'
                    }}
                  >
                    {n.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Panel>
  );
};

export default News;