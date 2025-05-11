import yfinance as yf

taiex_ticker = yf.Ticker("^TWII")
tpex_ticker_v1 = yf.Ticker("^TWOII") # 嘗試 ^TWOII
tpex_ticker_v2 = yf.Ticker("^TWO")   # 嘗試 ^TWO

print("TAIEX (^TWII) data for last 2 days:")
print(taiex_ticker.history(period="2d"))

print("\nTPEx (^TWOII) data for last 2 days:")
print(tpex_ticker_v1.history(period="2d"))
        
print("\nTPEx (^TWO) data for last 2 days:")
print(tpex_ticker_v2.history(period="2d"))