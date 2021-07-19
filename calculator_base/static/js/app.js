// let ws = new WebSocket('wss://stream.binance.com:9443/ws/usdtbidr@trade');
let socket = () => {
    let stream = [
        'usdcusdt@trade/',
        'busdusdt@trade/',
        'usdtbidr@trade'
    ];
    return (stream.join(""));
};
streamname = socket();
let ws = new WebSocket('wss://stream.binance.com:9443/stream?streams='.concat(streamname));
let UsdtUsdc = document.getElementById('stock-price-UsdtUsdc');
let BusdUsdt = document.getElementById('stock-price-BusdUsdt');
let lastPrice = null;

ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    console.log(stockObject.data);
    if (stockObject.data.s == "USDCUSDT") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p).toFixed(4);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        UsdtUsdc.innerText = "USDC/USDT ".concat(price);

        UsdtUsdc.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
        lastPrice = price;
    }
    if (stockObject.data.s == "BUSDUSDT") {
        // alert("USDTUSDT");
        let price = parseFloat(stockObject.data.p).toFixed(4);
        // let price = stockObject.data.s.concat(parseFloat(stockObject.data.p).toFixed(2));
        BusdUsdt.innerText = "BUSD/USDT ".concat(price);

        BusdUsdt.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
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