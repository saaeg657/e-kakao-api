var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let { roomid, msg, itemid, resourceid, sessionid, cookie, imageUrl, itemSubType, isAD } = req.query;
  console.log(req.query)
  if (imageUrl) {
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
        item_sub_type = itemSubType && itemSubType !== '' ? itemSubType : (imageType === 'image/gif' ? 4 : 3);
        var data = '';
        if (resourceid && itemid) data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%2C%22emoticon%22%3A%7B%22item_id%22%3A%22${itemid}%22%2C%22resource_id%22%3A%22${resourceid}%22%2C%22item_sub_type%22%3A${item_sub_type}%2C%22item_version%22%3A5%7D%2c%20%22nickname%22%3a%20%22%ec%97%84%ec%a4%80%ec%8b%9d%22%7D&type=EMOTICON`;
        else data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%7D`;

        //mk.kakaocdn.net/dna/emoticons/resources/4420058/thum_002.png?credential=K8fjjifdutZKGYRUZiv49nWLJTFH2N7a&expires=1579542468&allow_referer=live-tv.kakao.com&signature=vzip1wlDOrxaWFL5xfvsnPuUr98%3D&path=c84513c2b2400f13e46af292f38cd97216c83b32950ecae43ba090afd53b1f38
        ////mk.kakaocdn.net/dna/emoticons/resources/4411711/thum_002.png?credential=K8fjjifdutZKGYRUZiv49nWLJTFH2N7a&expires=1579542468&allow_referer=live-tv.kakao.com&signature=vzip1wlDOrxaWFL5xfvsnPuUr98%3D&path=c84513c2b2400f13e46af292f38cd97216c83b32950ecae43ba090afd53b1f38
        console.log(data);
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
  } else {
    var data = '';
    console.log(msg);
    // data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7B%22msg%22%3A%22${encodeURI(msg)}%22%7D`;
    data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7b%22font%22%3a%7b%22bold%22%3a%22bold%22%2c%22color%22%3a%22%23333333%22%2c%22face%22%3a%22%eb%a7%91%ec%9d%80%20%ea%b3%a0%eb%94%95%22%2c%22size%22%3a15%7d%2c%22msg%22%3a%22${encodeURI(msg)}%22%2c%20%22nickname%22%3a%20%22%ec%97%84%ec%a4%80%ec%8b%9d%22%2c%20%22id%22%3a%20%224081643%22%2c%20%22nickname%22%3a%20%22%ec%8a%a4%ed%86%a0%eb%b8%8c%eb%a6%ac%ea%b7%b8%20%eb%b0%b1%ec%8a%b9%ec%88%98%20%eb%8b%a8%ec%9e%a5%22%7d`;
    // data = `sessionid=${sessionid}&roomid=${roomid}&type=NOCHATROOM&value=1`;
    // data = `sessionid=${sessionid}&roomid=${roomid}&value=${sessionid}`;
    // data = `sessionid=${sessionid}&roomid=${roomid}&msg=%7b%22type%22%3a%22REACTION%22%2c%22time%22%3a1579216102603%2c%22data%22%3a%7b%22nickname%22%3a%22%ec%83%b9%ea%b5%ac%ec%8a%a4%eb%b0%a5%eb%b2%84%ea%b1%b0%22%2c%22type%22%3a%22RECOMMEND%22%2c%22count%22%3a%222%22%2c%22msg%22%3a%22%ec%83%b9%ea%b5%ac%ec%8a%a4%eb%b0%a5%eb%b2%84%ea%b1%b0%eb%8b%98%ec%9d%b4%202%eb%b2%88%ec%a7%b8%eb%a1%9c%20%ec%b6%94%ec%b2%9c%21%22%7d%2c%20%22nickname%22%3a%20%22%ec%97%84%ec%a4%80%ec%8b%9d%22%7d`
    // `%7b%22font%22%3a%7b%22bold%22%3a%22normal%22%2c%22color%22%3a%22333333%22%2c%22face%22%3a%22%eb%a7%91%ec%9d%80%20%ea%b3%a0%eb%94%95%22%2c%22size%22%3a12%7d%2c%22msg%22%3a%22${encodeURI(msg)}%22%7d`
    //"font":{"bold":"normal","color":"222222","face":"맑은 고딕","size":12},

    // 뷰랄 _kawlt=r8L57Q-Z-xzu_UodPuikIUiskFm4bkFNImZYLpvD2xnzoi5aD1057R5ZCOCEEo1uCwaVMSBuH3cJ1YcrZEXXsJtNhjOX7NSa9ul5HtXZcLE9AfZJyn-tcngOIzjUSDG3; _kawltea=1579294589; LWCS=7unTqEOpjAwcDh61zYpRkg.Js_dTrsAKPQdeH1ogx3b_ocQVr_1Dpej7XJEbYF5OR74SgQ4aHzJSMvs4PvIKrNZ.1579219213632.300000.C9Ll1FbQPDgmMy3I6kzk0-wwSGxRqQA366hDBgPcDok
    // 샹구스 webid=222c5f4106a34f188d6538e89f81afab; _kadu=ZJ93DaOLKEsPZCDv_1577697745710; kuid=48204294863716355; _kawlt=uUpzbbnS19nBdY0Snotpqh13bGSXZky6m1QXyCQ1MlPRz0VLS4TfaTossRzNgSQuONjLCv8clUodQwxb_urezNR5lk37H7_dNsFvQRyvSBsx5iAndCcy_2msXJsvLZ8B; _kawltea=1579291041; _karmt=RyehA1rYBDORBgt2gUrS-Zey0sJHni_XUGn63RcfDl6KgxUupER5A7me0enVO7v-; _karmtea=1579301841; TIARA=LUZbFYASpLqtrqxqiOjWRSELlWtMgJ4SchgC4Z7nd1uE4Lj.AEKxBrImjTtKooh31rsC7d_hEpbnkb2u4ZWTvYE3gv5jBVVC; LWCS=UD8D4oZrSROffq7L_zii1A.W4BZN6PcMvnKXsryFRLlOI8vIU2ceYCwER22B4FIrJply0o4QHaINtBGA9W_py5e.1579218913632.300000.NqE0ocXSK5I-cGBO2Yt-7L6zM_FBFskvsZT8_deVWBE
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
        res.send({
          msg: 'success',
          result
        });
      })
      .catch(console.log);
  }
});

module.exports = router;
