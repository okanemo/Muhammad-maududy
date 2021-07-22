// let ws = new WebSocket('wss://stream.binance.com:9443/ws/usdtbidr@trade');
let tradeSocket = () => {
    let stream = [
        'usdcusdt@trade/',
        'busdusdt@trade/',
        'usdtbidr@trade/',
        'ethusdt@trade/',
        'btcusdt@trade',
    ];
    return (stream.join(""));
};
let tickerSocket = () => {
    let stream = [
        'usdcusdt@ticker/',
        'busdusdt@ticker/',
        'usdtbidr@ticker/',
        'ethusdt@ticker/',
        'btcusdt@ticker',
    ];
    return (stream.join(""));
};

let klineSocket = () => {
    let stream = [
        'usdcusdt@kline_15m/',
        'busdusdt@kline_15m/',
        'usdtbidr@kline_15m/',
        'ethusdt@kline_15m/',
        'btcusdt@kline_15m',
    ];
    return (stream.join(""));
};
let vtradeSocket = tradeSocket();
let vtickerSocket = tickerSocket();
let vklineSocket = klineSocket();
// WEB SOCKET
let wsTrade = new WebSocket('wss://stream.binance.com:9443/stream?streams='.concat(vtradeSocket));
let wsTicker = new WebSocket('wss://stream.binance.com:9443/stream?streams='.concat(vtickerSocket));
let wsKline = new WebSocket('wss://stream.binance.com:9443/stream?streams='.concat(vklineSocket));
// -------

// ID ELEMENT
//--- Trade/Price only
let UsdcUsdt = document.getElementById('stock-price-UsdcUsdt');
let BusdUsdt = document.getElementById('stock-price-BusdUsdt');
let UsdtBidr = document.getElementById('stock-price-UsdtBidr');
let EthUsdt = document.getElementById('stock-price-EthUsdt');
let BtcUsdt = document.getElementById('stock-price-BtcUsdt');

//--- Ticker
let tickerCpUsdcUsdt = document.getElementById('stock-changes-p-UsdcUsdt');
let tickerCPUsdcUsdt = document.getElementById('stock-changes-P-UsdcUsdt');
let tickerChUsdcUsdt = document.getElementById('stock-changes-h-UsdcUsdt');
let tickerClUsdcUsdt = document.getElementById('stock-changes-l-UsdcUsdt');
let tickerCvUsdcUsdt = document.getElementById('stock-changes-v-UsdcUsdt');
let tickerCqUsdcUsdt = document.getElementById('stock-changes-q-UsdcUsdt');
//
let tickerCpBusdUsdt = document.getElementById('stock-changes-p-BusdUsdt');
let tickerCPBusdUsdt = document.getElementById('stock-changes-P-BusdUsdt');
let tickerChBusdUsdt = document.getElementById('stock-changes-h-BusdUsdt');
let tickerClBusdUsdt = document.getElementById('stock-changes-l-BusdUsdt');
let tickerCvBusdUsdt = document.getElementById('stock-changes-v-BusdUsdt');
let tickerCqBusdUsdt = document.getElementById('stock-changes-q-BusdUsdt');
//
let tickerCpUsdtBidr = document.getElementById('stock-changes-p-UsdtBidr');
let tickerCPUsdtBidr = document.getElementById('stock-changes-P-UsdtBidr');
let tickerChUsdtBidr = document.getElementById('stock-changes-h-UsdtBidr');
let tickerClUsdtBidr = document.getElementById('stock-changes-l-UsdtBidr');
let tickerCvUsdtBidr = document.getElementById('stock-changes-v-UsdtBidr');
let tickerCqUsdtBidr = document.getElementById('stock-changes-q-UsdtBidr');
//
let tickerCpEthUsdt = document.getElementById('stock-changes-p-EthUsdt');
let tickerCPEthUsdt = document.getElementById('stock-changes-P-EthUsdt');
let tickerChEthUsdt = document.getElementById('stock-changes-h-EthUsdt');
let tickerClEthUsdt = document.getElementById('stock-changes-l-EthUsdt');
let tickerCvEthUsdt = document.getElementById('stock-changes-v-EthUsdt');
let tickerCqEthUsdt = document.getElementById('stock-changes-q-EthUsdt');
//
let tickerCpBtcUsdt = document.getElementById('stock-changes-p-BtcUsdt');
let tickerCPBtcUsdt = document.getElementById('stock-changes-P-BtcUsdt');
let tickerChBtcUsdt = document.getElementById('stock-changes-h-BtcUsdt');
let tickerClBtcUsdt = document.getElementById('stock-changes-l-BtcUsdt');
let tickerCvBtcUsdt = document.getElementById('stock-changes-v-BtcUsdt');
let tickerCqBtcUsdt = document.getElementById('stock-changes-q-BtcUsdt');



