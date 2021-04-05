const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment');

const priceParser = (price) => {
  if (!price) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

router.get('/luna', async function (req, res, next) {
  try {
    const anc = await fetch("https://mantle.anchorprotocol.com/?__ancPrice", {
      method: 'POST',
      body: JSON.stringify({ "operationName": "__ancPrice", "variables": { "ANCTerraswap": "terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3", "poolInfoQuery": "{\"pool\":{}}" }, "query": "query __ancPrice($ANCTerraswap: String!, $poolInfoQuery: String!) {\n  ancPrice: WasmContractsContractAddressStore(\n    ContractAddress: $ANCTerraswap\n    QueryMsg: $poolInfoQuery\n  ) {\n    Result\n    __typename\n  }\n}\n" })
    }).then(result => result.json())
      .then(result => JSON.parse(result['data']['ancPrice']['Result']))
      .then(result => Number(result['assets'][1]['amount'] / result['assets'][0]['amount']).toFixed(3));
    const mirror = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=mirror-protocol&vs_currencies=usd')
      .then(result => result.json())
      .then(result => result['mirror-protocol']['usd']);
    const bithumbOrder = await fetch('https://api.bithumb.com/public/orderbook/LUNA_KRW')
      .then(result => result.json())
      .then(result => [result['data']['bids'][0]['price'], result['data']['asks'][0]['price']])
    const upbitOrder = await fetch('https://api.upbit.com/v1/orderbook?markets=BTC-LUNA')
      .then(result => result.json())
      .then(result => [result[0]["orderbook_units"][0]["bid_price"] * 100000000, result[0]["orderbook_units"][0]["ask_price"] * 100000000])
    const coinoneOrder = await fetch("https://api.coinone.co.kr/orderbook/?currency=luna")
      .then(result => result.json())
      .then(result => [result["bid"][0]["price"], result["ask"][0]["price"]])
    const gopaxOrder = await fetch('https://api.gopax.co.kr/trading-pairs/LUNA-KRW/book')
      .then(result => result.json())
      .then(result => [result["bid"][0][1], result["ask"][0][1]])

    const result = `${moment().month() + 1}월 ${moment().date()}일 ${moment().hours()}시 ${moment().minutes()}분 ${moment().seconds()}초\n거래소별 오더북 매수/매도\n\n빗썸 : ${priceParser(bithumbOrder[0])}원 / ${priceParser(bithumbOrder[1])}원\n업비트 : ${priceParser(upbitOrder[0])}사토시 / ${priceParser(upbitOrder[1])}사토시\n코인원 : ${priceParser(coinoneOrder[0])}원 / ${priceParser(coinoneOrder[1])}원\n고팍스 : ${priceParser(gopaxOrder[0])}원 / ${priceParser(gopaxOrder[1])}원\n\nMIR ${mirror}$\nANC ${anc}$`
    return res.send({
      status: 'success',
      result
    });
  } catch (e) {
    return res.send({
      status: 'fail',
    });
  }
});

module.exports = router;
