export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: number | null = null;
  private url: string;
  private subscriptions: Set<string> = new Set();
  private onMessageCallback: ((data: any) => void) | null = null;

  constructor(url?: string) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    this.url = url || `${protocol}//${host}/ws/market`;
  }

  connect(onMessage?: (data: any) => void) {
    if (onMessage) this.onMessageCallback = onMessage;
    
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[WS] Connected to', this.url);
        // Resubscribe to existing subscriptions
        this.subscriptions.forEach((symbol) => {
          this.send({ action: 'subscribe', symbol });
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (this.onMessageCallback) {
            this.onMessageCallback(payload);
          }
        } catch (err) {
          console.error('[WS] Error parsing message:', err);
        }
      };

      this.ws.onclose = () => {
        console.warn('[WS] Closed. Reconnecting in 3s...');
        this.reconnect();
      };

      this.ws.onerror = (err) => {
        console.warn('[WS] Error:', err);
        this.ws?.close();
      };
    } catch (e) {
      console.warn('[WS] Failed to connect, falling back to simulated ticks:', e);
    }
  }

  private reconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, 3000);
  }

  subscribe(symbol: string) {
    this.subscriptions.add(symbol);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ action: 'subscribe', symbol });
    }
  }

  unsubscribe(symbol: string) {
    this.subscriptions.delete(symbol);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ action: 'unsubscribe', symbol });
    }
  }

  send(data: object) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();