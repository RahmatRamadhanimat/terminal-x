import React, { useState } from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const Panel: React.FC<PanelProps> = ({ title, children, defaultCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="panel flex flex-col w-full h-full border" style={{ borderColor: '#1f1f2e', backgroundColor: '#181822', borderRadius: '4px' }}>
      <div className="panel-header flex flex-row items-center justify-between p-2 border-b select-none cursor-pointer" style={{ borderColor: '#1f1f2e', backgroundColor: '#1e1e2d' }} onClick={() => setCollapsed(!collapsed)}>
        <span className="font-bold text-sm uppercase tracking-wide text-secondary" style={{ color: '#9ca3af' }}>{title}</span>
        <div className="panel-header-controls flex flex-row gap-2">
          <button className="text-muted hover:text-primary" style={{ color: '#6b7280' }}>{collapsed ? '+' : '-'}</button>
          <button className="text-muted hover:text-primary" style={{ color: '#6b7280' }}>□</button>
        </div>
      </div>
      {!collapsed && (
        <div className="panel-content flex-1 overflow-auto p-2">
          {children}
        </div>
      )}
    </div>
  );
};
export default Panel;