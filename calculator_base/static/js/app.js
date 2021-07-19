// let ws = new WebSocket('wss://stream.binance.com:9443/ws/usdtbidr@trade');
let socket = () => {
    let stream = [
        'usdcusdt@trade/',
        'busdusdt@trade/',
        'usdtbidr@trade/',
        'ethusdt@trade/',
        'btcusdt@trade',
    ];
    return (stream.join(""));
};
streamname = socket();
let ws = new WebSocket('wss://stream.binance.com:9443/stream?streams='.concat(streamname));
let UsdtUsdc = document.getElementById('stock-price-UsdtUsdc');
let BusdUsdt = document.getElementById('stock-price-BusdUsdt');
let UsdtBidr = document.getElementById('stock-price-UsdtBidr');
let EthUsdt = document.getElementById('stock-price-EthUsdt');
let BtcUsdt = document.getElementById('stock-price-BtcUsdt');
let lastPrice = null;

ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    console.log(stockObject.data);
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
    if (stockObject.data.s == "USDCUSDT") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p).toFixed(4);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        UsdtUsdc.innerText = "USDC/USDT ".concat(formatter.format(price));

        UsdtUsdc.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
        lastPrice = price;
    }
    if (stockObject.data.s == "BUSDUSDT") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        BusdUsdt.innerText = "BUSD/USDT ".concat(price);

        BusdUsdt.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
        lastPrice = price;
    }
    if (stockObject.data.s == "USDTBIDR") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        UsdtBidr.innerText = "USDT/BIDR ".concat(price);

        UsdtBidr.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
        lastPrice = price;
    }
    if (stockObject.data.s == "ETHUSDT") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        EthUsdt.innerText = "ETH/USDT ".concat(price);

        EthUsdt.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
        lastPrice = price;
    }
    if (stockObject.data.s == "BTCUSDT") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        BtcUsdt.innerText = "BTC/USDT ".concat(price);

        BtcUsdt.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
        lastPrice = price;
    }

};
// ws.onmessage = (event) => {
//     let stockObject = JSON.parse(event.data);
//     console.log(stockObject);
//     let price = parseFloat(stockObject.p).toFixed(2);
//     stockPriceElement.innerText = price;

//     stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
//     lastPrice = price;
// };