var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  let { roomid, itemid, resourceid, sessionid, cookie, imageUrl, itemSubType, isAD } = req.query;
  var data = '';
  // data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%7D`;

  let i = 0;
  let loop = setInterval(() => {
    let msg = '엄준식'[i++];
    data = `sessionid=${sessionid}_${Math.floor(Math.random() * 10) + 1}&roomid=${roomid}&msg=%7b%22font%22%3a%7b%22bold%22%3a%22bold%22%2c%22color%22%3a%22%23333333%22%2c%22face%22%3a%22%eb%a7%91%ec%9d%80%20%ea%b3%a0%eb%94%95%22%2c%22size%22%3a15%7d%2c%22msg%22%3a%22${encodeURI(msg)}%22%2c%20%22nickname%22%3a%20%22%ec%97%84%ec%a4%80%ec%8b%9d%22%2c%20%22id%22%3a%20%224081643%22%2c%20%22nickname%22%3a%20%22%ec%8a%a4%ed%86%a0%eb%b8%8c%eb%a6%ac%ea%b7%b8%20%eb%b0%b1%ec%8a%b9%ec%88%98%20%eb%8b%a8%ec%9e%a5%22%7d`;
    // data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%2C%22emoticon%22%3A%7B%22item_id%22%3A%22${2212219}%22%2C%22resource_id%22%3A%22${28}%22%2C%22item_sub_type%22%3A${1}%2C%22item_version%22%3A5%7D%2c%20%22nickname%22%3a%20%22%ec%97%84%ec%a4%80%ec%8b%9d%22%7D&type=EMOTICON`
    console.log(encodeURI(data));
    fetch(`https://play.kakao.com/chat/service/api/${Number(isAD) === 1 ? 'amsg' : 'msg'}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR, ko; q=0.9, en-US; q=0.8, en; q=0.7',
        'Connection': 'keep-alive',
        'Content-Length': Buffer.byteLength(data, 'utf8'),
        'Content-type': 'application/x-www-form-urlencoded',
        'Cookie': decodeURI(cookie),
        'Host': 'play.kakao.com',
        'Origin': 'https://play.kakao.com',
        // 'Referer': `https://play.kakao.com/kakaotv/live/chat/user/${channelid}`,
        // 'Referer': 'https://live-tv.kakao.com/kakaotv/live/chat/user/6816000',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
      },
      body: data
    })
      .then(result => result.json())
      .then(result => {
        console.log(result);
        if (i === 2) res.send({
          msg: 'success',
          result
        });
      })
      .catch(console.log);
    if (i === 3) clearInterval(loop);
  }, 2000);

});

module.exports = router;