// --------
let lastPrice = null;
let minimumPrice = 0

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

wsKline.onmessage = (event) => {
    let message = JSON.parse(event.data);
    // console.log(message.k);

    let candlestick = message.data.k;
    if (message.data.s == "BTCUSDT") {
        // console.log(message.data.k.o);
        candleSeries.update({
            close: candlestick.c,
            high: candlestick.h,
            low: candlestick.l,
            open: candlestick.o,
            time: candlestick.t / 1000,
            // time: Date.now(),
        });
    }



}

wsTicker.onmessage = (event) => {
    let tickerData = JSON.parse(event.data);
    let ticker_p = parseFloat(tickerData.data.p).toFixed(4);
    let ticker_P = parseFloat(tickerData.data.P).toFixed(2).concat("%");
    let ticker_h = parseFloat(tickerData.data.h).toFixed(4);
    let ticker_l = parseFloat(tickerData.data.l).toFixed(4);
    let ticker_v = formatter.format(tickerData.data.v);
    let ticker_q = formatter.format(tickerData.data.q);

    // console.log(tickerData);
    // candleSeries.update()

    if (tickerData.data.s == "USDCUSDT") {
        tickerCpUsdcUsdt.innerText = ticker_p;
        tickerCpUsdcUsdt.style.color = !lastPrice || lastPrice === tickerCpUsdcUsdt ? 'black' : tickerCpUsdcUsdt > lastPrice ? 'green' : 'red';
        //
        tickerCPUsdcUsdt.innerText = ticker_P;
        tickerCPUsdcUsdt.style.color = !lastPrice || lastPrice === tickerCPUsdcUsdt ? 'black' : tickerCPUsdcUsdt > lastPrice ? 'green' : 'red';
        //
        tickerChUsdcUsdt.innerText = ticker_h;
        //
        tickerClUsdcUsdt.innerText = ticker_l;
        //
        tickerCvUsdcUsdt.innerText = ticker_v;
        //
        tickerCqUsdcUsdt.innerText = ticker_q;



    }
    if (tickerData.data.s == "BUSDUSDT") {
        tickerCpBusdUsdt.innerText = ticker_p;
        tickerCpBusdUsdt.style.color = !lastPrice || lastPrice === tickerCpBusdUsdt ? 'black' : tickerCpBusdUsdt > lastPrice ? 'green' : 'red';
        //
        tickerCPBusdUsdt.innerText = ticker_P;
        tickerCPBusdUsdt.style.color = !lastPrice || lastPrice === tickerCPBusdUsdt ? 'black' : tickerCPBusdUsdt > lastPrice ? 'green' : 'red';
        //
        tickerChBusdUsdt.innerText = ticker_h;
        //
        tickerClBusdUsdt.innerText = ticker_l;
        //
        tickerCvBusdUsdt.innerText = ticker_v;
        //
        tickerCqBusdUsdt.innerText = ticker_q;
    }
    if (tickerData.data.s == "USDTBIDR") {
        tickerCpUsdtBidr.innerText = ticker_p;
        tickerCpUsdtBidr.style.color = !lastPrice || lastPrice === tickerCpUsdtBidr ? 'black' : tickerCpUsdtBidr > lastPrice ? 'green' : 'red';
        //
        tickerCPUsdtBidr.innerText = ticker_P;
        tickerCPUsdtBidr.style.color = !lastPrice || lastPrice === tickerCPUsdtBidr ? 'black' : tickerCPUsdtBidr > lastPrice ? 'green' : 'red';
        //
        tickerChUsdtBidr.innerText = ticker_h;
        //
        tickerClUsdtBidr.innerText = ticker_l;
        //
        tickerCvUsdtBidr.innerText = ticker_v;
        //
        tickerCqUsdtBidr.innerText = ticker_q;
    }
    if (tickerData.data.s == "ETHUSDT") {
        tickerCpEthUsdt.innerText = ticker_p;
        tickerCpEthUsdt.style.color = !lastPrice || lastPrice === tickerCpEthUsdt ? 'black' : tickerCpEthUsdt > lastPrice ? 'green' : 'red';
        //
        tickerCPEthUsdt.innerText = ticker_P;
        tickerCPEthUsdt.style.color = !lastPrice || lastPrice === tickerCPEthUsdt ? 'black' : tickerCPEthUsdt > lastPrice ? 'green' : 'red';
        //
        tickerChEthUsdt.innerText = ticker_h;
        //
        tickerClEthUsdt.innerText = ticker_l;
        //
        tickerCvEthUsdt.innerText = ticker_v;
        //
        tickerCqEthUsdt.innerText = ticker_q;
    }
    if (tickerData.data.s == "BTCUSDT") {
        tickerCpBtcUsdt.innerText = ticker_p;
        tickerCpBtcUsdt.style.color = !lastPrice || lastPrice === tickerCpBtcUsdt ? 'black' : tickerCpBtcUsdt > lastPrice ? 'green' : 'red';
        //
        tickerCPBtcUsdt.innerText = ticker_P;
        tickerCPBtcUsdt.style.color = !lastPrice || lastPrice === tickerCPBtcUsdt ? 'black' : tickerCPBtcUsdt > lastPrice ? 'green' : 'red';
        //
        tickerChBtcUsdt.innerText = ticker_h;
        //
        tickerClBtcUsdt.innerText = ticker_l;
        //
        tickerCvBtcUsdt.innerText = ticker_v;
        //
        tickerCqBtcUsdt.innerText = ticker_q;

    }
}

