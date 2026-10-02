import { BrowserRouter } from 'react-router-dom';
import TerminalLayout from './components/layout/TerminalLayout';
import CommandPalette from './features/command-palette/CommandPalette';
import DebugPanel from './features/debug-panel/DebugPanel';
import Settings from './features/settings/Settings';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  useKeyboardShortcuts();
  useWebSocket();

  return (
    <BrowserRouter>
      <div className="app-container">
        <TerminalLayout />
        <CommandPalette />
        <DebugPanel />
        <Settings />
      </div>
    </BrowserRouter>
  );
}

export default App;
