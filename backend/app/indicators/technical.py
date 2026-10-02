import numpy as np

def calculate_sma(data, window):
    return np.convolve(data, np.ones(window), 'valid') / window

def calculate_ema(data, window):
    alpha = 2 / (window + 1.0)
    ema = np.zeros_like(data)
    ema[0] = data[0]
    for i in range(1, len(data)):
        ema[i] = (data[i] * alpha) + (ema[i - 1] * (1 - alpha))
    return ema

def calculate_rsi(data, window=14):
    deltas = np.diff(data)
    seed = deltas[:window+1]
    up = seed[seed >= 0].sum()/window
    down = -seed[seed < 0].sum()/window
    rs = up/down if down > 0 else 0
    rsi = np.zeros_like(data)
    rsi[:window] = 100. - 100./(1. + rs)

    for i in range(window, len(data)):
        delta = deltas[i - 1]
        if delta > 0:
            upval = delta
            downval = 0.
        else:
            upval = 0.
            downval = -delta

        up = (up*(window - 1) + upval)/window
        down = (down*(window - 1) + downval)/window
        rs = up/down if down > 0 else 0
        rsi[i] = 100. - 100./(1. + rs)
    return rsi

def calculate_atr(high, low, close, window=14):
    tr = np.zeros_like(close)
    for i in range(1, len(close)):
        tr[i] = max(high[i] - low[i], abs(high[i] - close[i-1]), abs(low[i] - close[i-1]))
    atr = calculate_sma(tr[1:], window)
    return atr