wsTrade.onmessage = (event) => {
    let tradeObject = JSON.parse(event.data);
    // console.log(tradeObject.data);
    if (tradeObject.data.s == "USDCUSDT") {
        let tradeData = parseFloat(tradeObject.data.p).toFixed(4);
        UsdcUsdt.innerText = tradeData;

        UsdcUsdt.style.color = !lastPrice || lastPrice === tradeData ? 'black' : tradeData > lastPrice ? 'green' : 'red';
        lastPrice = tradeData;
    }
    if (tradeObject.data.s == "BUSDUSDT") {
        let tradeData = parseFloat(tradeObject.data.p);
        BusdUsdt.innerText = tradeData;

        BusdUsdt.style.color = !lastPrice || lastPrice === tradeData ? 'black' : tradeData > lastPrice ? 'green' : 'red';
        lastPrice = tradeData;
    }
    if (tradeObject.data.s == "USDTBIDR") {
        let tradeData = parseFloat(tradeObject.data.p);
        UsdtBidr.innerText = tradeData;

        UsdtBidr.style.color = !lastPrice || lastPrice === tradeData ? 'black' : tradeData > lastPrice ? 'green' : 'red';
        lastPrice = tradeData;
    }
    if (tradeObject.data.s == "ETHUSDT") {
        let tradeData = parseFloat(tradeObject.data.p);
        EthUsdt.innerText = tradeData;

        EthUsdt.style.color = !lastPrice || lastPrice === tradeData ? 'black' : tradeData > lastPrice ? 'green' : 'red';
        lastPrice = tradeData;
    }
    if (tradeObject.data.s == "BTCUSDT") {
        let tradeData = parseFloat(tradeObject.data.p);
        BtcUsdt.innerText = tradeData;

        BtcUsdt.style.color = !lastPrice || lastPrice === tradeData ? 'black' : tradeData > lastPrice ? 'green' : 'red';
        lastPrice = tradeData;
    }

};
//chart-UsdcUsdt chart-BusdUsdt chart-UsdtBidr chart-ethusdt chart-BtcUsdt
var chart = LightweightCharts.createChart(document.getElementById("chart"), {
    width: 1000,
    height: 300,
    layout: {
        backgroundColor: '#000000',
        textColor: 'rgba(255, 255, 255, 0.9)',
    },
    grid: {
        vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
});

var candleSeries = chart.addCandlestickSeries({
    upColor: 'rgba(255, 144, 0, 1)',
    downColor: '#000',
    borderDownColor: 'rgba(255, 144, 0, 1)',
    borderUpColor: 'rgba(255, 144, 0, 1)',
    wickDownColor: 'rgba(255, 144, 0, 1)',
    wickUpColor: 'rgba(255, 144, 0, 1)',
});
// alert(window.location.href);
// if (window.location.href === "http://127.0.0.1:5000/") {
//     fetch('http://127.0.0.1:5000/render_usdcusdt')
//         .then((r) => r.json())
//         .then((response) => {
//             candleSeries.setData(response);
//         });
// }
// if (window.location.href === "http://127.0.0.1:5000/chart-busdusdt") {
//     fetch('http://127.0.0.1:5000/render_busdusdt')
//         .then((r) => r.json())
//         .then((response) => {
//             candleSeries.setData(response);
//         });

// }
// if (window.location.href === "http://127.0.0.1:5000/chart-usdtbidr") {
//     fetch('http://127.0.0.1:5000/render_usdtbidr')
//         .then((r) => r.json())
//         .then((response) => {
//             candleSeries.setData(response);
//         });

// }
// if (window.location.href === "http://127.0.0.1:5000/chart-ethusdt") {
//     fetch('http://127.0.0.1:5000/render_ethusdt')
//         .then((r) => r.json())
//         .then((response) => {
//             candleSeries.setData(response);
//         });

// }
// if (window.location.href === "http://127.0.0.1:5000/chart-btcusdt") {
//     fetch('http://127.0.0.1:5000/render_btcusdt')
//         .then((r) => r.json())
//         .then((response) => {
//             candleSeries.setData(response);
//         });

// }

switch (window.location.href) {
    case "http://127.0.0.1:5000/":
        fetch('http://127.0.0.1:5000/render_usdcusdt')
            .then((r) => r.json())
            .then((response) => {
                candleSeries.setData(response);
            });
        break;
    case "http://127.0.0.1:5000/chart-busdusdt":
        fetch('http://127.0.0.1:5000/render_busdusdt')
            .then((r) => r.json())
            .then((response) => {
                candleSeries.setData(response);
            });
        break;
    case "http://127.0.0.1:5000/chart-usdtbidr":
        fetch('http://127.0.0.1:5000/render_usdtbidr')
            .then((r) => r.json())
            .then((response) => {
                candleSeries.setData(response);
            });
        break;
    case "http://127.0.0.1:5000/chart-ethusdt":
        fetch('http://127.0.0.1:5000/render_ethusdt')
            .then((r) => r.json())
            .then((response) => {
                candleSeries.setData(response);
            });
        break;
    case "http://127.0.0.1:5000/chart-btcusdt":
        fetch('http://127.0.0.1:5000/render_btcusdt')
            .then((r) => r.json())
            .then((response) => {
                candleSeries.setData(response);
            });
        break;
}