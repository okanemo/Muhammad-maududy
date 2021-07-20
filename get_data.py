import config
from binance import Client

client = Client(config.API_KEY, config.API_SECRET)

prices = client.get_all_tickers()

print (prices)