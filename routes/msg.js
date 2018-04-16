var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const { roomid, msg, itemid, resourceid, sessionid, cookie, imageUrl } = req.query;
  fetch(imageUrl, {
    method: 'GET',
    headers: {
      Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Host: 'item.kakaocdn.net',
      Referer: 'http://localhost:3000/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
  })
    .then((res2) => {
      const imageType = res2.headers.get('content-type');
      let item_sub_type = imageType === 'image/gif' ? 4 : 3;
      var data = '';
      if (resourceid && itemid) data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%2C%22emoticon%22%3A%7B%22item_id%22%3A%22${itemid}%22%2C%22resource_id%22%3A%22${resourceid}%22%2C%22item_sub_type%22%3A${item_sub_type}%2C%22item_version%22%3A1%7D%7D&type=EMOTICON`;
      else data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%7D`;
      fetch('https://play.kakao.com/chat/service/api/msg', {
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
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        },
        body: data
      })
        .then(result => result.json())
        .then(result => {
          res.send({
            msg: 'success',
            result
          });
        })
        .catch(console.log);
    })
    .catch(err => console.log(err));

});

module.exports = router;
