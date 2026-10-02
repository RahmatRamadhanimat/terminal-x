import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';

export const useKeyboardShortcuts = () => {
  const toggleCommandPalette = useAppStore((s) => s.toggleCommandPalette);
  const toggleDebugPanel = useAppStore((s) => s.toggleDebugPanel);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); toggleCommandPalette(); }
      if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); toggleDebugPanel(); }
      if (e.key === 'Escape') { /* handled by individual modals */ }
      if (e.ctrlKey && e.key === 'b') { e.preventDefault(); console.log('Toggle Sidebar'); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [toggleCommandPalette, toggleDebugPanel]);
};