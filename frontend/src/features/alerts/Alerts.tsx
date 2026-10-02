import { useState, useCallback } from 'react';
import { useMarketStore } from '../../stores/marketStore';
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface AlertItem {
  id: string;
  symbol: string;
  condition: 'ABOVE' | 'BELOW' | 'CROSSES';
  price: number;
  active: boolean;
  createdAt: number;
}

const Alerts = () => {
  const { selectedSymbol } = useMarketStore();
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: '1', symbol: 'XAUUSD', condition: 'ABOVE', price: 2660, active: true, createdAt: Date.now() - 3600000 },
    { id: '2', symbol: 'EURUSD', condition: 'BELOW', price: 1.1700, active: true, createdAt: Date.now() - 7200000 },
    { id: '3', symbol: 'BTCUSD', condition: 'ABOVE', price: 70000, active: false, createdAt: Date.now() - 86400000 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newSymbol, setNewSymbol] = useState(selectedSymbol);
  const [newCondition, setNewCondition] = useState<'ABOVE' | 'BELOW' | 'CROSSES'>('ABOVE');
  const [newPrice, setNewPrice] = useState('');

  const handleCreate = useCallback(() => {
    if (!newPrice) return;
    const alert: AlertItem = {
      id: String(Date.now()),
      symbol: newSymbol,
      condition: newCondition,
      price: parseFloat(newPrice),
      active: true,
      createdAt: Date.now(),
    };
    setAlerts(prev => [alert, ...prev]);
    setShowForm(false);
    setNewPrice('');
  }, [newSymbol, newCondition, newPrice]);

  const toggleAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  }, []);

  const deleteAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const conditionSymbol = (c: string) => {
    switch (c) {
      case 'ABOVE': return '>';
      case 'BELOW': return '<';
      case 'CROSSES': return '↔';
      default: return '=';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="text-xs text-muted uppercase">Price Alerts</span>
        <button className="btn btn-sm" onClick={() => setShowForm(!showForm)}>
          <Plus size={12} /> New
        </button>
      </div>

      {showForm && (
        <div style={{ padding: '8px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '6px' }}>
            <div>
              <label className="text-xs text-muted" style={{ display: 'block', marginBottom: '2px' }}>Symbol</label>
              <input className="input" value={newSymbol} onChange={e => setNewSymbol(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted" style={{ display: 'block', marginBottom: '2px' }}>Condition</label>
              <select className="input" value={newCondition} onChange={e => setNewCondition(e.target.value as 'ABOVE' | 'BELOW' | 'CROSSES')}>
                <option value="ABOVE">Above</option>
                <option value="BELOW">Below</option>
                <option value="CROSSES">Crosses</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '6px' }}>
            <label className="text-xs text-muted" style={{ display: 'block', marginBottom: '2px' }}>Price</label>
            <input className="input" type="number" step="any" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="Enter price..." />
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button className="btn btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-sm" style={{ background: 'var(--accent-blue)', color: '#fff' }} onClick={handleCreate}>Create Alert</button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: 'auto' }}>
        {alerts.length === 0 ? (
          <div className="state-container">
            <Bell size={20} />
            <div className="state-message">No alerts configured</div>
          </div>
        ) : (
          alerts.map(a => (
            <div key={a.id} className="alert-item" style={{ opacity: a.active ? 1 : 0.5 }}>
              <div>
                <div className="alert-condition">
                  {a.symbol} {conditionSymbol(a.condition)} {a.price}
                </div>
                <div className="text-xs text-muted" style={{ marginTop: '2px' }}>
                  {a.condition} · {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: a.active ? 'var(--accent-green)' : 'var(--text-muted)', padding: 0 }}
                  onClick={() => toggleAlert(a.id)}
                  aria-label={a.active ? 'Disable alert' : 'Enable alert'}
                >
                  {a.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                </button>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)', padding: 0 }}
                  onClick={() => deleteAlert(a.id)}
                  aria-label="Delete alert"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;