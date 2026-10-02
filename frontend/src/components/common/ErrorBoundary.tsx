import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[TERMINAL-X ErrorBoundary caught]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#0a0a0f',
          color: '#e0e0e8',
          fontFamily: 'monospace',
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '650px',
            width: '100%',
            backgroundColor: '#16161e',
            border: '1px solid #ff1744',
            borderRadius: '6px',
            padding: '20px',
            boxShadow: '0 8px 32px rgba(255, 23, 68, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#ff1744', fontWeight: 'bold', fontSize: '15px' }}>
              <span>⚠ TERMINAL-X CRITICAL ERROR</span>
            </div>
            <div style={{ fontSize: '12px', color: '#8888a0', marginBottom: '16px' }}>
              An unexpected error occurred in the terminal view.
            </div>
            <div style={{
              backgroundColor: '#0a0a0f',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #2a2a3a',
              color: '#ff5252',
              fontSize: '11px',
              overflowX: 'auto',
              marginBottom: '16px'
            }}>
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#2979ff',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              🔄 Reload Terminal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
