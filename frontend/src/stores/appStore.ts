import { create } from 'zustand';

type AppState = {
  theme: 'dark' | 'light';
  isCommandPaletteOpen: boolean;
  isDebugPanelOpen: boolean;
  isSettingsOpen: boolean;
  toggleCommandPalette: () => void;
  toggleDebugPanel: () => void;
  toggleSettings: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  isCommandPaletteOpen: false,
  isDebugPanelOpen: false,
  isSettingsOpen: false,
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  toggleDebugPanel: () => set((state) => ({ isDebugPanelOpen: !state.isDebugPanelOpen })),
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen }))
}));
