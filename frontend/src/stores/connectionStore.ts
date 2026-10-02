import { create } from 'zustand';
import { ConnectionStatus } from '../types';

type ConnectionState = {
  status: ConnectionStatus;
  latency: number;
  provider: string;
  isMock: boolean;
  setStatus: (status: ConnectionStatus) => void;
  setLatency: (latency: number) => void;
  setProvider: (provider: string) => void;
  setIsMock: (isMock: boolean) => void;
};

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'CONNECTED',
  latency: 12,
  provider: 'MOCK_ENGINE',
  isMock: true,
  setStatus: (status) => set({ status }),
  setLatency: (latency) => set({ latency }),
  setProvider: (provider) => set({ provider }),
  setIsMock: (isMock) => set({ isMock }),
}));