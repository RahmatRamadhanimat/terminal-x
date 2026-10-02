import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';

const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, toggleCommandPalette } = useAppStore();
  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="overlay absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={toggleCommandPalette}>
      <div className="modal w-[500px] border rounded shadow-lg flex flex-col" style={{ borderColor: '#2a2a3a', backgroundColor: '#13131a' }} onClick={e => e.stopPropagation()}>
        <input 
          autoFocus 
          className="command-palette-input w-full p-4 bg-transparent border-b text-lg outline-none" 
          style={{ borderColor: '#2a2a3a', color: '#fff' }} 
          placeholder="Search commands or symbols..." 
          value={query}
          onChange={e => setQuery(e.target.value)} 
        />
        <div className="command-palette-results max-h-[300px] overflow-auto p-2">
          <div className="p-2 text-sm text-muted" style={{ color: '#6b7280' }}>Symbols</div>
          <div className="p-2 cursor-pointer rounded flex justify-between" style={{ backgroundColor: 'transparent' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a2a3a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span>XAUUSD</span><span className="text-xs text-muted" style={{ color: '#6b7280' }}>Gold / US Dollar</span>
          </div>
          <div className="p-2 text-sm text-muted mt-2" style={{ color: '#6b7280' }}>Actions</div>
          <div className="p-2 cursor-pointer rounded flex justify-between" style={{ backgroundColor: 'transparent' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a2a3a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span>Open Settings</span><span className="text-xs text-muted" style={{ color: '#6b7280' }}>⌘ ,</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommandPalette;