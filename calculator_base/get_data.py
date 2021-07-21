from binance.client import Client
import config, csv

# client = Client(config.API_KEY, config.API_SECRET)
client = Client(config.API_KEY, config.API_SECRET)
csvfile = open('2012-2020.csv', 'w', newline='')
candlestick_writer = csv.writer(csvfile, delimiter=',')
# candles = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)

candles = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_30MINUTE, "1 Jan, 2020", "2 jan, 2020")
for candlestick in candles:
    print(candlestick)
    
    candlestick_writer.writerow(candlestick)

csvfile.close()
# print(len(candles))
    