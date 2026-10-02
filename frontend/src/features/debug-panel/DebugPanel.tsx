import React from 'react';
import { useAppStore } from '../../stores/appStore';

const DebugPanel: React.FC = () => {
  const { isDebugPanelOpen, toggleDebugPanel } = useAppStore();

  if (!isDebugPanelOpen) return null;

  return (
    <div className="debug-panel absolute bottom-10 right-4 w-[300px] border rounded p-4 shadow-lg z-50 opacity-90 font-mono text-xs" style={{ borderColor: '#2a2a3a', backgroundColor: '#13131a', color: '#fff' }}>
      <div className="font-bold text-sm mb-2 border-b pb-1" style={{ borderColor: '#2a2a3a' }}>TERMINAL-X DEBUG</div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Provider:</span><span className="debug-value text-yellow" style={{ color: '#eab308' }}>MOCK</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>WS Status:</span><span className="debug-value text-green" style={{ color: '#22c55e' }}>CONNECTED</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Latency:</span><span className="debug-value">12ms</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Msg Rate:</span><span className="debug-value">45/s</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Active Syms:</span><span className="debug-value">12</span></div>
      <div className="mt-2 text-center text-muted cursor-pointer" style={{ color: '#6b7280' }} onClick={toggleDebugPanel}>Close (Ctrl+Shift+D)</div>
    </div>
  );
};
export default DebugPanel;