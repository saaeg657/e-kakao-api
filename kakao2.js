/**
 * Kakao Javascript SDK for Kakao Open Platform Service - v1.14.0
 *
 * Copyright 2017 Kakao Corp.
 *
 * 혻
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
  return typeof t
} : function(t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
! function(t) {
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
      var e;
      e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Kakao = t()
  }
}(function() {
  var t;
  return function e(t, n, i) {
      function o(s, a) {
          if (!n[s]) {
              if (!t[s]) {
                  var c = "function" == typeof require && require;
                  if (!a && c) return c(s, !0);
                  if (r) return r(s, !0);
                  var u = new Error("Cannot find module '" + s + "'");
                  throw u.code = "MODULE_NOT_FOUND", u
              }
              var l = n[s] = {
                  exports: {}
              };
              t[s][0].call(l.exports, function(e) {
                  var n = t[s][1][e];
                  return o(n ? n : e)
              }, l, l.exports, e, t, n, i)
          }
          return n[s].exports
      }
      for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
      return o
  }({
      1: [function(t, e) {
          e.exports = function() {
              function e() {
                  return "Bearer " + i.getAccessToken()
              }

              function n() {
                  return "KakaoAK " + i.getAppKey()
              }
              var i = t("./auth.js");
              return {
                  accessToken: e,
                  appKey: n,
                  tokenOrKey: i.getAccessToken() ? e : n
              }
          }()
      }, {
          "./auth.js": 3
      }],
      2: [function(t, e) {
          e.exports = function() {
              function e() {
                  return s || (s = u.guardCreateEasyXDM(function() {
                      return new a.Rpc({
                          remote: u.URL.apiRemote
                      }, {
                          remote: {
                              request: {}
                          }
                      })
                  })), s
              }

              function n(t) {
                  return "/v1/api/story/upload/multi" === t || "/v2/api/talk/message/image/upload" === t
              }

              function i(t) {
                  if (!c.isString(t)) return !1;
                  if (0 === t.length || t.length > 2048) throw new u.KakaoError("content length should be between 0 and 2048");
                  return !0
              }

              function o(t) {
                  return c.isArray(t) ? c.every(t, function(t) {
                      if (!c.isString(t)) return !1;
                      if (c.isURL(t)) throw new u.KakaoError("url in image_url_list should be a kage url, obtained from '/v1/api/story/upload/multi'.");
                      return !0
                  }) : !1
              }
              var r = {};
              t("../vendor/es6-promise.js");
              var s, a = t("../vendor/easyXDM.js"),
                  c = t("./util.js"),
                  u = t("./common.js"),
                  l = t("./api.authType");
              r.request = function(t) {
                  function i() {
                      var e = {};
                      c.each(t.data, function(t, n) {
                          e[n] = c.isString(t) ? t : JSON.stringify(t)
                      });
                      var i = {
                              url: s,
                              method: d.api[s].method,
                              headers: {
                                  KA: u.KAKAO_AGENT
                              },
                              data: e
                          },
                          r = d.api[s].authType || l.accessToken;
                      return i.headers.Authorization = r(), new Promise(function(e, r) {
                          if (n(s)) {
                              if (!t.files && !t.data.file) throw new u.KakaoError("'files' parameter should be set for " + s);
                              o(t.files || t.data.file).then(function(t) {
                                  i.file = t, e(i)
                              }, function(t) {
                                  r(t)
                              })
                          } else e(i)
                      })
                  }

                  function o(t) {
                      return new Promise(function(e, n) {
                          var i = c.map(t, function(t) {
                              return u.serializeFile(t).then(function(e) {
                                  return {
                                      name: t.name,
                                      type: t.type,
                                      str: e
                                  }
                              })
                          });
                          Promise.all(i).then(function(t) {
                              e({
                                  paramName: "file",
                                  data: t
                              })
                          }, function(t) {
                              n(t)
                          })
                      })
                  }

                  function r(t) {
                      try {
                          u.logDebug(t);
                          var e = t.message;
                          return JSON.parse(e.responseText)
                      } catch (n) {
                          return {
                              code: -777,
                              msg: "Unknown error"
                          }
                      }
                  }
                  t = u.processRules(t, d.request, "API.request");
                  var s = t.url,
                      a = d.api[s].data;
                  return a && (t.data = u.processRules(t.data, d.api[s].data, "API.request - " + s)), new Promise(function(n, o) {
                      i().then(function(i) {
                          e().request(i, function(e) {
                              t.success(e), t.always(e), n(e)
                          }, function(e) {
                              var n = r(e);
                              t.fail(n), t.always(n), o(n)
                          })
                      }, function(t) {
                          o(t)
                      })
                  })
              }, r.createAPIAlias = function(t) {
                  return function(e) {
                      return e = e || {}, c.defaults(e, t), r.request(e)
                  }
              };
              var h = {
                      permission: c.isOneOf(["A", "F", "M"]),
                      enable_share: c.isBoolean,
                      android_exec_param: c.isString,
                      ios_exec_param: c.isString,
                      android_market_param: c.isString,
                      ios_market_param: c.isString
                  },
                  p = {
                      secure_resource: c.isBoolean
                  },
                  d = {
                      request: {
                          required: {
                              url: function(t) {
                                  return c.isOneOf(c.keys(d.api))(t)
                              }
                          },
                          optional: {
                              data: c.isObject,
                              files: function(t) {
                                  return c.passesOneOf([c.isArray, c.isFileList])(t) && c.every(t, c.passesOneOf([c.isFile, c.isBlob]))
                              },
                              file: c.isFile,
                              success: c.isFunction,
                              fail: c.isFunction,
                              always: c.isFunction
                          },
                          defaults: {
                              data: {},
                              success: c.emptyFunc,
                              fail: c.emptyFunc,
                              always: c.emptyFunc
                          }
                      },
                      api: {
                          "/v1/user/signup": {
                              method: "post",
                              data: {
                                  optional: {
                                      properties: c.isObject
                                  }
                              }
                          },
                          "/v1/user/unlink": {
                              method: "post"
                          },
                          "/v1/user/me": {
                              method: "post",
                              data: {
                                  optional: c.extend({
                                      propertyKeys: c.isArray
                                  }, p)
                              }
                          },
                          "/v1/user/logout": {
                              method: "post",
                              data: {}
                          },
                          "/v1/user/update_profile": {
                              method: "post",
                              data: {
                                  required: {
                                      properties: c.isObject
                                  }
                              }
                          },
                          "/v1/api/talk/profile": {
                              method: "get",
                              data: {
                                  optional: p
                              }
                          },
                          "/v1/api/talk/memo/send": {
                              method: "post",
                              data: {
                                  required: {
                                      template_id: c.passesOneOf([c.isNumber, c.isString])
                                  },
                                  optional: {
                                      args: c.isString
                                  }
                              }
                          },
                          "/v2/api/talk/memo/send": {
                              method: "post",
                              data: {
                                  required: {
                                      template_id: c.isNumber
                                  },
                                  optional: {
                                      args: c.isString
                                  }
                              }
                          },
                          "/v2/api/talk/memo/scrap/send": {
                              method: "post",
                              data: {
                                  required: {
                                      request_url: c.isString
                                  },
                                  optional: {
                                      template_id: c.isNumber,
                                      template_args: c.isObject
                                  }
                              }
                          },
                          "/v2/api/talk/memo/default/send": {
                              method: "post",
                              data: {
                                  required: {
                                      template_object: c.isObject
                                  }
                              }
                          },
                          "/v1/api/story/profile": {
                              method: "get",
                              data: {
                                  optional: p
                              }
                          },
                          "/v1/api/story/isstoryuser": {
                              method: "get"
                          },
                          "/v1/api/story/mystory": {
                              method: "get",
                              data: {
                                  required: {
                                      id: c.isString
                                  }
                              }
                          },
                          "/v1/api/story/mystories": {
                              method: "get",
                              data: {
                                  optional: {
                                      last_id: c.isString
                                  }
                              }
                          },
                          "/v1/api/story/linkinfo": {
                              method: "get",
                              data: {
                                  required: {
                                      url: c.isString
                                  }
                              }
                          },
                          "/v1/api/story/post/note": {
                              method: "post",
                              data: {
                                  required: {
                                      content: i
                                  },
                                  optional: h
                              }
                          },
                          "/v1/api/story/post/photo": {
                              method: "post",
                              data: {
                                  required: {
                                      image_url_list: o
                                  },
                                  optional: c.extend({
                                      content: i
                                  }, h)
                              }
                          },
                          "/v1/api/story/post/link": {
                              method: "post",
                              data: {
                                  required: {
                                      link_info: c.isObject
                                  },
                                  optional: c.extend({
                                      content: i
                                  }, h)
                              }
                          },
                          "/v1/api/story/upload/multi": {
                              method: "post",
                              data: {}
                          },
                          "/v1/emoticon/my_items": {
                              method: "get",
                              data: {},
                              authType: l.appKey
                          },
                          "/v1/emoticon/item_resources": {
                              method: "get",
                              data: {
                                  required: {
                                      id: c.isString
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v1/api/story/delete/mystory": {
                              method: "delete",
                              data: {
                                  required: {
                                      id: c.isString
                                  }
                              }
                          },
                          "/v2/emoticon/items": {
                              method: "get",
                              authType: l.tokenOrKey
                          },
                          "/v2/emoticon/item": {
                              method: "get",
                              data: {
                                  required: {
                                      id: c.passesOneOf([c.isNumber, c.isString])
                                  }
                              },
                              authType: l.tokenOrKey
                          },
                          "/v2/emoticon/item_resources": {
                              method: "get",
                              authType: l.tokenOrKey
                          },
                          "/v2/emoticon/item_resource": {
                              method: "get",
                              data: {
                                  required: {
                                      id: c.passesOneOf([c.isNumber, c.isString])
                                  }
                              },
                              authType: l.tokenOrKey
                          },
                          "/v1/s2/publish": {
                              method: "post",
                              data: {
                                  required: {
                                      timestamp: c.isNumber,
                                      from: c.isString,
                                      to: c.isString,
                                      action: c.isString
                                  },
                                  defaults: function() {
                                      return {
                                          timestamp: (new Date).getTime()
                                      }
                                  },
                                  optional: {
                                      props: c.isObject
                                  },
                                  after: function(t) {
                                      if (JSON.stringify(t).length > 9e4) throw new u.KakaoError("Event's length is over 90000 bytes.")
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v2/api/kakaolink/talk/template/validate": {
                              method: "get",
                              data: {
                                  required: {
                                      link_ver: c.isString,
                                      template_id: c.isNumber
                                  },
                                  optional: {
                                      template_args: c.isObject
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v2/api/kakaolink/talk/template/scrap": {
                              method: "get",
                              data: {
                                  required: {
                                      link_ver: c.isString,
                                      request_url: c.isString
                                  },
                                  optional: {
                                      template_id: c.isNumber,
                                      template_args: c.isObject
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v2/api/kakaolink/talk/template/default": {
                              method: "get",
                              data: {
                                  required: {
                                      link_ver: c.isString,
                                      template_object: c.isObject
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v1/user/access_token_info": {
                              method: "get",
                              data: {}
                          },
                          "/v2/api/talk/message/image/upload": {
                              method: "post",
                              data: {
                                  required: {
                                      file: c.isObject
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v2/api/talk/message/image/delete": {
                              method: "delete",
                              data: {
                                  required: {
                                      image_url: c.isString
                                  }
                              },
                              authType: l.appKey
                          },
                          "/v2/api/talk/message/image/scrap": {
                              method: "post",
                              data: {
                                  required: {
                                      image_url: c.isString
                                  }
                              },
                              authType: l.appKey
                          }
                      }
                  };
              return r.cleanup = function() {
                  s && (s.destroy(), s = null)
              }, r
          }()
      }, {
          "../vendor/easyXDM.js": 20,
          "../vendor/es6-promise.js": 21,
          "./api.authType": 1,
          "./common.js": 7,
          "./util.js": 17
      }],
      3: [function(t, e) {
          e.exports = function() {
              function e() {
                  I && I.close && I.close()
              }

              function n(t, n) {
                  if (!L) {
                      if (L = o({}, function(n) {
                              n.status ? "ok" == n.status && (e(), x.stop(), L.getAccessToken(n.code, _.RUNTIME.appKey, _.URL.talkLoginRedirectUri)) : s(n, t)
                          }), _.UA.os.android) {
                          var r = function h(e) {
                              if (/\.kakao\.com$/.test(e.origin) && e.data && e.data.substring(0, a.length) === a) {
                                  var n = e.data.split(" ");
                                  if ("postResponse" === n[1]) {
                                      var i = JSON.parse(decodeURIComponent(n[2]));
                                      s(i, t), k.removeEvent(window, "message", h)
                                  } else "browser_fallback_url_data" === n[1] && I.postMessage([a, "browser_fallback_url_data", encodeURIComponent(_.KAKAO_AGENT), location.host].join(" "), _.URL.authDomain)
                              }
                          };
                          k.addEvent(window, "message", r);
                          var a = "postProxy" + n;
                          E.push(function() {
                              k.removeEvent(window, "message", r)
                          })
                      }
                      E.push(function() {
                          L.destroy(), L = null
                      })
                  }
                  var c = i(t, n),
                      l = u(t);
                  I = w.login(n, c, l), x.start(function() {
                      n && L.getCode(n, _.RUNTIME.appKey)
                  }, function() {
                      T("login_time_out"), s({
                          error: "timeout",
                          description: "login timeout. retry."
                      }, t), _.windowOpen(c, O, P)
                  }), x.setStopCondition(function() {
                      return w.hasWebLoginWindow()
                  })
              }

              function i(t, e) {
                  function n() {
                      var n = k.extend({
                          redirect_uri: "kakaojs",
                          response_type: "code",
                          state: e,
                          proxy: "easyXDM_Kakao_" + R.channel + "_provider"
                      }, u(t));
                      return _.URL.authorize + "?" + k.buildQueryString(n)
                  }
                  return R || (R = o({}, function(t) {
                      x.stop();
                      var e = r(t, j);
                      s(t, e)
                  }), E.push(function() {
                      R.destroy(), R = null
                  })), j[e] = t, n()
              }

              function o(t, e) {
                  return k.extend(t, {
                      remote: _.URL.loginWidget,
                      channel: k.getRandomString()
                  }), _.guardCreateEasyXDM(function() {
                      var n = new y.Rpc(t, {
                          local: {
                              postResponse: e,
                              getKakaoAgent: function() {
                                  return _.KAKAO_AGENT
                              }
                          },
                          remote: {
                              getCode: {},
                              getAccessToken: {},
                              setClient: {},
                              setStateToken: {},
                              deleteAuthCookie: {}
                          }
                      });
                      return n.channel = t.channel, n
                  })
              }

              function r(t, e) {
                  if (!k.has(e, t.stateToken)) throw new _.KakaoError("security error: #CST2");
                  var n = e[t.stateToken];
                  return delete e[t.stateToken], delete t.stateToken, n
              }

              function s(t, e) {
                  t.error ? a(t) : (v.setAccessToken(t.access_token, e.persistAccessToken), S.dispatch("LOGIN")), c(t, e)
              }

              function a(t) {
                  var e = "access_denied";
                  t.error != e && v.setAccessToken(null)
              }

              function c(t, e) {
                  _.logDebug(t), t.error ? (e.fail(t), e.always(t)) : (e.success(t), e.always(t))
              }

              function u(t) {
                  var e = {
                      client_id: _.RUNTIME.appKey
                  };
                  return t.approvalType && (e.approval_type = t.approvalType), t.scope && (e.scope = t.scope), e
              }

              function l(t, e) {
                  var n = m(e, _.RUNTIME.appKey);
                  k.localStorage.setItem(t, n)
              }

              function h(t) {
                  var e = k.localStorage.getItem(t);
                  return e ? g(e, _.RUNTIME.appKey) : null
              }

              function p(t) {
                  k.localStorage.removeItem(t)
              }

              function d() {
                  return D.accessTokenKey || (D.accessTokenKey = "kakao_" + f("kat" + _.RUNTIME.appKey)), D.accessTokenKey
              }

              function f(t) {
                  var e = b.MD5(t);
                  return e.toString()
              }

              function m(t, e) {
                  var n = b.AES.encrypt(t, e);
                  return n.toString()
              }

              function g(t, e) {
                  var n = b.AES.decrypt(t, e);
                  return n.toString(b.enc.Utf8)
              }
              var v = {},
                  y = t("../vendor/easyXDM.js"),
                  b = t("../vendor/CryptoJS.js"),
                  k = t("./util.js"),
                  _ = t("./common.js"),
                  w = t("./auth.withTalk.js"),
                  x = t("./auth.withTalk.poller.js"),
                  S = t("./common/everntObserver"),
                  T = t("./common/logger"),
                  E = [],
                  O = "_blank",
                  A = "kakaostory_channel_select",
                  P = "width=380, height=520, scrollbars=yes";
              v.createLoginButton = function(t) {
                  function e(t) {
                      if (t.stateToken !== a) throw new _.KakaoError("security error: #CST");
                      return delete t.stateToken, t
                  }

                  function n() {
                      a = k.getRandomString(), c.setStateToken(a)
                  }

                  function i() {
                      var e = u(t);
                      c.setClient(t.lang, t.size, e, function(t) {
                          var e = r.getElementsByTagName("iframe")[0];
                          e.style.width = t.width + "px", e.style.height = t.height + "px"
                      })
                  }
                  t = _.processRules(t, B.createLoginButton, "Auth.createLoginButton");
                  var r = k.getElement(t.container);
                  if (!r) throw new _.KakaoError("container is required for Kakao login button: pass in element or id");
                  var a = "",
                      c = o({
                          container: r
                      }, function(i) {
                          e(i), s(i, t), n()
                      });
                  n(), i(), E.push(function() {
                      c.destroy(), c = null
                  })
              };
              var j = {};
              v.login = function(t) {
                  t = _.processRules(t, B.login, "Auth.login");
                  var e = k.getRandomString() + k.getRandomString();
                  if (T("custom_login"), w.isSupport() && t.throughTalk) n(t, e);
                  else {
                      var o = i(t, e);
                      _.windowOpen(o, O, P)
                  }
                  S.dispatch("LOGIN_START")
              };
              var L, I, R, C, N = {};
              v.selectStoryChannel = function(t) {
                  function e() {
                      var e = k.extend({
                          state: n,
                          proxy: "easyXDM_Kakao_" + C.channel + "_provider",
                          token: t.extendedToken || ""
                      }, u(t));
                      return _.URL.storyChannel + "?" + k.buildQueryString(e)
                  }
                  t = _.processRules(t, B.selectStoryChannel, "Auth.selectStoryChannel"), C || (C = o({}, function(t) {
                      var e = r(t, N);
                      c(t, e)
                  }), E.push(function() {
                      C.destroy(), C = null
                  }));
                  var n = k.getRandomString();
                  N[n] = t, window.open(e(), A, P)
              };
              var U = {
                      success: k.emptyFunc,
                      fail: k.emptyFunc,
                      always: k.emptyFunc
                  },
                  M = k.extend({
                      throughTalk: !0,
                      persistAccessToken: !0,
                      persistRefreshToken: !1
                  }, U),
                  K = {
                      success: k.isFunction,
                      fail: k.isFunction,
                      always: k.isFunction,
                      persistAccessToken: k.isBoolean,
                      persistRefreshToken: k.isBoolean,
                      approvalType: k.isOneOf(["project"]),
                      scope: k.isString,
                      throughTalk: k.isBoolean
                  },
                  B = {
                      createLoginButton: {
                          required: {
                              container: k.passesOneOf([k.isElement, k.isString])
                          },
                          optional: k.extend({
                              lang: k.isOneOf(["en", "kr"]),
                              size: k.isOneOf(["small", "medium", "large"])
                          }, K),
                          defaults: k.extend({
                              lang: "kr",
                              size: "medium"
                          }, M)
                      },
                      login: {
                          optional: K,
                          defaults: M
                      },
                      selectStoryChannel: {
                          optional: {
                              extendedToken: k.isString,
                              success: k.isFunction,
                              fail: k.isFunction,
                              always: k.isFunction
                          },
                          defaults: U
                      }
                  };
              v.logout = function(t) {
                  function e() {
                      var e = o({}, k.emptyFunc);
                      e.deleteAuthCookie(function() {
                          e.destroy(), S.dispatch("LOGOUT"), t(!0)
                      }, function() {
                          e.destroy(), t(!1)
                      })
                  }
                  t = t || k.emptyFunc, _.validate(t, k.isFunction, "Auth.logout"), v.getAccessToken() ? Kakao.API.request({
                      url: "/v1/user/logout",
                      always: function() {
                          v.setAccessToken(null), e()
                      }
                  }) : e()
              }, v.setAccessToken = function(t, e) {
                  _.RUNTIME.accessToken = t, null === t || e === !1 ? p(d()) : l(d(), t)
              }, v.setRefreshToken = function() {
                  console.log("unsupported operation: setRefreshToken()")
              }, v.getAccessToken = function() {
                  return _.RUNTIME.accessToken || (_.RUNTIME.accessToken = h(d())), _.RUNTIME.accessToken
              }, v.getRefreshToken = function() {
                  return console.log("unsupported operation: getRefreshToken()"), ""
              };
              var D = {};
              return v.getAppKey = function() {
                  return _.RUNTIME.appKey
              }, v.getStatus = function(t) {
                  _.validate(t, k.isFunction, "Auth.getStatus"), v.getAccessToken() ? Kakao.API.request({
                      url: "/v1/user/me",
                      success: function(e) {
                          t({
                              status: "connected",
                              user: e
                          })
                      },
                      fail: function() {
                          t({
                              status: "not_connected"
                          })
                      }
                  }) : t({
                      status: "not_connected"
                  })
              }, v.cleanup = function() {
                  k.each(E, function(t) {
                      t()
                  }), E.length = 0
              }, v
          }()
      }, {
          "../vendor/CryptoJS.js": 19,
          "../vendor/easyXDM.js": 20,
          "./auth.withTalk.js": 4,
          "./auth.withTalk.poller.js": 5,
          "./common.js": 7,
          "./common/everntObserver": 9,
          "./common/logger": 10,
          "./util.js": 17
      }],
      4: [function(t, e) {
          e.exports = function() {
              function e(t, e) {
                  return e.state = t, [o.URL.talkLoginScheme, "?", "client_id=" + o.RUNTIME.appKey, "&", "redirect_uri=" + encodeURIComponent(o.URL.talkLoginRedirectUri), "&", "params=" + encodeURIComponent(JSON.stringify(e))].join("")
              }

              function n(t, e, n) {
                  return ["intent:#Intent", "action=com.kakao.talk.intent.action.CAPRI_LOGGED_IN_ACTIVITY", "launchFlags=0x14008000", "S.com.kakao.sdk.talk.appKey=" + o.RUNTIME.appKey, "S.com.kakao.sdk.talk.redirectUri=" + o.URL.talkLoginRedirectUri, "S.com.kakao.sdk.talk.state=" + t, "S.com.kakao.sdk.talk.extraparams=" + encodeURIComponent(JSON.stringify(n)), "S.browser_fallback_url=" + encodeURIComponent(e), "end;"].join(";")
              }
              var i, o = t("./common.js"),
                  r = "_blank",
                  s = "width=380, height=520, scrollbars=yes",
                  a = /Version\/4.0|/i.test(o.UA.ua) && (/Chrome\/30\.0\.0\.0 Mobile/i.test(o.UA.ua) || /; wv\)/i.test(o.UA.ua)),
                  c = /naver\(inapp|fb_iab|daumapps/g.test(o.UA.ua);
              return {
                  isSupport: function() {
                      var t = 9,
                          e = 30;
                      return o.UA.os.ios ? /safari/.test(o.UA.ua) && !/CriOS/i.test(o.UA.ua) && o.UA.browser.version.major >= t : o.UA.os.android ? o.UA.browser.chrome && o.UA.browser.version.major >= e && (!a || a && c) : !1
                  },
                  login: function(t, c, u) {
                      function l() {
                          var t = 40;
                          return o.UA.browser.version.major > t
                      }

                      function h() {
                          setTimeout(function() {
                              i.location.href = c
                          }, 10)
                      }
                      if (this.isSupport()) {
                          if (o.UA.os.ios) {
                              var p = e(t, u);
                              i = o.windowOpen(o.URL.universalKakaoLink + encodeURIComponent(p) + "&web=" + encodeURIComponent(c), r, s)
                          } else if (o.UA.os.android) {
                              var d = n(t, c, u);
                              l() && !a ? i = o.windowOpen(d, r, s) : (i = o.windowOpen("", r, s), i && (i.addEventListener("unload", h), i.location.href = d))
                          }
                          return i
                      }
                  },
                  hasWebLoginWindow: function() {
                      try {
                          return i && i.location && "about:blank" != i.location.href ? o.UA.os.android ? !!i.location.href : !0 : !1
                      } catch (t) {
                          return !0
                      }
                  }
              }
          }()
      }, {
          "./common.js": 7
      }],
      5: [function(t, e) {
          e.exports = function() {
              function t() {
                  return c() ? (e(), void 0) : (++i > r ? (e(), s()) : a(), void 0)
              }

              function e() {
                  clearInterval(n)
              }
              var n, i = 0,
                  o = 1e3,
                  r = 30,
                  s = function() {},
                  a = function() {},
                  c = function() {
                      return !1
                  };
              return {
                  start: function(r, c) {
                      i = 0, "function" == typeof r && (a = r), "function" == typeof c && (s = c), n && e(), n = setInterval(t, o)
                  },
                  stop: function() {
                      e()
                  },
                  setStopCondition: function(t) {
                      "function" == typeof t && (c = t)
                  }
              }
          }()
      }, {}],
      6: [function(t, e) {
          e.exports = function() {
              var e = t("../vendor/userAgent.js");
              return {
                  getOrigin: function() {
                      return location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                  },
                  getNavigator: function() {
                      return navigator
                  },
                  getUA: function() {
                      return e()
                  }
              }
          }()
      }, {
          "../vendor/userAgent.js": 22
      }],
      7: [function(t, e) {
          e.exports = function() {
              var e = {},
                  n = t("./util.js"),
                  i = t("./browserProxy.js"),
                  o = i.getOrigin();
              e.VERSION = "1.14.0", e.KAKAO_AGENT = "sdk/" + e.VERSION + " os/javascript lang/" + (i.getNavigator().userLanguage || i.getNavigator().language) + " device/" + i.getNavigator().platform.replace(/ /g, "_") + " origin/" + encodeURIComponent(o), e.URL = {
                  authorize: "https://kauth.kakao.com/oauth/authorize",
                  loginWidget: "https://kauth.kakao.com/public/widget/login/kakaoLoginWidget.html",
                  apiRemote: "https://kapi.kakao.com/cors/",
                  storyChannel: "https://kauth.kakao.com/story/select_channel",
                  storyShare: "https://story.kakao.com/s/share",
                  channelFollow: "https://story.kakao.com/s/follow",
                  storyIcon: "//dev.kakao.com/sdk/js/resources/story/icon_small.png",
                  universalKakaoLink: "https://talk-apps.kakao.com/scheme/",
                  talkLoginScheme: "kakaokompassauth://authorize",
                  talkLoginRedirectUri: "https://kapi.kakao.com/cors/afterlogin.html",
                  authDomain: "https://kauth.kakao.com",
                  stat: "https://apps.kakao.com/sdk/js",
                  navi: "kakaonavi-sdk://navigate",
                  naviShare: "kakaonavi-sdk://sharePoi",
                  naviWeb: "https://kakaonavi-wguide.kakao.com/openapi"
              }, e.RUNTIME = {
                  appKey: "",
                  accessToken: ""
              }, e.DUMMY_KEY = "YOUR APP KEY", e.UA = i.getUA();
              var r = function(t) {
                  Error.prototype.constructor.apply(this, arguments), this.name = "KakaoError", this.message = t
              };
              return r.prototype = new Error, e.KakaoError = r, e.isDebug = function() {
                  return !1
              }, e.logDebug = function(t) {
                  e.isDebug() && window.console && console.log(JSON.stringify(t))
              }, e.validate = function(t, e, n) {
                  if (e(t) !== !0) throw new r("Illegal argument for " + n)
              }, e.processRules = function(t, i, o) {
                  t = t || {}, i.before && i.before(t), n.isFunction(i.defaults) ? n.defaults(t, i.defaults(t)) : n.defaults(t, i.defaults);
                  var s = i.required || {},
                      a = n.difference(n.keys(s), n.keys(t));
                  if (a.length) throw new r("Missing required keys: " + a.join(",") + " at " + o);
                  var c = i.optional || {},
                      u = n.extend({}, s, c),
                      l = n.difference(n.keys(t), n.keys(u));
                  if (l.length) throw new r("Invalid parameter keys: " + l.join(",") + " at " + o);
                  return n.each(t, function(t, n) {
                      var i = u[n];
                      e.validate(t, i, '"' + n + '" in ' + o)
                  }), i.after && i.after(t), t
              }, e.getInstallUrl = function(t, n) {
                  if (e.UA.os.android) {
                      var i = {
                          appkey: e.RUNTIME.appKey,
                          KA: e.KAKAO_AGENT
                      };
                      return "market://details?id=" + t + "&referrer=" + JSON.stringify(i)
                  }
                  return e.UA.os.ios ? "https://itunes.apple.com/app/id" + n : location.href
              }, e.isRetinaDisplay = function() {
                  var t = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
                  return window.devicePixelRatio > 1 ? !0 : window.matchMedia && window.matchMedia(t).matches ? !0 : !1
              }, e.createHiddenIframe = function(t, e) {
                  var n = document.getElementById(t);
                  return null !== n && n.parentNode.removeChild(n), n = document.createElement("iframe"), n.id = t, n.style.border = "none", n.style.display = "none", n.style.width = "0px", n.style.height = "0px", n.src = e, n
              }, e.guardCreateEasyXDM = function(t) {
                  try {
                      return t()
                  } catch (e) {
                      throw e instanceof TypeError ? new r("kakao.js should be loaded from a web server") : new r("EasyXDM -" + e.message)
                  }
              }, e.serializeFile = function(t) {
                  return new Promise(function(e, i) {
                      "undefined" == typeof FileReader && i(new r("File API is not supported for this browser."));
                      var o = new FileReader;
                      o.onload = function(t) {
                          try {
                              e(n.arrayBufferToString(t.target.result))
                          } catch (t) {
                              i(t)
                          }
                      }, o.onerror = function() {
                          i(new r("Cannot read file: " + t.name))
                      }, o.readAsArrayBuffer(t)
                  })
              }, e.popupWindows = {}, e.windowOpen = function(t, n, i) {
                  var o = e.popupWindows[n];
                  return o && o.close && !o.closed && o.close(), e.popupWindows[n] = window.open(t, n, i), e.popupWindows[n]
              }, e
          }()
      }, {
          "./browserProxy.js": 6,
          "./util.js": 17
      }],
      8: [function(t, e) {
          e.exports = function() {
              var t = function(t) {
                  Error.prototype.constructor.apply(this, arguments), this.name = "KakaoError", this.message = t
              };
              return t.prototype = new Error, t
          }()
      }, {}],
      9: [function(t, e) {
          e.exports = function() {
              var e = t("../util"),
                  n = {};
              return {
                  subscribe: function(t, e) {
                      n[t] || (n[t] = []), n[t].push(e)
                  },
                  unsubscribe: function(t, e) {
                      for (var i = n[t], o = 0; o < l.length; o++)
                          if (i[m] === e) {
                              i.splice(m, 1);
                              break
                          }
                  },
                  dispatch: function(t) {
                      var i = n[t];
                      i && i.length && e.each(i, function(t) {
                          t()
                      })
                  }
              }
          }()
      }, {
          "../util": 17
      }],
      10: [function(t, e) {
          e.exports = function() {
              var e = t("../common.js");
              return function(t, n) {
                  setTimeout(function() {
                      var i = {
                          v: e.VERSION,
                          t: (new Date).getTime(),
                          k: e.RUNTIME.appKey,
                          m: t || ""
                      };
                      n && (i.e = n), (new Image).src = e.URL.stat + "?" + escape(JSON.stringify(i))
                  }, 0)
              }
          }()
      }, {
          "../common.js": 7
      }],
      11: [function(t, e) {
          e.exports = function(e, n, i) {
              var o = t("../util.js"),
                  r = t("./KakaoError"),
                  s = t("./validate");
              e = e || {}, n.before && n.before(e), o.isFunction(n.defaults) ? o.defaults(e, n.defaults(e)) : o.defaults(e, n.defaults);
              var a = n.required || {},
                  c = o.difference(o.keys(a), o.keys(e));
              if (c.length) throw new r("Missing required keys: " + c.join(",") + " at " + i);
              var u = n.optional || {},
                  l = o.extend({}, a, u),
                  h = o.difference(o.keys(e), o.keys(l));
              if (h.length) throw new r("Invalid parameter keys: " + h.join(",") + " at " + i);
              return o.each(e, function(t, e) {
                  var n = l[e];
                  s(t, n, '"' + e + '" in ' + i)
              }), n.after && n.after(e), e
          }
      }, {
          "../util.js": 17,
          "./KakaoError": 8,
          "./validate": 12
      }],
      12: [function(t, e) {
          e.exports = function(e, n, i) {
              var o = t("./KakaoError");
              if (n(e) !== !0) throw new o("Illegal argument for " + i)
          }
      }, {
          "./KakaoError": 8
      }],
      13: [function(t, e) {
          e.exports = function() {
              function e(t, e, i) {
                  var o = f.getElement(e.container);
                  if (!o) throw new m.KakaoError("container is required for KakaoTalk Link: pass in element or id");
                  var r = function(o) {
                      return o.preventDefault(), o.stopPropagation(), n(t, e, i), !1
                  };
                  f.addEvent(o, "click", r), w.push(function() {
                      f.removeEvent(o, "click", r)
                  })
              }

              function n(t, e, n) {
                  return t(e, n).then(function(t) {
                      var n = new _;
                      n.extras = f.extend(n.extras, e.extras), n.template_json = t.template_msg, n.template_args = t.template_args, n.template_id = t.template_id;
                      var i = S + "://send?" + f.buildQueryString(n);
                      if (i.length > 1e4) throw new m.KakaoError("Failed to send message because it exceeds the message size limit. Please contact the app administrator.");
                      l(i, e.fail, e.installTalk);
                      var o = {
                          template_msg: t.template_msg || {},
                          warning_msg: t.warning_msg || {},
                          argument_msg: t.argument_msg || {}
                      };
                      return e.success(o), o
                  }, function(t) {
                      reject(t)
                  })
              }

              function i(t) {
                  return Kakao.API.request({
                      url: "/v2/api/talk/message/image/upload",
                      data: {
                          file: t.file
                      }
                  })
              }

              function o(t) {
                  return Kakao.API.request({
                      url: "/v2/api/talk/message/image/delete",
                      data: {
                          image_url: t.imageUrl
                      }
                  })
              }

              function r(t) {
                  return Kakao.API.request({
                      url: "/v2/api/talk/message/image/scrap",
                      data: {
                          image_url: t.imageUrl
                      }
                  })
              }

              function s(t, e) {
                  var n = new k;
                  return n.forwardable = t.forwardable, n.extras = f.extend(n.extras, t.extras), f.each(t, function(t, i) {
                      var o = y.create(t, i, e);
                      o && n.objs.push(o)
                  }), S + "://send?" + f.buildQueryString(n)
              }

              function a(t) {
                  return Kakao.API.request({
                      url: "/v2/api/kakaolink/talk/template/validate",
                      data: {
                          link_ver: "4.0",
                          template_id: t.templateId,
                          template_args: t.templateArgs
                      }
                  })
              }

              function c(t) {
                  var e = {
                      link_ver: "4.0",
                      request_url: t.requestUrl
                  };
                  return t.templateId && (e.template_id = t.templateId), t.templateArgs && (e.template_args = t.templateArgs), Kakao.API.request({
                      url: "/v2/api/kakaolink/talk/template/scrap",
                      data: e
                  })
              }

              function u(t, e) {
                  var n = {
                      object_type: t.objectType,
                      button_title: t.buttonTitle || ""
                  };
                  return f.each(t, function(t, i) {
                      var o = y.create(t, i, e);
                      o && (n[i] = o)
                  }), "list" == n.object_type && (n.header_title = t.headerTitle || "", n.header_link = n.headerLink || {}, delete n.headerLink), "location" == n.object_type && (n.address = t.address || "", n.address_title = t.addressTitle || ""), Kakao.API.request({
                      url: "/v2/api/kakaolink/talk/template/default",
                      data: {
                          link_ver: "4.0",
                          template_object: n
                      }
                  })
              }

              function l(t, e, n) {
                  var i = {
                      urlScheme: t,
                      intentURI: "intent:" + t + "#Intent;package=com.kakao.talk;end;",
                      appName: "KakaoTalk",
                      storeURL: m.getInstallUrl(h, p),
                      onUnsupportedEnvironment: function() {
                          e(t)
                      }
                  };
                  (!n || v.isIOSKakaoTalkWebView() || v.isAndroidWebView()) && (i.onAppMissing = f.emptyFunc), v.isIOSKakaoTalkWebView() && (i.universalLink = void 0);
                  try {
                      b("send_link"), g(i)
                  } catch (o) {
                      setTimeout(function() {
                          b("send_link_error", o.message || o)
                      }, 0)
                  }
              }
              var h = "com.kakao.talk",
                  p = "362057947",
                  d = {},
                  f = t("./util.js"),
                  m = t("./common.js"),
                  g = t("../vendor/web2app.js"),
                  v = t("./webviewchecker.js")(),
                  y = t("./link.obj.js"),
                  b = t("./common/logger"),
                  k = function() {
                      this.appkey = m.RUNTIME.appKey, this.appver = "1.0", this.apiver = "3.0", this.linkver = "3.5", this.extras = {
                          KA: m.KAKAO_AGENT
                      }, this.objs = []
                  },
                  _ = function() {
                      this.appkey = m.RUNTIME.appKey, this.appver = "1.0", this.linkver = "4.0", this.template_json = {}, this.template_args = {}, this.template_id = "", this.extras = {
                          KA: m.KAKAO_AGENT
                      }
                  },
                  w = [];
              d.createTalkLink = d.createTalkLinkButton = function(t) {
                  t = m.processRules(t, x.createTalkLink, "Link.createTalkLink");
                  var e = f.getElement(t.container);
                  if (!e) throw new m.KakaoError("container is required for KakaoTalk Link: pass in element or id");
                  var n = function() {
                      var e = s(t, "Link.createTalkLink");
                      l(e, t.fail, t.installTalk)
                  };
                  f.addEvent(e, "click", n), w.push(function() {
                      f.removeEvent(e, "click", n)
                  })
              }, d.sendTalkLink = function(t) {
                  t = m.processRules(t, x.talkLink, "Link.sendTalkLink");
                  var e = s(t, "Link.sendTalkLink");
                  l(e, t.fail, t.installTalk)
              }, d.createCustom = d.createCustomButton = function(t) {
                  t = m.processRules(t, x.createCustom, "Link.createCustom"), e(a, t, "Link.createCustom")
              }, d.createScrap = d.createScrapButton = function(t) {
                  t = m.processRules(t, x.createScrap, "Link.createScrap"), e(c, t, "Link.createScrap")
              }, d.createDefault = d.createDefaultButton = function(t) {
                  t = "list" == t.objectType ? m.processRules(t, x.createDefaultList, "Link.createDefaultList") : "location" == t.objectType ? m.processRules(t, x.createDefaultLocation, "Link.createDefaultLocation") : "commerce" == t.objectType ? m.processRules(t, x.createDefaultCommerce, "Link.createDefaultCommerce") : m.processRules(t, x.createDefaultFeed, "Link.createDefaultFeed"), e(u, t, "Link.createDefault")
              }, d.sendCustom = function(t) {
                  var t = m.processRules(t, x.custom, "Link.sendCustomTemplate");
                  return n(a, t, "Link.sendCustomTemplate")
              }, d.sendScrap = function(t) {
                  var t = m.processRules(t, x.scrap, "Link.sendScrap");
                  return n(c, t, "Link.sendScrap")
              }, d.sendDefault = function(t) {
                  if (!t.objectType) throw new m.KakaoError("objectType is required for KakaoTalk Link");
                  var t = m.processRules(t, x[t.objectType], "Link.sendDefault");
                  return n(u, t, "Link.sendDefault")
              }, d.uploadImage = function(t) {
                  return t = m.processRules(t, x.uploadImage, "Link.uploadImage"), i(t)
              }, d.deleteImage = function(t) {
                  return t = m.processRules(t, x.deleteImage, "Link.deleteImage"), o(t)
              }, d.scrapImage = function(t) {
                  return t = m.processRules(t, x.scrapImage, "Link.scrapImage"), r(t)
              };
              var x = {
                  talkLink: {
                      optional: {
                          label: f.passesOneOf([f.isString, f.isObject]),
                          image: f.isObject,
                          webImage: f.isObject,
                          webButton: f.isObject,
                          webLink: f.isObject,
                          appButton: f.isObject,
                          appLink: f.isObject,
                          horizontalButton: f.isArray,
                          fail: f.isFunction,
                          installTalk: f.isBoolean,
                          forwardable: f.isBoolean,
                          extras: f.isObject
                      },
                      before: function(t) {
                          f.isString(t.label) && (t.label = {
                              text: t.label
                          })
                      },
                      defaults: {
                          installTalk: !0,
                          forwardable: !1,
                          fail: f.emptyFunc
                      }
                  },
                  custom: {
                      required: {
                          templateId: f.isNumber
                      },
                      optional: {
                          templateArgs: f.isObject,
                          installTalk: f.isBoolean,
                          fail: f.isFunction,
                          always: f.isFunction,
                          success: f.isFunction,
                          extras: f.isObject
                      },
                      defaults: {
                          templateArgs: {},
                          installTalk: !1,
                          fail: f.emptyFunc,
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  scrap: {
                      required: {
                          requestUrl: f.isString
                      },
                      optional: {
                          templateId: f.isNumber,
                          templateArgs: f.isObject,
                          installTalk: f.isBoolean,
                          fail: f.isFunction,
                          always: f.isFunction,
                          success: f.isFunction,
                          extras: f.isObject
                      },
                      defaults: {
                          templateArgs: {},
                          installTalk: !1,
                          fail: f.emptyFunc,
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  feed: {
                      required: {
                          objectType: f.isOneOf(["feed", "list", "location", "commerce"]),
                          content: f.isObject
                      },
                      optional: {
                          social: f.isObject,
                          buttonTitle: f.isString,
                          buttons: f.isArray,
                          installTalk: f.isBoolean,
                          fail: f.isFunction,
                          always: f.isFunction,
                          success: f.isFunction,
                          extras: f.isObject
                      },
                      defaults: {
                          installTalk: !1,
                          fail: f.emptyFunc,
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  commerce: {
                      required: {
                          objectType: f.isOneOf(["feed", "list", "location", "commerce"]),
                          content: f.isObject,
                          commerce: f.isObject
                      },
                      optional: {
                          buttonTitle: f.isString,
                          buttons: f.isArray,
                          installTalk: f.isBoolean,
                          fail: f.isFunction,
                          always: f.isFunction,
                          success: f.isFunction,
                          extras: f.isObject
                      },
                      defaults: {
                          installTalk: !1,
                          fail: f.emptyFunc,
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  list: {
                      required: {
                          objectType: f.isOneOf(["feed", "list", "location", "commerce"]),
                          headerTitle: f.isString,
                          headerLink: f.isObject,
                          contents: f.isArray
                      },
                      optional: {
                          buttonTitle: f.isString,
                          buttons: f.isArray,
                          installTalk: f.isBoolean,
                          fail: f.isFunction,
                          always: f.isFunction,
                          success: f.isFunction,
                          extras: f.isObject
                      },
                      defaults: {
                          installTalk: !1,
                          fail: f.emptyFunc,
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  location: {
                      required: {
                          objectType: f.isOneOf(["feed", "list", "location", "commerce"]),
                          content: f.isObject,
                          address: f.isString
                      },
                      optional: {
                          addressTitle: f.isString,
                          social: f.isObject,
                          buttonTitle: f.isString,
                          buttons: f.isArray,
                          installTalk: f.isBoolean,
                          fail: f.isFunction,
                          always: f.isFunction,
                          success: f.isFunction,
                          extras: f.isObject
                      },
                      defaults: {
                          installTalk: !1,
                          fail: f.emptyFunc,
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  uploadImage: {
                      required: {
                          file: f.isObject
                      },
                      optional: {
                          always: f.isFunction,
                          success: f.isFunction
                      },
                      defaults: {
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  deleteImage: {
                      required: {
                          imageUrl: f.isString
                      },
                      optional: {
                          always: f.isFunction,
                          success: f.isFunction
                      },
                      defaults: {
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  },
                  scrapImage: {
                      required: {
                          imageUrl: f.isString
                      },
                      optional: {
                          always: f.isFunction,
                          success: f.isFunction
                      },
                      defaults: {
                          always: f.emptyFunc,
                          success: f.emptyFunc
                      }
                  }
              };
              x.createTalkLink = f.extend({
                  required: {
                      container: f.passesOneOf([f.isElement, f.isString])
                  }
              }, x.talkLink), x.createCustom = f.defaults({
                  required: f.extend({
                      container: f.passesOneOf([f.isElement, f.isString])
                  }, x.custom.required)
              }, x.custom), x.createScrap = f.defaults({
                  required: f.extend({
                      container: f.passesOneOf([f.isElement, f.isString])
                  }, x.scrap.required)
              }, x.scrap), x.createDefaultFeed = f.defaults({
                  required: f.extend({
                      container: f.passesOneOf([f.isElement, f.isString])
                  }, x.feed.required)
              }, x.feed), x.createDefaultList = f.defaults({
                  required: f.extend({
                      container: f.passesOneOf([f.isElement, f.isString])
                  }, x.list.required)
              }, x.list), x.createDefaultLocation = f.defaults({
                  required: f.extend({
                      container: f.passesOneOf([f.isElement, f.isString])
                  }, x.location.required)
              }, x.location), x.createDefaultCommerce = f.defaults({
                  required: f.extend({
                      container: f.passesOneOf([f.isElement, f.isString])
                  }, x.commerce.required)
              }, x.commerce);
              var S = function() {
                  var t = "release";
                  return !m.UA.os.ios || "alpha" !== t && "sandbox" !== t ? "kakaolink" : "alphalink"
              }();
              return d.cleanup = function() {
                  f.each(w, function(t) {
                      t()
                  }), w.length = 0
              }, d
          }()
      }, {
          "../vendor/web2app.js": 23,
          "./common.js": 7,
          "./common/logger": 10,
          "./link.obj.js": 14,
          "./util.js": 17,
          "./webviewchecker.js": 18
      }],
      14: [function(t, e) {
          e.exports = function() {
              function e(t) {
                  var e = parseInt(t, 10);
                  if (isNaN(e) || 80 > e) throw new _("Illegal argument for image: width/height should be a number larger than 80");
                  return !0
              }

              function n(t) {
                  t.width = parseInt(t.width, 10), t.height = parseInt(t.height, 10)
              }

              function i(t) {
                  var e = k.keys(t)[0];
                  return "webButton" === e ? w(t.webButton, T[e], "parameter webButton in Link.createTalkLink") : w(t.appButton, T[e], "parameter appButton in Link.createTalkLink"), !0
              }

              function o(t) {
                  var e = k.keys(t[0]),
                      n = k.keys(t[1]),
                      i = t[0][e],
                      o = t[1][n];
                  return {
                      objtype: "horizontal",
                      subs: [{
                          objtype: "button",
                          text: i.text,
                          action: u(i.type, i)
                      }, {
                          objtype: "button",
                          text: o.text,
                          action: u(o.type, o)
                      }],
                      disptype: "both"
                  }
              }

              function r(t) {
                  return {
                      objtype: "label",
                      text: t.text,
                      disptype: t.displayType
                  }
              }

              function s(t, e) {
                  return {
                      objtype: "image",
                      src: e.src,
                      width: e.width,
                      height: e.height,
                      action: u(t, e),
                      disptype: e.displayType
                  }
              }

              function a(t, e) {
                  return {
                      objtype: "button",
                      text: e.text,
                      action: u(t, e),
                      disptype: e.displayType
                  }
              }

              function c(t, e) {
                  return {
                      objtype: "link",
                      text: e.text,
                      action: u(t, e),
                      disptype: e.displayType
                  }
              }

              function u(t, e) {
                  function n() {
                      function t(t) {
                          return t.indexOf("://") > -1 ? t : "http://" + t
                      }
                      return {
                          type: e.type,
                          url: e.url ? t(e.url) : void 0,
                          auth: e.auth
                      }
                  }

                  function i() {
                      function t(t, e) {
                          var n = {
                              android: {
                                  os: "android"
                              },
                              iphone: {
                                  os: "ios",
                                  devicetype: "phone"
                              },
                              ipad: {
                                  os: "ios",
                                  devicetype: "pad"
                              }
                          };
                          t && (t = w(t, E, "execParams in Kakao.Link")), e && (e = w(e, E, "marketParams in Kakao.Link"));
                          var i = [];
                          return k.each(n, function(n, o) {
                              var r = k.extend({}, n);
                              t && t[o] && (r.execparam = k.buildQueryString(t[o], !1)), e && e[o] && (r.marketparam = k.buildQueryString(e[o], !1)), (r.execparam || r.marketparam) && i.push(r)
                          }), i
                      }
                      return {
                          type: "app",
                          url: e.webUrl,
                          actioninfo: t(e.execParams, e.marketParams)
                      }
                  }
                  switch (t) {
                      case "web":
                          return n();
                      case "app":
                          return i();
                      default:
                          return void 0
                  }
              }

              function l(t) {
                  return {
                      title: t.title,
                      link: m(t.link)
                  }
              }

              function h(t) {
                  return k.map(t, function(t) {
                      return {
                          title: t.title,
                          link: m(t.link)
                      }
                  })
              }

              function p(t) {
                  return {
                      like_count: t.likeCount,
                      comment_count: t.commentCount,
                      shared_count: t.sharedCount,
                      view_count: t.viewCount,
                      subscriber_count: t.subscriberCount
                  }
              }

              function d(t) {
                  return {
                      title: t.title,
                      image_url: t.imageUrl,
                      link: m(t.link),
                      image_width: t.imageWidth,
                      image_height: t.imageHeight,
                      description: t.description
                  }
              }

              function f(t) {
                  if (t.length < 2) throw new _("Illegal argument for contents: min count(2)");
                  return k.map(t, function(t) {
                      return {
                          title: t.title,
                          image_url: t.imageUrl,
                          link: m(t.link),
                          image_width: t.imageWidth,
                          image_height: t.imageHeight,
                          description: t.description
                      }
                  })
              }

              function m(t) {
                  return {
                      web_url: t.webUrl,
                      mobile_web_url: t.mobileWebUrl,
                      android_execution_params: t.androidExecParams,
                      ios_execution_params: t.iosExecParams
                  }
              }

              function g(t) {
                  return {
                      regular_price: t.regularPrice,
                      discount_price: t.discountPrice,
                      discount_rate: t.discountRate
                  }
              }

              function v(t) {
                  return w(t, T.content, "parameter content in Link.sendDefault"), !0
              }

              function y(t) {
                  return w(t, T.link, "parameter link in Link.sendDefault"), !0
              }

              function b(t) {
                  return w(t, T.button, "parameter button in Link.sendDefault"), !0
              }
              var k = t("./util.js"),
                  _ = t("./common/KakaoError"),
                  w = t("./common/ruleProcess"),
                  x = {
                      WEB: "web",
                      INWEB: "inweb",
                      APP: "app"
                  },
                  S = {
                      displayType: k.isOneOf(["both", "sender", "receiver"])
                  },
                  T = {
                      label: {
                          required: {
                              text: k.isString
                          },
                          optional: S,
                          builder: r
                      },
                      image: {
                          required: {
                              src: k.isString,
                              width: e,
                              height: e
                          },
                          optional: S,
                          before: n,
                          builder: k.partial(s, null)
                      },
                      webImage: {
                          required: {
                              src: k.isString,
                              width: e,
                              height: e
                          },
                          optional: k.extend({
                              url: k.isString,
                              auth: k.isBoolean,
                              type: k.isOneOf([x.WEB, x.INWEB])
                          }, S),
                          defaults: {
                              type: x.WEB
                          },
                          before: n,
                          builder: k.partial(s, "web")
                      },
                      webButton: {
                          optional: k.extend({
                              text: k.isString,
                              url: k.isString,
                              auth: k.isBoolean,
                              type: k.isOneOf(["web", "inweb"])
                          }, S),
                          defaults: {
                              type: "web"
                          },
                          builder: k.partial(a, "web")
                      },
                      appButton: {
                          optional: k.extend({
                              text: k.isString,
                              webUrl: k.isString,
                              execParams: k.isObject,
                              marketParams: k.isObject,
                              type: k.isString
                          }, S),
                          defaults: {
                              type: "app"
                          },
                          builder: k.partial(a, "app")
                      },
                      webLink: {
                          required: {
                              text: k.isString
                          },
                          optional: k.extend({
                              url: k.isString,
                              auth: k.isBoolean,
                              type: k.isOneOf(["web", "inweb"])
                          }, S),
                          defaults: {
                              type: "web"
                          },
                          builder: k.partial(c, "web")
                      },
                      appLink: {
                          required: {
                              text: k.isString
                          },
                          optional: k.extend({
                              webUrl: k.isString,
                              execParams: k.isObject,
                              marketParams: k.isObject
                          }, S),
                          builder: k.partial(c, "app")
                      },
                      horizontalButton: {
                          required: {
                              0: i,
                              1: i
                          },
                          builder: o
                      },
                      content: {
                          required: {
                              title: k.isString,
                              imageUrl: k.isString,
                              link: y
                          },
                          optional: {
                              imageWidth: k.isNumber,
                              imageHeight: k.isNumber,
                              description: k.isString
                          },
                          builder: d
                      },
                      contents: {
                          optional: {
                              0: v,
                              1: v,
                              2: v
                          },
                          builder: f
                      },
                      commerce: {
                          required: {
                              regularPrice: k.isNumber
                          },
                          optional: {
                              discountPrice: k.isNumber,
                              discountRate: k.isNumber
                          },
                          builder: g
                      },
                      social: {
                          optional: {
                              likeCount: k.isNumber,
                              commentCount: k.isNumber,
                              sharedCount: k.isNumber,
                              viewCount: k.isNumber,
                              subscriberCount: k.isNumber
                          },
                          builder: p
                      },
                      button: {
                          required: {
                              title: k.isString,
                              link: y
                          },
                          builder: l
                      },
                      buttons: {
                          optional: {
                              0: b,
                              1: b
                          },
                          builder: h
                      },
                      headerLink: {
                          optional: {
                              webUrl: k.isString,
                              mobileWebUrl: k.isString,
                              androidExecParams: k.isString,
                              iosExecParams: k.isString
                          },
                          builder: m
                      },
                      link: {
                          optional: {
                              webUrl: k.isString,
                              mobileWebUrl: k.isString,
                              androidExecParams: k.isString,
                              iosExecParams: k.isString
                          }
                      }
                  },
                  E = {
                      optional: {
                          iphone: k.isObject,
                          ipad: k.isObject,
                          android: k.isObject
                      }
                  };
              return {
                  create: function(t, e, n) {
                      var i = T[e];
                      return i ? (t = w(t, i, "parameter '" + e + "' in " + (n || "Link")), i.builder(t)) : void 0
                  }
              }
          }()
      }, {
          "./common/KakaoError": 8,
          "./common/ruleProcess": 11,
          "./util.js": 17
      }],
      15: [function(t, e) {
          e.exports = function() {
              function e(t) {
                  var e = new u;
                  return e.param = {
                      destination: l.spot.destinationBuilder(t),
                      option: "{}" === JSON.stringify(l.spot.optionBuilder(t)) ? void 0 : l.spot.optionBuilder(t),
                      via_list: t.viaPoints
                  }, o.URL.navi + "?" + i.buildQueryString(e)
              }

              function n(t) {
                  var e = new u;
                  return e.param = {
                      destination: h.spot.destinationBuilder(t),
                      option: "{}" === JSON.stringify(h.spot.optionBuilder(t)) ? void 0 : h.spot.optionBuilder(t)
                  }, e.scheme_type = "sharePoi", o.URL.naviShare + "?" + i.buildQueryString(e)
              }
              var i = t("./util.js"),
                  o = t("./common"),
                  r = t("./common/ruleProcess"),
                  s = t("../vendor/web2app.js"),
                  a = "com.locnall.KimGiSa",
                  c = {};
              c.start = function(t) {
                  t = r(t, l.spot);
                  var n = e(t),
                      i = encodeURIComponent(n.replace(o.URL.navi, o.URL.naviWeb));
                  s({
                      urlScheme: n,
                      intentURI: "intent:" + n + "#Intent;package=" + a + ";S.browser_fallback_url=" + i + ";end;",
                      storeURL: n.replace(o.URL.navi, o.URL.naviWeb),
                      universalLink: n.replace(o.URL.navi, o.URL.naviWeb)
                  })
              }, c.share = function(t) {
                  t = r(t, h.spot);
                  var e = n(t),
                      i = encodeURIComponent(e.replace(o.URL.naviShare, o.URL.naviWeb));
                  s({
                      urlScheme: e,
                      intentURI: "intent:" + e + "#Intent;package=" + a + ";S.browser_fallback_url=" + i + ";end;",
                      storeURL: e.replace(o.URL.naviShare, o.URL.naviWeb),
                      universalLink: e.replace(o.URL.naviShare, o.URL.naviWeb)
                  })
              };
              var u = function() {
                      this.appkey = o.RUNTIME.appKey, this.apiver = "1.0", this.extras = {
                          KA: o.KAKAO_AGENT
                      }
                  },
                  l = {
                      spot: {
                          required: {
                              name: i.isString,
                              x: i.isNumber,
                              y: i.isNumber
                          },
                          optional: {
                              coordType: i.isOneOf(["wgs84", "katec"]),
                              vehicleType: i.isOneOf([1, 2, 3, 4, 5, 6, 7]),
                              rpOption: i.isOneOf([1, 2, 3, 4, 5, 6, 8]),
                              routeInfo: i.isBoolean,
                              sX: i.isNumber,
                              sY: i.isNumber,
                              sAngle: i.isNumber,
                              returnUri: i.isString,
                              rpflag: i.isString,
                              cid: i.isString,
                              guideId: i.isNumber,
                              viaPoints: function(t) {
                                  if (!i.isArray(t)) return !1;
                                  if (t.length > 3) throw new Error("via points should not be exceed 3");
                                  return i.each(t, function(t) {
                                      return r(t, l.viaPoint)
                                  }), !0
                              }
                          },
                          destinationBuilder: function(t) {
                              return {
                                  name: t.name,
                                  x: t.x,
                                  y: t.y,
                                  rpflag: t.rpflag,
                                  cid: t.cid,
                                  guide_id: t.guideId
                              }
                          },
                          optionBuilder: function(t) {
                              return {
                                  coord_type: t.coordType,
                                  vehicle_type: t.vehicleType,
                                  rpoption: t.rpOption,
                                  route_info: t.routeInfo,
                                  s_x: t.sX,
                                  s_y: t.sY,
                                  s_angle: t.sAngle,
                                  return_uri: t.returnUri
                              }
                          }
                      },
                      viaPoint: {
                          required: {
                              name: i.isString,
                              x: i.isNumber,
                              y: i.isNumber
                          },
                          optional: {
                              rpflag: i.isString,
                              cid: i.isString
                          }
                      }
                  },
                  h = {
                      spot: {
                          required: {
                              name: i.isString,
                              x: i.isNumber,
                              y: i.isNumber
                          },
                          optional: {
                              coordType: i.isOneOf(["wgs84", "katec"]),
                              rpflag: i.isString,
                              cid: i.isString,
                              guideId: i.isNumber
                          },
                          destinationBuilder: function(t) {
                              return {
                                  name: t.name,
                                  x: t.x,
                                  y: t.y,
                                  rpflag: t.rpflag,
                                  cid: t.cid,
                                  guide_id: t.guideId
                              }
                          },
                          optionBuilder: function(t) {
                              return {
                                  coord_type: t.coordType
                              }
                          }
                      }
                  };
              return c
          }()
      }, {
          "../vendor/web2app.js": 23,
          "./common": 7,
          "./common/ruleProcess": 11,
          "./util.js": 17
      }],
      16: [function(t, e) {
          e.exports = function() {
              function e(t, e) {
                  var n = {
                      url: t
                  };
                  return e && (n.text = e), s.extend(n, o()), a.URL.storyShare + "?" + s.buildQueryString(n)
              }

              function n(t, e, n, i) {
                  var r = {
                      post: t,
                      appver: a.VERSION,
                      appid: e,
                      apiver: "1.0",
                      appname: n
                  };
                  return i && (r.urlinfo = i), s.extend(r, o()), "storylink://posting?" + s.buildQueryString(r)
              }

              function i(t, e) {
                  var n = {
                      id: t.id,
                      type: t.type,
                      hideFollower: !t.showFollowerCount,
                      frameId: e
                  };
                  return s.extend(n, o()), a.URL.channelFollow + "?" + s.buildQueryString(n)
              }

              function o() {
                  var t = {
                      kakao_agent: a.KAKAO_AGENT
                  };
                  return a.RUNTIME.appKey && (t.app_key = a.RUNTIME.appKey), t
              }
              var r = {},
                  s = t("./util.js"),
                  a = t("./common.js"),
                  c = t("../vendor/web2app.js"),
                  u = "kakaostory_social_plugin",
                  l = "width=670, height=471",
                  h = [];
              r.createShareButton = function(t) {
                  t = a.processRules(t, d.createShareButton, "Story.createShareButton");
                  var n = s.getElement(t.container);
                  if (!n) throw new a.KakaoError("container is required for KakaoStory share button: pass in element or id");
                  var i = document.createElement("a"),
                      o = document.createElement("img");
                  i.appendChild(o);
                  var r = e(t.url, t.text);
                  i.setAttribute("href", r), i.setAttribute("target", "_blank");
                  var c = function(t) {
                      t.preventDefault ? t.preventDefault() : t.returnValue = !1, a.windowOpen(r, u, l)
                  };
                  s.addEvent(i, "click", c);
                  var p = function() {
                      s.removeEvent(i, "click", c), n.removeChild(i)
                  };
                  h.push(p), o.onload = function(t) {
                      var e, r;
                      n.appendChild(i), a.UA.browser.msie && parseInt(a.UA.browser.version.major) <= 10 ? (e = o.width, r = o.height) : (e = t.target.width, r = t.target.height), o.width = e, o.height = r
                  }, o.src = a.URL.storyIcon
              }, r.share = function(t) {
                  t = a.processRules(t, d.share, "Story.share");
                  var n = e(t.url, t.text);
                  a.windowOpen(n, u, l)
              }, r.open = function(t) {
                  t = a.processRules(t, d.open, "Story.open");
                  var e, i, o = (t.text ? t.text + "\n" : "") + (t.url || ""),
                      r = location.hostname || "";
                  t.urlInfo && (e = a.processRules(t.urlInfo, d.openUrlInfo, "Story.open"), i = e.name || "");
                  var s = n(o, r, i || r, JSON.stringify(e)),
                      u = {
                          urlScheme: s,
                          intentURI: "intent:" + s + "#Intent;package=com.kakao.story;end;",
                          appname: "KakaoStory",
                          storeURL: a.getInstallUrl("com.kakao.story", "486244601"),
                          onUnsupportedEnvironment: function() {
                              t.fail && t.fail()
                          }
                      };
                  c(u)
              };
              var p = 0;
              r.createFollowButton = function(t) {
                  t = a.processRules(t, d.createFollowButton, "Story.createFollowButton");
                  var e = s.getElement(t.container);
                  if (!e) throw new a.KakaoError("container is required for KakaoStory follow button: pass in element or id");
                  var n = document.createElement("iframe"),
                      o = p++;
                  n.src = i(t, o), n.setAttribute("frameborder", "0"), n.setAttribute("marginwidth", "0"), n.setAttribute("marginheight", "0"), n.setAttribute("scrolling", "no");
                  var r = t.showFollowerCount && "horizontal" === t.type ? 85 : 59,
                      c = t.showFollowerCount && "vertical" === t.type ? 46 : 20;
                  n.style.width = r + "px", n.style.height = c + "px";
                  var u = function(t) {
                      if (t.data && /\.kakao\.com$/.test(t.origin)) {
                          var e = t.data.split(","),
                              i = parseInt(e[0], 10),
                              s = parseInt(e[1], 10),
                              a = parseInt(e[2], 10);
                          if (i !== o) return;
                          r !== s && (r = s, n.style.width = s + "px"), c !== a && (c = a, n.style.height = a + "px")
                      }
                  };
                  e.appendChild(n), s.addEvent(window, "message", u);
                  var l = function() {
                      s.removeEvent(window, "message", u), e.removeChild(n)
                  };
                  h.push(l)
              };
              var d = {
                  createShareButton: {
                      required: {
                          container: s.passesOneOf([s.isElement, s.isString])
                      },
                      optional: {
                          url: s.isString,
                          text: s.isString
                      },
                      defaults: function(t) {
                          var e = s.getElement(t.container);
                          return e ? {
                              url: e.getAttribute("data-url") || location.href
                          } : null
                      }
                  },
                  share: {
                      optional: {
                          url: s.isString,
                          text: s.isString
                      },
                      defaults: {
                          url: location.href
                      }
                  },
                  open: {
                      optional: {
                          url: s.isString,
                          text: s.isString,
                          urlInfo: s.isObject
                      },
                      defaults: {
                          url: location.href
                      }
                  },
                  openUrlInfo: {
                      required: {
                          title: s.isString
                      },
                      optional: {
                          desc: s.isString,
                          name: s.isString,
                          images: s.isArray,
                          imageurl: s.isArray,
                          type: s.isString
                      },
                      defaults: {
                          type: "website"
                      },
                      before: function(t) {
                          t.images && (t.imageurl = t.images, delete t.images)
                      }
                  },
                  createFollowButton: {
                      required: {
                          container: s.passesOneOf([s.isElement, s.isString]),
                          id: s.isString
                      },
                      optional: {
                          type: s.isOneOf(["horizontal", "vertical"]),
                          showFollowerCount: s.isBoolean
                      },
                      defaults: function(t) {
                          var e = s.getElement(t.container);
                          if (e) {
                              var n = {
                                      type: e.getAttribute("data-type") || "horizontal",
                                      showFollowerCount: "false" !== e.getAttribute("data-show-follower-count")
                                  },
                                  i = e.getAttribute("data-id");
                              return i && (n.id = i), n
                          }
                          return null
                      },
                      after: function(t) {
                          "@" !== t.id.substr(0, 1) && (t.id = "@" + t.id)
                      }
                  }
              };
              return r.cleanup = function() {
                  s.each(h, function(t) {
                      t()
                  }), h.length = 0
              }, r
          }()
      }, {
          "../vendor/web2app.js": 23,
          "./common.js": 7,
          "./util.js": 17
      }],
      17: [function(t, e) {
          /*!
           * underscore
           * https://github.com/jashkenas/underscore
           * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
           * MIT License
           */
          e.exports = function() {
              var t = {},
                  e = {},
                  n = Array.prototype,
                  i = Object.prototype,
                  o = n.slice,
                  r = n.concat,
                  s = i.toString,
                  a = i.hasOwnProperty,
                  c = n.forEach,
                  u = n.map,
                  l = n.filter,
                  h = n.every,
                  p = n.some,
                  d = n.indexOf,
                  f = Array.isArray,
                  m = Object.keys,
                  g = t.each = function(n, i, o) {
                      if (null == n) return n;
                      if (c && n.forEach === c) n.forEach(i, o);
                      else if (n.length === +n.length) {
                          for (var r = 0, s = n.length; s > r; r++)
                              if (i.call(o, n[r], r, n) === e) return
                      } else
                          for (var a = t.keys(n), r = 0, s = a.length; s > r; r++)
                              if (i.call(o, n[a[r]], a[r], n) === e) return;
                      return n
                  };
              t.map = function(t, e, n) {
                  var i = [];
                  return null == t ? i : u && t.map === u ? t.map(e, n) : (g(t, function(t, o, r) {
                      i.push(e.call(n, t, o, r))
                  }), i)
              }, t.filter = function(t, e, n) {
                  var i = [];
                  return null == t ? i : l && t.filter === l ? t.filter(e, n) : (g(t, function(t, o, r) {
                      e.call(n, t, o, r) && i.push(t)
                  }), i)
              }, t.every = function(n, i, o) {
                  i || (i = t.identity);
                  var r = !0;
                  return null == n ? r : h && n.every === h ? n.every(i, o) : (g(n, function(t, n, s) {
                      return (r = r && i.call(o, t, n, s)) ? void 0 : e
                  }), !!r)
              };
              var v = t.any = function(n, i, o) {
                  i || (i = t.identity);
                  var r = !1;
                  return null == n ? r : p && n.some === p ? n.some(i, o) : (g(n, function(t, n, s) {
                      return r || (r = i.call(o, t, n, s)) ? e : void 0
                  }), !!r)
              };
              return t.contains = function(t, e) {
                  return null == t ? !1 : d && t.indexOf === d ? -1 != t.indexOf(e) : v(t, function(t) {
                      return t === e
                  })
              }, t.difference = function(e) {
                  var i = r.apply(n, o.call(arguments, 1));
                  return t.filter(e, function(e) {
                      return !t.contains(i, e)
                  })
              }, t.partial = function(e) {
                  var n = o.call(arguments, 1);
                  return function() {
                      for (var i = 0, o = n.slice(), r = 0, s = o.length; s > r; r++) o[r] === t && (o[r] = arguments[i++]);
                      for (; i < arguments.length;) o.push(arguments[i++]);
                      return e.apply(this, o)
                  }
              }, t.after = function(t, e) {
                  return function() {
                      return --t < 1 ? e.apply(this, arguments) : void 0
                  }
              }, t.keys = function(e) {
                  if (!t.isObject(e)) return [];
                  if (m) return m(e);
                  var n = [];
                  for (var i in e) t.has(e, i) && n.push(i);
                  return n
              }, t.extend = function(t) {
                  return g(o.call(arguments, 1), function(e) {
                      if (e)
                          for (var n in e) t[n] = e[n]
                  }), t
              }, t.defaults = function(t) {
                  return g(o.call(arguments, 1), function(e) {
                      if (e)
                          for (var n in e) void 0 === t[n] && (t[n] = e[n])
                  }), t
              }, t.isElement = function(t) {
                  return !(!t || 1 !== t.nodeType)
              }, t.isArray = f || function(t) {
                  return "[object Array]" == s.call(t)
              }, t.isObject = function(t) {
                  return t === Object(t)
              }, g(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Blob", "File", "FileList"], function(e) {
                  t["is" + e] = function(t) {
                      return s.call(t) == "[object " + e + "]"
                  }
              }), t.isBoolean = function(t) {
                  return t === !0 || t === !1 || "[object Boolean]" == s.call(t)
              }, t.has = function(t, e) {
                  return a.call(t, e)
              }, t.identity = function(t) {
                  return t
              }, t.emptyFunc = function() {}, t.getElement = function(e) {
                  return t.isElement(e) ? e : t.isString(e) ? document.querySelector(e) : null
              }, t.addEvent = function(t, e, n) {
                  t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n)
              }, t.removeEvent = function(t, e, n) {
                  t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n)
              }, t.buildQueryString = function(e, n) {
                  var i = [];
                  for (var o in e)
                      if (e.hasOwnProperty(o)) {
                          var r = e[o];
                          t.isObject(r) && (r = JSON.stringify(r));
                          var s = n === !1 ? o : encodeURIComponent(o),
                              a = n === !1 ? r : encodeURIComponent(r);
                          i.push(s + "=" + a)
                      }
                  return i.join("&")
              }, t.getRandomString = function() {
                  return Math.random().toString(36).slice(2)
              }, t.nullify = function(e) {
                  t.each(e, function(t, n) {
                      e[n] = null
                  })
              }, t.isOneOf = function(e) {
                  return t.partial(t.contains, e)
              }, t.passesOneOf = function(e) {
                  if (!t.isArray(e)) throw new Error("validators should be an Array");
                  return function(n) {
                      return t.any(e, function(t) {
                          return t(n)
                      })
                  }
              }, t.isURL = function(t) {
                  var e = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                  return e.test(t)
              }, t.arrayBufferToString = function(t) {
                  var e, n, i, o = "",
                      r = new Uint8Array(t),
                      s = r.length,
                      a = Math.pow(2, 16);
                  for (e = 0; s > e; e += a) n = Math.min(a, s - e), i = r.subarray(e, e + n), o += String.fromCharCode.apply(null, i);
                  return o
              }, t.localStorage = function() {
                  var t = {
                      _data: {},
                      setItem: function(t, e) {
                          return this._data[t] = String(e)
                      },
                      getItem: function(t) {
                          return this._data.hasOwnProperty(t) ? this._data[t] : null
                      },
                      removeItem: function(t) {
                          return delete this._data[t]
                      },
                      clear: function() {
                          return this._data = {}
                      }
                  };
                  try {
                      return "localStorage" in window ? (window.localStorage.setItem("store", ""), window.localStorage.removeItem("store"), window.localStorage) : t
                  } catch (e) {
                      return t
                  }
              }(), t
          }()
      }, {}],
      18: [function(t, e) {
          e.exports = function() {
              function e() {
                  return /Version\/\d+\.\d+/i.test(o.ua) && (/Chrome\/\d+\.\d+\.\d+\.\d+ Mobile/i.test(o.ua) || /; wv\)/i.test(o.ua))
              }

              function n() {
                  return 4 == o.os.version.major && o.os.version.minor < 4 && /Version\/\d+.\d+|/i.test(o.ua)
              }

              function i() {
                  return 2 == o.os.version.major && /Version\/\d+.\d+|/i.test(o.ua)
              }
              var o = t("../vendor/userAgent.js")();
              return {
                  isAndroidWebView: function() {
                      return o.os.android && (i() || n() || e())
                  },
                  isIOSKakaoTalkWebView: function() {
                      return o.os.ios && /KAKAOTALK/i.test(o.ua)
                  }
              }
          }
      }, {
          "../vendor/userAgent.js": 22
      }],
      19: [function(t, e) {
          e.exports = function() {
              /*!
               * crypto-js
               * https://github.com/brix/crypto-js
               * Copyright 2009-2013 Jeff Mott
               * Copyright 2013-2016 Evan Vosberg
               * MIT License
               */
              var t = t || function(t, e) {
                  var n = {},
                      i = n.lib = {},
                      o = function() {},
                      r = i.Base = {
                          extend: function(t) {
                              o.prototype = this;
                              var e = new o;
                              return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                                  e.$super.init.apply(this, arguments)
                              }), e.init.prototype = e, e.$super = this, e
                          },
                          create: function() {
                              var t = this.extend();
                              return t.init.apply(t, arguments), t
                          },
                          init: function() {},
                          mixIn: function(t) {
                              for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                              t.hasOwnProperty("toString") && (this.toString = t.toString)
                          },
                          clone: function() {
                              return this.init.prototype.extend(this)
                          }
                      },
                      s = i.WordArray = r.extend({
                          init: function(t, n) {
                              t = this.words = t || [], this.sigBytes = n != e ? n : 4 * t.length
                          },
                          toString: function(t) {
                              return (t || c).stringify(this)
                          },
                          concat: function(t) {
                              var e = this.words,
                                  n = t.words,
                                  i = this.sigBytes;
                              if (t = t.sigBytes, this.clamp(), i % 4)
                                  for (var o = 0; t > o; o++) e[i + o >>> 2] |= (n[o >>> 2] >>> 24 - 8 * (o % 4) & 255) << 24 - 8 * ((i + o) % 4);
                              else if (65535 < n.length)
                                  for (o = 0; t > o; o += 4) e[i + o >>> 2] = n[o >>> 2];
                              else e.push.apply(e, n);
                              return this.sigBytes += t, this
                          },
                          clamp: function() {
                              var e = this.words,
                                  n = this.sigBytes;
                              e[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), e.length = t.ceil(n / 4)
                          },
                          clone: function() {
                              var t = r.clone.call(this);
                              return t.words = this.words.slice(0), t
                          },
                          random: function(e) {
                              for (var n = [], i = 0; e > i; i += 4) n.push(4294967296 * t.random() | 0);
                              return new s.init(n, e)
                          }
                      }),
                      a = n.enc = {},
                      c = a.Hex = {
                          stringify: function(t) {
                              var e = t.words;
                              t = t.sigBytes;
                              for (var n = [], i = 0; t > i; i++) {
                                  var o = e[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
                                  n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                              }
                              return n.join("")
                          },
                          parse: function(t) {
                              for (var e = t.length, n = [], i = 0; e > i; i += 2) n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - 4 * (i % 8);
                              return new s.init(n, e / 2)
                          }
                      },
                      u = a.Latin1 = {
                          stringify: function(t) {
                              var e = t.words;
                              t = t.sigBytes;
                              for (var n = [], i = 0; t > i; i++) n.push(String.fromCharCode(e[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
                              return n.join("")
                          },
                          parse: function(t) {
                              for (var e = t.length, n = [], i = 0; e > i; i++) n[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - 8 * (i % 4);
                              return new s.init(n, e)
                          }
                      },
                      l = a.Utf8 = {
                          stringify: function(t) {
                              try {
                                  return decodeURIComponent(escape(u.stringify(t)))
                              } catch (e) {
                                  throw Error("Malformed UTF-8 data")
                              }
                          },
                          parse: function(t) {
                              return u.parse(unescape(encodeURIComponent(t)))
                          }
                      },
                      h = i.BufferedBlockAlgorithm = r.extend({
                          reset: function() {
                              this._data = new s.init, this._nDataBytes = 0
                          },
                          _append: function(t) {
                              "string" == typeof t && (t = l.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                          },
                          _process: function(e) {
                              var n = this._data,
                                  i = n.words,
                                  o = n.sigBytes,
                                  r = this.blockSize,
                                  a = o / (4 * r),
                                  a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
                              if (e = a * r, o = t.min(4 * e, o), e) {
                                  for (var c = 0; e > c; c += r) this._doProcessBlock(i, c);
                                  c = i.splice(0, e), n.sigBytes -= o
                              }
                              return new s.init(c, o)
                          },
                          clone: function() {
                              var t = r.clone.call(this);
                              return t._data = this._data.clone(), t
                          },
                          _minBufferSize: 0
                      });
                  i.Hasher = h.extend({
                      cfg: r.extend(),
                      init: function(t) {
                          this.cfg = this.cfg.extend(t), this.reset()
                      },
                      reset: function() {
                          h.reset.call(this), this._doReset()
                      },
                      update: function(t) {
                          return this._append(t), this._process(), this
                      },
                      finalize: function(t) {
                          return t && this._append(t), this._doFinalize()
                      },
                      blockSize: 16,
                      _createHelper: function(t) {
                          return function(e, n) {
                              return new t.init(n).finalize(e)
                          }
                      },
                      _createHmacHelper: function(t) {
                          return function(e, n) {
                              return new p.HMAC.init(t, n).finalize(e)
                          }
                      }
                  });
                  var p = n.algo = {};
                  return n
              }(Math);
              return function() {
                      var e = t,
                          n = e.lib.WordArray;
                      e.enc.Base64 = {
                          stringify: function(t) {
                              var e = t.words,
                                  n = t.sigBytes,
                                  i = this._map;
                              t.clamp(), t = [];
                              for (var o = 0; n > o; o += 3)
                                  for (var r = (e[o >>> 2] >>> 24 - 8 * (o % 4) & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - 8 * ((o + 1) % 4) & 255) << 8 | e[o + 2 >>> 2] >>> 24 - 8 * ((o + 2) % 4) & 255, s = 0; 4 > s && n > o + .75 * s; s++) t.push(i.charAt(r >>> 6 * (3 - s) & 63));
                              if (e = i.charAt(64))
                                  for (; t.length % 4;) t.push(e);
                              return t.join("")
                          },
                          parse: function(t) {
                              var e = t.length,
                                  i = this._map,
                                  o = i.charAt(64);
                              o && (o = t.indexOf(o), -1 != o && (e = o));
                              for (var o = [], r = 0, s = 0; e > s; s++)
                                  if (s % 4) {
                                      var a = i.indexOf(t.charAt(s - 1)) << 2 * (s % 4),
                                          c = i.indexOf(t.charAt(s)) >>> 6 - 2 * (s % 4);
                                      o[r >>> 2] |= (a | c) << 24 - 8 * (r % 4), r++
                                  }
                              return n.create(o, r)
                          },
                          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                      }
                  }(),
                  function(e) {
                      function n(t, e, n, i, o, r, s) {
                          return t = t + (e & n | ~e & i) + o + s, (t << r | t >>> 32 - r) + e
                      }

                      function i(t, e, n, i, o, r, s) {
                          return t = t + (e & i | n & ~i) + o + s, (t << r | t >>> 32 - r) + e
                      }

                      function o(t, e, n, i, o, r, s) {
                          return t = t + (e ^ n ^ i) + o + s, (t << r | t >>> 32 - r) + e
                      }

                      function r(t, e, n, i, o, r, s) {
                          return t = t + (n ^ (e | ~i)) + o + s, (t << r | t >>> 32 - r) + e
                      }
                      for (var s = t, a = s.lib, c = a.WordArray, u = a.Hasher, a = s.algo, l = [], h = 0; 64 > h; h++) l[h] = 4294967296 * e.abs(e.sin(h + 1)) | 0;
                      a = a.MD5 = u.extend({
                          _doReset: function() {
                              this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                          },
                          _doProcessBlock: function(t, e) {
                              for (var s = 0; 16 > s; s++) {
                                  var a = e + s,
                                      c = t[a];
                                  t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                              }
                              var s = this._hash.words,
                                  a = t[e + 0],
                                  c = t[e + 1],
                                  u = t[e + 2],
                                  h = t[e + 3],
                                  p = t[e + 4],
                                  d = t[e + 5],
                                  f = t[e + 6],
                                  m = t[e + 7],
                                  g = t[e + 8],
                                  v = t[e + 9],
                                  y = t[e + 10],
                                  b = t[e + 11],
                                  k = t[e + 12],
                                  _ = t[e + 13],
                                  w = t[e + 14],
                                  x = t[e + 15],
                                  S = s[0],
                                  T = s[1],
                                  E = s[2],
                                  O = s[3],
                                  S = n(S, T, E, O, a, 7, l[0]),
                                  O = n(O, S, T, E, c, 12, l[1]),
                                  E = n(E, O, S, T, u, 17, l[2]),
                                  T = n(T, E, O, S, h, 22, l[3]),
                                  S = n(S, T, E, O, p, 7, l[4]),
                                  O = n(O, S, T, E, d, 12, l[5]),
                                  E = n(E, O, S, T, f, 17, l[6]),
                                  T = n(T, E, O, S, m, 22, l[7]),
                                  S = n(S, T, E, O, g, 7, l[8]),
                                  O = n(O, S, T, E, v, 12, l[9]),
                                  E = n(E, O, S, T, y, 17, l[10]),
                                  T = n(T, E, O, S, b, 22, l[11]),
                                  S = n(S, T, E, O, k, 7, l[12]),
                                  O = n(O, S, T, E, _, 12, l[13]),
                                  E = n(E, O, S, T, w, 17, l[14]),
                                  T = n(T, E, O, S, x, 22, l[15]),
                                  S = i(S, T, E, O, c, 5, l[16]),
                                  O = i(O, S, T, E, f, 9, l[17]),
                                  E = i(E, O, S, T, b, 14, l[18]),
                                  T = i(T, E, O, S, a, 20, l[19]),
                                  S = i(S, T, E, O, d, 5, l[20]),
                                  O = i(O, S, T, E, y, 9, l[21]),
                                  E = i(E, O, S, T, x, 14, l[22]),
                                  T = i(T, E, O, S, p, 20, l[23]),
                                  S = i(S, T, E, O, v, 5, l[24]),
                                  O = i(O, S, T, E, w, 9, l[25]),
                                  E = i(E, O, S, T, h, 14, l[26]),
                                  T = i(T, E, O, S, g, 20, l[27]),
                                  S = i(S, T, E, O, _, 5, l[28]),
                                  O = i(O, S, T, E, u, 9, l[29]),
                                  E = i(E, O, S, T, m, 14, l[30]),
                                  T = i(T, E, O, S, k, 20, l[31]),
                                  S = o(S, T, E, O, d, 4, l[32]),
                                  O = o(O, S, T, E, g, 11, l[33]),
                                  E = o(E, O, S, T, b, 16, l[34]),
                                  T = o(T, E, O, S, w, 23, l[35]),
                                  S = o(S, T, E, O, c, 4, l[36]),
                                  O = o(O, S, T, E, p, 11, l[37]),
                                  E = o(E, O, S, T, m, 16, l[38]),
                                  T = o(T, E, O, S, y, 23, l[39]),
                                  S = o(S, T, E, O, _, 4, l[40]),
                                  O = o(O, S, T, E, a, 11, l[41]),
                                  E = o(E, O, S, T, h, 16, l[42]),
                                  T = o(T, E, O, S, f, 23, l[43]),
                                  S = o(S, T, E, O, v, 4, l[44]),
                                  O = o(O, S, T, E, k, 11, l[45]),
                                  E = o(E, O, S, T, x, 16, l[46]),
                                  T = o(T, E, O, S, u, 23, l[47]),
                                  S = r(S, T, E, O, a, 6, l[48]),
                                  O = r(O, S, T, E, m, 10, l[49]),
                                  E = r(E, O, S, T, w, 15, l[50]),
                                  T = r(T, E, O, S, d, 21, l[51]),
                                  S = r(S, T, E, O, k, 6, l[52]),
                                  O = r(O, S, T, E, h, 10, l[53]),
                                  E = r(E, O, S, T, y, 15, l[54]),
                                  T = r(T, E, O, S, c, 21, l[55]),
                                  S = r(S, T, E, O, g, 6, l[56]),
                                  O = r(O, S, T, E, x, 10, l[57]),
                                  E = r(E, O, S, T, f, 15, l[58]),
                                  T = r(T, E, O, S, _, 21, l[59]),
                                  S = r(S, T, E, O, p, 6, l[60]),
                                  O = r(O, S, T, E, b, 10, l[61]),
                                  E = r(E, O, S, T, u, 15, l[62]),
                                  T = r(T, E, O, S, v, 21, l[63]);
                              s[0] = s[0] + S | 0, s[1] = s[1] + T | 0, s[2] = s[2] + E | 0, s[3] = s[3] + O | 0
                          },
                          _doFinalize: function() {
                              var t = this._data,
                                  n = t.words,
                                  i = 8 * this._nDataBytes,
                                  o = 8 * t.sigBytes;
                              n[o >>> 5] |= 128 << 24 - o % 32;
                              var r = e.floor(i / 4294967296);
                              for (n[(o + 64 >>> 9 << 4) + 15] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), n[(o + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process(), t = this._hash, n = t.words, i = 0; 4 > i; i++) o = n[i], n[i] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
                              return t
                          },
                          clone: function() {
                              var t = u.clone.call(this);
                              return t._hash = this._hash.clone(), t
                          }
                      }), s.MD5 = u._createHelper(a), s.HmacMD5 = u._createHmacHelper(a)
                  }(Math),
                  function() {
                      var e = t,
                          n = e.lib,
                          i = n.Base,
                          o = n.WordArray,
                          n = e.algo,
                          r = n.EvpKDF = i.extend({
                              cfg: i.extend({
                                  keySize: 4,
                                  hasher: n.MD5,
                                  iterations: 1
                              }),
                              init: function(t) {
                                  this.cfg = this.cfg.extend(t)
                              },
                              compute: function(t, e) {
                                  for (var n = this.cfg, i = n.hasher.create(), r = o.create(), s = r.words, a = n.keySize, n = n.iterations; s.length < a;) {
                                      c && i.update(c);
                                      var c = i.update(t).finalize(e);
                                      i.reset();
                                      for (var u = 1; n > u; u++) c = i.finalize(c), i.reset();
                                      r.concat(c)
                                  }
                                  return r.sigBytes = 4 * a, r
                              }
                          });
                      e.EvpKDF = function(t, e, n) {
                          return r.create(n).compute(t, e)
                      }
                  }(), t.lib.Cipher || function(e) {
                      var n = t,
                          i = n.lib,
                          o = i.Base,
                          r = i.WordArray,
                          s = i.BufferedBlockAlgorithm,
                          a = n.enc.Base64,
                          c = n.algo.EvpKDF,
                          u = i.Cipher = s.extend({
                              cfg: o.extend(),
                              createEncryptor: function(t, e) {
                                  return this.create(this._ENC_XFORM_MODE, t, e)
                              },
                              createDecryptor: function(t, e) {
                                  return this.create(this._DEC_XFORM_MODE, t, e)
                              },
                              init: function(t, e, n) {
                                  this.cfg = this.cfg.extend(n), this._xformMode = t, this._key = e, this.reset()
                              },
                              reset: function() {
                                  s.reset.call(this), this._doReset()
                              },
                              process: function(t) {
                                  return this._append(t), this._process()
                              },
                              finalize: function(t) {
                                  return t && this._append(t), this._doFinalize()
                              },
                              keySize: 4,
                              ivSize: 4,
                              _ENC_XFORM_MODE: 1,
                              _DEC_XFORM_MODE: 2,
                              _createHelper: function(t) {
                                  return {
                                      encrypt: function(e, n, i) {
                                          return ("string" == typeof n ? m : f).encrypt(t, e, n, i)
                                      },
                                      decrypt: function(e, n, i) {
                                          return ("string" == typeof n ? m : f).decrypt(t, e, n, i)
                                      }
                                  }
                              }
                          });
                      i.StreamCipher = u.extend({
                          _doFinalize: function() {
                              return this._process(!0)
                          },
                          blockSize: 1
                      });
                      var l = n.mode = {},
                          h = function(t, n, i) {
                              var o = this._iv;
                              o ? this._iv = e : o = this._prevBlock;
                              for (var r = 0; i > r; r++) t[n + r] ^= o[r]
                          },
                          p = (i.BlockCipherMode = o.extend({
                              createEncryptor: function(t, e) {
                                  return this.Encryptor.create(t, e)
                              },
                              createDecryptor: function(t, e) {
                                  return this.Decryptor.create(t, e)
                              },
                              init: function(t, e) {
                                  this._cipher = t, this._iv = e
                              }
                          })).extend();
                      p.Encryptor = p.extend({
                          processBlock: function(t, e) {
                              var n = this._cipher,
                                  i = n.blockSize;
                              h.call(this, t, e, i), n.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i)
                          }
                      }), p.Decryptor = p.extend({
                          processBlock: function(t, e) {
                              var n = this._cipher,
                                  i = n.blockSize,
                                  o = t.slice(e, e + i);
                              n.decryptBlock(t, e), h.call(this, t, e, i), this._prevBlock = o
                          }
                      }), l = l.CBC = p, p = (n.pad = {}).Pkcs7 = {
                          pad: function(t, e) {
                              for (var n = 4 * e, n = n - t.sigBytes % n, i = n << 24 | n << 16 | n << 8 | n, o = [], s = 0; n > s; s += 4) o.push(i);
                              n = r.create(o, n), t.concat(n)
                          },
                          unpad: function(t) {
                              t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2]
                          }
                      }, i.BlockCipher = u.extend({
                          cfg: u.cfg.extend({
                              mode: l,
                              padding: p
                          }),
                          reset: function() {
                              u.reset.call(this);
                              var t = this.cfg,
                                  e = t.iv,
                                  t = t.mode;
                              if (this._xformMode == this._ENC_XFORM_MODE) var n = t.createEncryptor;
                              else n = t.createDecryptor, this._minBufferSize = 1;
                              this._mode = n.call(t, this, e && e.words)
                          },
                          _doProcessBlock: function(t, e) {
                              this._mode.processBlock(t, e)
                          },
                          _doFinalize: function() {
                              var t = this.cfg.padding;
                              if (this._xformMode == this._ENC_XFORM_MODE) {
                                  t.pad(this._data, this.blockSize);
                                  var e = this._process(!0)
                              } else e = this._process(!0), t.unpad(e);
                              return e
                          },
                          blockSize: 4
                      });
                      var d = i.CipherParams = o.extend({
                              init: function(t) {
                                  this.mixIn(t)
                              },
                              toString: function(t) {
                                  return (t || this.formatter).stringify(this)
                              }
                          }),
                          l = (n.format = {}).OpenSSL = {
                              stringify: function(t) {
                                  var e = t.ciphertext;
                                  return t = t.salt, (t ? r.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(a)
                              },
                              parse: function(t) {
                                  t = a.parse(t);
                                  var e = t.words;
                                  if (1398893684 == e[0] && 1701076831 == e[1]) {
                                      var n = r.create(e.slice(2, 4));
                                      e.splice(0, 4), t.sigBytes -= 16
                                  }
                                  return d.create({
                                      ciphertext: t,
                                      salt: n
                                  })
                              }
                          },
                          f = i.SerializableCipher = o.extend({
                              cfg: o.extend({
                                  format: l
                              }),
                              encrypt: function(t, e, n, i) {
                                  i = this.cfg.extend(i);
                                  var o = t.createEncryptor(n, i);
                                  return e = o.finalize(e), o = o.cfg, d.create({
                                      ciphertext: e,
                                      key: n,
                                      iv: o.iv,
                                      algorithm: t,
                                      mode: o.mode,
                                      padding: o.padding,
                                      blockSize: t.blockSize,
                                      formatter: i.format
                                  })
                              },
                              decrypt: function(t, e, n, i) {
                                  return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(n, i).finalize(e.ciphertext)
                              },
                              _parse: function(t, e) {
                                  return "string" == typeof t ? e.parse(t, this) : t
                              }
                          }),
                          n = (n.kdf = {}).OpenSSL = {
                              execute: function(t, e, n, i) {
                                  return i || (i = r.random(8)), t = c.create({
                                      keySize: e + n
                                  }).compute(t, i), n = r.create(t.words.slice(e), 4 * n), t.sigBytes = 4 * e, d.create({
                                      key: t,
                                      iv: n,
                                      salt: i
                                  })
                              }
                          },
                          m = i.PasswordBasedCipher = f.extend({
                              cfg: f.cfg.extend({
                                  kdf: n
                              }),
                              encrypt: function(t, e, n, i) {
                                  return i = this.cfg.extend(i), n = i.kdf.execute(n, t.keySize, t.ivSize), i.iv = n.iv, t = f.encrypt.call(this, t, e, n.key, i), t.mixIn(n), t
                              },
                              decrypt: function(t, e, n, i) {
                                  return i = this.cfg.extend(i), e = this._parse(e, i.format), n = i.kdf.execute(n, t.keySize, t.ivSize, e.salt), i.iv = n.iv, f.decrypt.call(this, t, e, n.key, i)
                              }
                          })
                  }(),
                  function() {
                      for (var e = t, n = e.lib.BlockCipher, i = e.algo, o = [], r = [], s = [], a = [], c = [], u = [], l = [], h = [], p = [], d = [], f = [], m = 0; 256 > m; m++) f[m] = 128 > m ? m << 1 : m << 1 ^ 283;
                      for (var g = 0, v = 0, m = 0; 256 > m; m++) {
                          var y = v ^ v << 1 ^ v << 2 ^ v << 3 ^ v << 4,
                              y = y >>> 8 ^ 255 & y ^ 99;
                          o[g] = y, r[y] = g;
                          var b = f[g],
                              k = f[b],
                              _ = f[k],
                              w = 257 * f[y] ^ 16843008 * y;
                          s[g] = w << 24 | w >>> 8, a[g] = w << 16 | w >>> 16, c[g] = w << 8 | w >>> 24, u[g] = w, w = 16843009 * _ ^ 65537 * k ^ 257 * b ^ 16843008 * g, l[y] = w << 24 | w >>> 8, h[y] = w << 16 | w >>> 16, p[y] = w << 8 | w >>> 24, d[y] = w, g ? (g = b ^ f[f[f[_ ^ b]]], v ^= f[f[v]]) : g = v = 1
                      }
                      var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                          i = i.AES = n.extend({
                              _doReset: function() {
                                  for (var t = this._key, e = t.words, n = t.sigBytes / 4, t = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], r = 0; t > r; r++)
                                      if (n > r) i[r] = e[r];
                                      else {
                                          var s = i[r - 1];
                                          r % n ? n > 6 && 4 == r % n && (s = o[s >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[255 & s]) : (s = s << 8 | s >>> 24, s = o[s >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[255 & s], s ^= x[r / n | 0] << 24), i[r] = i[r - n] ^ s
                                      }
                                  for (e = this._invKeySchedule = [], n = 0; t > n; n++) r = t - n, s = n % 4 ? i[r] : i[r - 4], e[n] = 4 > n || 4 >= r ? s : l[o[s >>> 24]] ^ h[o[s >>> 16 & 255]] ^ p[o[s >>> 8 & 255]] ^ d[o[255 & s]]
                              },
                              encryptBlock: function(t, e) {
                                  this._doCryptBlock(t, e, this._keySchedule, s, a, c, u, o)
                              },
                              decryptBlock: function(t, e) {
                                  var n = t[e + 1];
                                  t[e + 1] = t[e + 3], t[e + 3] = n, this._doCryptBlock(t, e, this._invKeySchedule, l, h, p, d, r), n = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = n
                              },
                              _doCryptBlock: function(t, e, n, i, o, r, s, a) {
                                  for (var c = this._nRounds, u = t[e] ^ n[0], l = t[e + 1] ^ n[1], h = t[e + 2] ^ n[2], p = t[e + 3] ^ n[3], d = 4, f = 1; c > f; f++) var m = i[u >>> 24] ^ o[l >>> 16 & 255] ^ r[h >>> 8 & 255] ^ s[255 & p] ^ n[d++],
                                      g = i[l >>> 24] ^ o[h >>> 16 & 255] ^ r[p >>> 8 & 255] ^ s[255 & u] ^ n[d++],
                                      v = i[h >>> 24] ^ o[p >>> 16 & 255] ^ r[u >>> 8 & 255] ^ s[255 & l] ^ n[d++],
                                      p = i[p >>> 24] ^ o[u >>> 16 & 255] ^ r[l >>> 8 & 255] ^ s[255 & h] ^ n[d++],
                                      u = m,
                                      l = g,
                                      h = v;
                                  m = (a[u >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & p]) ^ n[d++], g = (a[l >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[p >>> 8 & 255] << 8 | a[255 & u]) ^ n[d++], v = (a[h >>> 24] << 24 | a[p >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & l]) ^ n[d++], p = (a[p >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & h]) ^ n[d++], t[e] = m, t[e + 1] = g, t[e + 2] = v, t[e + 3] = p
                              },
                              keySize: 8
                          });
                      e.AES = n._createHelper(i)
                  }(), t
          }()
      }, {}],
      20: [function(t, e) {
          e.exports = function() {
              /*!
               * easyXDM
               * http://github.com/oyvindkinsey/easyXDM/
               * Copyright 2009-2011 횠yvind Sean Kinsey, oyvind@kinsey.no
               * MIT License
               */
              return function(t, e, n, i, o, r) {
                  function s(t, e) {
                      var n = _typeof(t[e]);
                      return "function" == n || !("object" != n || !t[e]) || "unknown" == n
                  }

                  function a(t, e) {
                      return !("object" != _typeof(t[e]) || !t[e])
                  }

                  function c(t) {
                      return "[object Array]" === Object.prototype.toString.call(t)
                  }

                  function u() {
                      var t = "Shockwave Flash",
                          e = "application/x-shockwave-flash";
                      if (!b(navigator.plugins) && "object" == _typeof(navigator.plugins[t])) {
                          var n = navigator.plugins[t].description;
                          n && !b(navigator.mimeTypes) && navigator.mimeTypes[e] && navigator.mimeTypes[e].enabledPlugin && (A = n.match(/\d+/g))
                      }
                      if (!A) {
                          var i;
                          try {
                              i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), A = Array.prototype.slice.call(i.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1), i = null
                          } catch (o) {}
                      }
                      if (!A) return !1;
                      var r = parseInt(A[0], 10),
                          s = parseInt(A[1], 10);
                      return P = r > 9 && s > 0, !0
                  }

                  function l() {
                      if (!Y) {
                          Y = !0;
                          for (var t = 0; t < z.length; t++) z[t]();
                          z.length = 0
                      }
                  }

                  function h(t, e) {
                      return Y ? (t.call(e), void 0) : (z.push(function() {
                          t.call(e)
                      }), void 0)
                  }

                  function p() {
                      var t = parent;
                      if ("" !== K)
                          for (var e = 0, n = K.split("."); e < n.length; e++) t = t[n[e]];
                      return t.easyXDM
                  }

                  function d(e) {
                      return t.easyXDM = D, K = e, K && (F = "easyXDM_" + K.replace(".", "_") + "_"), B
                  }

                  function f(t) {
                      return t.match(N)[3]
                  }

                  function m(t) {
                      return t.match(N)[4] || ""
                  }

                  function g(t) {
                      var e = t.toLowerCase().match(N),
                          n = e[2],
                          i = e[3],
                          o = e[4] || "";
                      return ("http:" == n && ":80" == o || "https:" == n && ":443" == o) && (o = ""), n + "//" + i + o
                  }

                  function v(t) {
                      if (t = t.replace(M, "$1/"), !t.match(/^(http||https):\/\//)) {
                          var e = "/" === t.substring(0, 1) ? "" : n.pathname;
                          "/" !== e.substring(e.length - 1) && (e = e.substring(0, e.lastIndexOf("/") + 1)), t = n.protocol + "//" + n.host + e + t
                      }
                      for (; U.test(t);) t = t.replace(U, "");
                      return t
                  }

                  function y(t, e) {
                      var n = "",
                          i = t.indexOf("#"); - 1 !== i && (n = t.substring(i), t = t.substring(0, i));
                      var o = [];
                      for (var s in e) e.hasOwnProperty(s) && o.push(s + "=" + r(e[s]));
                      return t + (X ? "#" : -1 == t.indexOf("?") ? "?" : "&") + o.join("&") + n
                  }

                  function b(t) {
                      return "undefined" == typeof t
                  }

                  function k(t, e, n) {
                      var i;
                      for (var o in e) e.hasOwnProperty(o) && (o in t ? (i = e[o], "object" === ("undefined" == typeof i ? "undefined" : _typeof(i)) ? k(t[o], i, n) : n || (t[o] = e[o])) : t[o] = e[o]);
                      return t
                  }

                  function _() {
                      var t = e.body.appendChild(e.createElement("form")),
                          n = t.appendChild(e.createElement("input"));
                      n.name = F + "TEST" + R, O = n !== t.elements[n.name], e.body.removeChild(t)
                  }

                  function w(t) {
                      b(O) && _();
                      var n;
                      O ? n = e.createElement('<iframe name="' + t.props.name + '"/>') : (n = e.createElement("IFRAME"), n.name = t.props.name), n.id = n.name = t.props.name, delete t.props.name, "string" == typeof t.container && (t.container = e.getElementById(t.container)), t.container || (k(n.style, {
                          position: "absolute",
                          top: "-2000px",
                          left: "0px"
                      }), t.container = e.body);
                      var i = t.props.src;
                      if (t.props.src = "javascript:false", k(n, t.props), n.border = n.frameBorder = 0, n.allowTransparency = !0, t.container.appendChild(n), t.onLoad && j(n, "load", t.onLoad), t.usePost) {
                          var o, r = t.container.appendChild(e.createElement("form"));
                          if (r.target = n.name, r.action = i, r.method = "POST", "object" === _typeof(t.usePost))
                              for (var s in t.usePost) t.usePost.hasOwnProperty(s) && (O ? o = e.createElement('<input name="' + s + '"/>') : (o = e.createElement("INPUT"), o.name = s), o.value = t.usePost[s], r.appendChild(o));
                          r.submit(), r.parentNode.removeChild(r)
                      } else n.src = i;
                      return t.props.src = i, n
                  }

                  function x(t, e) {
                      "string" == typeof t && (t = [t]);
                      for (var n, i = t.length; i--;)
                          if (n = t[i], n = new RegExp("^" == n.substr(0, 1) ? n : "^" + n.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"), n.test(e)) return !0;
                      return !1
                  }

                  function S(i) {
                      var o, r = i.protocol;
                      if (i.isHost = i.isHost || b(H.xdm_p), X = i.hash || !1, i.props || (i.props = {}), i.isHost) i.remote = v(i.remote), i.channel = i.channel || "default" + R++, i.secret = Math.random().toString(16).substring(2), b(r) && (r = g(n.href) == g(i.remote) ? "4" : s(t, "postMessage") || s(e, "postMessage") ? "1" : i.swf && s(t, "ActiveXObject") && u() ? "6" : "Gecko" === navigator.product && "frameElement" in t && -1 == navigator.userAgent.indexOf("WebKit") ? "5" : i.remoteHelper ? "2" : "0");
                      else if (i.channel = H.xdm_c.replace(/["'<>\\]/g, ""), i.secret = H.xdm_s, i.remote = H.xdm_e.replace(/["'<>\\]/g, ""), r = H.xdm_p, i.acl && !x(i.acl, i.remote)) throw new Error("Access denied for " + i.remote);
                      switch (i.protocol = r, r) {
                          case "0":
                              if (k(i, {
                                      interval: 100,
                                      delay: 2e3,
                                      useResize: !0,
                                      useParent: !1,
                                      usePolling: !1
                                  }, !0), i.isHost) {
                                  if (!i.local) {
                                      for (var a, c = n.protocol + "//" + n.host, l = e.body.getElementsByTagName("img"), h = l.length; h--;)
                                          if (a = l[h], a.src.substring(0, c.length) === c) {
                                              i.local = a.src;
                                              break
                                          }
                                      i.local || (i.local = t)
                                  }
                                  var p = {
                                      xdm_c: i.channel,
                                      xdm_p: 0
                                  };
                                  i.local === t ? (i.usePolling = !0, i.useParent = !0, i.local = n.protocol + "//" + n.host + n.pathname + n.search, p.xdm_e = i.local, p.xdm_pa = 1) : p.xdm_e = v(i.local), i.container && (i.useResize = !1, p.xdm_po = 1), i.remote = y(i.remote, p)
                              } else k(i, {
                                  channel: H.xdm_c,
                                  remote: H.xdm_e,
                                  useParent: !b(H.xdm_pa),
                                  usePolling: !b(H.xdm_po),
                                  useResize: i.useParent ? !1 : i.useResize
                              });
                              o = [new B.stack.HashTransport(i), new B.stack.ReliableBehavior({}), new B.stack.QueueBehavior({
                                  encode: !0,
                                  maxLength: 4e3 - i.remote.length
                              }), new B.stack.VerifyBehavior({
                                  initiate: i.isHost
                              })];
                              break;
                          case "1":
                              o = [new B.stack.PostMessageTransport(i)];
                              break;
                          case "2":
                              i.isHost && (i.remoteHelper = v(i.remoteHelper)), o = [new B.stack.NameTransport(i), new B.stack.QueueBehavior, new B.stack.VerifyBehavior({
                                  initiate: i.isHost
                              })];
                              break;
                          case "3":
                              o = [new B.stack.NixTransport(i)];
                              break;
                          case "4":
                              o = [new B.stack.SameOriginTransport(i)];
                              break;
                          case "5":
                              o = [new B.stack.FrameElementTransport(i)];
                              break;
                          case "6":
                              A || u(), o = [new B.stack.FlashTransport(i)]
                      }
                      return o.push(new B.stack.QueueBehavior({
                          lazy: i.lazy,
                          remove: !0
                      })), o
                  }

                  function T(t) {
                      for (var e, n = {
                              incoming: function(t, e) {
                                  this.up.incoming(t, e)
                              },
                              outgoing: function(t, e) {
                                  this.down.outgoing(t, e)
                              },
                              callback: function(t) {
                                  this.up.callback(t)
                              },
                              init: function() {
                                  this.down.init()
                              },
                              destroy: function() {
                                  this.down.destroy()
                              }
                          }, i = 0, o = t.length; o > i; i++) e = t[i], k(e, n, !0), 0 !== i && (e.down = t[i - 1]), i !== o - 1 && (e.up = t[i + 1]);
                      return e
                  }

                  function E(t) {
                      t.up.down = t.down, t.down.up = t.up, t.up = t.down = null
                  }
                  var O, A, P, j, L, I = this,
                      R = Math.floor(1e4 * Math.random()),
                      C = Function.prototype,
                      N = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
                      U = /[\-\w]+\/\.\.\//,
                      M = /([^:])\/\//g,
                      K = "",
                      B = {},
                      D = t.easyXDM,
                      F = "easyXDM_",
                      X = !1;
                  if (s(t, "addEventListener")) j = function(t, e, n) {
                      t.addEventListener(e, n, !1)
                  }, L = function(t, e, n) {
                      t.removeEventListener(e, n, !1)
                  };
                  else {
                      if (!s(t, "attachEvent")) throw new Error("Browser not supported");
                      j = function(t, e, n) {
                          t.attachEvent("on" + e, n)
                      }, L = function(t, e, n) {
                          t.detachEvent("on" + e, n)
                      }
                  }
                  var q, Y = !1,
                      z = [];
                  if ("readyState" in e ? (q = e.readyState, Y = "complete" == q || ~navigator.userAgent.indexOf("AppleWebKit/") && ("loaded" == q || "interactive" == q)) : Y = !!e.body, !Y) {
                      if (s(t, "addEventListener")) j(e, "DOMContentLoaded", l);
                      else if (j(e, "readystatechange", function() {
                              "complete" == e.readyState && l()
                          }), e.documentElement.doScroll && t === top) {
                          var W = function V() {
                              if (!Y) {
                                  try {
                                      e.documentElement.doScroll("left")
                                  } catch (t) {
                                      return i(V, 1), void 0
                                  }
                                  l()
                              }
                          };
                          W()
                      }
                      j(t, "load", l)
                  }
                  var H = function(t) {
                          t = t.substring(1).split("&");
                          for (var e, n = {}, i = t.length; i--;) e = t[i].split("="), n[e[0]] = o(e[1]);
                          return n
                      }(/xdm_e=/.test(n.search) ? n.search : n.hash),
                      $ = function() {
                          var t = {},
                              e = {
                                  a: [1, 2, 3]
                              },
                              n = '{"a":[1,2,3]}';
                          return "undefined" != typeof JSON && "function" == typeof JSON.stringify && JSON.stringify(e).replace(/\s/g, "") === n ? JSON : (Object.toJSON && Object.toJSON(e).replace(/\s/g, "") === n && (t.stringify = Object.toJSON), "function" == typeof String.prototype.evalJSON && (e = n.evalJSON(), e.a && 3 === e.a.length && 3 === e.a[2] && (t.parse = function(t) {
                              return t.evalJSON()
                          })), t.stringify && t.parse ? ($ = function() {
                              return t
                          }, t) : null)
                      };
                  k(B, {
                          version: "2.4.19.3",
                          query: H,
                          stack: {},
                          apply: k,
                          getJSONObject: $,
                          whenReady: h,
                          noConflict: d
                      }), B.DomHelper = {
                          on: j,
                          un: L,
                          requiresJSON: function(n) {
                              a(t, "JSON") || e.write('<script type="text/javascript" src="' + n + '"></script>')
                          }
                      },
                      function() {
                          var t = {};
                          B.Fn = {
                              set: function(e, n) {
                                  t[e] = n
                              },
                              get: function(e, n) {
                                  if (t.hasOwnProperty(e)) {
                                      var i = t[e];
                                      return n && delete t[e], i
                                  }
                              }
                          }
                      }(), B.Socket = function(t) {
                          var e = T(S(t).concat([{
                                  incoming: function(e, n) {
                                      t.onMessage(e, n)
                                  },
                                  callback: function(e) {
                                      t.onReady && t.onReady(e)
                                  }
                              }])),
                              n = g(t.remote);
                          this.origin = g(t.remote), this.destroy = function() {
                              e.destroy()
                          }, this.postMessage = function(t) {
                              e.outgoing(t, n)
                          }, e.init()
                      }, B.Rpc = function(t, e) {
                          if (e.local)
                              for (var n in e.local)
                                  if (e.local.hasOwnProperty(n)) {
                                      var i = e.local[n];
                                      "function" == typeof i && (e.local[n] = {
                                          method: i
                                      })
                                  }
                          var o = T(S(t).concat([new B.stack.RpcBehavior(this, e), {
                              callback: function(e) {
                                  t.onReady && t.onReady(e)
                              }
                          }]));
                          this.origin = g(t.remote), this.destroy = function() {
                              o.destroy()
                          }, o.init()
                      }, B.stack.SameOriginTransport = function(t) {
                          var e, o, r, s;
                          return e = {
                              outgoing: function(t, e, n) {
                                  r(t), n && n()
                              },
                              destroy: function() {
                                  o && (o.parentNode.removeChild(o), o = null)
                              },
                              onDOMReady: function() {
                                  s = g(t.remote), t.isHost ? (k(t.props, {
                                      src: y(t.remote, {
                                          xdm_e: n.protocol + "//" + n.host + n.pathname,
                                          xdm_c: t.channel,
                                          xdm_p: 4
                                      }),
                                      name: F + t.channel + "_provider"
                                  }), o = w(t), B.Fn.set(t.channel, function(t) {
                                      return r = t, i(function() {
                                              e.up.callback(!0)
                                          }, 0),
                                          function(t) {
                                              e.up.incoming(t, s)
                                          }
                                  })) : (r = p().Fn.get(t.channel, !0)(function(t) {
                                      e.up.incoming(t, s)
                                  }), i(function() {
                                      e.up.callback(!0)
                                  }, 0))
                              },
                              init: function() {
                                  h(e.onDOMReady, e)
                              }
                          }
                      }, B.stack.FlashTransport = function(t) {
                          function o(t) {
                              i(function() {
                                  a.up.incoming(t, u)
                              }, 0)
                          }

                          function s(n) {
                              var i = t.swf + "?host=" + t.isHost,
                                  o = "easyXDM_swf_" + Math.floor(1e4 * Math.random());
                              B.Fn.set("flash_loaded" + n.replace(/[\-.]/g, "_"), function() {
                                  B.stack.FlashTransport[n].swf = l = p.firstChild;
                                  for (var t = B.stack.FlashTransport[n].queue, e = 0; e < t.length; e++) t[e]();
                                  t.length = 0
                              }), t.swfContainer ? p = "string" == typeof t.swfContainer ? e.getElementById(t.swfContainer) : t.swfContainer : (p = e.createElement("div"), k(p.style, P && t.swfNoThrottle ? {
                                  height: "20px",
                                  width: "20px",
                                  position: "fixed",
                                  right: 0,
                                  top: 0
                              } : {
                                  height: "1px",
                                  width: "1px",
                                  position: "absolute",
                                  overflow: "hidden",
                                  right: 0,
                                  top: 0
                              }), e.body.appendChild(p));
                              var s = "callback=flash_loaded" + r(n.replace(/[\-.]/g, "_")) + "&proto=" + I.location.protocol + "&domain=" + r(f(I.location.href)) + "&port=" + r(m(I.location.href)) + "&ns=" + r(K);
                              p.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + o + "' data='" + i + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + i + "'></param><param name='flashvars' value='" + s + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + s + "' allowScriptAccess='always' wmode='transparent' src='" + i + "' height='1' width='1'></embed></object>"
                          }
                          var a, c, u, l, p;
                          return a = {
                              outgoing: function(e, n, i) {
                                  l.postMessage(t.channel, e.toString()), i && i()
                              },
                              destroy: function() {
                                  try {
                                      l.destroyChannel(t.channel)
                                  } catch (e) {}
                                  l = null, c && (c.parentNode.removeChild(c), c = null)
                              },
                              onDOMReady: function() {
                                  u = t.remote, B.Fn.set("flash_" + t.channel + "_init", function() {
                                      i(function() {
                                          a.up.callback(!0)
                                      })
                                  }), B.Fn.set("flash_" + t.channel + "_onMessage", o), t.swf = v(t.swf);
                                  var e = f(t.swf),
                                      r = function() {
                                          B.stack.FlashTransport[e].init = !0, l = B.stack.FlashTransport[e].swf, l.createChannel(t.channel, t.secret, g(t.remote), t.isHost), t.isHost && (P && t.swfNoThrottle && k(t.props, {
                                              position: "fixed",
                                              right: 0,
                                              top: 0,
                                              height: "20px",
                                              width: "20px"
                                          }), k(t.props, {
                                              src: y(t.remote, {
                                                  xdm_e: g(n.href),
                                                  xdm_c: t.channel,
                                                  xdm_p: 6,
                                                  xdm_s: t.secret
                                              }),
                                              name: F + t.channel + "_provider"
                                          }), c = w(t))
                                      };
                                  B.stack.FlashTransport[e] && B.stack.FlashTransport[e].init ? r() : B.stack.FlashTransport[e] ? B.stack.FlashTransport[e].queue.push(r) : (B.stack.FlashTransport[e] = {
                                      queue: [r]
                                  }, s(e))
                              },
                              init: function() {
                                  h(a.onDOMReady, a)
                              }
                          }
                      }, B.stack.PostMessageTransport = function(e) {
                          function o(t) {
                              if (t.origin) return g(t.origin);
                              if (t.uri) return g(t.uri);
                              if (t.domain) return n.protocol + "//" + t.domain;
                              throw "Unable to retrieve the origin of the event"
                          }

                          function r(t) {
                              var n = o(t);
                              n == u && t.data.substring(0, e.channel.length + 1) == e.channel + " " && s.up.incoming(t.data.substring(e.channel.length + 1), n)
                          }
                          var s, a, c, u;
                          return s = {
                              outgoing: function(t, n, i) {
                                  c.postMessage(e.channel + " " + t, n || u), i && i()
                              },
                              destroy: function() {
                                  L(t, "message", r), a && (c = null, a.parentNode.removeChild(a), a = null)
                              },
                              onDOMReady: function() {
                                  if (u = g(e.remote), e.isHost) {
                                      var o = function l(n) {
                                          n.data == e.channel + "-ready" && (c = "postMessage" in a.contentWindow ? a.contentWindow : a.contentWindow.document, L(t, "message", l), j(t, "message", r), i(function() {
                                              s.up.callback(!0)
                                          }, 0))
                                      };
                                      j(t, "message", o), k(e.props, {
                                          src: y(e.remote, {
                                              xdm_e: g(n.href),
                                              xdm_c: e.channel,
                                              xdm_p: 1
                                          }),
                                          name: F + e.channel + "_provider"
                                      }), a = w(e)
                                  } else j(t, "message", r), c = "postMessage" in t.parent ? t.parent : t.parent.document, c.postMessage(e.channel + "-ready", u), i(function() {
                                      s.up.callback(!0)
                                  }, 0)
                              },
                              init: function() {
                                  h(s.onDOMReady, s)
                              }
                          }
                      }, B.stack.FrameElementTransport = function(o) {
                          var r, s, a, c;
                          return r = {
                              outgoing: function(t, e, n) {
                                  a.call(this, t), n && n()
                              },
                              destroy: function() {
                                  s && (s.parentNode.removeChild(s), s = null)
                              },
                              onDOMReady: function() {
                                  c = g(o.remote), o.isHost ? (k(o.props, {
                                      src: y(o.remote, {
                                          xdm_e: g(n.href),
                                          xdm_c: o.channel,
                                          xdm_p: 5
                                      }),
                                      name: F + o.channel + "_provider"
                                  }), s = w(o), s.fn = function(t) {
                                      return delete s.fn, a = t, i(function() {
                                              r.up.callback(!0)
                                          }, 0),
                                          function(t) {
                                              r.up.incoming(t, c)
                                          }
                                  }) : (e.referrer && g(e.referrer) != H.xdm_e && (t.top.location = H.xdm_e), a = t.frameElement.fn(function(t) {
                                      r.up.incoming(t, c)
                                  }), r.up.callback(!0))
                              },
                              init: function() {
                                  h(r.onDOMReady, r)
                              }
                          }
                      }, B.stack.NameTransport = function(t) {
                          function e(e) {
                              var n = t.remoteHelper + (a ? "#_3" : "#_2") + t.channel;
                              c.contentWindow.sendMessage(e, n)
                          }

                          function n() {
                              a ? 2 !== ++l && a || s.up.callback(!0) : (e("ready"), s.up.callback(!0))
                          }

                          function o(t) {
                              s.up.incoming(t, d)
                          }

                          function r() {
                              p && i(function() {
                                  p(!0)
                              }, 0)
                          }
                          var s, a, c, u, l, p, d, f;
                          return s = {
                              outgoing: function(t, n, i) {
                                  p = i, e(t)
                              },
                              destroy: function() {
                                  c.parentNode.removeChild(c), c = null, a && (u.parentNode.removeChild(u), u = null)
                              },
                              onDOMReady: function() {
                                  a = t.isHost, l = 0, d = g(t.remote), t.local = v(t.local), a ? (B.Fn.set(t.channel, function(e) {
                                      a && "ready" === e && (B.Fn.set(t.channel, o), n())
                                  }), f = y(t.remote, {
                                      xdm_e: t.local,
                                      xdm_c: t.channel,
                                      xdm_p: 2
                                  }), k(t.props, {
                                      src: f + "#" + t.channel,
                                      name: F + t.channel + "_provider"
                                  }), u = w(t)) : (t.remoteHelper = t.remote, B.Fn.set(t.channel, o));
                                  var e = function s() {
                                      var e = c || this;
                                      L(e, "load", s), B.Fn.set(t.channel + "_load", r),
                                          function o() {
                                              "function" == typeof e.contentWindow.sendMessage ? n() : i(o, 50)
                                          }()
                                  };
                                  c = w({
                                      props: {
                                          src: t.local + "#_4" + t.channel
                                      },
                                      onLoad: e
                                  })
                              },
                              init: function() {
                                  h(s.onDOMReady, s)
                              }
                          }
                      }, B.stack.HashTransport = function(e) {
                          function n(t) {
                              if (m) {
                                  var n = e.remote + "#" + d++ + "_" + t;
                                  (c || !v ? m.contentWindow : m).location = n
                              }
                          }

                          function o(t) {
                              p = t, a.up.incoming(p.substring(p.indexOf("_") + 1), y)
                          }

                          function r() {
                              if (f) {
                                  var t = f.location.href,
                                      e = "",
                                      n = t.indexOf("#"); - 1 != n && (e = t.substring(n)), e && e != p && o(e)
                              }
                          }

                          function s() {
                              u = setInterval(r, l)
                          }
                          var a, c, u, l, p, d, f, m, v, y;
                          return a = {
                              outgoing: function(t) {
                                  n(t)
                              },
                              destroy: function() {
                                  t.clearInterval(u), (c || !v) && m.parentNode.removeChild(m), m = null
                              },
                              onDOMReady: function() {
                                  if (c = e.isHost, l = e.interval, p = "#" + e.channel, d = 0, v = e.useParent, y = g(e.remote), c) {
                                      if (k(e.props, {
                                              src: e.remote,
                                              name: F + e.channel + "_provider"
                                          }), v) e.onLoad = function() {
                                          f = t, s(), a.up.callback(!0)
                                      };
                                      else {
                                          var n = 0,
                                              o = e.delay / 50;
                                          ! function r() {
                                              if (++n > o) throw new Error("Unable to reference listenerwindow");
                                              try {
                                                  f = m.contentWindow.frames[F + e.channel + "_consumer"]
                                              } catch (t) {}
                                              f ? (s(), a.up.callback(!0)) : i(r, 50)
                                          }()
                                      }
                                      m = w(e)
                                  } else f = t, s(), v ? (m = parent, a.up.callback(!0)) : (k(e, {
                                      props: {
                                          src: e.remote + "#" + e.channel + new Date,
                                          name: F + e.channel + "_consumer"
                                      },
                                      onLoad: function() {
                                          a.up.callback(!0)
                                      }
                                  }), m = w(e))
                              },
                              init: function() {
                                  h(a.onDOMReady, a)
                              }
                          }
                      }, B.stack.ReliableBehavior = function() {
                          var t, e, n = 0,
                              i = 0,
                              o = "";
                          return t = {
                              incoming: function(r, s) {
                                  var a = r.indexOf("_"),
                                      c = r.substring(0, a).split(",");
                                  r = r.substring(a + 1), c[0] == n && (o = "", e && e(!0)), r.length > 0 && (t.down.outgoing(c[1] + "," + n + "_" + o, s), i != c[1] && (i = c[1], t.up.incoming(r, s)))
                              },
                              outgoing: function(r, s, a) {
                                  o = r, e = a, t.down.outgoing(i + "," + ++n + "_" + r, s)
                              }
                          }
                      }, B.stack.QueueBehavior = function(t) {
                          function e() {
                              if (t.remove && 0 === a.length) return E(n), void 0;
                              if (!c && 0 !== a.length && !s) {
                                  c = !0;
                                  var o = a.shift();
                                  n.down.outgoing(o.data, o.origin, function(t) {
                                      c = !1, o.callback && i(function() {
                                          o.callback(t)
                                      }, 0), e()
                                  })
                              }
                          }
                          var n, s, a = [],
                              c = !0,
                              u = "",
                              l = 0,
                              h = !1,
                              p = !1;
                          return n = {
                              init: function() {
                                  b(t) && (t = {}), t.maxLength && (l = t.maxLength, p = !0), t.lazy ? h = !0 : n.down.init()
                              },
                              callback: function(t) {
                                  c = !1;
                                  var i = n.up;
                                  e(), i.callback(t)
                              },
                              incoming: function(e, i) {
                                  if (p) {
                                      var r = e.indexOf("_"),
                                          s = parseInt(e.substring(0, r), 10);
                                      u += e.substring(r + 1), 0 === s && (t.encode && (u = o(u)), n.up.incoming(u, i), u = "")
                                  } else n.up.incoming(e, i)
                              },
                              outgoing: function(i, o, s) {
                                  t.encode && (i = r(i));
                                  var c, u = [];
                                  if (p) {
                                      for (; 0 !== i.length;) c = i.substring(0, l), i = i.substring(c.length), u.push(c);
                                      for (; c = u.shift();) a.push({
                                          data: u.length + "_" + c,
                                          origin: o,
                                          callback: 0 === u.length ? s : null
                                      })
                                  } else a.push({
                                      data: i,
                                      origin: o,
                                      callback: s
                                  });
                                  h ? n.down.init() : e()
                              },
                              destroy: function() {
                                  s = !0, n.down.destroy()
                              }
                          }
                      }, B.stack.VerifyBehavior = function(t) {
                          function e() {
                              i = Math.random().toString(16).substring(2), n.down.outgoing(i)
                          }
                          var n, i, o;
                          return n = {
                              incoming: function(r, s) {
                                  var a = r.indexOf("_"); - 1 === a ? r === i ? n.up.callback(!0) : o || (o = r, t.initiate || e(), n.down.outgoing(r)) : r.substring(0, a) === o && n.up.incoming(r.substring(a + 1), s)
                              },
                              outgoing: function(t, e, o) {
                                  n.down.outgoing(i + "_" + t, e, o)
                              },
                              callback: function() {
                                  t.initiate && e()
                              }
                          }
                      }, B.stack.RpcBehavior = function(t, e) {
                          function n(t) {
                              t.jsonrpc = "2.0", r.down.outgoing(s.stringify(t))
                          }

                          function i(t, e) {
                              var i = Array.prototype.slice;
                              return function() {
                                  var o, r = arguments.length,
                                      s = {
                                          method: e
                                      };
                                  r > 0 && "function" == typeof arguments[r - 1] ? (r > 1 && "function" == typeof arguments[r - 2] ? (o = {
                                      success: arguments[r - 2],
                                      error: arguments[r - 1]
                                  }, s.params = i.call(arguments, 0, r - 2)) : (o = {
                                      success: arguments[r - 1]
                                  }, s.params = i.call(arguments, 0, r - 1)), u["" + ++a] = o, s.id = a) : s.params = i.call(arguments, 0), t.namedParams && 1 === s.params.length && (s.params = s.params[0]), n(s)
                              }
                          }

                          function o(t, e, i, o) {
                              if (!i) return e && n({
                                  id: e,
                                  error: {
                                      code: -32601,
                                      message: "Procedure not found."
                                  }
                              }), void 0;
                              var r, s;
                              e ? (r = function(t) {
                                  r = C, n({
                                      id: e,
                                      result: t
                                  })
                              }, s = function(t, i) {
                                  s = C;
                                  var o = {
                                      id: e,
                                      error: {
                                          code: -32099,
                                          message: t
                                      }
                                  };
                                  i && (o.error.data = i), n(o)
                              }) : r = s = C, c(o) || (o = [o]);
                              try {
                                  var a = i.method.apply(i.scope, o.concat([r, s]));
                                  b(a) || r(a)
                              } catch (u) {
                                  s(u.message)
                              }
                          }
                          var r, s = e.serializer || $(),
                              a = 0,
                              u = {};
                          return r = {
                              incoming: function(t) {
                                  var i = s.parse(t);
                                  if (i.method) e.handle ? e.handle(i, n) : o(i.method, i.id, e.local[i.method], i.params);
                                  else {
                                      var r = u[i.id];
                                      i.error ? r.error && r.error(i.error) : r.success && r.success(i.result), delete u[i.id]
                                  }
                              },
                              init: function() {
                                  if (e.remote)
                                      for (var n in e.remote) e.remote.hasOwnProperty(n) && (t[n] = i(e.remote[n], n));
                                  r.down.init()
                              },
                              destroy: function() {
                                  for (var n in e.remote) e.remote.hasOwnProperty(n) && t.hasOwnProperty(n) && delete t[n];
                                  r.down.destroy()
                              }
                          }
                      }, I.easyXDM = B
              }(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent), easyXDM.noConflict("Kakao")
          }()
      }, {}],
      21: [function(e, n) {
          (function(i, o) {
              /*!
               * ES6-Promise
               * https://github.com/stefanpenner/es6-promise
               * Copyright 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
               * MIT License
               */
              (function() {
                  "use strict";

                  function r(t) {
                      return "function" == typeof t || "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && null !== t
                  }

                  function s(t) {
                      return "function" == typeof t
                  }

                  function a(t) {
                      return "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && null !== t
                  }

                  function c(t, e) {
                      te[H] = t, te[H + 1] = e, H += 2, 2 === H && z()
                  }

                  function u() {
                      var t = i.nextTick,
                          e = i.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
                      return Array.isArray(e) && "0" === e[1] && "10" === e[2] && (t = setImmediate),
                          function() {
                              t(f)
                          }
                  }

                  function l() {
                      return function() {
                          Y(f)
                      }
                  }

                  function h() {
                      var t = 0,
                          e = new J(f),
                          n = document.createTextNode("");
                      return e.observe(n, {
                              characterData: !0
                          }),
                          function() {
                              n.data = t = ++t % 2
                          }
                  }

                  function p() {
                      var t = new MessageChannel;
                      return t.port1.onmessage = f,
                          function() {
                              t.port2.postMessage(0)
                          }
                  }

                  function d() {
                      return function() {
                          setTimeout(f, 1)
                      }
                  }

                  function f() {
                      for (var t = 0; H > t; t += 2) {
                          var e = te[t],
                              n = te[t + 1];
                          e(n), te[t] = void 0, te[t + 1] = void 0
                      }
                      H = 0
                  }

                  function m() {
                      try {
                          var t = e,
                              n = t("vertx");
                          return Y = n.runOnLoop || n.runOnContext, l()
                      } catch (i) {
                          return d()
                      }
                  }

                  function g() {}

                  function v() {
                      return new TypeError("You cannot resolve a promise with itself")
                  }

                  function y() {
                      return new TypeError("A promises callback cannot return that same promise.")
                  }

                  function b(t) {
                      try {
                          return t.then
                      } catch (e) {
                          return oe.error = e, oe
                      }
                  }

                  function k(t, e, n, i) {
                      try {
                          t.call(e, n, i)
                      } catch (o) {
                          return o
                      }
                  }

                  function _(t, e, n) {
                      $(function(t) {
                          var i = !1,
                              o = k(n, e, function(n) {
                                  i || (i = !0, e !== n ? S(t, n) : E(t, n))
                              }, function(e) {
                                  i || (i = !0, O(t, e))
                              }, "Settle: " + (t._label || " unknown promise"));
                          !i && o && (i = !0, O(t, o))
                      }, t)
                  }

                  function w(t, e) {
                      e._state === ne ? E(t, e._result) : e._state === ie ? O(t, e._result) : A(e, void 0, function(e) {
                          S(t, e)
                      }, function(e) {
                          O(t, e)
                      })
                  }

                  function x(t, e) {
                      if (e.constructor === t.constructor) w(t, e);
                      else {
                          var n = b(e);
                          n === oe ? O(t, oe.error) : void 0 === n ? E(t, e) : s(n) ? _(t, e, n) : E(t, e)
                      }
                  }

                  function S(t, e) {
                      t === e ? O(t, v()) : r(e) ? x(t, e) : E(t, e)
                  }

                  function T(t) {
                      t._onerror && t._onerror(t._result), P(t)
                  }

                  function E(t, e) {
                      t._state === ee && (t._result = e, t._state = ne, 0 !== t._subscribers.length && $(P, t))
                  }

                  function O(t, e) {
                      t._state === ee && (t._state = ie, t._result = e, $(T, t))
                  }

                  function A(t, e, n, i) {
                      var o = t._subscribers,
                          r = o.length;
                      t._onerror = null, o[r] = e, o[r + ne] = n, o[r + ie] = i, 0 === r && t._state && $(P, t)
                  }

                  function P(t) {
                      var e = t._subscribers,
                          n = t._state;
                      if (0 !== e.length) {
                          for (var i, o, r = t._result, s = 0; s < e.length; s += 3) i = e[s], o = e[s + n], i ? I(n, i, o, r) : o(r);
                          t._subscribers.length = 0
                      }
                  }

                  function j() {
                      this.error = null
                  }

                  function L(t, e) {
                      try {
                          return t(e)
                      } catch (n) {
                          return re.error = n, re
                      }
                  }

                  function I(t, e, n, i) {
                      var o, r, a, c, u = s(n);
                      if (u) {
                          if (o = L(n, i), o === re ? (c = !0, r = o.error, o = null) : a = !0, e === o) return O(e, y()), void 0
                      } else o = i, a = !0;
                      e._state !== ee || (u && a ? S(e, o) : c ? O(e, r) : t === ne ? E(e, o) : t === ie && O(e, o))
                  }

                  function R(t, e) {
                      try {
                          e(function(e) {
                              S(t, e)
                          }, function(e) {
                              O(t, e)
                          })
                      } catch (n) {
                          O(t, n)
                      }
                  }

                  function C(t, e) {
                      var n = this;
                      n._instanceConstructor = t, n.promise = new t(g), n._validateInput(e) ? (n._input = e, n.length = e.length, n._remaining = e.length, n._init(), 0 === n.length ? E(n.promise, n._result) : (n.length = n.length || 0, n._enumerate(), 0 === n._remaining && E(n.promise, n._result))) : O(n.promise, n._validationError())
                  }

                  function N(t) {
                      return new se(this, t).promise
                  }

                  function U(t) {
                      function e(t) {
                          S(o, t)
                      }

                      function n(t) {
                          O(o, t)
                      }
                      var i = this,
                          o = new i(g);
                      if (!W(t)) return O(o, new TypeError("You must pass an array to race.")), o;
                      for (var r = t.length, s = 0; o._state === ee && r > s; s++) A(i.resolve(t[s]), void 0, e, n);
                      return o
                  }

                  function M(t) {
                      var e = this;
                      if (t && "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && t.constructor === e) return t;
                      var n = new e(g);
                      return S(n, t), n
                  }

                  function K(t) {
                      var e = this,
                          n = new e(g);
                      return O(n, t), n
                  }

                  function B() {
                      throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                  }

                  function D() {
                      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                  }

                  function F(t) {
                      this._id = he++, this._state = void 0, this._result = void 0, this._subscribers = [], g !== t && (s(t) || B(), this instanceof F || D(), R(this, t))
                  }

                  function X() {
                      var t;
                      if ("undefined" != typeof o) t = o;
                      else if ("undefined" != typeof self) t = self;
                      else try {
                          t = Function("return this")()
                      } catch (e) {
                          throw new Error("polyfill failed because global object is unavailable in this environment")
                      }
                      var n = t.Promise;
                      (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (t.Promise = pe)
                  }
                  var q;
                  q = Array.isArray ? Array.isArray : function(t) {
                      return "[object Array]" === Object.prototype.toString.call(t)
                  };
                  var Y, z, W = q,
                      H = 0,
                      $ = ({}.toString, c),
                      V = "undefined" != typeof window ? window : void 0,
                      G = V || {},
                      J = G.MutationObserver || G.WebKitMutationObserver,
                      Q = "undefined" != typeof i && "[object process]" === {}.toString.call(i),
                      Z = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                      te = new Array(1e3);
                  z = Q ? u() : J ? h() : Z ? p() : void 0 === V && "function" == typeof e ? m() : d();
                  var ee = void 0,
                      ne = 1,
                      ie = 2,
                      oe = new j,
                      re = new j;
                  C.prototype._validateInput = function(t) {
                      return W(t)
                  }, C.prototype._validationError = function() {
                      return new Error("Array Methods must be provided an Array")
                  }, C.prototype._init = function() {
                      this._result = new Array(this.length)
                  };
                  var se = C;
                  C.prototype._enumerate = function() {
                      for (var t = this, e = t.length, n = t.promise, i = t._input, o = 0; n._state === ee && e > o; o++) t._eachEntry(i[o], o)
                  }, C.prototype._eachEntry = function(t, e) {
                      var n = this,
                          i = n._instanceConstructor;
                      a(t) ? t.constructor === i && t._state !== ee ? (t._onerror = null, n._settledAt(t._state, e, t._result)) : n._willSettleAt(i.resolve(t), e) : (n._remaining--, n._result[e] = t)
                  }, C.prototype._settledAt = function(t, e, n) {
                      var i = this,
                          o = i.promise;
                      o._state === ee && (i._remaining--, t === ie ? O(o, n) : i._result[e] = n), 0 === i._remaining && E(o, i._result)
                  }, C.prototype._willSettleAt = function(t, e) {
                      var n = this;
                      A(t, void 0, function(t) {
                          n._settledAt(ne, e, t)
                      }, function(t) {
                          n._settledAt(ie, e, t)
                      })
                  };
                  var ae = N,
                      ce = U,
                      ue = M,
                      le = K,
                      he = 0,
                      pe = F;
                  F.all = ae, F.race = ce, F.resolve = ue, F.reject = le, F.prototype = {
                      constructor: F,
                      then: function(t, e) {
                          var n = this,
                              i = n._state;
                          if (i === ne && !t || i === ie && !e) return this;
                          var o = new this.constructor(g),
                              r = n._result;
                          if (i) {
                              var s = arguments[i - 1];
                              $(function() {
                                  I(i, o, s, r)
                              })
                          } else A(n, o, t, e);
                          return o
                      },
                      "catch": function(t) {
                          return this.then(null, t)
                      }
                  };
                  var de = X,
                      fe = {
                          Promise: pe,
                          polyfill: de
                      };
                  "function" == typeof t && t.amd ? t(function() {
                      return fe
                  }) : "undefined" != typeof n && n.exports ? n.exports = fe : "undefined" != typeof this && (this.ES6Promise = fe), de()
              }).call(this)
          }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
      }, {
          _process: 24
      }],
      22: [function(t, e) {
          e.exports = function() {
              var t = function(t) {
                  function e(t) {
                      var e = {},
                          i = /(dolfin)[ \/]([\w.]+)/.exec(t) || /(edge)[ \/]([\w.]+)/.exec(t) || /(chrome)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(t) || /(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(t) || ["", "unknown"];
                      return "webkit" === i[1] ? i = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(t) || /(android)[ \/]([\w._\-]+);/.exec(t) || [i[0], "safari", i[2]] : "mozilla" === i[1] ? i[1] = /trident/.test(t) ? "msie" : "firefox" : "edge" === i[1] ? i[1] = "spartan" : /polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(t) && (i[1] = "polaris"), e[i[1]] = !0, e.name = i[1], e.version = n(i[2]), e
                  }

                  function n(t) {
                      var e = {},
                          n = t ? t.split(/\.|-|_/) : ["0", "0", "0"];
                      return e.info = n.join("."), e.major = n[0] || "0", e.minor = n[1] || "0", e.patch = n[2] || "0", e
                  }

                  function i(t) {
                      return o(t) ? "pc" : r(t) ? "tablet" : s(t) ? "mobile" : ""
                  }

                  function o(t) {
                      return t.match(/linux|windows (nt|98)|macintosh/) && !t.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/) ? !0 : !1
                  }

                  function r(t) {
                      return t.match(/ipad/) || t.match(/android/) && !t.match(/mobi|mini|fennec/) ? !0 : !1
                  }

                  function s(t) {
                      return t.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/) ? !0 : !1
                  }

                  function a(t) {
                      var e = {},
                          i = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(t) || /(android)[ \/]([\w._\-]+);/.exec(t) || (/android/.test(t) ? ["", "android", "0.0.0"] : !1) || (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(t) ? ["", "polaris", "0.0.0"] : !1) || /(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(t) || (/(windows)/.test(t) ? ["", "windows", "0.0.0"] : !1) || /(mac) os x ([\w._\-]+)/.exec(t) || (/(linux)/.test(t) ? ["", "linux", "0.0.0"] : !1) || (/webos/.test(t) ? ["", "webos", "0.0.0"] : !1) || /(bada)[ \/]([\w._\-]+)/.exec(t) || (/bada/.test(t) ? ["", "bada", "0.0.0"] : !1) || (/(rim|blackberry|bb10)/.test(t) ? ["", "blackberry", "0.0.0"] : !1) || ["", "unknown", "0.0.0"];
                      return "iphone" === i[1] || "ipad" === i[1] || "ipod" === i[1] ? i[1] = "ios" : "windows" === i[1] && "98" === i[2] && (i[2] = "0.98.0"), e[i[1]] = !0, e.name = i[1], e.version = n(i[2]), e
                  }

                  function c(t) {
                      var e = {},
                          i = /(crios)[ \/]([\w.]+)/.exec(t) || /(daumapps)[ \/]([\w.]+)/.exec(t) || ["", ""];
                      return i[1] ? (e.isApp = !0, e.name = i[1], e.version = n(i[2])) : e.isApp = !1, e
                  }
                  return t = (t || window.navigator.userAgent).toString().toLowerCase(), {
                      ua: t,
                      browser: e(t),
                      platform: i(t),
                      os: a(t),
                      app: c(t)
                  }
              };
              return t
          }()
      }, {}],
      23: [function(t, e) {
          /*!
           * web2app
           * https://github.com/kakao/web2app
           * Copyright 2015 Kakao Corp. http://www.kakaocorp.com
           * MIT License
           */
          e.exports = function() {
              function e(t) {
                  window.location.href = t
              }

              function n(t) {
                  var n = "function" == typeof t.willInvokeApp ? t.willInvokeApp : function() {},
                      r = "function" == typeof t.onAppMissing ? t.onAppMissing : e,
                      c = "function" == typeof t.onUnsupportedEnvironment ? t.onUnsupportedEnvironment : function() {};
                  n(), k.android ? i() && t.intentURI && !t.useUrlScheme ? s(t.intentURI) : t.storeURL && o(t.urlScheme, t.storeURL, r) : k.ios && t.storeURL ? a(t.urlScheme, t.storeURL, r, t.universalLink) : setTimeout(function() {
                      c()
                  }, 100)
              }

              function i() {
                  var t = b.browser.chrome && +b.browser.version.major >= 25,
                      e = new RegExp(_.join("|"), "i"),
                      n = new RegExp(w.join("|"), "i");
                  return t && !e.test(b.ua) || n.test(b.ua)
              }

              function o(t, e, n) {
                  r(v, e, n), p(t)
              }

              function r(t, e, n) {
                  var i = (new Date).getTime();
                  return setTimeout(function() {
                      var o = (new Date).getTime();
                      l() && t + y > o - i && n(e)
                  }, t)
              }

              function s(t) {
                  function e() {
                      top.location.href = t
                  }
                  b.browser.chrome ? e() : setTimeout(e, 100)
              }

              function a(t, e, n, i) {
                  var o = r(g, e, n);
                  parseInt(b.os.version.major, 10) < 8 ? c(o) : u(o), f() ? (void 0 === i ? i = t : clearTimeout(o), h(i)) : p(t)
              }

              function c(t) {
                  window.addEventListener("pagehide", function e() {
                      l() && (clearTimeout(t), window.removeEventListener("pagehide", e))
                  })
              }

              function u(t) {
                  document.addEventListener("visibilitychange", function e() {
                      l() && (clearTimeout(t), document.removeEventListener("visibilitychange", e))
                  })
              }

              function l() {
                  for (var t = ["hidden", "webkitHidden"], e = 0, n = t.length; n > e; e++)
                      if ("undefined" != typeof document[t[e]]) return !document[t[e]];
                  return !0
              }

              function h(t) {
                  window.top.location.href = t
              }

              function p(t) {
                  setTimeout(function() {
                      var e = d("appLauncher");
                      e.src = t
                  }, 100)
              }

              function d(t) {
                  var e = document.createElement("iframe");
                  return e.id = t, e.style.border = "none", e.style.width = "0", e.style.height = "0", e.style.display = "none", e.style.overflow = "hidden", document.body.appendChild(e), e
              }

              function f() {
                  return parseInt(b.os.version.major, 10) > 8 && b.os.ios
              }
              var m = t("./userAgent.js"),
                  g = 2e3,
                  v = 300,
                  y = 100,
                  b = m(),
                  k = b.os,
                  _ = ["firefox", "opr"],
                  w = ["KAKAOTALK"];
              return n
          }()
      }, {
          "./userAgent.js": 22
      }],
      24: [function(t, e) {
          function n() {
              throw new Error("setTimeout has not been defined")
          }

          function i() {
              throw new Error("clearTimeout has not been defined")
          }

          function o(t) {
              if (l === setTimeout) return setTimeout(t, 0);
              if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(t, 0);
              try {
                  return l(t, 0)
              } catch (e) {
                  try {
                      return l.call(null, t, 0)
                  } catch (e) {
                      return l.call(this, t, 0)
                  }
              }
          }

          function r(t) {
              if (h === clearTimeout) return clearTimeout(t);
              if ((h === i || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);
              try {
                  return h(t)
              } catch (e) {
                  try {
                      return h.call(null, t)
                  } catch (e) {
                      return h.call(this, t)
                  }
              }
          }

          function s() {
              m && d && (m = !1, d.length ? f = d.concat(f) : g = -1, f.length && a())
          }

          function a() {
              if (!m) {
                  var t = o(s);
                  m = !0;
                  for (var e = f.length; e;) {
                      for (d = f, f = []; ++g < e;) d && d[g].run();
                      g = -1, e = f.length
                  }
                  d = null, m = !1, r(t)
              }
          }

          function c(t, e) {
              this.fun = t, this.array = e
          }

          function u() {}
          var l, h, p = e.exports = {};
          ! function() {
              try {
                  l = "function" == typeof setTimeout ? setTimeout : n
              } catch (t) {
                  l = n
              }
              try {
                  h = "function" == typeof clearTimeout ? clearTimeout : i
              } catch (t) {
                  h = i
              }
          }();
          var d, f = [],
              m = !1,
              g = -1;
          p.nextTick = function(t) {
              var e = new Array(arguments.length - 1);
              if (arguments.length > 1)
                  for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
              f.push(new c(t, e)), 1 !== f.length || m || o(a)
          }, c.prototype.run = function() {
              this.fun.apply(null, this.array)
          }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = u, p.addListener = u, p.once = u, p.off = u, p.removeListener = u, p.removeAllListeners = u, p.emit = u, p.binding = function() {
              throw new Error("process.binding is not supported")
          }, p.cwd = function() {
              return "/"
          }, p.chdir = function() {
              throw new Error("process.chdir is not supported")
          }, p.umask = function() {
              return 0
          }
      }, {}],
      25: [function(t, e) {
          e.exports = function() {
              function e() {
                  return "Bearer " + o.getAccessToken()
              }

              function n() {
                  return "KakaoAK " + o.getAppKey()
              }

              function i() {
                  return o.getAccessToken() ? e() : n()
              }
              var o = t("../kakao-js-sdk/src/auth.js");
              return {
                  accessToken: e,
                  appKey: n,
                  tokenOrKey: i
              }
          }()
      }, {
          "../kakao-js-sdk/src/auth.js": 3
      }],
      26: [function(t, e) {
          e.exports = function() {
              function e() {
                  return i || (i = s.guardCreateEasyXDM(function() {
                      return new o.Rpc({
                          remote: "https://api-item.kakao.com/cors/"
                      }, {
                          remote: {
                              request: {}
                          }
                      })
                  })), i
              }
              var n = {};
              t("../kakao-js-sdk/vendor/es6-promise.js");
              var i, o = t("../kakao-js-sdk/vendor/easyXDM.js"),
                  r = t("./util.js"),
                  s = t("../kakao-js-sdk/src/common.js"),
                  a = t("./api.authType");
              n.request = function(t) {
                  function n() {
                      var e = {};
                      r.each(t.data, function(t, n) {
                          e[n] = r.isString(t) ? t : JSON.stringify(t)
                      });
                      var n = {
                              url: o,
                              method: c.api[o].method,
                              headers: {
                                  KA: s.KAKAO_AGENT
                              },
                              data: e
                          },
                          i = c.api[o].authType || a.accessToken;
                      return n.headers.Authorization = i(), new Promise(function(t) {
                          t(n)
                      })
                  }

                  function i(t) {
                      try {
                          s.logDebug(t);
                          var e = t.message;
                          return JSON.parse(e.responseText)
                      } catch (n) {
                          return {
                              code: -777,
                              msg: "Unknown error"
                          }
                      }
                  }
                  t = s.processRules(t, c.request, "API.request");
                  var o = t.url,
                      u = c.api[o].data;
                  return u && (t.data = s.processRules(t.data, c.api[o].data, "API.request - " + o)), new Promise(function(o, r) {
                      n().then(function(n) {
                          e().request(n, function(e) {
                              t.success(e), t.always(e), o(e)
                          }, function(e) {
                              var n = i(e);
                              t.fail(n), t.always(n), r(n)
                          })
                      }, function(t) {
                          r(t)
                      })
                  })
              }, n.createAPIAlias = function(t) {
                  return function(e) {
                      return e = e || {}, r.defaults(e, t), n.request(e)
                  }
              };
              var c = {
                  request: {
                      required: {
                          url: function(t) {
                              return r.isOneOf(r.keys(c.api))(t)
                          }
                      },
                      optional: {
                          data: r.isObject,
                          files: function(t) {
                              return r.passesOneOf([r.isArray, r.isFileList])(t) && r.every(t, r.passesOneOf([r.isFile, r.isBlob]))
                          },
                          success: r.isFunction,
                          fail: r.isFunction,
                          always: r.isFunction
                      },
                      defaults: {
                          data: {},
                          success: r.emptyFunc,
                          fail: r.emptyFunc,
                          always: r.emptyFunc
                      }
                  },
                  api: {
                      "/api/sdk/config": {
                          method: "get",
                          data: {
                              optional: {
                                  timestamp: r.isNumber
                              }
                          },
                          authType: a.appKey
                      },
                      "/api/sdk/items": {
                          method: "get",
                          data: {
                              optional: {
                                  timestamp: r.isNumber
                              }
                          },
                          authType: a.tokenOrKey
                      },
                      "/api/sdk/item": {
                          method: "get",
                          data: {
                              required: {
                                  id: r.passesOneOf([r.isNumber, r.isString])
                              },
                              optional: {
                                  timestamp: r.isNumber
                              }
                          },
                          authType: a.tokenOrKey
                      }
                  }
              };
              return n.cleanup = function() {
                  i && (i.destroy(), i = null)
              }, n
          }()
      }, {
          "../kakao-js-sdk/src/common.js": 7,
          "../kakao-js-sdk/vendor/easyXDM.js": 20,
          "../kakao-js-sdk/vendor/es6-promise.js": 21,
          "./api.authType": 25,
          "./util.js": 30
      }],
      27: [function(t, e) { /*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
          e.exports = function(t, e, n) {
              function i(n, i) {
                  this.wrapper = "string" == typeof n ? e.querySelector(n) : n, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                      resizeScrollbars: !0,
                      mouseWheelSpeed: 20,
                      snapThreshold: .334,
                      disablePointer: !a.hasPointer,
                      disableTouch: a.hasPointer || !a.hasTouch,
                      disableMouse: a.hasPointer || a.hasTouch,
                      startX: 0,
                      startY: 0,
                      scrollY: !0,
                      directionLockThreshold: 5,
                      momentum: !0,
                      bounce: !0,
                      bounceTime: 600,
                      bounceEasing: "",
                      preventDefault: !0,
                      preventDefaultException: {
                          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                      },
                      HWCompositing: !0,
                      useTransition: !0,
                      useTransform: !0,
                      bindToWrapper: "undefined" == typeof t.onmousedown
                  };
                  for (var o in i) this.options[o] = i[o];
                  this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
              }

              function o(t, n, i) {
                  var o = e.createElement("div"),
                      r = e.createElement("div");
                  return i === !0 && (o.style.cssText = "position:absolute;z-index:9999", r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), r.className = "iScrollIndicator", "h" == t ? (i === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", r.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (i === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", r.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", n || (o.style.pointerEvents = "none"), o.appendChild(r), o
              }

              function r(n, i) {
                  this.wrapper = "string" == typeof i.el ? e.querySelector(i.el) : i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = n, this.options = {
                      listenX: !0,
                      listenY: !0,
                      interactive: !1,
                      resize: !0,
                      defaultScrollbars: !1,
                      shrink: !1,
                      fade: !1,
                      speedRatioX: 0,
                      speedRatioY: 0
                  };
                  for (var o in i) this.options[o] = i[o];
                  if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade) {
                      this.wrapperStyle[a.style.transform] = this.scroller.translateZ;
                      var r = a.style.transitionDuration;
                      if (!r) return;
                      this.wrapperStyle[r] = a.isBadAndroid ? "0.0001ms" : "0ms";
                      var c = this;
                      a.isBadAndroid && s(function() {
                          "0.0001ms" === c.wrapperStyle[r] && (c.wrapperStyle[r] = "0s")
                      }), this.wrapperStyle.opacity = "0"
                  }
              }
              var s = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
                      t.setTimeout(e, 1e3 / 60)
                  },
                  a = function() {
                      function i(t) {
                          return s === !1 ? !1 : "" === s ? t : s + t.charAt(0).toUpperCase() + t.substr(1)
                      }
                      var o = {},
                          r = e.createElement("div").style,
                          s = function() {
                              for (var t, e = ["t", "webkitT", "MozT", "msT", "OT"], n = 0, i = e.length; i > n; n++)
                                  if (t = e[n] + "ransform", t in r) return e[n].substr(0, e[n].length - 1);
                              return !1
                          }();
                      o.getTime = Date.now || function() {
                          return (new Date).getTime()
                      }, o.extend = function(t, e) {
                          for (var n in e) t[n] = e[n]
                      }, o.addEvent = function(t, e, n, i) {
                          t.addEventListener(e, n, !!i)
                      }, o.removeEvent = function(t, e, n, i) {
                          t.removeEventListener(e, n, !!i)
                      }, o.prefixPointerEvent = function(e) {
                          return t.MSPointerEvent ? "MSPointer" + e.charAt(7).toUpperCase() + e.substr(8) : e
                      }, o.momentum = function(t, e, i, o, r, s) {
                          var a, c, u = t - e,
                              l = n.abs(u) / i;
                          return s = void 0 === s ? 6e-4 : s, a = t + l * l / (2 * s) * (0 > u ? -1 : 1), c = l / s, o > a ? (a = r ? o - r / 2.5 * (l / 8) : o, u = n.abs(a - t), c = u / l) : a > 0 && (a = r ? r / 2.5 * (l / 8) : 0, u = n.abs(t) + a, c = u / l), {
                              destination: n.round(a),
                              duration: c
                          }
                      };
                      var a = i("transform");
                      return o.extend(o, {
                          hasTransform: a !== !1,
                          hasPerspective: i("perspective") in r,
                          hasTouch: "ontouchstart" in t,
                          hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
                          hasTransition: i("transition") in r
                      }), o.isBadAndroid = function() {
                          var e = t.navigator.appVersion;
                          if (/Android/.test(e) && !/Chrome\/\d/.test(e)) {
                              var n = e.match(/Safari\/(\d+.\d)/);
                              return n && "object" === ("undefined" == typeof n ? "undefined" : _typeof(n)) && n.length >= 2 ? parseFloat(n[1]) < 535.19 : !0
                          }
                          return !1
                      }(), o.extend(o.style = {}, {
                          transform: a,
                          transitionTimingFunction: i("transitionTimingFunction"),
                          transitionDuration: i("transitionDuration"),
                          transitionDelay: i("transitionDelay"),
                          transformOrigin: i("transformOrigin")
                      }), o.hasClass = function(t, e) {
                          var n = new RegExp("(^|\\s)" + e + "(\\s|$)");
                          return n.test(t.className)
                      }, o.addClass = function(t, e) {
                          if (!o.hasClass(t, e)) {
                              var n = t.className.split(" ");
                              n.push(e), t.className = n.join(" ")
                          }
                      }, o.removeClass = function(t, e) {
                          if (o.hasClass(t, e)) {
                              var n = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
                              t.className = t.className.replace(n, " ")
                          }
                      }, o.offset = function(t) {
                          for (var e = -t.offsetLeft, n = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft, n -= t.offsetTop;
                          return {
                              left: e,
                              top: n
                          }
                      }, o.preventDefaultException = function(t, e) {
                          for (var n in e)
                              if (e[n].test(t[n])) return !0;
                          return !1
                      }, o.extend(o.eventType = {}, {
                          touchstart: 1,
                          touchmove: 1,
                          touchend: 1,
                          mousedown: 2,
                          mousemove: 2,
                          mouseup: 2,
                          pointerdown: 3,
                          pointermove: 3,
                          pointerup: 3,
                          MSPointerDown: 3,
                          MSPointerMove: 3,
                          MSPointerUp: 3
                      }), o.extend(o.ease = {}, {
                          quadratic: {
                              style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                              fn: function(t) {
                                  return t * (2 - t)
                              }
                          },
                          circular: {
                              style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                              fn: function(t) {
                                  return n.sqrt(1 - --t * t)
                              }
                          },
                          back: {
                              style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              fn: function(t) {
                                  var e = 4;
                                  return (t -= 1) * t * ((e + 1) * t + e) + 1
                              }
                          },
                          bounce: {
                              style: "",
                              fn: function(t) {
                                  return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                              }
                          },
                          elastic: {
                              style: "",
                              fn: function(t) {
                                  var e = .22,
                                      i = .4;
                                  return 0 === t ? 0 : 1 == t ? 1 : i * n.pow(2, -10 * t) * n.sin(2 * (t - e / 4) * n.PI / e) + 1
                              }
                          }
                      }), o.tap = function(t, n) {
                          var i = e.createEvent("Event");
                          i.initEvent(n, !0, !0), i.pageX = t.pageX, i.pageY = t.pageY, t.target.dispatchEvent(i)
                      }, o.click = function(n) {
                          var i, o = n.target;
                          /(SELECT|INPUT|TEXTAREA)/i.test(o.tagName) || (i = e.createEvent(t.MouseEvent ? "MouseEvents" : "Event"), i.initEvent("click", !0, !0), i.view = n.view || t, i.detail = 1, i.screenX = o.screenX || 0, i.screenY = o.screenY || 0, i.clientX = o.clientX || 0, i.clientY = o.clientY || 0, i.ctrlKey = !!n.ctrlKey, i.altKey = !!n.altKey, i.shiftKey = !!n.shiftKey, i.metaKey = !!n.metaKey, i.button = 0, i.relatedTarget = null, i._constructed = !0, o.dispatchEvent(i))
                      }, o
                  }();
              return i.prototype = {
                  version: "5.2.0",
                  _init: function() {
                      this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
                  },
                  destroy: function() {
                      this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
                  },
                  _transitionEnd: function(t) {
                      t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
                  },
                  _start: function(t) {
                      if (1 != a.eventType[t.type]) {
                          var e;
                          if (e = t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2, 0 !== e) return
                      }
                      if (this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                          !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                          var i, o = t.touches ? t.touches[0] : t;
                          this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, i = this.getComputedPosition(), this._translate(n.round(i.x), n.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = o.pageX, this.pointY = o.pageY, this._execEvent("beforeScrollStart")
                      }
                  },
                  _move: function(t) {
                      if (this.enabled && a.eventType[t.type] === this.initiated) {
                          this.options.preventDefault && t.preventDefault();
                          var e, i, o, r, s = t.touches ? t.touches[0] : t,
                              c = s.pageX - this.pointX,
                              u = s.pageY - this.pointY,
                              l = a.getTime();
                          if (this.pointX = s.pageX, this.pointY = s.pageY, this.distX += c, this.distY += u, o = n.abs(this.distX), r = n.abs(this.distY), !(l - this.endTime > 300 && 10 > o && 10 > r)) {
                              if (this.directionLocked || this.options.freeScroll || (this.directionLocked = o > r + this.options.directionLockThreshold ? "h" : r >= o + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
                                  if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                                  else if ("horizontal" == this.options.eventPassthrough) return this.initiated = !1, void 0;
                                  u = 0
                              } else if ("v" == this.directionLocked) {
                                  if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                                  else if ("vertical" == this.options.eventPassthrough) return this.initiated = !1, void 0;
                                  c = 0
                              }
                              c = this.hasHorizontalScroll ? c : 0, u = this.hasVerticalScroll ? u : 0, e = this.x + c, i = this.y + u, (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + c / 3 : e > 0 ? 0 : this.maxScrollX), (i > 0 || i < this.maxScrollY) && (i = this.options.bounce ? this.y + u / 3 : i > 0 ? 0 : this.maxScrollY), this.directionX = c > 0 ? -1 : 0 > c ? 1 : 0, this.directionY = u > 0 ? -1 : 0 > u ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(e, i), l - this.startTime > 300 && (this.startTime = l, this.startX = this.x, this.startY = this.y)
                          }
                      }
                  },
                  _end: function(t) {
                      if (this.enabled && a.eventType[t.type] === this.initiated) {
                          this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                          var e, i, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                              r = n.round(this.x),
                              s = n.round(this.y),
                              c = n.abs(r - this.startX),
                              u = n.abs(s - this.startY),
                              l = 0,
                              h = "";
                          if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                              if (this.scrollTo(r, s), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), this._execEvent("scrollCancel"), void 0;
                              if (this._events.flick && 200 > o && 100 > c && 100 > u) return this._execEvent("flick"), void 0;
                              if (this.options.momentum && 300 > o && (e = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                      destination: r,
                                      duration: 0
                                  }, i = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                      destination: s,
                                      duration: 0
                                  }, r = e.destination, s = i.destination, l = n.max(e.duration, i.duration), this.isInTransition = 1), this.options.snap) {
                                  var p = this._nearestSnap(r, s);
                                  this.currentPage = p, l = this.options.snapSpeed || n.max(n.max(n.min(n.abs(r - p.x), 1e3), n.min(n.abs(s - p.y), 1e3)), 300), r = p.x, s = p.y, this.directionX = 0, this.directionY = 0, h = this.options.bounceEasing
                              }
                              return r != this.x || s != this.y ? ((r > 0 || r < this.maxScrollX || s > 0 || s < this.maxScrollY) && (h = a.ease.quadratic), this.scrollTo(r, s, l, h), void 0) : (this._execEvent("scrollEnd"), void 0)
                          }
                      }
                  },
                  _resize: function() {
                      var t = this;
                      clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                          t.refresh()
                      }, this.options.resizePolling)
                  },
                  resetPosition: function(t) {
                      var e = this.x,
                          n = this.y;
                      return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? n = 0 : this.y < this.maxScrollY && (n = this.maxScrollY), e == this.x && n == this.y ? !1 : (this.scrollTo(e, n, t, this.options.bounceEasing), !0)
                  },
                  disable: function() {
                      this.enabled = !1
                  },
                  enable: function() {
                      this.enabled = !0
                  },
                  refresh: function() {
                      this.wrapper.offsetHeight;
                      this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
                  },
                  on: function(t, e) {
                      this._events[t] || (this._events[t] = []), this._events[t].push(e)
                  },
                  off: function(t, e) {
                      if (this._events[t]) {
                          var n = this._events[t].indexOf(e);
                          n > -1 && this._events[t].splice(n, 1)
                      }
                  },
                  _execEvent: function(t) {
                      if (this._events[t]) {
                          var e = 0,
                              n = this._events[t].length;
                          if (n)
                              for (; n > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
                      }
                  },
                  scrollBy: function(t, e, n, i) {
                      t = this.x + t, e = this.y + e, n = n || 0, this.scrollTo(t, e, n, i)
                  },
                  scrollTo: function(t, e, n, i) {
                      i = i || a.ease.circular, this.isInTransition = this.options.useTransition && n > 0;
                      var o = this.options.useTransition && i.style;
                      !n || o ? (o && (this._transitionTimingFunction(i.style), this._transitionTime(n)), this._translate(t, e)) : this._animate(t, e, n, i.fn)
                  },
                  scrollToElement: function(t, e, i, o, r) {
                      if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                          var s = a.offset(t);
                          s.left -= this.wrapperOffset.left, s.top -= this.wrapperOffset.top, i === !0 && (i = n.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = n.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), s.left -= i || 0, s.top -= o || 0, s.left = s.left > 0 ? 0 : s.left < this.maxScrollX ? this.maxScrollX : s.left, s.top = s.top > 0 ? 0 : s.top < this.maxScrollY ? this.maxScrollY : s.top, e = void 0 === e || null === e || "auto" === e ? n.max(n.abs(this.x - s.left), n.abs(this.y - s.top)) : e, this.scrollTo(s.left, s.top, e, r)
                      }
                  },
                  _transitionTime: function(t) {
                      if (this.options.useTransition) {
                          t = t || 0;
                          var e = a.style.transitionDuration;
                          if (e) {
                              if (this.scrollerStyle[e] = t + "ms", !t && a.isBadAndroid) {
                                  this.scrollerStyle[e] = "0.0001ms";
                                  var n = this;
                                  s(function() {
                                      "0.0001ms" === n.scrollerStyle[e] && (n.scrollerStyle[e] = "0s")
                                  })
                              }
                              if (this.indicators)
                                  for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(t)
                          }
                      }
                  },
                  _transitionTimingFunction: function(t) {
                      if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                          for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
                  },
                  _translate: function(t, e) {
                      if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = n.round(t), e = n.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators)
                          for (var i = this.indicators.length; i--;) this.indicators[i].updatePosition()
                  },
                  _initEvents: function(e) {
                      var n = e ? a.removeEvent : a.addEvent,
                          i = this.options.bindToWrapper ? this.wrapper : t;
                      n(t, "orientationchange", this), n(t, "resize", this), this.options.click && n(this.wrapper, "click", this, !0), this.options.disableMouse || (n(this.wrapper, "mousedown", this), n(i, "mousemove", this), n(i, "mousecancel", this), n(i, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (n(this.wrapper, a.prefixPointerEvent("pointerdown"), this), n(i, a.prefixPointerEvent("pointermove"), this), n(i, a.prefixPointerEvent("pointercancel"), this), n(i, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (n(this.wrapper, "touchstart", this), n(i, "touchmove", this), n(i, "touchcancel", this), n(i, "touchend", this)), n(this.scroller, "transitionend", this), n(this.scroller, "webkitTransitionEnd", this), n(this.scroller, "oTransitionEnd", this), n(this.scroller, "MSTransitionEnd", this)
                  },
                  getComputedPosition: function() {
                      var e, n, i = t.getComputedStyle(this.scroller, null);
                      return this.options.useTransform ? (i = i[a.style.transform].split(")")[0].split(", "), e = +(i[12] || i[4]), n = +(i[13] || i[5])) : (e = +i.left.replace(/[^-\d.]/g, ""), n = +i.top.replace(/[^-\d.]/g, "")), {
                          x: e,
                          y: n
                      }
                  },
                  _initIndicators: function() {
                      function t(t) {
                          if (a.indicators)
                              for (var e = a.indicators.length; e--;) t.call(a.indicators[e])
                      }
                      var e, n = this.options.interactiveScrollbars,
                          i = "string" != typeof this.options.scrollbars,
                          s = [],
                          a = this;
                      this.indicators = [], this.options.scrollbars && (this.options.scrollY && (e = {
                          el: o("v", n, this.options.scrollbars),
                          interactive: n,
                          defaultScrollbars: !0,
                          customStyle: i,
                          resize: this.options.resizeScrollbars,
                          shrink: this.options.shrinkScrollbars,
                          fade: this.options.fadeScrollbars,
                          listenX: !1
                      }, this.wrapper.appendChild(e.el), s.push(e)), this.options.scrollX && (e = {
                          el: o("h", n, this.options.scrollbars),
                          interactive: n,
                          defaultScrollbars: !0,
                          customStyle: i,
                          resize: this.options.resizeScrollbars,
                          shrink: this.options.shrinkScrollbars,
                          fade: this.options.fadeScrollbars,
                          listenY: !1
                      }, this.wrapper.appendChild(e.el), s.push(e))), this.options.indicators && (s = s.concat(this.options.indicators));
                      for (var c = s.length; c--;) this.indicators.push(new r(this, s[c]));
                      this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                          t(function() {
                              this.fade()
                          })
                      }), this.on("scrollCancel", function() {
                          t(function() {
                              this.fade()
                          })
                      }), this.on("scrollStart", function() {
                          t(function() {
                              this.fade(1)
                          })
                      }), this.on("beforeScrollStart", function() {
                          t(function() {
                              this.fade(1, !0)
                          })
                      })), this.on("refresh", function() {
                          t(function() {
                              this.refresh()
                          })
                      }), this.on("destroy", function() {
                          t(function() {
                              this.destroy()
                          }), delete this.indicators
                      })
                  },
                  _initWheel: function() {
                      a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                          clearTimeout(this.wheelTimeout), this.wheelTimeout = null, a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                      })
                  },
                  _wheel: function(t) {
                      if (this.enabled) {
                          t.preventDefault();
                          var e, i, o, r, s = this;
                          if (void 0 === this.wheelTimeout && s._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                                  s.options.snap || s._execEvent("scrollEnd"), s.wheelTimeout = void 0
                              }, 400), "deltaX" in t) 1 === t.deltaMode ? (e = -t.deltaX * this.options.mouseWheelSpeed, i = -t.deltaY * this.options.mouseWheelSpeed) : (e = -t.deltaX, i = -t.deltaY);
                          else if ("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, i = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                          else if ("wheelDelta" in t) e = i = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                          else {
                              if (!("detail" in t)) return;
                              e = i = -t.detail / 3 * this.options.mouseWheelSpeed
                          }
                          if (e *= this.options.invertWheelDirection, i *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = i, i = 0), this.options.snap) return o = this.currentPage.pageX, r = this.currentPage.pageY, e > 0 ? o-- : 0 > e && o++, i > 0 ? r-- : 0 > i && r++, this.goToPage(o, r), void 0;
                          o = this.x + n.round(this.hasHorizontalScroll ? e : 0), r = this.y + n.round(this.hasVerticalScroll ? i : 0), this.directionX = e > 0 ? -1 : 0 > e ? 1 : 0, this.directionY = i > 0 ? -1 : 0 > i ? 1 : 0, o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), r > 0 ? r = 0 : r < this.maxScrollY && (r = this.maxScrollY), this.scrollTo(o, r, 0)
                      }
                  },
                  _initSnap: function() {
                      this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                          var t, e, i, o, r, s, a = 0,
                              c = 0,
                              u = 0,
                              l = this.options.snapStepX || this.wrapperWidth,
                              h = this.options.snapStepY || this.wrapperHeight;
                          if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                              if (this.options.snap === !0)
                                  for (i = n.round(l / 2), o = n.round(h / 2); u > -this.scrollerWidth;) {
                                      for (this.pages[a] = [], t = 0, r = 0; r > -this.scrollerHeight;) this.pages[a][t] = {
                                          x: n.max(u, this.maxScrollX),
                                          y: n.max(r, this.maxScrollY),
                                          width: l,
                                          height: h,
                                          cx: u - i,
                                          cy: r - o
                                      }, r -= h, t++;
                                      u -= l, a++
                                  } else
                                      for (s = this.options.snap, t = s.length, e = -1; t > a; a++)(0 === a || s[a].offsetLeft <= s[a - 1].offsetLeft) && (c = 0, e++), this.pages[c] || (this.pages[c] = []), u = n.max(-s[a].offsetLeft, this.maxScrollX), r = n.max(-s[a].offsetTop, this.maxScrollY), i = u - n.round(s[a].offsetWidth / 2), o = r - n.round(s[a].offsetHeight / 2), this.pages[c][e] = {
                                          x: u,
                                          y: r,
                                          width: s[a].offsetWidth,
                                          height: s[a].offsetHeight,
                                          cx: i,
                                          cy: o
                                      }, u > this.maxScrollX && c++;
                              this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                          }
                      }), this.on("flick", function() {
                          var t = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.x - this.startX), 1e3), n.min(n.abs(this.y - this.startY), 1e3)), 300);
                          this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                      })
                  },
                  _nearestSnap: function(t, e) {
                      if (!this.pages.length) return {
                          x: 0,
                          y: 0,
                          pageX: 0,
                          pageY: 0
                      };
                      var i = 0,
                          o = this.pages.length,
                          r = 0;
                      if (n.abs(t - this.absStartX) < this.snapThresholdX && n.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
                      for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); o > i; i++)
                          if (t >= this.pages[i][0].cx) {
                              t = this.pages[i][0].x;
                              break
                          }
                      for (o = this.pages[i].length; o > r; r++)
                          if (e >= this.pages[0][r].cy) {
                              e = this.pages[0][r].y;
                              break
                          }
                      return i == this.currentPage.pageX && (i += this.directionX, 0 > i ? i = 0 : i >= this.pages.length && (i = this.pages.length - 1), t = this.pages[i][0].x), r == this.currentPage.pageY && (r += this.directionY, 0 > r ? r = 0 : r >= this.pages[0].length && (r = this.pages[0].length - 1), e = this.pages[0][r].y), {
                          x: t,
                          y: e,
                          pageX: i,
                          pageY: r
                      }
                  },
                  goToPage: function(t, e, i, o) {
                      o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0), e >= this.pages[t].length ? e = this.pages[t].length - 1 : 0 > e && (e = 0);
                      var r = this.pages[t][e].x,
                          s = this.pages[t][e].y;
                      i = void 0 === i ? this.options.snapSpeed || n.max(n.max(n.min(n.abs(r - this.x), 1e3), n.min(n.abs(s - this.y), 1e3)), 300) : i, this.currentPage = {
                          x: r,
                          y: s,
                          pageX: t,
                          pageY: e
                      }, this.scrollTo(r, s, i, o)
                  },
                  next: function(t, e) {
                      var n = this.currentPage.pageX,
                          i = this.currentPage.pageY;
                      n++, n >= this.pages.length && this.hasVerticalScroll && (n = 0, i++), this.goToPage(n, i, t, e)
                  },
                  prev: function(t, e) {
                      var n = this.currentPage.pageX,
                          i = this.currentPage.pageY;
                      n--, 0 > n && this.hasVerticalScroll && (n = 0, i--), this.goToPage(n, i, t, e)
                  },
                  _initKeys: function() {
                      var e, n = {
                          pageUp: 33,
                          pageDown: 34,
                          end: 35,
                          home: 36,
                          left: 37,
                          up: 38,
                          right: 39,
                          down: 40
                      };
                      if ("object" == _typeof(this.options.keyBindings))
                          for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                      else this.options.keyBindings = {};
                      for (e in n) this.options.keyBindings[e] = this.options.keyBindings[e] || n[e];
                      a.addEvent(t, "keydown", this), this.on("destroy", function() {
                          a.removeEvent(t, "keydown", this)
                      })
                  },
                  _key: function(t) {
                      if (this.enabled) {
                          var e, i = this.options.snap,
                              o = i ? this.currentPage.pageX : this.x,
                              r = i ? this.currentPage.pageY : this.y,
                              s = a.getTime(),
                              c = this.keyTime || 0,
                              u = .25;
                          switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(n.round(e.x), n.round(e.y)), this.isInTransition = !1), this.keyAcceleration = 200 > s - c ? n.min(this.keyAcceleration + u, 50) : 0, t.keyCode) {
                              case this.options.keyBindings.pageUp:
                                  this.hasHorizontalScroll && !this.hasVerticalScroll ? o += i ? 1 : this.wrapperWidth : r += i ? 1 : this.wrapperHeight;
                                  break;
                              case this.options.keyBindings.pageDown:
                                  this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= i ? 1 : this.wrapperWidth : r -= i ? 1 : this.wrapperHeight;
                                  break;
                              case this.options.keyBindings.end:
                                  o = i ? this.pages.length - 1 : this.maxScrollX, r = i ? this.pages[0].length - 1 : this.maxScrollY;
                                  break;
                              case this.options.keyBindings.home:
                                  o = 0, r = 0;
                                  break;
                              case this.options.keyBindings.left:
                                  o += i ? -1 : 5 + this.keyAcceleration >> 0;
                                  break;
                              case this.options.keyBindings.up:
                                  r += i ? 1 : 5 + this.keyAcceleration >> 0;
                                  break;
                              case this.options.keyBindings.right:
                                  o -= i ? -1 : 5 + this.keyAcceleration >> 0;
                                  break;
                              case this.options.keyBindings.down:
                                  r -= i ? 1 : 5 + this.keyAcceleration >> 0;
                                  break;
                              default:
                                  return
                          }
                          if (i) return this.goToPage(o, r), void 0;
                          o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollY && (r = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, r, 0), this.keyTime = s
                      }
                  },
                  _animate: function(t, e, n, i) {
                      function o() {
                          var p, d, f, m = a.getTime();
                          return m >= h ? (r.isAnimating = !1, r._translate(t, e), r.resetPosition(r.options.bounceTime) || r._execEvent("scrollEnd"), void 0) : (m = (m - l) / n, f = i(m), p = (t - c) * f + c, d = (e - u) * f + u, r._translate(p, d), r.isAnimating && s(o), void 0)
                      }
                      var r = this,
                          c = this.x,
                          u = this.y,
                          l = a.getTime(),
                          h = l + n;
                      this.isAnimating = !0, o()
                  },
                  handleEvent: function(t) {
                      switch (t.type) {
                          case "touchstart":
                          case "pointerdown":
                          case "MSPointerDown":
                          case "mousedown":
                              this._start(t);
                              break;
                          case "touchmove":
                          case "pointermove":
                          case "MSPointerMove":
                          case "mousemove":
                              this._move(t);
                              break;
                          case "touchend":
                          case "pointerup":
                          case "MSPointerUp":
                          case "mouseup":
                          case "touchcancel":
                          case "pointercancel":
                          case "MSPointerCancel":
                          case "mousecancel":
                              this._end(t);
                              break;
                          case "orientationchange":
                          case "resize":
                              this._resize();
                              break;
                          case "transitionend":
                          case "webkitTransitionEnd":
                          case "oTransitionEnd":
                          case "MSTransitionEnd":
                              this._transitionEnd(t);
                              break;
                          case "wheel":
                          case "DOMMouseScroll":
                          case "mousewheel":
                              this._wheel(t);
                              break;
                          case "keydown":
                              this._key(t);
                              break;
                          case "click":
                              this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
                      }
                  }
              }, r.prototype = {
                  handleEvent: function(t) {
                      switch (t.type) {
                          case "touchstart":
                          case "pointerdown":
                          case "MSPointerDown":
                          case "mousedown":
                              this._start(t);
                              break;
                          case "touchmove":
                          case "pointermove":
                          case "MSPointerMove":
                          case "mousemove":
                              this._move(t);
                              break;
                          case "touchend":
                          case "pointerup":
                          case "MSPointerUp":
                          case "mouseup":
                          case "touchcancel":
                          case "pointercancel":
                          case "MSPointerCancel":
                          case "mousecancel":
                              this._end(t)
                      }
                  },
                  destroy: function() {
                      this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
                  },
                  _start: function(e) {
                      var n = e.touches ? e.touches[0] : e;
                      e.preventDefault(), e.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = n.pageX, this.lastPointY = n.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
                  },
                  _move: function(t) {
                      {
                          var e, n, i, o, r = t.touches ? t.touches[0] : t;
                          a.getTime()
                      }
                      this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, e = r.pageX - this.lastPointX, this.lastPointX = r.pageX, n = r.pageY - this.lastPointY, this.lastPointY = r.pageY, i = this.x + e, o = this.y + n, this._pos(i, o), t.preventDefault(), t.stopPropagation()
                  },
                  _end: function(e) {
                      if (this.initiated) {
                          if (this.initiated = !1, e.preventDefault(), e.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                              var i = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                                  o = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.scroller.x - i.x), 1e3), n.min(n.abs(this.scroller.y - i.y), 1e3)), 300);
                              (this.scroller.x != i.x || this.scroller.y != i.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = i, this.scroller.scrollTo(i.x, i.y, o, this.scroller.options.bounceEasing))
                          }
                          this.moved && this.scroller._execEvent("scrollEnd")
                      }
                  },
                  transitionTime: function(t) {
                      t = t || 0;
                      var e = a.style.transitionDuration;
                      if (e && (this.indicatorStyle[e] = t + "ms", !t && a.isBadAndroid)) {
                          this.indicatorStyle[e] = "0.0001ms";
                          var n = this;
                          s(function() {
                              "0.0001ms" === n.indicatorStyle[e] && (n.indicatorStyle[e] = "0s")
                          })
                      }
                  },
                  transitionTimingFunction: function(t) {
                      this.indicatorStyle[a.style.transitionTimingFunction] = t
                  },
                  refresh: function() {
                      this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
                      this.wrapper.offsetHeight;
                      this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = n.max(n.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = n.max(n.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
                  },
                  updatePosition: function() {
                      var t = this.options.listenX && n.round(this.sizeRatioX * this.scroller.x) || 0,
                          e = this.options.listenY && n.round(this.sizeRatioY * this.scroller.y) || 0;
                      this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = n.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = n.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = n.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = n.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
                  },
                  _pos: function(t, e) {
                      0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX), 0 > e ? e = 0 : e > this.maxPosY && (e = this.maxPosY), t = this.options.listenX ? n.round(t / this.sizeRatioX) : this.scroller.x, e = this.options.listenY ? n.round(e / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, e)
                  },
                  fade: function(t, e) {
                      if (!e || this.visible) {
                          clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                          var n = t ? 250 : 500,
                              i = t ? 0 : 300;
                          t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = n + "ms", this.fadeTimeout = setTimeout(function(t) {
                              this.wrapperStyle.opacity = t, this.visible = +t
                          }.bind(this, t), i)
                      }
                  }
              }, i.utils = a, i
          }(window, document, Math)
      }, {}],
      28: [function(t, e) {
          /*! observable - v0.1.5 - 2013-06-17
           * Copyright (c) 2013 HTML5 tech team, Daum corp;
           * Licensed MIT*/
          ! function() {
              var t = !1,
                  e = /xyz/.test(function() {}) ? /\b_super\b/ : /.*/;
              this.Class = function() {}, Class.extend = function(n) {
                  function i() {
                      !t && this.init && this.init.apply(this, arguments)
                  }
                  var o = this.prototype;
                  t = !0;
                  var r = new this;
                  t = !1;
                  for (var s in n) r[s] = "function" == typeof n[s] && "function" == typeof o[s] && e.test(n[s]) ? function(t, e) {
                      return function() {
                          var n = this._super;
                          this._super = o[t];
                          var i = e.apply(this, arguments);
                          return this._super = n, i
                      }
                  }(s, n[s]) : n[s];
                  return i.prototype = r, i.prototype.constructor = i, i.extend = arguments.callee, i
              }, this.Observable = Class.extend({
                  addListener: function(t, e) {
                      var n = this.getListeners(t);
                      return n.push(e), this
                  },
                  on: function() {
                      return this.addListener.apply(this, arguments)
                  },
                  emit: function(t) {
                      var e = this.getListeners(t),
                          n = [].slice.call(arguments, 1);
                      if ("undefined" != typeof e)
                          for (var i = 0, o = e.length; o > i; i++) try {
                              e[i].apply(this, n)
                          } catch (r) {
                              throw "undefined" != typeof console && console.error('failed on while "' + t + '" event, caused by\r\n > ' + r), r
                          }
                      return this
                  },
                  removeListener: function(t, e) {
                      var n = this.getListeners(t);
                      if ("undefined" != typeof n)
                          for (var i = 0, o = n.length; o > i; i++)
                              if (n[i] === e || n[i].__original__ === e) {
                                  n.splice(i, 1);
                                  break
                              }
                      return this
                  },
                  off: function() {
                      return this.removeListener.apply(this, arguments)
                  },
                  getListeners: function(t) {
                      return this.listeners = this.listeners || {}, this.listeners[t] = this.listeners[t] || [], this.listeners[t]
                  }
              })
          }(), e.exports = function() {
              function e(t, e) {
                  for (var n = t.parentNode, i = e.parentNode; null !== i;) {
                      if (i === n) return !0;
                      i = i.parentNode
                  }
                  return !1
              }

              function n(t, e) {
                  var n = new RegExp("(^|\\s)" + e + "(\\s|$)");
                  return n.test(t.className)
              }

              function i(t, e) {
                  n(t, e) || (t.className ? t.className += " " + e : t.className = e)
              }

              function o(t, e) {
                  n(t, e) && t.className && (t.className = (" " + t.className + " ").replace(" " + e + " ", " ").replace(/^\s+|\s+$/g, ""))
              }

              function r(t) {
                  ("keydown" !== t.type || (t.ctrlKey || t.metaKey) && (65 === t.keyCode || 97 === t.keyCode || 67 === t.keyCode || 99 === t.keyCode)) && (u.preventDefault(t), u.stopPropagation(t))
              }

              function s(t, e, n) {
                  var i = t || {};
                  for (var o in e) e.hasOwnProperty(o) && (!i[o] || n) && (i[o] = "object" === _typeof(e[o]) ? s(i[o], e[o], !0) : e[o]);
                  return i
              }
              var a = "com.kakao.talk",
                  c = "362057947",
                  u = t("./util.js");
              ! function(t) {
                  return t.$ = function(t) {
                      return document.getElementById(t)
                  }, window.Sizzle ? (t.$$ = window.Sizzle, void 0) : window.jQuery && window.jQuery.find ? (t.$$ = window.jQuery.find, void 0) : (t.$$ = function(t, e) {
                      return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && e.querySelectorAll ? e.querySelectorAll(t) : "string" == typeof e ? document.querySelectorAll(e + " " + t) : document.querySelectorAll(t)
                  }, void 0)
              }(u);
              var l, h = t("../kakao-js-sdk/src/common.js"),
                  p = t("./api.js"),
                  d = t("../kakao-js-sdk/src/common/everntObserver"),
                  f = t("./emoticon.animate"),
                  m = t("../kakao-js-sdk/vendor/web2app.js"),
                  g = [],
                  v = [],
                  y = -401,
                  b = -402,
                  k = {
                      tabmenu: '<div id="emoticonTabWrapper" class="emoticon_control"><ul id="emoticonTab" class="emoticon_tab"></ul></div>',
                      tabmenu_pc: '<div id="emoticonTabWrapper" class="emoticon_control"><ul id="emoticonTab" class="emoticon_tab"></ul><a href="#" class="emt_ctrl_paging emt_ctrl_prev"><span class="ico_arr">ì´ì „</span></a><a href="#" class="emt_ctrl_paging emt_ctrl_next"><span class="ico_arr">ë‹¤ìŒ</span></a></div>',
                      emoticons: '<div id="emoticonListWrapper" class="emoticon_item_list"><div id="emoticonList" class="emt_il"></div></div>',
                      new_guide: '<div class="emt_guide"><div class="emt_g_inner"><span class="emt_g_title">ë” ì¦ê²ê²Œ ë” ë‹¤ì–‘í•˜ê²Œ<strong>ì¹´í†¡ ì´ëª¨í‹°ì½˜ì„ ì—¬ê¸°ì„œë„ ë§Œë‚˜ì„¸ìš”!</strong></span><img src="//mk.kakaocdn.net/dn/emoticon/static/images/sdk/new_guide_title.png" width="99" height="88" /><button type="button" class="emt_g_close">ì‹œìž‘í•˜ê¸°</button></div></div>',
                      store_link: '<li><button type="button" class="emt_tab_item emt_tab_store"><img style="height:20px;" src="//mk.kakaocdn.net/dn/emoticon/static/images/sdk/store_link.png" /></button></li>'
                  },
                  _ = {
                      need_agree: '<div class="emt_agree"><div class="emt_a_inner"><div class="emt_a_need_agree"><img src="//mk.kakaocdn.net/dn/emoticon/static/images/sdk/emoticon_title.png" width="135" height="15" /><div class="emt_a_title"><strong class="emt_a_tit_agree">ì¹´ì¹´ì˜¤í†¡ ì´ëª¨í‹°ì½˜ ì‚¬ìš©ì„ ìœ„í•´<br />ì‚¬ìš©ìžì˜ ì¶”ê°€ ë™ì˜ê°€ í•„ìš”í•©ë‹ˆë‹¤.<br />í•˜ë‹¨ë²„íŠ¼ì„ ëˆ„ë¥´ë©´ ë™ì˜ íŽ˜ì´ì§€ë¡œ ì´ë™í•©ë‹ˆë‹¤.</strong></div><a href="#" class="emt_a_agree emt_a_submit">ë™ì˜í•˜ëŸ¬ ê°€ê¸°</a></div></div></div>',
                      expire_token: '<div class="emt_agree"><div class="emt_a_inner"><div class="emt_a_need_agree"><img src="//mk.kakaocdn.net/dn/emoticon/static/images/sdk/emoticon_title.png" width="135" height="15" /><div class="emt_a_title"><strong class="emt_a_tit_expire">ì¹´ì¹´ì˜¤ê³„ì • ë¡œê·¸ì¸ ìœ íš¨ ì‹œê°„ì´ ë§Œë£Œë˜ì—ˆìŠµë‹ˆë‹¤.<br />ê³„ì†í•˜ë ¤ë©´ ë¡œê·¸ì¸ì„ ì—°ìž¥í•´ì£¼ì„¸ìš”.</strong></div><a href="#" class="emt_a_extend emt_a_submit">ë¡œê·¸ì¸ ì—°ìž¥í•˜ê¸°</a></div></div></div>'
                  },
                  w = {
                      tab: '<li class="emot_tab"><button type="button" class="emt_tab_item connect_kakao"><img style="height:26px;" src="//mk.kakaocdn.net/dn/emoticon/static/images/sdk/connect_tabmenu.png" /></button></li>',
                      keyboard: '<div class="emt_connect"><div class="emt_c_title"><span class="emt_c_tit_connect">ì¹´ì¹´ì˜¤í†¡ê³¼ ë™ì¼í•œ ì¹´ì¹´ì˜¤ê³„ì •ìœ¼ë¡œ ì—°ê²°(ë˜ëŠ” ë¡œê·¸ì¸)í•˜ë©´<br />ë‚´ê°€ êµ¬ë§¤í•œ ì´ëª¨í‹°ì½˜ì„ ì‚¬ìš©í•  ìˆ˜ ìžˆì–´ìš”!</span></div><button type="button" class="emt_c_connect">ì—°ê²°í•˜ê¸°</button></div>'
                  },
                  x = {
                      ENABLED: 0,
                      EXPIRE_TOKEN: -401,
                      NEED_AGREE: -402
                  },
                  S = p.createAPIAlias({
                      url: "/api/sdk/items"
                  }),
                  T = p.createAPIAlias({
                      url: "/api/sdk/config"
                  }),
                  E = {
                      configurations: {},
                      signature: null,
                      needUpdate: !0,
                      retryCount: 0,
                      init: function(t) {
                          this.emoticon = new O(t)
                      },
                      toggleKeyboard: function(t, e) {
                          this.emoticon.toggleKeyboard(t, e)
                      },
                      showKeyboard: function(t) {
                          var e = this.emoticon;
                          e.current || (e.current = t, e.current.appendChild(e.keyboardEl)), e.emit("toggleKeyboard", t, !0), this._getAll()
                      },
                      _getAll: function() {
                          var t = this;
                          this.emoticon.storage.isReady ? this.emoticon.completeSetData || this.emoticon.getDataBeforeSetKeyboard() : this.retryCount < 5 && (this.retryCount++, setTimeout(function() {
                              t._getAll()
                          }, 500))
                      },
                      reset: function() {
                          this.emoticon && this.emoticon.reset()
                      },
                      getCurrentLayer: function() {
                          return this.emoticon.getCurrentLayer()
                      },
                      update: function(t) {
                          var e = t || "kakao_emoticon";
                          this._updateConfig(this._applyEmoticon, e)
                      },
                      getSrc: function(t, e) {
                          var n = this,
                              i = function() {
                                  var i = n._getResourceUrl(t.item_id, t.resource_id);
                                  e({
                                      image_url: i
                                  })
                              };
                          this._updateConfig(i)
                      },
                      _updateConfig: function(t) {
                          var e = this,
                              n = [].slice.call(arguments, 1),
                              i = JSON.parse(u.localStorage.getItem("kconf"));
                          return i && (this.configurations = i, this.signature = 1e3 * i.auth.expires), this._isExpired() ? (this.needUpdate && (l = null, this.needUpdate = !1), l || (l = new Promise(function(t) {
                              T().then(function(e) {
                                  u.localStorage.setItem("kconf", JSON.stringify(e)), t(e)
                              }).then(void 0, function(t) {
                                  throw new h.KakaoError(t)
                              })
                          })), l.then(function(i) {
                              e.configurations = i, e.signature = 1e3 * i.auth.expires, e.needUpdate || (e.needUpdate = !0), t.apply(e, n)
                          }), void 0) : (t.apply(e, n), void 0)
                      },
                      _isExpired: function() {
                          return !this.signature || this.signature < (new Date).getTime()
                      },
                      _applyEmoticon: function(t) {
                          for (var e = u.$$("." + t + ".e_cover"), s = this, a = function(t) {
                                  var e = u.$$(".thumb_img", t)[0],
                                      n = e.getAttribute("data-id"),
                                      r = e.getAttribute("data-idx"),
                                      a = parseInt(e.getAttribute("data-type")),
                                      c = 70,
                                      l = 70;
                                  e.removeAttribute("data-id"), e.removeAttribute("data-idx"), e.removeAttribute("data-type"), e.src = s._getResourceUrl(n, r), s._appendViewDetail(t, e, n), (1 === a || 2 === a) && (c = 90, i(t, "emt_il_ani")), e.width = c, e.height = l, o(t, "e_cover")
                              }, c = 0; c < e.length; c++) {
                              var l = e[c];
                              a(l), "pc" === h.UA.platform && (u.addEvent(l, "contextmenu", r), u.addEvent(l, "selectstart", r), u.addEvent(l, "dragstart", r))
                          }
                          "pc" !== h.UA.platform && u.addEvent(document, "touchstart", function(e) {
                              if (!n(u.getTarget(e), "view_emot_detail")) {
                                  var i = u.$$("." + t + " .view_emot_detail.active")[0];
                                  i && (i.style.display = "none", o(i, "active"))
                              }
                          })
                      },
                      _appendViewDetail: function(t, e, n) {
                          if (!("msie" === h.UA.browser.name && h.UA.browser.version.major < 9)) {
                              var o = document.createElement("span");
                              o.className = "view_emot_detail", o.innerHTML = "ì´ëª¨í‹°ì½˜ìƒì„¸ë³´ê¸°", "pc" !== h.UA.platform ? u.addEvent(e, "click", function() {
                                  o.style.display = "block", i(o, "active")
                              }) : (u.addEvent(t, "mouseover", function() {
                                  o.style.display = "block"
                              }), u.addEvent(t, "mouseout", function() {
                                  o.style.display = "none"
                              })), u.addEvent(o, "click", function() {
                                  if ("pc" !== h.UA.platform) {
                                      var t = "kakaotalk://store/emoticon/" + n + "?referer=e_sdk_" + encodeURIComponent(document.location.host) + "_longtap",
                                          e = {
                                              urlScheme: t,
                                              intentURI: "intent:" + t + "#Intent;package=com.kakao.talk;end;",
                                              appName: "KakaoTalk",
                                              storeURL: h.getInstallUrl(a, c),
                                              onUnsupportedEnvironment: function() {
                                                  alert("í•´ë‹¹ í™˜ê²½ì—ì„œëŠ” ì§€ì›ë˜ì§€ ì•ŠìŠµë‹ˆë‹¤. ì¹´ì¹´ì˜¤í†¡ì—ì„œ í™•ì¸í•´ì£¼ì„¸ìš”.")
                                              }
                                          };
                                      m(e), o.style.display = "none"
                                  } else {
                                      for (var i = n.split(""), r = [], s = [7, 2, 1, 8, 4, 9, 5, 6, 3, 0], l = 0; 3 > l; l++) i.push(Math.floor(10 * Math.random()).toString());
                                      u.map(s, function(t) {
                                          r.push(i[t])
                                      }), window.open("https://e.kakao.com/store/detail?item_code=" + r.join("") + "&referer=sdk_" + encodeURIComponent(document.location.host) + "_longtap", "_blank")
                                  }
                              }), t.insertBefore(o, e.nextSibling)
                          }
                      },
                      _getResourceUrl: function(t, e) {
                          var n = e.toString(),
                              i = n.length >= 3 ? n : new Array(3 - n.length + 1).join("0") + n,
                              o = this.configurations;
                          return "//" + o.host + o.base + "/" + t + "/thum_" + i + ".png?credential=" + o.auth.credential + "&expires=" + o.auth.expires + "&allow_referer=" + encodeURIComponent(document.location.host) + "&signature=" + encodeURIComponent(o.auth.signature) + "&path=" + o.auth.path
                      }
                  },
                  O = Observable.extend({
                      init: function(t) {
                          this.current = null, this.previous = null, this.keyboardEl = null, this.options = this._overrideDefaultOptions(t), this.completeSetData = !1, this._createKeyboardLayer(), this._initElements(), this._bindEvents()
                      },
                      getDataBeforeSetKeyboard: function() {
                          var t = this;
                          this._getEmoticonData(function() {
                              t.emit("setKeyboard", t.current)
                          })
                      },
                      toggleKeyboard: function(t, e) {
                          this.current = t;
                          var n = !1;
                          this.previous ? this.previous !== this.current && (this.changeContainer(), n = !0) : (this.previous = this.current, this.current.appendChild(this.keyboardEl));
                          var i = u.$$(".emoticon_keyboard", t)[0];
                          o(i, "na"), o(i, "et"), this.emit("toggleKeyboard", t, n, e), this.completeSetData || this.getDataBeforeSetKeyboard()
                      },
                      changeContainer: function() {
                          this.previous.removeChild(this.keyboardEl), this.current.appendChild(this.keyboardEl), this.previous = this.current
                      },
                      hideKeyboard: function() {
                          this.keyboardView.hide()
                      },
                      showKeyboard: function() {
                          this.keyboardView.show()
                      },
                      getCurrentLayer: function() {
                          return this.current
                      },
                      reset: function() {
                          this.emit("resetKeyboard")
                      },
                      cleanup: function() {
                          u.each(g, function(t) {
                              t()
                          }), g.length = 0
                      },
                      _onDocumentClicked: function(t) {
                          if (this.completeSetData && this.current) {
                              var n = u.getTarget(t);
                              e(this.current, n) || this.hideKeyboard()
                          }
                      },
                      _createKeyboardLayer: function() {
                          var t = document.createElement("div");
                          t.id = "emoticonKeyboard", t.className = "emoticon_keyboard loading", this.keyboardEl = t
                      },
                      _initElements: function() {
                          var t = "pc" === h.UA.platform ? O.EmoticonListViewForPC : O.EmoticonListView;
                          this.keyboardView = new t(this.options, this), this.storage = new O.EmoticonStorage(this.options, this)
                      },
                      _overrideDefaultOptions: function(t) {
                          var e = {
                              tabmenu: "TOP",
                              isCompact: !1,
                              needConnectKakao: !1,
                              callback: {
                                  showKeyboard: function() {},
                                  hideKeyboard: function() {},
                                  selectEmoticon: function() {},
                                  connectKakao: function() {
                                      Kakao.Auth.login({})
                                  }
                              }
                          };
                          return s(e, t, !0)
                      },
                      _bindEvents: function() {
                          var t = this;
                          d.subscribe("LOGIN", this.reset.bind(this)), d.subscribe("LOGOUT", this.reset.bind(this)), u.addEvent(document, "click", this._onDocumentClicked.bind(this)), this.on("resetKeyboard", function() {
                              t.cleanup(), v = [], t.completeSetData = !1
                          })
                      },
                      _getEmoticonData: function(t) {
                          if (!v.length) {
                              var e = this,
                                  n = t || function() {},
                                  i = {
                                      action: "get",
                                      name: "guideActive"
                                  };
                              this.storage.receivePostMsg(JSON.stringify(i)).then(function() {
                                  S({
                                      data: {
                                          timestamp: (new Date).getTime()
                                      }
                                  }).then(function(t) {
                                      for (var i = t.items, o = i.length, r = 0; r != o; r++) v.push({
                                          id: i[r].id,
                                          version: i[r].version,
                                          count: i[r].count,
                                          item_sub_type: i[r].item_sub_type,
                                          off_image_url: i[r].off_image_url,
                                          on_image_url: i[r].on_image_url,
                                          title_image_url: i[r].title_image_url
                                      });
                                      e.completeSetData = !0, e.emit("getEmoticonData", {
                                          logged_in: t.logged_in,
                                          normal_cp_supported: t.normal_cp_supported
                                      }), n()
                                  }).then(void 0, function(t) {
                                      if (t.code === b) e.emit("updateNeedAgree");
                                      else {
                                          if (t.code !== y) throw new h.KakaoError(t);
                                          e.emit("updateNeedRefreshToken")
                                      }
                                      n()
                                  })
                              })
                          }
                      }
                  });
              return O.EmoticonListView = Class.extend({
                  init: function(t, e) {
                      var n = this;
                      this.keyboard_status = x.ENABLED, this.tabCount = {
                          NORMAL: 5,
                          MINI: 4
                      }, this.options = t, this.tabMenu = this.options.tabmenu, this.compactType = this.options.isCompact, this.tabsPerPage = this.compactType ? this.tabCount.MINI : this.tabCount.NORMAL, this.completeRendering = !1, this.queue = e, this.currentIdx = -1, this.curTabPageIdx = 0, this.maxTabPageIdx = 0, this.offerGuide = "none", this.loggedIn = !1, this.normalCpSupported = !1, this.queue.on("toggleKeyboard", function(t, e, i) {
                          n.toggle(t, e, i)
                      }), this.queue.on("setKeyboard", function(t) {
                          n.set(t)
                      }), this.queue.on("renderComplete", function() {
                          n._applyAnimation()
                      }), this.queue.on("resetKeyboard", function() {
                          n.reset()
                      }), this.queue.on("updateNeedAgree", function() {
                          n.keyboard_status = x.NEED_AGREE
                      }), this.queue.on("updateNeedRefreshToken", function() {
                          n.keyboard_status = x.EXPIRE_TOKEN
                      }), this.queue.on("selectEmoticon", function(t, e) {
                          t.image_url = E._getResourceUrl(t.item_id, t.resource_id), n.options.callback.selectEmoticon(t) ? n._applySelectedEffect(e) : n.hide()
                      }), this.queue.on("scrollTop", function() {
                          n._scrollTo(0, 0)
                      }), this.queue.on("updateKeyboard", function(t) {
                          n._updateKeyboard(t)
                      }), this.queue.on("getEmoticonData", function(t) {
                          n.loggedIn = t.logged_in, n.normalCpSupported = t.normal_cp_supported
                      })
                  },
                  reset: function() {
                      if (this.completeRendering) {
                          this.completeRendering && this.keyboard_status === x.ENABLED && (this.currentIdx = -1, this.curTabPageIdx = 0, this.hide(), this.move());
                          var t = u.$$(".emoticon_keyboard", this.keyboardLayer)[0];
                          t.innerHTML = "", this.keyboardLayer.className = "keyboard_layer", v = v.filter(function(t) {
                              return !!t.id
                          }), this.keyboard_status = x.ENABLED, this.completeRendering = !1
                      }
                  },
                  doItemSelect: function(t, e) {
                      var n = this.queue.emit.bind(this.queue);
                      E._updateConfig(n, "selectEmoticon", t, e)
                  },
                  setContainer: function(t, e) {
                      this.keyboardLayer = t;
                      var n = e && e.tabmenu ? e.tabmenu : this.options.tabmenu,
                          i = e && e.isCompact ? e.isCompact : this.options.isCompact;
                      this._setOptions(n, i)
                  },
                  _setOptions: function(t, e) {
                      (this.tabMenu !== t || this.compactType !== e) && (this.tabMenu = t, this.compactType = e, this._updateTemplate())
                  },
                  _updateTemplate: function() {
                      this.tabsPerPage = this.compactType ? this.tabCount.MINI : this.tabCount.NORMAL, this.completeRendering && this.keyboard_status === x.ENABLED && (this.reset(), this.set(this.keyboardLayer))
                  },
                  render: function() {
                      this.completeRendering || (this.renderTabMenu(), this.renderEmoticonList(0), this.completeRendering = !0)
                  },
                  set: function(t) {
                      var e = this;
                      this._setOfferGuide();
                      var o = u.$$(".emoticon_keyboard", t)[0];
                      if (this._generateTemplate(o), this.keyboard_status !== x.ENABLED) {
                          var r = u.$$(".emt_a_submit", o)[0],
                              s = {};
                          u.addEvent(r, "click", function(t) {
                              u.preventDefault(t), u.stopPropagation(t), n(r, "emt_a_agree") && (s = {
                                  scope: "emoticon"
                              }), Kakao.Auth.login(s), e.hide()
                          }), this.completeRendering = !0
                      } else "BOTTOM" === this.tabMenu && i(t, "bottom"), this.compactType && i(t, "compact"), this.render(), this._bindEvents(), setTimeout(function() {
                          e.queue.emit("renderComplete")
                      }, 300)
                  },
                  toggle: function(t, e, n) {
                      this.setContainer(t, n), this.visible() && !e ? this.hide() : this.show()
                  },
                  show: function() {
                      this.keyboardLayer.style.display = "block", this.options.callback.showKeyboard(), this.queue.emit("updateKeyboard", !1)
                  },
                  hide: function() {
                      this.keyboardLayer.style.display = "none", this.options.callback.hideKeyboard(), this.queue.emit("scrollTop");
                      var t = u.$("userGuideWrapper");
                      t && t.parentNode.removeChild(t), this._applySelectedEffect()
                  },
                  visible: function() {
                      return "block" === window.getComputedStyle(this.keyboardLayer).display
                  },
                  move: function() {
                      var t = u.$("emoticonTab"),
                          e = u.$$("li", t)[0],
                          n = e.clientWidth * this.tabsPerPage,
                          i = n * this.curTabPageIdx * -1;
                      t.style.transform = "translateX(" + i + "px)", t.style.msTransform = "translateX(" + i + "px)"
                  },
                  renderTabMenu: function() {
                      for (var t = "", e = u.$("emoticonTab"), n = v.length, i = 0; n > i; i++) {
                          var o = v[i % n];
                          t += '<li class="emot_tab' + (i > 0 ? "" : " on") + '"><button type="button" class="emt_tab_item" data-id="' + o.id + '"><img style="height:26px;"src="' + (i > 0 ? o.off_image_url : o.on_image_url) + '" /></button></li>'
                      }
                      this.loggedIn ? t += k.store_link : this.options.needConnectKakao && (t += w.tab, v.push({
                          off_image_url: "//mk.kakaocdn.net/dn/emoticon/static/images/sdk/connect_tabmenu.png",
                          on_image_url: "//mk.kakaocdn.net/dn/emoticon/static/images/sdk/connect_tabmenu_on.png"
                      })), e.innerHTML = t
                  },
                  renderEmoticonList: function(t) {
                      if (t !== this.currentIdx) {
                          var e = u.$("emoticonTab"),
                              i = u.$$("li.emot_tab", e);
                          n(u.$$("button", i[t])[0], "connect_kakao") ? this._renderConnectKakaoLayer(t) : this._renderEmoticonItem(t)
                      }
                  },
                  _bindEvents: function() {
                      var t = u.$("emoticonList"),
                          e = u.$("emoticonTab"),
                          n = u.$$(".emoticon_keyboard .emt_g_close")[0],
                          i = this._onItemSelected.bind(this),
                          o = this._onMenuSelected.bind(this);
                      n && u.addEvent(n, "click", function() {
                          var t = u.$("userGuideWrapper");
                          t.style.display = "none"
                      }), u.addEvent(t, "click", i), u.addEvent(e, "click", o);
                      var r = function() {
                          u.removeEvent(t, "click", i), u.removeEvent(e, "click", o)
                      };
                      g.push(r)
                  },
                  _scrollTo: function(t, e) {
                      this.List && this.List.scrollTo(t, e)
                  },
                  _updateKeyboard: function(t) {
                      this.List && (t || !this.List.hasVerticalScroll) && (this.TabList && this.TabList.refresh(), this.List.refresh())
                  },
                  _doConnectKakao: function() {
                      switch (_typeof(this.options.callback.connectKakao)) {
                          case "string":
                              window.open(this.options.callback.connectKakao, "_blank");
                              break;
                          case "function":
                              this.options.callback.connectKakao()
                      }
                      this.queue.emit("resetKeyboard"), this.hide()
                  },
                  _onItemSelected: function(t) {
                      u.preventDefault(t), u.stopPropagation(t);
                      var e = u.getTarget(t);
                      if ("BUTTON" === e.nodeName.toUpperCase() && n(e, "emt_c_connect")) return this._doConnectKakao(), void 0;
                      if ("BUTTON" === e.nodeName.toUpperCase() && (e = u.$$(".emoticon_thumb", e)[0]), n(e, "emoticon_thumb")) {
                          var i = {
                              item_id: v[e.getAttribute("data-id")].id,
                              resource_id: e.getAttribute("data-index"),
                              item_sub_type: v[e.getAttribute("data-id")].item_sub_type,
                              item_version: v[e.getAttribute("data-id")].version
                          };
                          this.doItemSelect(i, e.parentNode)
                      }
                  },
                  _applySelectedEffect: function(t) {
                      var e = u.$$(".emt_selected", this.keyboardLayer)[0];
                      e && o(e, "emt_selected"), t && i(t, "emt_selected")
                  },
                  _onMenuSelected: function(t) {
                      u.preventDefault(t), u.stopPropagation(t);
                      var e = u.getTarget(t);
                      if (n(e, "emt_tab_store") || n(e.parentNode, "emt_tab_store")) return this._sendLink(), this.hide(), void 0;
                      var r = u.$("emoticonTab"),
                          s = u.$$("li.emot_tab", r),
                          a = 0;
                      if (e !== r && e.parentNode !== r) {
                          "BUTTON" !== e.nodeName.toUpperCase() && (e = e.parentNode);
                          for (var c = 0; c < s.length; c++) {
                              var l = u.$$("img", s[c])[0];
                              s[c] === e.parentNode ? (i(s[c], "on"), a = c, l.src = v[c].on_image_url) : (o(s[c], "on"), l.src = v[c].off_image_url)
                          }
                          this.renderEmoticonList(a)
                      }
                  },
                  _sendLink: function() {
                      var t = "kakaotalk://store?referer=e_sdk_" + encodeURIComponent(document.location.host) + "_tab",
                          e = {
                              urlScheme: t,
                              intentURI: "intent:" + t + "#Intent;package=com.kakao.talk;end;",
                              appName: "KakaoTalk",
                              storeURL: h.getInstallUrl(a, c),
                              onUnsupportedEnvironment: function() {
                                  alert("í•´ë‹¹ í™˜ê²½ì—ì„œëŠ” ì§€ì›ë˜ì§€ ì•ŠìŠµë‹ˆë‹¤. ì¹´ì¹´ì˜¤í†¡ì—ì„œ í™•ì¸í•´ì£¼ì„¸ìš”.")
                              }
                          };
                      m(e)
                  },
                  _renderConnectKakaoLayer: function(t) {
                      var e = u.$("emoticonList"),
                          n = this;
                      e.innerHTML = w.keyboard, this.currentIdx = t, setTimeout(function() {
                          n.queue.emit("updateKeyboard", !0)
                      }, 300)
                  },
                  _renderEmoticonItem: function(t) {
                      var e = u.$("emoticonList"),
                          n = v[t];
                      if (e.innerHTML = "", o(e.parentNode.parentNode, "loading"), i(e.parentNode, "loading"), n.items) this._renderItem(n, t);
                      else {
                          var r = this._renderItem.bind(this);
                          E._updateConfig(r, n, t)
                      }
                  },
                  _renderItem: function(t, e) {
                      var n = this,
                          i = u.$("emoticonList"),
                          r = "",
                          s = 1 === t.item_sub_type || 2 === t.item_sub_type,
                          a = t.count;
                      this.queue.emit("scrollTop");
                      for (var c = 0; a > c; c++) r += '<li class="idx_' + c + '"><button type="button" class="emt_il_item"><img src="' + E._getResourceUrl(t.id, c + 1) + '" class="emoticon_thumb" data-id="' + e + '" data-index="' + (c + 1) + '" alt="ì„ íƒ ì´ëª¨í‹°ì½˜"></button></li>';
                      i.innerHTML = "<ul" + (s ? ' class="emt_il_ani"' : "") + ' data-id="' + t.id + '">' + r + "</ul>", this.currentIdx = e, o(i.parentNode, "loading"), setTimeout(function() {
                          n.queue.emit("updateKeyboard", !0)
                      }, 300)
                  },
                  _applyAnimation: function() {
                      this.TabList = new f("#emoticonTabWrapper", {
                          preventDefaultException: {
                              tagName: /^(INPUT|TEXTAREA|IMG|BUTTON|SELECT)$/
                          },
                          scrollX: !0,
                          disablePointer: !0,
                          disableTouch: !1,
                          disableMouse: !1
                      }), this.List = new f("#emoticonListWrapper", {
                          scrollbars: !0,
                          fadeScrollbars: !0,
                          interactiveScrollbars: !0,
                          preventDefaultException: {
                              tagName: /^(INPUT|TEXTAREA|IMG|BUTTON|SELECT)$/
                          },
                          disablePointer: !0,
                          disableTouch: !1,
                          disableMouse: !1
                      })
                  },
                  _generateTemplate: function(t) {
                      switch (this.keyboard_status) {
                          case x.NEED_AGREE:
                              t.innerHTML = _.need_agree, i(t, "na"), o(t, "loading");
                              break;
                          case x.EXPIRE_TOKEN:
                              t.innerHTML = _.expire_token, i(t, "et"), o(t, "loading");
                              break;
                          default:
                              t.innerHTML = "BOTTOM" === this.tabMenu ? k.emoticons + k.tabmenu : k.tabmenu + k.emoticons, this._generateOfferGuide(t)
                      }
                  },
                  _generateOfferGuide: function(t) {
                      if (k[this.offerGuide]) {
                          var e = document.createElement("div");
                          e.id = "userGuideWrapper", e.innerHTML = k[this.offerGuide], this.queue.emit("sendPostMsg", JSON.stringify({
                              action: "set",
                              name: "guideActive",
                              value: "deactivate"
                          })), t.appendChild(e)
                      }
                  },
                  _setOfferGuide: function() {
                      var t = this;
                      if (this.loggedIn) {
                          var e = function(e) {
                              t.normalCpSupported && "deactivate" !== e && (t.offerGuide = "new_guide")
                          };
                          this.queue.emit("getStorage", e)
                      }
                  }
              }), O.EmoticonListViewForPC = O.EmoticonListView.extend({
                  renderTabMenu: function() {
                      this._super();
                      var t = u.$("emoticonTab"),
                          e = u.$("emoticonTabWrapper"),
                          n = u.$$(".emt_ctrl_next", e)[0],
                          o = u.$$("li", t).length - 1;
                      this.maxTabPageIdx = parseInt(o / this.tabsPerPage), this.maxTabPageIdx > 0 && this.maxTabPageIdx > this.curTabPageIdx && i(n, "on"), t.style.width = 100 * (this.maxTabPageIdx + 1) + "%"
                  },
                  tabPaging: function(t, e) {
                      u.preventDefault(t), u.stopPropagation(t);
                      var i = u.getTarget(t);
                      if ("A" !== i.nodeName.toUpperCase() && (i = i.parentNode), n(i, "on")) switch (e) {
                          case "prev":
                              this.prev(i);
                              break;
                          case "next":
                              this.next(i)
                      }
                  },
                  prev: function(t) {
                      var e = u.$("emoticonTabWrapper"),
                          n = u.$$(".emt_ctrl_next", e)[0];
                      this.curTabPageIdx <= 0 || (this.curTabPageIdx--, this.move(), i(n, "on"), 0 === this.curTabPageIdx && o(t, "on"))
                  },
                  next: function(t) {
                      var e = u.$("emoticonTabWrapper"),
                          n = u.$$(".emt_ctrl_prev", e)[0];
                      this.curTabPageIdx >= this.maxTabPageIdx || (this.curTabPageIdx++, this.move(), i(n, "on"), this.curTabPageIdx === this.maxTabPageIdx && o(t, "on"))
                  },
                  reset: function() {
                      if (this.completeRendering && this.keyboard_status === x.ENABLED) {
                          var t = u.$("emoticonTabWrapper"),
                              e = u.$$(".emt_ctrl_next", t)[0],
                              n = u.$$(".emt_ctrl_prev", t)[0];
                          o(e, "on"), o(n, "on")
                      }
                      this._super()
                  },
                  _bindEvents: function() {
                      this._super();
                      var t = this,
                          e = u.$("emoticonTabWrapper"),
                          n = u.$$(".emt_ctrl_next", e)[0],
                          i = u.$$(".emt_ctrl_prev", e)[0],
                          o = u.$("emoticonList");
                      u.addEvent(o, "contextmenu", r), u.addEvent(o, "selectstart", r), u.addEvent(o, "dragstart", r);
                      var s = function(e) {
                              t.tabPaging(e, "next")
                          },
                          a = function(e) {
                              t.tabPaging(e, "prev")
                          };
                      u.addEvent(n, "click", s), u.addEvent(i, "click", a);
                      var c = function() {
                          u.removeEvent(n, "click", s), u.removeEvent(i, "click", a), u.removeEvent(o, "contextmenu", r), u.removeEvent(o, "selectstart", r), u.removeEvent(o, "dragstart", r)
                      };
                      g.push(c)
                  },
                  _applyAnimation: function() {
                      this.List = new f("#emoticonListWrapper", {
                          scrollbars: !0,
                          fadeScrollbars: !0,
                          interactiveScrollbars: !0,
                          mouseWheel: !0,
                          disableMouse: !0,
                          disablePointer: !0,
                          disableTouch: !0,
                          preventDefaultException: {
                              tagName: /^(INPUT|TEXTAREA|IMG|BUTTON|SELECT)$/
                          }
                      })
                  },
                  _generateTemplate: function(t) {
                      switch (this.keyboard_status) {
                          case x.NEED_AGREE:
                              t.innerHTML = _.need_agree, i(t, "na"), o(t, "loading");
                              break;
                          case x.EXPIRE_TOKEN:
                              t.innerHTML = _.expire_token, i(t, "et"), o(t, "loading");
                              break;
                          default:
                              t.innerHTML = "BOTTOM" === this.tabMenu ? k.emoticons + k.tabmenu_pc : k.tabmenu_pc + k.emoticons, this._generateOfferGuide(t)
                      }
                  },
                  _sendLink: function() {
                      window.open("https://e.kakao.com?referer=sdk_" + encodeURIComponent(document.location.host) + "_tab", "_blank")
                  }
              }), O.EmoticonStorage = Class.extend({
                  init: function(t, e) {
                      var n = this;
                      this.isReady = !1, this.options = t, this.queue = e, this.guideActive = null, this.storage = this._initStorageFrame(), this.queue.on("sendPostMsg", function(t) {
                          n.sendPostMsg(t)
                      }), this.queue.on("getStorage", function(t) {
                          t(n.guideActive)
                      })
                  },
                  _initStorageFrame: function() {
                      var t = document.createElement("iframe"),
                          e = this;
                      return t.id = "dynamic_emoticon", t.src = "https://api-item.kakao.com/xDomainStorage.html", t.style.display = "none", document.body.appendChild(t), u.addEvent(t, "load", function() {
                          e.isReady = !0
                      }), t.contentWindow
                  },
                  getStorageItem: function() {
                      return this.guideActive
                  },
                  sendPostMsg: function(t) {
                      this.storage.postMessage(t, "*")
                  },
                  receivePostMsg: function(t) {
                      var e = this;
                      return new Promise(function(n) {
                          u.addEvent(window, "message", function(t) {
                              if (e._assertOrigin(t.origin)) {
                                  var i = /^(set|get):([\S\s]*)$/.exec(t.data);
                                  if (!i || i.length < 3) return;
                                  var o = i[1],
                                      r = i[2];
                                  "get" === o && (r ? (e.guideActive = r, n(r)) : u.localStorage.getItem("guideActive") && (e.guideActive = u.localStorage.getItem("guideActive"), e.storage.postMessage(JSON.stringify({
                                      action: "set",
                                      name: "guideActive",
                                      value: u.localStorage.getItem("guideActive")
                                  }), "*")), n(r))
                              }
                          }), e.storage.postMessage(t, "*")
                      })
                  },
                  _assertOrigin: function(t) {
                      return "https://api-item.kakao.com" === t
                  }
              }), E
          }()
      }, {
          "../kakao-js-sdk/src/common.js": 7,
          "../kakao-js-sdk/src/common/everntObserver": 9,
          "../kakao-js-sdk/vendor/web2app.js": 23,
          "./api.js": 26,
          "./emoticon.animate": 27,
          "./util.js": 30
      }],
      29: [function(t, e) {
          e.exports = function(e) {
              e.Kakao = e.Kakao || {};
              var n = e.Kakao,
                  i = t("./util.js"),
                  o = t("../kakao-js-sdk/src/common.js");
              return n.VERSION = o.VERSION, n.Story = t("../kakao-js-sdk/src/story.js"), n.init = function(e) {
                  if (o.RUNTIME.appKey) throw new o.KakaoError("Kakao.init: Already initialized.");
                  if (!i.isString(e) || e === o.DUMMY_KEY) throw new o.KakaoError("Kakao.init: App key must be provided");
                  o.RUNTIME.appKey = e, n.Auth = t("../kakao-js-sdk/src/auth.js"), n.API = t("../kakao-js-sdk/src/api.js"), n.Link = t("../kakao-js-sdk/src/link.js"), n.Emoticon = t("./emoticon.js"), n.Navi = t("../kakao-js-sdk/src/navi.js")
              }, n.cleanup = function() {
                  n.Auth && n.Auth.cleanup(), n.API && n.API.cleanup(), n.Link && n.Link.cleanup(), n.Story && n.Story.cleanup(), n.Emoticon && n.Emoticon.cleanup(), i.nullify(o.RUNTIME)
              }, window.kakaoAsyncInit && window.kakaoAsyncInit(), n
          }(window)
      }, {
          "../kakao-js-sdk/src/api.js": 2,
          "../kakao-js-sdk/src/auth.js": 3,
          "../kakao-js-sdk/src/common.js": 7,
          "../kakao-js-sdk/src/link.js": 13,
          "../kakao-js-sdk/src/navi.js": 15,
          "../kakao-js-sdk/src/story.js": 16,
          "./emoticon.js": 28,
          "./util.js": 30
      }],
      30: [function(t, e) {
          /*!
           * underscore
           * https://github.com/jashkenas/underscore
           * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
           * MIT License
           */
          e.exports = function() {
              var t = {},
                  e = {},
                  n = Array.prototype,
                  i = Object.prototype,
                  o = n.slice,
                  r = n.concat,
                  s = i.toString,
                  a = i.hasOwnProperty,
                  c = n.forEach,
                  u = n.map,
                  l = n.filter,
                  h = n.every,
                  p = n.some,
                  d = n.indexOf,
                  f = Array.isArray,
                  m = Object.keys,
                  g = t.each = function(n, i, o) {
                      if (null == n) return n;
                      if (c && n.forEach === c) n.forEach(i, o);
                      else if (n.length === +n.length) {
                          for (var r = 0, s = n.length; s > r; r++)
                              if (i.call(o, n[r], r, n) === e) return
                      } else
                          for (var a = t.keys(n), r = 0, s = a.length; s > r; r++)
                              if (i.call(o, n[a[r]], a[r], n) === e) return;
                      return n
                  };
              t.map = function(t, e, n) {
                  var i = [];
                  return null == t ? i : u && t.map === u ? t.map(e, n) : (g(t, function(t, o, r) {
                      i.push(e.call(n, t, o, r))
                  }), i)
              }, t.filter = function(t, e, n) {
                  var i = [];
                  return null == t ? i : l && t.filter === l ? t.filter(e, n) : (g(t, function(t, o, r) {
                      e.call(n, t, o, r) && i.push(t)
                  }), i)
              }, t.every = function(n, i, o) {
                  i || (i = t.identity);
                  var r = !0;
                  return null == n ? r : h && n.every === h ? n.every(i, o) : (g(n, function(t, n, s) {
                      return (r = r && i.call(o, t, n, s)) ? void 0 : e
                  }), !!r)
              };
              var v = t.any = function(n, i, o) {
                  i || (i = t.identity);
                  var r = !1;
                  return null == n ? r : p && n.some === p ? n.some(i, o) : (g(n, function(t, n, s) {
                      return r || (r = i.call(o, t, n, s)) ? e : void 0
                  }), !!r)
              };
              return t.contains = function(t, e) {
                  return null == t ? !1 : d && t.indexOf === d ? -1 != t.indexOf(e) : v(t, function(t) {
                      return t === e
                  })
              }, t.difference = function(e) {
                  var i = r.apply(n, o.call(arguments, 1));
                  return t.filter(e, function(e) {
                      return !t.contains(i, e)
                  })
              }, t.partial = function(e) {
                  var n = o.call(arguments, 1);
                  return function() {
                      for (var i = 0, o = n.slice(), r = 0, s = o.length; s > r; r++) o[r] === t && (o[r] = arguments[i++]);
                      for (; i < arguments.length;) o.push(arguments[i++]);
                      return e.apply(this, o)
                  }
              }, t.after = function(t, e) {
                  return function() {
                      return --t < 1 ? e.apply(this, arguments) : void 0
                  }
              }, t.keys = function(e) {
                  if (!t.isObject(e)) return [];
                  if (m) return m(e);
                  var n = [];
                  for (var i in e) t.has(e, i) && n.push(i);
                  return n
              }, t.extend = function(t) {
                  return g(o.call(arguments, 1), function(e) {
                      if (e)
                          for (var n in e) t[n] = e[n]
                  }), t
              }, t.defaults = function(t) {
                  return g(o.call(arguments, 1), function(e) {
                      if (e)
                          for (var n in e) void 0 === t[n] && (t[n] = e[n])
                  }), t
              }, t.isElement = function(t) {
                  return !(!t || 1 !== t.nodeType)
              }, t.isArray = f || function(t) {
                  return "[object Array]" == s.call(t)
              }, t.isObject = function(t) {
                  return t === Object(t)
              }, g(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Blob", "File", "FileList"], function(e) {
                  t["is" + e] = function(t) {
                      return s.call(t) == "[object " + e + "]"
                  }
              }), t.isBoolean = function(t) {
                  return t === !0 || t === !1 || "[object Boolean]" == s.call(t)
              }, t.has = function(t, e) {
                  return a.call(t, e)
              }, t.identity = function(t) {
                  return t
              }, t.emptyFunc = function() {}, t.getElement = function(e) {
                  return t.isElement(e) ? e : t.isString(e) ? document.querySelector(e) : null
              }, t.addEvent = function(t, e, n) {
                  t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n)
              }, t.removeEvent = function(t, e, n) {
                  t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n)
              }, t.getTarget = function(t) {
                  var e = t || window.event;
                  return e.target || e.srcElement
              }, t.preventDefault = function(t) {
                  var e = t || window.event;
                  e.preventDefault ? e.preventDefault() : e.returnValue = !1
              }, t.stopPropagation = function(t) {
                  var e = t || window.event;
                  e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
              }, t.buildQueryString = function(e, n) {
                  var i = [];
                  for (var o in e)
                      if (e.hasOwnProperty(o)) {
                          var r = e[o];
                          t.isObject(r) && (r = JSON.stringify(r));
                          var s = n === !1 ? o : encodeURIComponent(o),
                              a = n === !1 ? r : encodeURIComponent(r);
                          i.push(s + "=" + a)
                      }
                  return i.join("&")
              }, t.getRandomString = function() {
                  return Math.random().toString(36).slice(2)
              }, t.nullify = function(e) {
                  t.each(e, function(t, n) {
                      e[n] = null
                  })
              }, t.isOneOf = function(e) {
                  return t.partial(t.contains, e)
              }, t.passesOneOf = function(e) {
                  if (!t.isArray(e)) throw new Error("validators should be an Array");
                  return function(n) {
                      return t.any(e, function(t) {
                          return t(n)
                      })
                  }
              }, t.isURL = function(t) {
                  var e = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                  return e.test(t)
              }, t.arrayBufferToString = function(t) {
                  var e, n, i, o = "",
                      r = new Uint8Array(t),
                      s = r.length,
                      a = Math.pow(2, 16);
                  for (e = 0; s > e; e += a) n = Math.min(a, s - e), i = r.subarray(e, e + n), o += String.fromCharCode.apply(null, i);
                  return o
              }, t.localStorage = function() {
                  var t = {
                      _data: {},
                      setItem: function(t, e) {
                          return this._data[t] = String(e)
                      },
                      getItem: function(t) {
                          return this._data.hasOwnProperty(t) ? this._data[t] : null
                      },
                      removeItem: function(t) {
                          return delete this._data[t]
                      },
                      clear: function() {
                          return this._data = {}
                      }
                  };
                  try {
                      return "localStorage" in window ? (window.localStorage.setItem("store", ""), window.localStorage.removeItem("store"), window.localStorage) : t
                  } catch (e) {
                      return t
                  }
              }(), t
          }()
      }, {}]
  }, {}, [29])(29)
});