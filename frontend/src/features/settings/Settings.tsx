import React from 'react';
import { useAppStore } from '../../stores/appStore';

const Settings: React.FC = () => {
  const { isSettingsOpen, toggleSettings } = useAppStore();

  if (!isSettingsOpen) return null;
  return (
    <div className="overlay absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={toggleSettings}>
      <div className="modal w-[400px] border rounded shadow-lg flex flex-col p-4" style={{ borderColor: '#2a2a3a', backgroundColor: '#13131a' }} onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <div className="settings-group flex flex-col gap-2">
          <div className="settings-row flex justify-between items-center">
            <span>Theme</span>
            <select className="border p-1 rounded" style={{ borderColor: '#2a2a3a', backgroundColor: '#181822', color: '#fff' }}><option>Dark</option></select>
          </div>
          <div className="settings-row flex justify-between items-center">
            <span>Mock Mode</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
        <button className="btn mt-4 p-2 rounded" style={{ backgroundColor: '#3b82f6', color: '#fff' }} onClick={toggleSettings}>Close</button>
      </div>
    </div>
  );
};
export default Settings;