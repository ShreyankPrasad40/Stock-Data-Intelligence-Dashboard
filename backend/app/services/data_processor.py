import pandas as pd

def process_raw_data(df: pd.DataFrame) -> pd.DataFrame:
    numeric_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    df.ffill(inplace=True)
    df.dropna(inplace=True)
    
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'])
        df.set_index('Date', inplace=True)
    elif not isinstance(df.index, pd.DatetimeIndex):
         df.index = pd.to_datetime(df.index)

    df['Daily_Return'] = (df['Close'] - df['Open']) / df['Open']
    
    df['MA_7'] = df['Close'].rolling(window=7).mean()
    
    df['Volatility'] = df['Daily_Return'].rolling(window=7).std()

    return df
