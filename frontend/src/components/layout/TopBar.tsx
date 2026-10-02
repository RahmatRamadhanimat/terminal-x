import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useConnectionStore } from '../../stores/connectionStore';

const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const toggleCommandPalette = useAppStore((s) => s.toggleCommandPalette);
  const toggleSettings = useAppStore((s) => s.toggleSettings);

  const status = useConnectionStore((s) => s.status);
  const isMock = useConnectionStore((s) => s.isMock);
  const latency = useConnectionStore((s) => s.latency);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const statusColor = status === 'CONNECTED' ? '#22c55e' : status === 'CONNECTING' ? '#eab308' : '#ef4444';

  return (
    <div className="top-bar flex flex-row items-center justify-between p-2 border-b" style={{ borderColor: '#1f1f2e', backgroundColor: '#13131a' }}>
      <div className="top-bar-logo font-bold text-lg text-primary tracking-wide" style={{ color: '#3b82f6' }}>
        TERMINAL-X
      </div>

      <div className="top-bar-section flex flex-row items-center gap-4">
        <button 
          className="btn btn-sm" 
          style={{ border: '1px solid #1f1f2e', padding: '4px 8px', borderRadius: '4px' }} 
          onClick={toggleCommandPalette}
        >
          ⌘ K Palette
        </button>

        {/* Dynamic connection indicator */}
        <div className="flex flex-row items-center gap-1 text-sm font-mono">
          <span 
            className="status-dot w-2 h-2 rounded-full inline-block" 
            style={{ backgroundColor: statusColor }}
          ></span>
          <span style={{ color: statusColor }}>
            {status} {isMock ? '(MOCK)' : `(${latency}ms)`}
          </span>
        </div>

        <div className="font-mono text-sm">{time.toISOString().split('T')[1].split('.')[0]} UTC</div>

        <button 
          className="btn btn-sm" 
          style={{ padding: '4px 8px', border: '1px solid #1f1f2e', borderRadius: '4px' }} 
          onClick={toggleSettings}
        >
          ⚙ Settings
        </button>
      </div>
    </div>
  );
};

export default TopBar;