import React, { useState, useEffect } from 'react';
import Panel from '../../components/layout/Panel';
import { api } from '../../services/api';
import { CalendarEvent } from '../../types';

const EconomicCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currency, setCurrency] = useState('ALL');
  const [impact, setImpact] = useState('ALL');

  useEffect(() => {
    api.getCalendar().then(data => setEvents(data));
  }, []);

  const filtered = events.filter(e => {
    if (currency !== 'ALL' && e.currency !== currency) return false;
    if (impact !== 'ALL' && e.impact !== impact) return false;
    return true;
  });

  const formatTime = (time: number) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <Panel title="ECONOMIC CALENDAR">
      <div className="flex flex-col w-full h-full">
        {/* Filters */}
        <div className="calendar-filters flex flex-row gap-2 mb-2 p-1">
          <select 
            className="text-xs border p-1 rounded input" 
            style={{ borderColor: '#2a2a3a', backgroundColor: '#181822', color: '#fff', width: 'auto' }}
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            <option value="ALL">All Currencies</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
          <select 
            className="text-xs border p-1 rounded input" 
            style={{ borderColor: '#2a2a3a', backgroundColor: '#181822', color: '#fff', width: 'auto' }}
            value={impact}
            onChange={e => setImpact(e.target.value)}
          >
            <option value="ALL">All Impacts</option>
            <option value="HIGH">High Impact</option>
            <option value="MEDIUM">Medium Impact</option>
            <option value="LOW">Low Impact</option>
          </select>
        </div>

        {/* Events Table */}
        <div className="data-table flex-1 overflow-auto">
          <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-muted border-b" style={{ borderColor: '#2a2a3a', color: 'var(--text-muted)' }}>
              <tr>
                <th className="p-1">Time</th>
                <th className="p-1">Cur</th>
                <th className="p-1">Event</th>
                <th className="p-1 text-right">Act</th>
                <th className="p-1 text-right">Fcst</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor: '#1f1f2e' }}>
                  <td className="p-1 font-mono text-[11px] text-muted">{formatTime(e.time)}</td>
                  <td className="p-1 font-semibold">{e.currency}</td>
                  <td className="p-1">
                    {e.event}{' '}
                    <span 
                      className="badge text-[9px] px-1 py-0.2 rounded font-bold" 
                      style={{ 
                        backgroundColor: e.impact === 'HIGH' ? 'rgba(255,23,68,0.2)' : 'rgba(255,145,0,0.2)',
                        color: e.impact === 'HIGH' ? 'var(--accent-red)' : 'var(--accent-orange)' 
                      }}
                    >
                      {e.impact}
                    </span>
                  </td>
                  <td className="p-1 text-right font-mono font-bold" style={{ color: 'var(--accent-green)' }}>
                    {e.actual || '—'}
                  </td>
                  <td className="p-1 text-right font-mono text-muted">
                    {e.forecast || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};

export default EconomicCalendar;