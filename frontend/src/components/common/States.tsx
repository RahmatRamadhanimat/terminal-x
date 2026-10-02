import React from 'react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="state-container flex w-full h-full items-center justify-center text-muted font-mono animate-pulse" style={{ color: '#6b7280' }}>
    {message}
  </div>
);

export const ErrorState: React.FC<{ error: string }> = ({ error }) => (
  <div className="state-container flex w-full h-full items-center justify-center text-red font-mono" style={{ color: '#ef4444' }}>
    Error: {error}
  </div>
);

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No data available' }) => (
  <div className="state-container flex w-full h-full items-center justify-center text-muted font-mono" style={{ color: '#6b7280' }}>
    {message}
  </div>
);