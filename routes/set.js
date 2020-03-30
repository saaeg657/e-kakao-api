const express = require('express');
const fetch = require('node-fetch');
const WebSocket = require('ws');
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let { roomid, cookie, method, groupid, type, targetid, sessionid } = req.query;
  let userList = [];
  console.log(req.query);

  switch (type) {
    case 'freeze': {
      fetch('https://play.kakao.com/chat/service/api/room', {
        // agent: new httpProxyAgent(proxy),
        method: 'POST',
        headers: {
          Cookie: cookie,
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,und;q=0.6',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          Host: 'play.kakao.com',
          Origin: 'http://live-tv.kakao.com',
          Referer: `http://live-tv.kakao.com/kakaotv/live/chat/user/${roomid}`,
          'Content-type': 'application/json',
          'Content-Length': 15,
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        },
        body: JSON.stringify({
          groupid
        })
      })
        .then((req) => {
          console.log(req);
          return req;
        })
        .then(req => req.json())
        .then((req) => {
          console.log(req);
          // console.log(req.roomInfo.positionList);
          const proxyNum = Math.floor(Math.random() * 2) + 1;
          let wsDone = false;
          const ws = new WebSocket(`wss://proxy${proxyNum}.play.kakao.com/daumon?ip=${req.roomInfo.serverip}&port=${req.roomInfo.port}`, {
            // agent: new SocksProxyAgent('socks://64.118.87.54:52452'),
            headers: {
              Cookie: cookie,
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,und;q=0.6',
              'Cache-Control': 'no-cache',
              Connection: 'Upgrade',
              'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
              origin: 'http://live-tv.kakao.com',
              host: `proxy${proxyNum}.play.kakao.com`,
              'Pragma': 'no-cache',
              Upgrade: 'websocket',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            }
          });
          ws.on('open', () => {
            ws.send(`ENTER ${req.enter}\n`);
          });
          ws.on('message', (data) => {
            const msg = data.toString();
            if (msg.split(' ')[0] === '211') {
              const status = msg.split(' ')[msg.split(' ').length - 1].trim();
              // status 0: common 5: nochat
              switch (status) {
                case '0': {
                  userList.push(msg.split(' ')[1]);
                  break;
                }
                case '5': {
                  userList.push(msg.split(' ')[1]);
                  break;
                }
              }
            }
            if (msg.split(' ')[0] === '200' && !wsDone) {
              wsDone = true;
              ws.close();
              let userIndex = 0;
              console.log(userList);
              const loop = setInterval(() => {
                let _index = userIndex++;
                let target = userList[_index];
                if (!target) {
                  clearInterval(loop);
                  return res.send({
                    msg: 'success',
                  });
                }
                console.log(target)
                let data = '';
                if (method === 'delete') data = `target=${target}&roomid=${roomid}&method=delete`;
                else data = `target=${target}&roomid=${roomid}&eternal=0`;
                fetch(`https://live-tv.kakao.com/kakaotv/live/api/chat/perm/nochat`, {
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
                    'Host': 'live-tv.kakao.com',
                    'Origin': 'https://live-tv.kakao.com',
                    // 'Referer': `https://play.kakao.com/kakaotv/live/chat/user/${channelid}`,
                    // 'Referer': 'https://live-tv.kakao.com/kakaotv/live/chat/user/6816000',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
                  },
                  body: data
                })
                  .then(result => result.json())
                  .then(console.log)
                  .catch(console.log);
              }, 50);
            }
          });
        })
        .catch(console.error)
      return;
    }
    case 'kick': {
      // data = `sessionid=${sessionid}&roomid=${roomid}&type=NOCHATROOM&value=1`;
      let data = `value=${targetid}&roomid=${roomid}&sessionid=${sessionid}`;
      console.log(data);
      // fetch(`https://live-tv.kakao.com/kakaotv/live/api/chat/perm/noentrance`, {
      fetch(`https://play.kakao.com/chat/service/api/nochat`, {
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
        .then(result => result.text())
        .then((result) => {
          console.log(result);
          return res.send({
            msg: 'success',
          });
        })
        .catch(console.log);
    }
  }
});

module.exports = router;
