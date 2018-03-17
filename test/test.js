'use strict';

const should = require('should');
const nock = require('nock');

const Liqui = require('..');

const BASE_URL = 'https://api.liqui.io';
const PUBLIC_URL = '/api/3/';
const TRADES_URL = '/tapi';

const mockResponses = {
	info: require('./mocks/info.mock'),
	tickerEthBtc: require('./mocks/ticker.eth_btc.mock'),
	depthEthBtc: require('./mocks/depth.eth_btc.mock'),
	tradesEthBtc: require('./mocks/trades.eth_btc.mock'),
	getInfo: require('./mocks/getInfo.mock'),
	buyEthBtc: require('./mocks/buy.eth_btc.mock'),
	sellEthBtc: require('./mocks/sell.eth_btc.mock'),
	activeOrders: require('./mocks/activeOrders.mock'),
	orderInfo: require('./mocks/orderInfo.mock'),
	cancelOrder: require('./mocks/cancelOrder.mock'),
	tradeHistory: require('./mocks/tradeHistory.mock')
};

const FAUX_API_KEY = "imnotarealkey";
const FAUX_API_SECRET = "imnotarealsecret";
const JS_DATETIME_STRING_VALUE = '2018-01-01';
const JS_DATETIME_VALUE = new Date(JS_DATETIME_STRING_VALUE);
const LIQUI_TIMESTAMP_VALUE = (JS_DATETIME_VALUE.valueOf() / 1000).toString();

describe('Liqui', function() {

	it('should be constructable', function() {
		let liqui = new Liqui();
		liqui.should.be.ok();
	});

	describe('Public API', function() {

		describe('Get Info', function() {
			it('should get info', function(done) {
				nock(BASE_URL)
					.get(PUBLIC_URL + 'info')
					.reply(200, mockResponses.info);

				let liqui = new Liqui();
				liqui
					.info()
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Get Ticker', function() {
			it('should get ticker for eth_btc', function(done) {

				nock(BASE_URL)
					.get(PUBLIC_URL + 'ticker/eth_btc')
					.reply(200, mockResponses.tickerEthBtc);

				let liqui = new Liqui();
				liqui
					.ticker('eth_btc')
					.then(data => {
						data.should.be.json;
						done();
					});
			});

			it('should reject ticker call without pair', function(done) {

				let liqui = new Liqui();
				liqui
					.ticker()
					.catch(e => {
						e.should.exist;
						done()
					});
			});
		});

		describe('Get Depth', function() {
			it('should get depth for eth_btc', function(done) {

				nock(BASE_URL)
					.get(PUBLIC_URL + 'depth/eth_btc')
					.reply(200, mockResponses.tickerEthBtc);

				let liqui = new Liqui();
				liqui
					.depth('eth_btc')
					.then(data => {
						data.should.be.json;
						done();
					});
			});

			it('should reject depth call without pair', function(done) {

				let liqui = new Liqui();
				liqui
					.depth()
					.catch(e => {
						e.should.exist;
						done()
					});
			});
		});

		describe('Get Trades', function() {
			it('should get trades for eth_btc', function(done) {

				nock(BASE_URL)
					.get(PUBLIC_URL + 'trades/eth_btc')
					.reply(200, mockResponses.tickerEthBtc);

				let liqui = new Liqui();
				liqui
					.trades('eth_btc')
					.then(data => {
						data.should.be.json;
						done();
					});
			});

			it('should reject trades call without pair', function(done) {

				let liqui = new Liqui();
				liqui
					.trades()
					.catch(e => {
						e.should.exist;
						done()
					});
			});
		});
	});

	describe('Trades API', function() {
		describe('Get User Info', function() {
			it('should get info', function(done) {

				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.buyEthBtc);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);

				liqui
					.getInfo()
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Enforce Key & Secret', function() {
			it('should reject if no key and secret provided', function(done) {

				let liqui = new Liqui();
				liqui
					.getInfo()
					.catch(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Buy', function() {
			it('should buy eth for btc', function(done) {
				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.buyEthBtc);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
				liqui
					.buy('eth_btc', 0.10942178, 0.00759027)
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Sell', function() {
			it('should sell eth for btc', function(done) {
				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.sellEthBtc);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
				liqui
					.sell('eth_btc', 0.10942178, 0.00759027)
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Active Orders', function() {
			it('should get a list of active orders', function(done) {
				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.activeOrders);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
				liqui
					.activeOrders()
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Order Info', function() {
			it('should get details about active orders', function(done) {
				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.orderInfo);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
				liqui
					.orderInfo('1024')
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Cancel Order', function() {
			it('should cancel the order', function(done) {
				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.cancelOrder);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
				liqui
					.cancelOrder(1024)
					.then(data => {
						data.should.be.json;
						done();
					});
			});
		});

		describe('Trade History', function() {

			it('should return trade history', function(done) {
				nock(BASE_URL)
					.post(TRADES_URL)
					.reply(200, mockResponses.tradeHistory);

				let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
				liqui
					.tradeHistory()
					.then(data => {
						data.should.be.json;
						done();
					});
			});

      it('should adjust "since" param string DateTime value to Liqui timestamp', function(done) {
        nock(BASE_URL)
          .post(TRADES_URL, body => {
          	return body.since === LIQUI_TIMESTAMP_VALUE;
					})
          .reply(200, mockResponses.tradeHistory);

        let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
        liqui
          .tradeHistory({since: JS_DATETIME_STRING_VALUE})
          .then(data => {
            data.should.be.json;
            done();
          });
      });

      it('should adjust "since" param Date value to Liqui timestamp', function(done) {
        nock(BASE_URL)
          .post(TRADES_URL, body => {
            return body.since === LIQUI_TIMESTAMP_VALUE;
          })
          .reply(200, mockResponses.tradeHistory);

        let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
        liqui
          .tradeHistory({ since: JS_DATETIME_VALUE})
          .then(data => {
            data.should.be.json;
            done();
          });
      });
    });

    it('should adjust "since" param numeric Date (ms) value to Liqui timestamp', function(done) {
      nock(BASE_URL)
        .post(TRADES_URL,body => {
          return body.since === LIQUI_TIMESTAMP_VALUE;
        })
        .reply(200, mockResponses.tradeHistory);

      let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
      liqui
        .tradeHistory({ since: JS_DATETIME_VALUE.valueOf()})
        .then(data => {
          data.should.be.json;
          done();
        });
    });
    it('should not alter "since" param values in Liqui timestamp (secs) range', function(done) {
      nock(BASE_URL)
        .post(TRADES_URL, body => {
          return body.since === '12345'
        })
        .reply(200, mockResponses.tradeHistory);

      let liqui = new Liqui(FAUX_API_KEY, FAUX_API_SECRET);
      liqui
        .tradeHistory({ since: 12345 })
        .then(data => {
          data.should.be.json;
          done();
        });
    });

	});
});
