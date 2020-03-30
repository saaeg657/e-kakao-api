/*! web_chat - v2.0.0-alpha55 - 2018-03-07
 * Copyright (c) 2018 KAKAO Corp.;*/
! function(t) {
  "use strict";
  t.config = {}, t.config.CHAT_HOST = ["proxy1.play.kakao.com", "proxy2.play.kakao.com"], t.config.HOST = {
      sandbox: "https://sandbox-play.devel.kakao.com",
      alpha: "https://alpha-play.devel.kakao.com",
      beta: "https://beta-play.devel.kakao.com",
      real: "https://play.kakao.com"
  }, t.config.API_PATH = {
      enter: "/chat/service/api/room",
      report: "/chat/service/api/report",
      msg: "/chat/service/api/msg",
      amsg: "/chat/service/api/amsg",
      whisper: "/chat/service/api/whisper",
      roomlist: "/chat/service/api/roomlist",
      travel: "/chat/service/api/travel"
  }, t.config.USER_PERMISSION = {
      NORMAL: 0,
      PD: 1,
      GM: 2,
      AD: 3,
      GUEST: 4,
      NOCHAT: 5,
      SUPPORT: 6
  }, t.config.ERRORCODE = {
      OK: "200: 정상",
      NeedLogin: "401: 로그인이 필요합니다.",
      NeedAuth19: "401: 19세 이상만 이용할 수 있습니다.",
      NeedPassword: "401: 패스워드가 필요합니다.",
      NotMatchPassword: "401: 패스워드가 일치하지 않습니다.",
      BadParameter: "422: 파라미터 에러",
      NotExistChatRoom: "410: 채팅방이 존재하지 않습니다.",
      NotExistChatGroup: "410: 채팅그룹이 존재하지 않습니다.",
      NotExistTargetInfo: "410: 타켓정보가 존재하지 않습니다.",
      NotExistLive: "410: 방송이 존재하지 않습니다.",
      NoPermission: "401: 권한이 없습니다.",
      NoEntrance: "401: 강퇴로 인해 입장 불가 상태입니다.",
      NoChat: "401: 채팅 불가상태입니다.",
      NotBeYourself: "401: 본인이 타겟이 될수 없습니다.",
      NeedUpdate: "426: 업데이트가 필요합니다.",
      FailCreateRoom: "400: 채팅방 생성 실패입니다.",
      TooManyRequest: "429: 요청이 많습니다.",
      AlreadyReported: "412: 이미 신고되었습니다.",
      LimitExceeded: "412: 등록제한수를 초과하였습니다.",
      AlreadyApplied: "412: 이미 등록 되었습니다.",
      WisperDeniedUser: "410: 귓속말 거부된 사용자입니다.",
      NoChatRoom: "401: 얼려진 방입니다.",
      Runtime: "500, 400: 서버오류, 알수 없는 오류",
      ToLongMsg: "401: 보내는 메세지가 너무 깁니다.",
      FailToReport: "400: 신고에 실패하였습니다."
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function(t) {
  "use strict";
  t.Observer = function() {}, t.Observer.prototype = {
      emit: function(t) {
          var e = this.getListeners(t),
              i = [].slice.call(arguments, 1);
          if (void 0 !== e)
              for (var s = 0, o = e.length; s < o; s++) e[s].apply(this, i)
      },
      on: function(t, e) {
          this.getListeners(t).push(e)
      },
      getListeners: function(t) {
          return this.listeners = this.listeners || {}, this.listeners[t] = this.listeners[t] || [], this.listeners[t]
      },
      removeListeners: function(t) {
          this.listeners = this.listeners || {}, this.listeners[t] = []
      },
      destroy: function() {
          this.listeners = null
      }
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function() {
  "use strict";
  String.prototype.trim || (String.prototype.trim = function() {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
  }), "function" != typeof Array.isArray && (Array.isArray = function(t) {
      return "[object Array]" === Object.prototype.toString.call(t)
  }), Array.prototype.find || (Array.prototype.find = function(t) {
      if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
      if ("function" != typeof t) throw new TypeError("predicate must be a function");
      for (var e, i = Object(this), s = i.length >>> 0, o = arguments[1], n = 0; n < s; n++)
          if (e = i[n], t.call(o, e, n, i)) return e
  })
}(),
function(t) {
  "use strict";
  var e = function() {
      var t = window.location.search;
      0 === t.indexOf("?") && (t = t.slice(1));
      for (var e = t.split("&"), i = 0, s = e.length; i < s; i += 1)
          if ("__dev=1" === e[i]) return !0;
      return !1
  }();
  t.utils = {}, t.utils.setDubugFlag = function(t) {
      e = 1 === t || "1" === t || !0 === t
  }, t.utils.__debugLog = function() {
      e && ("function" == typeof console.trace ? console.trace.apply(console, arguments) : "function" == typeof console.log && console.log.apply(console, arguments))
  }, t.utils.request = function(t, e) {
      var i = "string" == typeof t ? {
          url: t
      } : t;
      if ("object" != typeof i) return new TypeError("options is not Object in request");
      if ("string" != typeof i.url) return new TypeError("options.url is not String in request");
      var s;
      s = "string" != typeof i.method ? "GET" : i.method.toUpperCase();
      var o = new XMLHttpRequest;
      if (o.open(s, i.url, !0), i.withCredentials && (o.withCredentials = !0), "object" == typeof i.headers) {
          var n = i.headers;
          for (var r in n) n.hasOwnProperty(r) && o.setRequestHeader(r, n[r])
      }
      o.onreadystatechange = function() {
          4 === o.readyState && e(o)
      }, "string" == typeof i.data ? o.send(i.data) : o.send()
  }, t.utils.escapeHTML = function(t) {
      return "string" != typeof t ? t : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
  }, t.utils.unescapeHTML = function(t) {
      return "string" != typeof t ? t : t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function(t) {
  "use strict";
  var e = ["msg", "open", "close", "error", "message", "reward", "title", "report", "chat:freeze", "chat:unfreeze", "kick", "move", "user:join", "user:exit", "user:change:nick", "permission:ad", "permission:nochat", "send:ok", "send:error", "report:ok", "report:error"],
      i = t.config,
      s = t.utils,
      o = i.USER_PERMISSION;
  t.modules = t.modules || {};
  var n = function(t) {
      this.init(t)
  };
  n.prototype = {
      init: function(e) {
          try {
              this.roomInfo = {}, this.me = {}, this.isFreezeChat = !1, this.ob = new t.Observer, this.bindEvent(), this.user = new t.modules.User(this.ob, e), this.parser = new t.modules.Parser(this.ob, e), this.connector = new t.modules.Connector(this.ob, e), t.modules.Writer && (this.writer = new t.modules.Writer(this.ob, e))
          } catch (t) {
              throw t
          }
      },
      bindEvent: function() {
          this.bindConnectEvent(), this.bindReadEvent(), this.bindChatEvent(), this.bindWriteEvent()
      },
      bindConnectEvent: function() {
          var t = this;
          this.ob.on("__onopen", function(e) {
              t.roomInfo = e
          }), this.ob.on("__me", function(e) {
              t.me = e, t.ob.emit("open", t.roomInfo, e), "1" === t.roomInfo.freeze && t.ob.emit("__freeze", !0)
          }), this.ob.on("__updateme", function(e) {
              t.me = e
          }), this.ob.on("__onerror", function(e) {
              e.code && "NeedPassword" === e.code && t.ob.emit("error", e)
          })
      },
      bindReadEvent: function() {
          var t = this,
              e = this.ob;
          e.on("__message", function(i) {
              t.setPerm(i), e.emit("message", i)
          }), e.on("__reward", function(t) {
              e.emit("reward", t)
          }), e.on("__title", function(t) {
              e.emit("title", t)
          }), e.on("__report", function(i) {
              var s = t.me.nickname;
              i.reporter !== s && i.target !== s || e.emit("report", i)
          }), e.on("__msg", function(t) {
              e.emit("msg", t)
          })
      },
      bindWriteEvent: function() {
          var t = this;
          this.ob.on("__send:ok", function(e) {
              t.resSendOk(e)
          })
      },
      resSendOk: function(t) {
          t.nickname = this.me.nickname, t.sessionid = this.me.sessionid, this.ob.emit("send:ok", t)
      },
      setPerm: function(t) {
          if (this.user && this.user.list && this.user.list[t.sessionid]) {
              var e = this.user.list[t.sessionid].permNum;
              e === o.PD ? t.perm = "PD" : e === o.GM ? t.perm = "GM" : e === o.AD && (t.perm = "AD")
          } else t.perm = "NORMAL"
      },
      bindChatEvent: function() {
          var t = this;
          this.ob.on("__freeze", function(e) {
              e ? (t.isFreezeChat = !0, t.ob.emit("chat:freeze")) : (t.isFreezeChat = !1, t.ob.emit("chat:unfreeze"))
          }), this.ob.on("__kick", function(e) {
              t.ob.emit("kick", e)
          }), this.ob.on("__move", function(e) {
              t.ob.emit("move", e)
          })
      },
      on: function(t, i) {
          -1 !== ("," + e.join(",") + ",").indexOf("," + t + ",") && this.ob.on(t, i)
      },
      send: function() {
          if (this.writer) switch (this.me.permNum) {
              case o.PD:
              case o.AD:
                  this.writer.sendAmsg.apply(this.writer, arguments);
                  break;
              default:
                  this.writer.send.apply(this.writer, arguments)
          }
      },
      whisper: function() {
          this.writer && this.writer.whisper.apply(this.writer, arguments)
      },
      report: function() {
          this.writer && this.writer.report.apply(this.writer, arguments)
      },
      permission: function() {
          this.writer && this.writer.permission.apply(this.writer, arguments)
      },
      kick: function() {
          this.writer && this.writer.kick.apply(this.writer, arguments)
      },
      freeze: function() {
          this.writer && this.writer.freeze.apply(this.writer, arguments)
      },
      setFreeze: function(t) {
          this.ob.emit("__freeze", !!t)
      },
      setProhibitWords: function(t) {
          this.writer.prohibit_words = t || []
      },
      destroy: function() {
          this.ob.destroy(), this.connector.destroy(), this.parser.destroy(), this.user.destroy(), this.writer && this.writer.destroy()
      }
  };
  t.isSuppotedPotSocket = "PotSocket" in window, t.isSuppotedWebSocket = "WebSocket" in window && 2 === window.WebSocket.CLOSING, t.open = function(t) {
      return new n(t)
  }, t.getRoomList = function(t, e, o) {
      s.request({
          url: (i.HOST[o] || i.HOST.real) + i.API_PATH.roomlist,
          method: "POST",
          withCredentials: !0,
          headers: {
              "Content-type": "application/x-www-form-urlencoded"
          },
          data: "groupid=" + t
      }, function(t) {
          var i = {};
          if (t.responseText) try {
              i = JSON.parse(t.responseText)
          } catch (t) {
              i = {}
          }
          200 !== t.status ? e({
              status: i.status || t.status,
              code: i.code || t.statusText
          }) : e(null, i)
      })
  }, t.getRoom = function(t, e, o) {
      s.request({
          url: (i.HOST[o] || i.HOST.real) + i.API_PATH.travel,
          method: "POST",
          withCredentials: !0,
          headers: {
              "Content-type": "application/x-www-form-urlencoded"
          },
          data: "roomid=" + t
      }, function(t) {
          var i = {};
          if (t.responseText) try {
              i = JSON.parse(t.responseText)
          } catch (t) {
              i = {}
          }
          200 !== t.status ? e({
              status: i.status || t.status,
              code: i.code || t.statusText
          }) : e(null, i)
      })
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function(t) {
  "use strict";
  t.modules = t.modules || {};
  var e = t.utils,
      i = e.__debugLog,
      s = t.config.USER_PERMISSION;
  t.modules.Parser = function(t, e) {
      this.init(t, e)
  }, t.modules.Parser.prototype = {
      init: function(t, e) {
          this.ob = t, this.options = e || {}, this.me = {}, this.bindEvent()
      },
      bindEvent: function() {
          var t = this;
          this.ob.on("__onopen", function(e) {
              t.onopen(e)
          }), this.ob.on("__onclose", function(e) {
              t.onclose(e)
          }), this.ob.on("__onerror", function(e) {
              t.onerror(e)
          }), this.ob.on("__onmessage", function(e) {
              t.onmessage(e)
          })
      },
      onopen: function() {},
      onclose: function() {
          this.destroy()
      },
      onerror: function() {},
      onmessage: function(t) {
          if (i(t), "{" === t.charAt(0)) return this.parseJson(t);
          0 === (t = t.split(" "))[0].indexOf(":") ? this.parseSysmsg(t) : isNaN(+t[0]) || this._on(t)
      },
      parseJson: function(t) {
          var e;
          try {
              e = JSON.parse(t)
          } catch (t) {
              i(t)
          }
          e && this.ob.emit("__msg", e)
      },
      parseSysmsg: function(t) {
          "function" != typeof this["PARSE_" + t[1]] ? i(t) : this["PARSE_" + t[1]](t)
      },
      PARSE_JOIN: function(t) {
          var e = parseInt(t[2]);
          isNaN(e) || this.ob.emit("__usercount", e);
          var s = t[0].substring(1);
          if (s) {
              var o = this.textDecoding(t[3]),
                  n = parseInt(t[5]);
              this.addUser(s, o, n)
          } else i("guest 1명이 입장하였습니다.")
      },
      PARSE_PART: function(t) {
          var e = parseInt(t[3]);
          isNaN(e) || this.ob.emit("__usercount", e);
          var s = t[0].substring(1);
          s ? this.ob.emit("__part", s) : i("guest 1명이 퇴장하였습니다.")
      },
      PARSE_MSG: function(t) {
          var e = t[0].substring(1),
              i = t[2],
              s = t[3],
              o = t.slice(5).join(" ");
          this.onMsg(e, i, s, o)
      },
      PARSE_AMSG: function(t) {
          var e = t[0].substring(1),
              i = t[2],
              s = t[3],
              o = t.slice(5).join(" ");
          this.onMsg(e, i, s, o)
      },
      onMsg: function(t, e, s, o) {
          var n = this.getMsgObj(t, e, s, o);
          if (n) return this.ob.emit("__message", n);
          i(t, s, o)
      },
      PARSE_PERM: function(t) {
          var e = t[0].substring(4),
              i = t[2],
              s = this.textDecoding(t[3]),
              o = parseInt(t[4], 10);
          this.ob.emit("__updateperm", {
              executor: e,
              sessionid: i,
              nickname: s,
              permNum: o
          })
      },
      PARSE_REPORT: function(t) {
          var e = this.textDecoding(t[2]),
              i = this.textDecoding(t[4]),
              s = t[6],
              o = t[7];
          this.ob.emit("__report", {
              reporter: e,
              target: i,
              reportNum: 1,
              currentCount: parseInt(s),
              maxCount: parseInt(o)
          })
      },
      PARSE_REWARD: function(t) {
          var e = this.textDecoding(t[2]),
              i = t[3],
              s = this.textDecoding(t[4]);
          this.ob.emit("__reward", {
              nickname: e,
              reward: i,
              msg: s
          })
      },
      PARSE_KICK: function(t) {
          var e = t[0].substring(1),
              i = t[2];
          if ("@" === i) return this.ob.emit("__move", {
              source_id: e
          });
          var s = this.textDecoding(t[3]);
          this.ob.emit("__kick", {
              source_id: e,
              target_id: i,
              target: s
          })
      },
      PARSE_SET: function(t) {
          var e = t[2];
          if ("NOCHATROOM" === e) {
              var i = "1" === t[3];
              this.ob.emit("__freeze", !!i)
          } else if ("NICKNAME" === e) {
              var s = t[0].substring(1),
                  o = this.textDecoding(t[3].trim());
              this.ob.emit("__updatenick", {
                  sessionid: s,
                  nickname: o
              })
          } else if ("TITLE" === e) {
              var n = this.textDecoding((t[3] || "").trim());
              this.ob.emit("__title", {
                  title: n
              })
          }
      },
      getMyMsgObj: function(t, e, i) {
          var s = this.me.sessionid,
              o = i ? "ALONE" : "ALL",
              n = this.getMsgObj(s, e, o, t) || {};
          return n.targetNickname = this.textDecoding(i), n
      },
      getMsgObj: function(t, e, s, o) {
          var n = null;
          try {
              return (n = JSON.parse(o)).nickname = this.textDecoding(e || ""), n.sessionid = t, n.target = s, n.msg = this.unescapeMsg(n.msg), n
          } catch (t) {
              i(o)
          }
          return null
      },
      textDecoding: function(t) {
          if (!t) return "";
          var i = t.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\s/g, " ");
          return this.options.escape ? e.escapeHTML(i) : i
      },
      unescapeMsg: function(t) {
          if (!t) return "";
          var i = t.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          return this.options.escape ? e.escapeHTML(i) : i
      },
      _on: function(t) {
          var e = parseInt(t[0], 10);
          if (210 !== e)
              if (211 !== e)
                  if (("JOIN" === t[1] || t.length > 4) && 200 === e) this.setMyInfo(t);
                  else if ("MSG" === t[1]) {
              if (511 === e) return void this.ob.emit("send:error", {
                  status: 429,
                  code: "TooManyRequest",
                  failedMsg: ""
              });
              if (521 === e) return this.ob.emit("send:error", {
                  status: 401,
                  code: "NoChatRoom",
                  failedMsg: ""
              }), void(this.isFreezeChat = !0)
          } else {
              if ("REPORT" === t[1]) return void this._onReport(t);
              if ("PING" === t[1]) return
          } else {
              var i = this.parseUserInfo(t);
              this.setUserInfo(i)
          } else {
              this.ob.emit("__usercount", parseInt(t[1]));
              var s = this.textDecoding(t.slice(3).join(" ").trim());
              this.ob.emit("__title", {
                  title: s
              })
          }
      },
      setMyInfo: function(t) {
          t.length > 5 && "JOIN" === t[1] && t.splice(1, 1);
          var e = this.parseUserInfo(t);
          this.ob.emit("__me", e)
      },
      getActiveUser: function(t) {
          return t !== s.GUEST
      },
      parseUserInfo: function(t) {
          var e = parseInt(t[4]);
          return {
              sessionid: t[1],
              nickname: this.textDecoding(t[2].trim()),
              permNum: e
          }
      },
      setUserInfo: function(t) {
          var e = t.permNum;
          this.getActiveCountUser(e) || (this.totalUser -= 1);
          var i = t.sessionid,
              s = t.nickname;
          this.getActiveUser(e) && this.addUser(i, s, e, !0)
      },
      addUser: function(t, e, i, s) {
          this.ob.emit("__join", {
              sessionid: t,
              nickname: e,
              permNum: i
          }, s)
      },
      getActiveCountUser: function(t) {
          return t !== s.GM
      },
      _onReport: function(t) {
          var e = parseInt(t[0], 10);
          if (200 !== e) {
              var i = {};
              501 === e ? (i.status = 410, i.code = "NotExistTargetInfo") : 504 === e ? (i.status = 401, i.code = "NoPermission") : 511 === e ? (i.status = 412, i.code = "AlreadyReported") : (i.status = 400, i.code = "FailToReport"), this.ob.emit("report:error", i)
          }
      },
      destroy: function() {
          this.options = null
      }
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function(t) {
  "use strict";
  t.modules = t.modules || {};
  t.utils.__debugLog;
  var e = t.config.USER_PERMISSION;
  t.modules.User = function(t, e) {
      this.init(t, e)
  }, t.modules.User.prototype = {
      init: function(t, e) {
          this.ob = t, this.options = e || {}, this.isJoinMe = !1, this.me = {}, this.list = {}, this.totalcount = 0, this.bindEvent()
      },
      bindEvent: function() {
          var t = this;
          this.ob.on("__me", function(e) {
              t.isJoinMe = !0, t.setMyInfo(e)
          }), this.ob.on("__join", function(e) {
              t.onjoin(e)
          }), this.ob.on("__part", function(e) {
              t.onpart(e)
          }), this.ob.on("__updatenick", function(e) {
              t.changeUserNickname(e)
          }), this.ob.on("__updateperm", function(e) {
              t.changeUserPermission(e)
          }), this.ob.on("__usercount", function(e) {
              t.oncount(e)
          })
      },
      setMyInfo: function(t) {
          this.me = t, t && t.sessionid && (this.list[t.sessionid] = t)
      },
      onjoin: function(t) {
          t && t.sessionid && (t.permNum !== e.GM && !this.list[t.sessionid] && this.isJoinMe && this.ob.emit("user:join", t), this.list[t.sessionid] = t)
      },
      onpart: function(t) {
          if (this.me.sessionid !== t && this.list[t]) {
              var i = this.list[t];
              i.nickname && i.permNum !== e.GM && this.ob.emit("user:exit", i), delete this.list[t]
          }
      },
      checkUpdateMe: function(t) {
          this.me.sessionid === t && (this.me = this.list[t], this.ob.emit("__updateme", this.list[t]))
      },
      changeUserNickname: function(t) {
          if (t && t.sessionid && this.list[t.sessionid]) {
              var e = this.list[t.sessionid].nickname,
                  i = t.nickname;
              this.list[t.sessionid].nickname = i, this.checkUpdateMe(t.sessionid), this.ob.emit("user:change:nick", {
                  beforeNick: e,
                  afterNick: i
              })
          }
      },
      changeUserPermission: function(t) {
          if (t && t.sessionid && this.list[t.sessionid]) {
              var i = t.sessionid,
                  s = this.list[i].permNum,
                  o = t.permNum,
                  n = t.nickname,
                  r = t.executor;
              this.list[i].permNum = o, this.checkUpdateMe(t.sessionid), o === e.AD ? this.ob.emit("permission:ad", {
                  nickname: n,
                  permission: !0,
                  executor: t.executor
              }) : o === e.NOCHAT ? this.ob.emit("permission:nochat", {
                  nickname: n,
                  permission: !0,
                  executor: r
              }) : o === e.NORMAL && (s === e.AD ? this.ob.emit("permission:ad", {
                  nickname: n,
                  permission: !1,
                  executor: r
              }) : s === e.NOCHAT && this.ob.emit("permission:nochat", {
                  nickname: n,
                  permission: !1,
                  executor: r
              }))
          }
      },
      oncount: function(t) {
          this.totalcount = t
      },
      destroy: function() {
          this.me = null, this.list = null, this.options = null, this.ob = null, this.totalcount = 0
      }
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function(t) {
  "use strict";
  t.modules = t.modules || {};
  var e = t.config,
      i = t.utils;
  t.modules.Connector = function(t, e) {
      this.init(t, e)
  }, t.modules.Connector.prototype = {
      init: function(t, e) {
          this.ob = t, this.options = e || {}, this.pingTimeId = null, this.me = {}, this.setHost(this.options.phase), this.enterChatRoom()
      },
      setHost: function(t) {
          this.host = e.HOST[t] || e.HOST.real
      },
      getConnectUrl: function() {
          var t = e.CHAT_HOST;
          return "wss://" + t[parseInt(Math.random() * t.length, 10)] + "/daumon?ip=" + this.roomInfo.serverip + "&port=" + this.roomInfo.port
      },
      enterChatRoom: function() {
          this.options.roomInfo && this.options.enter ? (this.roomInfo = this.options.roomInfo, this.connect(this.options.enter)) : this.getRoomInfo(this.options)
      },
      getRoomInfo: function(t) {
          var s = this,
              o = this.host + e.API_PATH.enter,
              n = t.groupid || "",
              r = t.password || "";
          i.request({
              method: "POST",
              url: o,
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "groupid=" + n + (r ? "&password=" + r : "")
          }, function(t) {
              var e;
              try {
                  e = JSON.parse(t.responseText)
              } catch (t) {
                  return void i.__debugLog(t)
              }
              200 === t.status ? (s.roomInfo = e.roomInfo, s.connect(e.enter || "")) : "NeedPassword" === e.code && s.ob.emit("__onerror", e)
          })
      },
      connect: function(t) {
          var e = this;
          this.socket = new WebSocket(this.getConnectUrl()), this.socket.onopen = function() {
              e.socket.send("ENTER " + t + "\n"), e.ping(), e.ob.emit("__onopen", e.roomInfo)
          }, this.socket.onclose = function(t) {
              e.ob.emit("__onclose", t), e.destroy()
          }, this.socket.onerror = function(t) {
              e.ob.emit("__onerror", t)
          }, this.socket.onmessage = function(t) {
              if ("string" == typeof t.data) {
                  var i = t.data.trim();
                  e.ob.emit("__onmessage", i)
              }
          }
      },
      ping: function() {
          var t = 25e3,
              e = this;
          window.clearTimeout(e.pingTimeId), e.pingTimeId = window.setTimeout(function i() {
              window.clearTimeout(e.pingTimeId), e.socket.send("PING\n"), e.pingTimeId = window.setTimeout(i, t)
          }, t)
      },
      diconnect: function() {
          window.clearTimeout(this.pingTimeId), this.socket && "function" == typeof this.socket.close && this.socket.close()
      },
      destroy: function() {
          this.unbindSocketEvent(), this.diconnect(), this.options = null, this.socket = null
      },
      unbindSocketEvent: function() {
          this.socket && (this.socket.onopen = null, this.socket.onclose = null, this.socket.onmessage = null, this.socket.onerror = null)
      }
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat),
function(t) {
  "use strict";
  t.modules = t.modules || {};
  var e = t.utils,
      i = e.__debugLog,
      s = t.config,
      o = s.API_PATH,
      n = s.USER_PERMISSION;
  t.modules.Writer = function(t, e) {
      this.init(t, e)
  }, t.modules.Writer.prototype = {
      init: function(t, e) {
          this.ob = t, this.options = e || {}, this.me = {}, this.roomInfo = e.roomInfo || {}, this.prohibit_words = e.prohibit_words || [], this.isFreeze = !1, this.isSendEnabled = !0, this.setHost(this.options.phase), this.bindEvent()
      },
      setHost: function(t) {
          this.host = s.HOST[t] || s.HOST.real
      },
      bindEvent: function() {
          var t = this;
          this.ob.on("__onopen", function(e) {
              t.setRoomInfo(e)
          }), this.ob.on("__freeze", function(e) {
              t.onfreeze(!!e)
          }), this.ob.on("__me", function(e) {
              t.updateMyInfo(e)
          })
      },
      setRoomInfo: function(t) {
          this.roomInfo = t
      },
      onfreeze: function(t) {
          this.isFreeze = t
      },
      updateMyInfo: function(t) {
          this.me = t
      },
      disableSend: function() {
          this.isSendEnabled = !1;
          var t = this;
          setTimeout(function() {
              t.isSendEnabled = !0
          }, 1650)
      },
      checkSendError: function(t) {
          return this.me.permNum === n.GUEST ? {
              status: 401,
              code: "NeedLogin",
              failedMsg: t
          } : this.me.permNum === n.NOCHAT ? {
              status: 401,
              code: "NoChat",
              failedMsg: t
          } : this.isFreeze ? {
              status: 401,
              code: "NoChatRoom",
              failedMsg: t
          } : t.length > 100 ? {
              status: 401,
              code: "TooLongMsg",
              failedMsg: t
          } : this.isSendEnabled ? this.checkProhibitWords(t) ? {
              status: 400,
              code: "ProhibitWords",
              failedMsg: t
          } : null : {
              status: 429,
              code: "TooManyRequest",
              failedMsg: t
          }
      },
      checkSendAmsgError: function(t) {
          return t.length > 500 ? {
              status: 401,
              code: "TooLongAmsg",
              failedMsg: t
          } : this.checkProhibitWords(t) ? {
              status: 400,
              code: "ProhibitWords",
              failedMsg: t
          } : null
      },
      checkProhibitWords: function(t) {
          return this.prohibit_words.find(function(e) {
              return t.indexOf(e) > -1
          })
      },
      setMyMsgData: function() {},
      send: function(t, i) {
          if ("string" != typeof t) throw TypeError("잘못된 메시지 입니다.");
          var s = this.checkSendError(t);
          if (s) return this.ob.emit("send:error", s);
          this.disableSend();
          var n = {
              msg: t
          };
          i && (n.emoticon = i);
          var r = JSON.stringify(n),
              a = this;
          e.request({
              url: this.host + o.msg,
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&msg=" + encodeURIComponent(r) + (i ? "&type=EMOTICON" : "")
          }, function(e) {
              if (200 === e.status) a.ob.emit("__send:ok", n);
              else {
                  var i = {};
                  if (e.responseText) try {
                      i = JSON.parse(e.responseText)
                  } catch (t) {
                      i = {}
                  }
                  a.ob.emit("send:error", {
                      status: i.status || e.status,
                      code: i.code || e.statusText,
                      failedMsg: t
                  })
              }
          })
      },
      sendAmsg: function(t, i, s) {
          if ("string" != typeof t) throw TypeError("잘못된 메시지 입니다.");
          var n = this.checkSendAmsgError(t);
          if (n) return this.ob.emit("send:error", n);
          this.disableSend();
          var r = {
              msg: t
          };
          i && (r.emoticon = i);
          var a = JSON.stringify(r),
              c = this;
          e.request({
              url: this.host + o.amsg,
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&msg=" + encodeURIComponent(a) + (i ? "&type=EMOTICON" : "")
          }, function(e) {
              if (200 !== e.status) {
                  var i = {};
                  if (e.responseText) try {
                      i = JSON.parse(e.responseText)
                  } catch (t) {
                      i = {}
                  }
                  c.ob.emit("send:error", {
                      status: i.status || e.status,
                      code: i.code || e.statusText,
                      failedMsg: t
                  })
              }
          })
      },
      whisper: function(t, i, s) {
          if ("string" != typeof t || "string" != typeof i) throw TypeError("잘못된 메시지 입니다.");
          var n = this.checkSendError(i);
          if (n) return this.ob.emit("send:error", n);
          this.disableSend();
          var r = {
              msg: i
          };
          s && (r.emoticon = s);
          var a = JSON.stringify(r),
              c = this;
          e.request({
              url: this.host + o.msg,
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&targetsid=" + t + "&msg=" + encodeURIComponent(a) + (s ? "&type=EMOTICON" : "")
          }, function(t) {
              if (200 === t.status) r.nickname = c.me.nickname, c.ob.emit("send:ok", r);
              else {
                  var e = {};
                  if (t.responseText) try {
                      e = JSON.parse(t.responseText)
                  } catch (t) {
                      e = {}
                  }
                  c.ob.emit("send:error", {
                      status: e.status || t.status,
                      code: e.code || t.statusText,
                      failedMsg: i
                  })
              }
          })
      },
      report: function(t) {
          if (this.me.permNum === n.GUEST) return this.ob.emit("report:error", {
              status: 401,
              code: "NeedLogin"
          });
          if ("string" != typeof t || "" === t.trim()) return i("NotExistTargetInfo"), this.ob.emit("report:error", {
              status: 410,
              code: "NotExistTargetInfo"
          });
          if (t === this.me.sessionid) return i("NotBeYourself"), this.ob.emit("report:error", {
              status: 401,
              code: "NotBeYourself"
          });
          if (t === this.pd_sessionid) return i("NoPermission"), this.ob.emit("report:error", {
              status: 401,
              code: "NoPermission"
          });
          if (!this.isSendEnabled) return this.ob.emit("report:error", {
              status: 429,
              code: "TooManyRequest"
          });
          this.disableSend();
          var s = this;
          e.request({
              url: this.host + o.report,
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&targetsid=" + t
          }, function(t) {
              if (200 !== t.status) {
                  var e = {};
                  if (t.responseText) try {
                      e = JSON.parse(t.responseText)
                  } catch (t) {
                      e = {}
                  }
                  s.ob.emit("report:error", {
                      status: e.status || t.status,
                      code: e.code || t.statusText
                  })
              }
          })
      },
      permission: function(t, i, s) {
          var o = this;
          if ("ADMIN" !== i && "NOADMIN" !== i && "CHAT" !== i && "NOCHAT" !== i) return this.ob.emit("permission:error", {
              status: 422,
              code: "BadParameter"
          });
          e.request({
              url: this.host + "/chat/service/api/perm",
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&targetsid=" + t + "&perm=PERM_" + i + "&eternal=" + (s ? 1 : 0)
          }, function(t) {
              if (200 !== t.status) {
                  var e = {};
                  if (t.responseText) try {
                      e = JSON.parse(t.responseText)
                  } catch (t) {
                      e = {}
                  }
                  o.ob.emit("manage:error", {
                      status: e.status || t.status,
                      code: e.code || t.statusText
                  })
              }
          })
      },
      kick: function(t, i) {
          var s = this;
          e.request({
              url: this.host + "/chat/service/api/kick",
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&targetsid=" + t + "&eternal=" + (i ? 1 : 0)
          }, function(t) {
              if (200 !== t.status) {
                  var e = {};
                  if (t.responseText) try {
                      e = JSON.parse(t.responseText)
                  } catch (t) {
                      e = {}
                  }
                  s.ob.emit("manage:error", {
                      status: e.status || t.status,
                      code: e.code || t.statusText
                  })
              }
          })
      },
      freeze: function(t) {
          var i = t ? 1 : 0,
              s = this;
          e.request({
              url: this.host + "/chat/service/api/set",
              method: "POST",
              withCredentials: !0,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              data: "sessionid=" + this.me.sessionid + "&roomid=" + this.roomInfo.roomid + "&type=NOCHATROOM&value=" + i
          }, function(t) {
              if (200 !== t.status) {
                  var e = {};
                  if (t.responseText) try {
                      e = JSON.parse(t.responseText)
                  } catch (t) {
                      e = {}
                  }
                  s.ob.emit("manage:error", {
                      status: e.status || t.status,
                      code: e.code || t.statusText
                  })
              } else s.ob.emit("__freeze", !!i)
          })
      },
      destroy: function() {
          this.me = null, this.options = null, this.ob = null, this.isFreeze = !1, this.isSendEnabled = !0
      }
  }
}(window.webChat = void 0 === window.webChat ? {} : window.webChat);
/*! web_chat - v2.0.0-alpha55 - 2018-03-07
* Copyright (c) 2018 KAKAO Corp.;*/

window.jQuery(function(e) {
      "function" != typeof Array.isArray && (Array.isArray = function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
      }), window.BaseUIClass = window.Class.extend({
          init: function(e, t) {
              this.sandbox = e, this.emoticon = t
          },
          openMessage: function(e) {
              return ""
          },
          closeMessage: function(e) {
              return ""
          },
          errorMessage: function(e) {
              return ""
          },
          chatMessage: function(e) {
              return ""
          },
          rewardMessage: function(e) {
              return ""
          },
          sendFailMessage: function(e) {
              return ""
          },
          sendOkMessage: function(e) {
              return ""
          },
          joinMessage: function(e) {
              return ""
          },
          partMessage: function(e) {
              return ""
          },
          changeNicknameMessage: function(e) {
              return ""
          },
          changeAdPermissionMessage: function(e) {
              return ""
          },
          changeNochatPermissionMessage: function(e) {
              return ""
          },
          freezeMessage: function() {
              return ""
          },
          unfreezeMessage: function() {
              return ""
          },
          reportMessage: function(e) {
              return ""
          },
          reportFailMessage: function(e) {
              return ""
          },
          kickMessage: function(e) {
              return ""
          },
          sysMessage: function(e) {
              return ""
          },
          setTitleMessage: function(e) {
              return ""
          },
          rewardNewMessage: function(e) {
              return ""
          },
          reactionMessage: function(e) {
              return ""
          },
          getEmoticonHtml: function(e) {
              var t = e || {};
              return t.item_id && t.resource_id && t.item_sub_type ? '<div class="kakao_emoticon e_cover"><img src="https://mk.kakaocdn.net/dn/emoticon/static/images/sdk/no_img.png" data-id="' + t.item_id + '" data-idx="' + t.resource_id + '" data-type="' + t.item_sub_type + '" width="70" height="70" class="thumb_img" alt=""></div>' : ""
          }
      });
      window.Chat = window.Class.extend({
          init: function(t, n, i, s, o) {
              this.ob = t, this.uiClass = s, this.config = {
                  groupid: n,
                  phase: o
              }, this.ws = new window.webChat.open(this.config), this.bindReceiveEvent(this.ws, s), this.bindBrowserEvent(), this.$chatArea = e(i), this.elems = [], this.appendTimer()
          },
          reconnection: function() {
              this.ws.destroy(), this.clearChat(), this.ws = new window.webChat.open(this.config), this.bindReceiveEvent(this.ws, this.uiClass)
          },
          setProhibitWords: function(e) {
              this.config.prohibit_words = e || [], this.ws && this.ws.setProhibitWords(this.config.prohibit_words)
          },
          clearChat: function() {
              this.$chatArea.empty()
          },
          isBottom: function() {
              return this.$chatArea.prop("scrollHeight") - this.$chatArea.scrollTop() - 20 <= this.$chatArea.prop("clientHeight")
          },
          goToTheBottom: function() {
              this.$chatArea.scrollTop(this.$chatArea.prop("scrollHeight"))
          },
          isOverMaxMessage: function() {
              return this.$chatArea.children().length > 500
          },
          appendTimer: function() {
              var e = this;
              window.setInterval(function() {
                  e.append()
              }, 300)
          },
          append: function() {
              var e = this.elems;
              if (this.elems = [], e.length > 0) {
                  var t = this.isBottom();
                  this.$chatArea.append(e), t ? this.goToTheBottom() : this.ob.emit("displayNewButton", !0), this.removeElems(t), this.ob.emit("emoticon:update")
              }
          },
          removeElems: function(e) {
              var t = this.$chatArea.children().length - 500;
              if (!(t < 0)) {
                  var n;
                  if (e) {
                      for (n = 0; n < t; n += 1) this.$chatArea.children().first().remove();
                      this.goToTheBottom()
                  } else {
                      var i = this.$chatArea.scrollTop();
                      for (n = 0; n < t; n += 1) {
                          var s = this.$chatArea.children().first();
                          i -= s.outerHeight(!0), s.remove()
                      }
                      this.$chatArea.scrollTop(i)
                  }
              }
          },
          appendEl: function(e) {
              if (e)
                  if (Array.isArray(e))
                      for (var t = 0, n = e.length; t < n; t += 1) this.elems.push(e[t]);
                  else this.elems.push(e)
          },
          setFreeze: function(e) {
              this.ws.setFreeze(e)
          },
          bindReceiveEvent: function(e, t) {
              var n = this;
              e.on("open", function(e, i) {
                  n.roomInfo = e, n.myInfo = i, n.appendEl(t.openMessage(e, i))
              }), e.on("close", function(e) {
                  n.appendEl(t.closeMessage(e))
              }), e.on("error", function(e) {
                  n.appendEl(t.errorMessage(e))
              }), e.on("message", function(e) {
                  n.appendEl(t.chatMessage(e))
              }), e.on("reward", function(e) {
                  n.appendEl(t.rewardMessage(e))
              }), e.on("send:error", function(e) {
                  n.appendEl(t.sendFailMessage(e)), "NeedLogin" === e.code || "NoChat" === e.code ? n.ob.emit("readonly", e) : "modifiedAuth" === e.code && (n.reconnection(), n.ob.emit("modifiedAuth", e))
              }), e.on("send:ok", function(e) {
                  n.appendEl(t.sendOkMessage(e))
              }), e.on("user:join", function(e) {
                  n.appendEl(t.joinMessage(e))
              }), e.on("user:exit", function(e) {
                  n.appendEl(t.partMessage(e))
              }), e.on("user:change:nick", function(e) {
                  n.appendEl(t.changeNicknameMessage(e))
              }), e.on("permission:ad", function(e) {
                  n.appendEl(t.changeAdPermissionMessage(e))
              }), e.on("title", function(e) {
                  n.appendEl(t.setTitleMessage(e))
              }), e.on("permission:nochat", function(e) {
                  n.appendEl(t.changeNochatPermissionMessage(e))
              }), e.on("chat:freeze", function() {
                  n.appendEl(t.freezeMessage())
              }), e.on("chat:unfreeze", function() {
                  n.appendEl(t.unfreezeMessage())
              }), e.on("report", function(e) {
                  n.appendEl(t.reportMessage(e))
              }), e.on("report:error", function(e) {
                  n.appendEl(t.reportFailMessage(e)), "modifiedAuth" === e.code && (n.reconnection(), n.ob.emit("modifiedAuth", e))
              }), e.on("manage:error", function(e) {
                  "modifiedAuth" === e.code && (n.reconnection(), n.ob.emit("modifiedAuth", e))
              }), e.on("kick", function(e) {
                  n.appendEl(t.kickMessage(e))
              }), e.on("msg", function(e) {
                  if (e.type) switch (e.type) {
                      case "REACTION":
                          n.appendEl(t.reactionMessage(e.data));
                          break;
                      case "SYSMSG":
                          n.appendEl(t.sysMessage(e.data));
                          break;
                      case "REWARD":
                          n.appendEl(t.rewardNewMessage(e.data))
                  }
              })
          },
          bindBrowserEvent: function() {
              var t = this;
              e(window).resize(function() {
                  t.goToTheBottom()
              })
          }
      })
  }),
  function(e) {
      "use strict";
      Object.create || (Object.create = function() {
          function e() {}
          return function(t) {
              if (1 !== arguments.length) throw new Error("Object.create implementation only accepts one parameter.");
              return e.prototype = t, new e
          }
      }());
      var t = /xyz/.test(function() {
          xyz
      }) ? /\b_super\b/ : /.*/;

      function n() {}
      n.extend = function(e) {
          var i = this.prototype,
              s = Object.create(i);
          for (var o in e) s[o] = "function" == typeof e[o] && "function" == typeof i[o] && t.test(e[o]) ? function(e, t) {
              return function() {
                  var n = this._super;
                  this._super = i[e];
                  var s = t.apply(this, arguments);
                  return this._super = n, s
              }
          }(o, e[o]) : e[o];
          var r = function() {
              "function" == typeof this.init && this.init.apply(this, arguments)
          };
          return r.prototype = s, s.constructor = r, r.extend = n.extend, r
      }, e.Class = n
  }(this), window.jQuery(function() {
      "use strict";
      var e = window.Emoticon = Class.extend({
          init: function(e, t) {
              Kakao.init(t), this.EMOTICON_UPDATE_FLAG = !1, this.sandbox = e, this.bindEvent()
          },
          bindEvent: function() {
              var e = this,
                  t = this.sandbox;
              t.on("emoticon:updateAsync", function() {
                  e.updateAsync()
              }), t.on("emoticon:update", function() {
                  e.update()
              }), window.setInterval(function() {
                  e.EMOTICON_UPDATE_FLAG && e.update()
              }, 300)
          },
          update: function() {
              this.EMOTICON_UPDATE_FLAG = !1, Kakao.Emoticon.update("kakao_emoticon")
          },
          updateAsync: function() {
              this.EMOTICON_UPDATE_FLAG = !0
          },
          getHtml: function(e) {
              var t = e || {};
              return t.item_id && t.resource_id && t.item_sub_type ? '<div class="kakao_emoticon e_cover"><img src="https://mk.kakaocdn.net/dn/emoticon/static/images/sdk/no_img.png" data-id="' + t.item_id + '" data-idx="' + t.resource_id + '" data-type="' + t.item_sub_type + '" width="70" height="70" class="thumb_img" alt=""></div>' : ""
          }
      });
      window.Emoticon = e
  }),
  function(e) {
      "use strict";
      e.Observer = Class.extend({
          on: function(e, t) {
              for (var n = [].concat(e), i = 0, s = n.length; i < s; i++) this.addListener.apply(this, [n[i], t]);
              return this
          },
          addListener: function(e, t) {
              return this.getListeners(e).push(t), this
          },
          once: function(e, t) {
              if (t) {
                  var n = this,
                      i = function() {
                          n.off(e, i), t.apply(this, arguments)
                      };
                  t.__onetime_listener = i, this.on(e, i)
              }
          },
          emit: function(e) {
              for (var t = [].concat(e), n = [].slice.call(arguments, 1), i = 0, s = t.length; i < s; i++) this._emit(t[i], n);
              return this
          },
          _emit: function(e, t) {
              var n = this.getListeners(e).slice(0);
              if (void 0 !== n)
                  for (var i = 0, s = n.length; i < s; i++) try {
                      n[i].apply(this, t)
                  } catch (o) {
                      throw "undefined" != typeof console && console.error('failed on while "' + e + '" event, caused by\r\n > ' + o), o
                  }
          },
          getListeners: function(e) {
              return this.listeners = this.listeners || {}, this.listeners[e] = this.listeners[e] || [], this.listeners[e]
          },
          off: function(e, t) {
              var n = [].concat(e);
              t && "function" == typeof t.__onetime_listener && (t = t.__onetime_listener);
              for (var i = 0, s = n.length; i < s; i++) this.removeListener.apply(this, [n[i], t]);
              return t && "function" == typeof t.__onetime_listener && delete t.__onetime_listener, this
          },
          removeListener: function(e, t) {
              var n = this.getListeners(e);
              if (void 0 !== n)
                  for (var i = 0, s = n.length; i < s; i++)
                      if (n[i] === t || n[i].__original__ === t) {
                          n.splice(i, 1);
                          break
                      }
              return this
          },
          destroy: function() {
              this.listeners = null
          }
      })
  }(this);
/*! kakaotv_live - v0.0.28 - 2018-04-13
* Copyright (c) 2018 Video Tech Cell, in Kakao corp.;*/

window.jQuery(function(e) {
  "use strict";
  var t = function(e) {
      this.ob = e, this._login = !1, this._user = null, this.init()
  };
  t.prototype = {
      init: function() {},
      clear: function() {
          this._login = !1, this._user = null
      },
      check: function(t) {
          var n = this;
          e.get({
              url: "/kakaotv/live/api/my",
              cache: !1
          }).done(function(e) {
              if (401 === e.status) return n.clear(), t(e);
              n._login = !0, n._user = e, t(null, e)
          }).fail(function(e) {
              return n.clear(), t(e)
          })
      },
      login: function(e) {
          var t = "https://" + (phase ? phase + "-" : "") + "tv.kakao.com/chatauth",
              n = window.open(t, "log-in", "width=1250,height=1200");
          if (!n) return alert("팝업 차단을 해제하신 후 다시 시도하세요");
          var o = this,
              i = setInterval(function() {
                  n.closed && (o.check(function(t, n) {
                      n ? o.ob.emit("auth:success") : o.ob.emit("auth:fail"), e(t, n)
                  }), clearInterval(i))
              }, 1e3)
      }
  }, window.Auth = t
}), window.jQuery(function(e) {
  var t = function(t, n) {
      this.sandbox = t, this.elInput = e(".tf_chat", n), this.elInputContainer = e(".write_chat", n), this.elSubmit = e("button[type=submit]", n), this.elEmoticonBtn = e(".emoticonBtn", n), this.bindEvent()
  };
  t.prototype = {
      focus: function() {
          this.elInput.focus()
      },
      getMsg: function() {
          return this.elInput.val()
      },
      setMsg: function(e) {
          this.elInput.val(e)
      },
      clearMsg: function() {
          this.elInput.val("")
      },
      sendMsg: function() {
          this.sandbox.emit("chat:input", this.getMsg()), this.clearMsg()
      },
      bindEvent: function() {
          var e = this,
              t = this.elInput,
              n = this.elInputContainer;
          t.on("keydown", function(e) {
              13 === e.keyCode && e.preventDefault()
          }), t.on("keyup", function(t) {
              13 === t.keyCode && (t.preventDefault(), e.sendMsg())
          }), t.on("focus", function() {
              n.addClass("write_on")
          }), t.on("blur", function() {
              n.removeClass("write_on")
          });
          this.elSubmit.on("click", function(t) {
              t.preventDefault(), e.sendMsg()
          });
          var o = this.sandbox;
          this.elEmoticonBtn.on("click", function(e) {
              e.stopPropagation(), o.emit("emoticon:open")
          })
      }
  }, window.ChatInput = t
}), window.jQuery(function(e) {
  "use strict";
  var t = null,
      n = 0,
      o = Emoticon.extend({
          init: function(t, n, o, i) {
              this._super(t, n), this.auth = i, this.emoticonKeyboardLayer = e(".keyboard_layer", o).get(0), this.elEmoticonView = e(".emoticon-view", o), this.elEmoticonImg = e("img", o), this.elClearBtn = e(".clear-btn", o), this.initializeEmoticon(), this.bindInputEvent()
          },
          bindInputEvent: function() {
              var e = this,
                  t = this.sandbox;
              t.on("emoticon:open", function() {
                  e.openKeyboard()
              }), t.on("emoticon:clear", function() {
                  e.hideEmoticonView(), e.clearSelectedEmoticon()
              }), t.on("emoticon:selected", function(t) {
                  e.elEmoticonImg.attr("src", t), e.showEmoticonView()
              });
              this.elClearBtn.on("click", function(e) {
                  e.preventDefault(), t.emit("emoticon:clear")
              })
          },
          reset: function() {
              n = 3, Kakao.Emoticon.reset()
          },
          openKeyboard: function() {
              var e = this;
              0 === n ? (n = 1, this.auth.check(function(t, o) {
                  t ? e.auth.login(function(t, o) {
                      t ? n = 0 : (n = 2, Kakao.Emoticon.showKeyboard(e.emoticonKeyboardLayer))
                  }) : (n = 2, Kakao.Emoticon.showKeyboard(e.emoticonKeyboardLayer))
              })) : 3 === n ? (n = 2, Kakao.Emoticon.showKeyboard(e.emoticonKeyboardLayer)) : 2 === n && Kakao.Emoticon.toggleKeyboard(this.emoticonKeyboardLayer)
          },
          initializeEmoticon: function(e) {
              var n = this;
              Kakao.Emoticon.init({
                  tabmenu: "TOP",
                  isCompact: !0,
                  useAppKey: !0,
                  callback: {
                      selectEmoticon: function(e) {
                          t = {
                              item_id: e.item_id,
                              resource_id: e.resource_id,
                              item_sub_type: e.item_sub_type,
                              item_version: e.item_version
                          }, n.sandbox.emit("emoticon:selected", e.image_url)
                      },
                      showKeyboard: function() {},
                      hideKeyboard: function() {}
                  }
              })
          },
          getSelectedEmoticon: function() {
              return t
          },
          clearSelectedEmoticon: function() {
              t = null
          },
          getOnceSelectedEmoticon: function() {
              var e = t;
              return this.clearSelectedEmoticon(), e
          },
          showEmoticonView: function() {
              this.elEmoticonView.removeClass("hide")
          },
          hideEmoticonView: function() {
              this.elEmoticonView.addClass("hide")
          }
      });
  window.EmoticonExt = o
}), window.jQuery(function(e) {
  window.ChatUI = window.BaseUIClass.extend({
      addLogMessage: function(t) {
          var n = e("<li>"),
              o = e('<span class="txt_system">').html(t);
          return n.append(o)
      },
      addPrefixUsername: function(e) {
          return "PD" === e ? "[PD] " : "AD" === e ? "[AD] " : "GM" === e ? "[GM] " : ""
      },
      addChatMessage: function(e, t) {
          var n = webChat.utils.escapeHTML(e.msg),
              o = webChat.utils.escapeHTML(e.nickname),
              i = "";
          t ? "ALONE" === e.target ? i += "To " + e.targetNickname : (i = this.addPrefixUsername(e.perm), i += o) : ("ALONE" === e.target && (i += "From "), i = this.addPrefixUsername(e.perm), i += o);
          var s = document.createElement("li"),
              a = '<a href="#none" class="link_id ' + (e.perm && "NORMAL" !== e.perm || t ? "my" : "") + '" data-nickname="' + o + '" data-sessionid="' + e.sessionid + '">' + i + "</a>",
              c = '<span class="txt_talk">' + n + "</span>";
          return s.innerHTML = a + this.getEmoticonHtml(e.emoticon) + c, s
      },
      addRewardMessage: function(t) {
          var n = e('<div class="box_alert">').html('<strong class="screen_out">메세지 안내</strong><span class="txt_cookie"><span>' + t.reward + '</span>쿠키</span><em class="screen_out">보낸사람</em><span class="txt_name"></span><em class="screen_out">메세지</em><p class="txt_msg"></p>');
          e(".txt_name", n).html(webChat.utils.escapeHTML(t.nickname)), e(".txt_msg", n).html(webChat.utils.escapeHTML(t.msg) || "");
          return e("<li>").append(n)
      },
      openMessage: function(e) {
          return this.addLogMessage("채팅방에 입장 하셨습니다.")
      },
      closeMessage: function(e) {
          return this.addLogMessage("서버와의 연결이 끊어졌습니다.")
      },
      errorMessage: function(e) {
          return ""
      },
      chatMessage: function(e) {
          return this.addChatMessage(e)
      },
      rewardMessage: function(e) {
          return this.addRewardMessage(e)
      },
      sendFailMessage: function(e) {
          return "TooManyRequest" === e.code ? this.addLogMessage("너무 많은 입력으로 위의 메시지가 서버로 전송되지 않습니다.") : "NeedLogin" === e.code ? this.addLogMessage("로그인이 필요합니다.") : "NoChatRoom" === e.code ? this.addLogMessage("관리자만 채팅이 가능합니다.") : "NoChat" === e.code ? this.addLogMessage("쓰기 권한이 없습니다.") : "TooLongMsg" === e.code ? this.addLogMessage("채팅 메시지는 최대 100자까지 입력 가능합니다.") : "TooLongAmsg" === e.code ? this.addLogMessage("채팅 메시지는 최대 500자까지 입력 가능합니다.") : "ProhibitWords" === e.code ? this.addLogMessage("입력하신 단어는 금칙어로 설정되어 있습니다.") : "NotExistChatRoom" === e.code ? this.addLogMessage("방송이 종료되었습니다.") : "modifiedAuth" === e.code ? this.addLogMessage("새로운 계정으로 접근하여 다시 입장합니다.") : this.addLogMessage(e.code)
      },
      sendOkMessage: function(e) {
          return this.addChatMessage(e, !0)
      },
      joinMessage: function(e) {
          return ""
      },
      partMessage: function(e) {
          return ""
      },
      changeNicknameMessage: function(e) {
          return this.addLogMessage(webChat.utils.escapeHTML(e.beforeNick) + "님이 " + webChat.utils.escapeHTML(e.afterNick) + "(으)로 닉네임을 변경하셨습니다.")
      },
      changeAdPermissionMessage: function(e) {
          var t = webChat.utils.escapeHTML(e.nickname);
          e.permission ? this.addLogMessage(t + "님이 매니저에 임명되었습니다.") : this.addLogMessage(t + "님이 매니저에서 해임되었습니다.")
      },
      changeNochatPermissionMessage: function(e) {
          var t = webChat.utils.escapeHTML(e.nickname);
          e.permission ? this.addLogMessage(t + "님이 " + webChat.utils.escapeHTML(e.executor) + "에 의해 채팅이 금지되었습니다.") : this.addLogMessage(t + "님이 채팅금지가 해제 되었습니다.")
      },
      freezeMessage: function() {
          return this.addLogMessage("pd와 매니저만 채팅이 허용됩니다.")
      },
      unfreezeMessage: function() {
          return this.addLogMessage("누구나 채팅에 참여 할 수 있습니다.")
      },
      reportMessage: function(e) {
          return this.addLogMessage(webChat.utils.escapeHTML(e.target) + " 님이 " + e.currentCount + "회 신고되었습니다.(" + e.maxCount + "회 누적시 채팅금지)")
      },
      reportFailMessage: function(e) {
          return "AlreadyReported" === e.code ? this.addLogMessage("이미 신고하셨습니다.") : "TooManyRequest" === e.code ? this.addLogMessage("너무 많은 입력으로 위의 메시지가 서버로 전송되지 않습니다.") : "NeedLogin" === e.code ? this.addLogMessage("로그인이 필요합니다.") : "NotExistTargetInfo" === e.code ? this.addLogMessage("신고자가 존재하지 않습니다.") : "NotBeYourself" === e.code ? this.addLogMessage("자기 자신을 신고할 수 없습니다.") : "NoPermission" === e.code ? this.addLogMessage("신고할 권한이 없습니다.") : "modifiedAuth" === e.code ? this.addLogMessage("새로운 계정으로 접근하여 다시 입장합니다.") : this.addLogMessage(e.code)
      },
      kickMessage: function(e) {
          return e.source_id === e.target_id ? this.addLogMessage("내 계정이 동일한 라이브방송 채팅에 참여하고 있습니다.") : this.addLogMessage(webChat.utils.escapeHTML(e.target) + "님이 퇴장당하였습니다.")
      },
      sysMessage: function(e) {
          return ""
      },
      rewardNewMessage: function(e) {
          return ""
      }
  })
}), window.jQuery(function(e) {
  if (!webChat) return alert("require webchat sdk.");
  if (!webChat.isSuppotedWebSocket && !webChat.isSuppotedPotSocket) return alert("browser does not support websocket.");
  var t = window.Auth,
      n = window.Chat,
      o = window.ChatUI,
      i = window.EmoticonExt,
      s = window.ChatInput,
      a = new(0, window.Observer),
      c = new t(a),
      r = new i(a, emoticonkey, e("#emoticonContainer"), c),
      d = new o(a, r),
      u = new n(a, groupid, e("#chatArea"), d, phase),
      h = new s(a, e("#inputContainer"));
  e.get("//t1.daumcdn.net/potplayer/chat/prohibit_words.json", function(e) {
      try {
          var t = JSON.parse(e);
          u.setProhibitWords(t.data)
      } catch (e) {}
  }), a.on("chat:input", function(e) {
      var t = r.getOnceSelectedEmoticon();
      (e || t) && (u.ws.send(e, t), u.goToTheBottom(), a.emit("emoticon:clear"))
  }), a.on("emoticon:selected", function() {
      h.focus()
  }), a.on("emoticon:clear", function() {
      h.focus()
  }), a.on("emoticon:modifiedAuth", function() {
      u.reconnection()
  }), a.on("readonly", function(e) {
      "NeedLogin" === e.code && c.login(function(t, n) {
          !t && e && h.setMsg(e.failedMsg)
      })
  }), a.on("modifiedAuth", function() {
      r.reset()
  }), a.on("auth:unauthorized", function() {
      u.reconnection()
  }), a.on("auth:success", function() {
      u.reconnection(), r.reset()
  })
});