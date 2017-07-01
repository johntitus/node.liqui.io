# node.liqui.io
A unofficial Promise-based Node.js wrapper for the Liqui crypto-currency exchange.

## Install
Install via NPM:

`npm install node.liqui.io`

## Usage
```js
const Liqui = require('node.liqui.io');
let liqui = new Liqui(apiKey, apiSecret);
```

## Public Methods
These methods do not require an API Key and API Secret.
### Info
All the information about currently active pairs, such as the maximum number of digits after the decimal point, the minimum price, the maximum price, the minimum transaction size, whether the pair is hidden, the commission for each pair.
```js
liqui.info().then( result => {
  console.log(result);
});
/*
{
    "server_time":1370814956,
    "pairs":{
        "eth_btc":{
            "decimal_places":3,
            "min_price":0.1,
            "max_price":400,
            "min_amount":0.01,
            "hidden":0,
            "fee":0.2
        }
        ...
    }
} 
*/
```
### Ticker
Information about currently active pairs, such as: the maximum price, the minimum price, average price, trade volume, trade volume in currency, the last trade, Buy and Sell price. All information is provided over the past 24 hours.

Requires you to send in a trading pair, such as 'eth_btc'.
```js
liqui.ticker('eth_btc').then( result => {
  console.log(result)
});
/*
{
    "eth_btc":{
        "high":109.88,
        "low":91.14,
        "avg":100.51,
        "vol":1632898.2249,
        "vol_cur":16541.51969,
        "last":101.773,
        "buy":101.9,
        "sell":101.773,
        "updated":1370816308
    }
    ...
}
*/
```
### Depth
Information about active orders on the pair.

Requires you to send in a trading pair, such as 'eth_btc'.
```js
liqui.depth('eth_btc').then( result => {
  console.log(result)
});
/*
{
    "eth_btc":{
        "asks":[
            [103.426,0.01],
            [103.5,15],
            [103.504,0.425],
            [103.505,0.1],
            ...
        ],
        "bids":[
            [103.2,2.48502251],
            [103.082,0.46540304],
            [102.91,0.99007913],
            [102.83,0.07832332],
            ...
        ]
    }
    ...
}
*/
```
### Trades
Information about the last trades.
Requires you to send in a trading pair, such as 'eth_btc'.
```js
liqui.trades('eth_btc').then( result => {
  console.log(result)
});
/*
{
    "eth_btc":[
        {
            "type":"ask",
            "price":103.6,
            "amount":0.101,
            "tid":4861261,
            "timestamp":1370818007
        },
        {
            "type":"bid",
            "price":103.989,
            "amount":1.51414,
            "tid":4861254,
            "timestamp":1370817960
        },
        ...
    ]
    ...
}
*/
```

## Trade API
These methods require you to provide an API Key and API Secret.

### Get Info
Returns information about the user’s current balance, API-key privileges, the number of open orders and Server Time.

```js
liqui.getInfo().then( result => {
  console.log(result)
});
/*
{
    funds":{
        "eth":325,
        "btc":23.998,
        "ltc":0,
        ...
        },
    "rights":{
        "info":1,
        "trade":0,
        "withdraw":0
        },
    "transaction_count":0,
    "open_orders":1,
    "server_time":1342123547
}
*/
```
### Buy
Used to create buy limit orders on the exchange. Note that orders may not be filled immediately.
```js
let params = {
  pair: 'eth_btc',
  rate: 0.1024, // the exchange rate between eth and btc to use
  amount: 1 // the number of ethereum to buy at this rate
}
liqui.buy(params).then( result => {
  console.log(result);
});
/*
{
  "received":0,
  "remains":0.00759027,
  "order_id":212800014,
  "funds":{
    "eth":0.000749800505,
    "btc":0.0002074586994295
  }
}
*/
```
### Sell
Used to create sell limit orders on the exchange. Note that orders may not be filled immediately.
```js
let params = {
  pair: 'eth_btc',
  rate: 0.1024, // the exchange rate between eth and btc to use
  amount: 1 // the number of ethereum to sell at this rate
}
liqui.sell(params).then( result => {
  console.log(result);
});
/*
{
  "received":0,
  "remains":0.00759027,
  "order_id":212800014,
  "funds":{
    "eth":0.000749800505,
    "btc":0.0002074586994295
  }
}
*/
```
### Active Orders
Get your list of active orders. You may optionally provide a trading pair to filter the results returned.
```js
liqui.activeOrders('eth_btc').then( result => {
  console.log(result);
});
/*
{
  "343152":{
    "pair":"eth_btc",
    "type":"sell",
    "amount":12.345,
    "rate":485,
    "timestamp_created":1342448420,
    "status":0
  }
}
*/
```
### Order Info
Returns the information on particular order.  Requires an Order Id.
```js
liqui.orderInfo(343152).then( result => {
  console.log(result);
});
/*
{
  "343152":{
    "pair":"eth_btc",
    "type":"sell",
    "amount":12.345,
    "rate":485,
    "timestamp_created":1342448420,
    "status":0
  }
}
*/
```
### Cancel Order
Cancels an open order. Require an Order Id.
```js
liqui.cancelOrder(343152).then( result => {
  console.log(result);
});
/*
{
  "order_id":343154,
  "funds":{
    "eth":325,
    "btc":24.998,
    "ltc":0
  }
}
*/
```

### Trade History
Returns your trade history, filtered based on the parameters you pass in.
from - trade ID, from which the display starts
count	- the number of trades for display,
from_id	- trade ID, from which the display starts,
end_id	trade ID on which the display ends,
order	- Sorting	- ASC or DESC
since	- the time to start the display	UTC time
end	- the time to end the display	UTC time
pair	- pair to be displayed	eth_btc (example)

```js
let params = {
  from: '301412',
  count: 50,
  order: 'ASC'
}
liqui.tradeHistory(params).then( result => {
  console.log(result);
});
/*
{
    "166830":{
        "pair":"eth_btc",
        "type":"sell",
        "amount":1,
        "rate":450,
        "order_id":343148,
        "is_your_order":1,
        "timestamp":1342445793
    }
    ...
}
*/
```
## Testing
To run the tests, just do:

`npm test`