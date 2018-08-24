! function e(t, n, i) {
  function o(s, r) {
      if (!n[s]) {
          if (!t[s]) {
              var l = "function" == typeof require && require;
              if (!r && l) return l(s, !0);
              if (a) return a(s, !0);
              var u = new Error("Cannot find module '" + s + "'");
              throw u.code = "MODULE_NOT_FOUND", u
          }
          var c = n[s] = {
              exports: {}
          };
          t[s][0].call(c.exports, function(e) {
              var n = t[s][1][e];
              return o(n ? n : e)
          }, c, c.exports, e, t, n, i)
      }
      return n[s].exports
  }
  for (var a = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
  return o
}({
  1: [function(e, t, n) {
      "use strict";

      function i(e) {
          return e && e.__esModule ? e : {
              "default": e
          }
      }

      function o(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(n, "__esModule", {
          value: !0
      });
      var a = function() {
              function e(e, t) {
                  for (var n = 0; n < t.length; n++) {
                      var i = t[n];
                      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                  }
              }
              return function(t, n, i) {
                  return n && e(t.prototype, n), i && e(t, i), t
              }
          }(),
          s = e("./utils"),
          r = i(s),
          l = new r["default"],
          u = function() {
              function e(t) {
                  var n = this;
                  o(this, e), this.playBtn = document.getElementById("feature-play"), this.videoContainer = document.getElementById("feature-video-container"), this.background = document.getElementById("feature-background"), this.title = document.getElementById("feature-title"), this.startSequenceBind = this.startSequence.bind(this), this.endSequenceBind = this.endSequence.bind(this), this.alterBackgroundHeightBind = this.alterBackgroundHeight.bind(this), window._wq = window._wq || [];
                  var i = {};
                  i[t] = function(e) {
                      n.video = e, n.start()
                  }, window._wq.push(i)
              }
              return a(e, [{
                  key: "start",
                  value: function() {
                      var e = this;
                      this.playBtn.style.opacity = 1, this.playBtn.addEventListener("click", function() {
                          e.playVideo(), e.video.play()
                      })
                  }
              }, {
                  key: "playVideo",
                  value: function() {
                      this.title.addEventListener("animationend", this.startSequenceBind), l.addClass(this.title, "titleFadeOutUp")
                  }
              }, {
                  key: "startSequence",
                  value: function() {
                      var e = this;
                      this.title.removeEventListener("animationend", this.startSequenceBind), this.title.style.display = "none", l.removeClass(this.title, "titleFadeOutUp"), l.addClass(this.background, "playing-video"), this.video.bind("heightchange", this.alterBackgroundHeightBind()), this.video.bind("pause", function() {
                          l.removeClass(e.background, "playing-video"), e.background.style.height = "100%", e.title.style.display = "block", e.title.addEventListener("animationend", e.endSequenceBind), l.addClass(e.title, "titleFadeInDown")
                      })
                  }
              }, {
                  key: "endSequence",
                  value: function() {
                      this.title.removeEventListener("animationend", this.endSequenceBind), l.removeClass(this.title, "titleFadeInDown"), this.video.unbind("heightchange", this.alterBackgroundHeightBind), this.video.time(0)
                  }
              }, {
                  key: "alterBackgroundHeight",
                  value: function() {
                      this.background.style.height = this.video.height() + "px"
                  }
              }]), e
          }();
      n["default"] = u
  }, {
      "./utils": 4
  }],
  2: [function(e, t, n) {
      "use strict";

      function i(e, t, n) {
          function i() {
              l += 1 / 60;
              var e = l / u,
                  t = c[r](e);
              e < 1 ? (window.requestAnimFrame(i), window.scrollTo(0, o + (a - o) * t)) : window.scrollTo(0, a)
          }
          var o = window.scrollY || document.documentElement.scrollTop,
              a = e || 0,
              s = t || 2e3,
              r = n || "easeOutSine",
              l = 0,
              u = Math.max(.1, Math.min(Math.abs(o - a) / s, .8)),
              c = {
                  easeOutSine: function(e) {
                      return Math.sin(e * (Math.PI / 2))
                  },
                  easeInOutSine: function(e) {
                      return -.5 * (Math.cos(Math.PI * e) - 1)
                  },
                  easeInOutQuint: function(e) {
                      return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
                  }
              };
          i()
      }
      Object.defineProperty(n, "__esModule", {
          value: !0
      }), n["default"] = i, window.requestAnimFrame = function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
              window.setTimeout(e, 1e3 / 60)
          }
      }()
  }, {}],
  3: [function(e, t, n) {
      "use strict";

      function i(e) {
          return e && e.__esModule ? e : {
              "default": e
          }
      }

      function o(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(n, "__esModule", {
          value: !0
      });
      var a = function() {
              function e(e, t) {
                  for (var n = 0; n < t.length; n++) {
                      var i = t[n];
                      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                  }
              }
              return function(t, n, i) {
                  return n && e(t.prototype, n), i && e(t, i), t
              }
          }(),
          s = e("./utils"),
          r = i(s),
          l = new r["default"],
          u = function() {
              function e(t) {
                  var n = this;
                  o(this, e), this.selector = t, this.showoff = document.querySelector(t + " ul"), this.tiles = this.showoff.querySelectorAll("li"), this.hash = !!window.location.hash && window.location.hash.substring(1);
                  for (var i = 0; i < this.tiles.length; i++) {
                      var a = this.tiles[i].querySelectorAll("img")[0];
                      a.complete ? (l.removeClass(a.parentNode.parentNode, "loading"), this.checkHash(a.parentNode), this.addTileClickListener(a.parentNode.parentNode)) : a.onload = function(e) {
                          l.removeClass(e.target.parentNode.parentNode, "loading"), n.checkHash(e.target.parentNode), n.addTileClickListener(e.target.parentNode.parentNode)
                      }
                  }
              }
              return a(e, [{
                  key: "checkHash",
                  value: function(e) {
                      var t = e.getAttribute("name");
                      t === this.hash && this.toggleTile(e.parentNode, "active")
                  }
              }, {
                  key: "addTileClickListener",
                  value: function(e) {
                      var t = this,
                          n = e.querySelector(".showoff-thumb"),
                          i = e.querySelector(".showoff-detail-close");
                      n.addEventListener("click", function(ev) {
                          ev.preventDefault();
                          t.toggleTile(e)
                      }), i.addEventListener("click", function(ev) {
                          ev.preventDefault();
                          t.toggleTile(e)
                      })
                  }
              }, {
                  key: "start",
                  value: function() {
                      var e = this;
                      window.addEventListener("resize", function() {
                          e.reflowTiles()
                      }), this.reflowTiles()
                  }
              }, {
                  key: "clearActiveTiles",
                  value: function() {
                      for (var e = 0; e < this.tiles.length; e++) l.removeClass(this.tiles[e], "active"), this.tiles[e].style.height = ""
                  }
              }, {
                  key: "toggleTile",
                  value: function(e) {
                      l.hasClass(e, "active") ? this.clearActiveTiles() : (this.clearActiveTiles(), l.addClass(e, "active"), this.reflowTiles())
                  }
              }, {
                  key: "reflowTiles",
                  value: function() {
                      for (var e = this.getWidth(), t = e / 4, n = 0, i = 0; i < this.tiles.length; i++) {
                          n = i % 4 === 0 ? n + 1 : n;
                          var o = this.tiles[i].querySelector(".showoff-thumb"),
                              a = this.tiles[i].querySelector(".showoff-detail"),
                              s = this.tiles[i].querySelector(".showoff-detail-wrap");
                          this.tiles[i].style.width = "25%", o.style.height = t + "px", a.style.top = n * t + "px", l.hasClass(this.tiles[i], "active") && (this.tiles[i].style.height = o.offsetHeight + s.offsetHeight + 60 + "px")
                      }
                  }
              }, {
                  key: "getWidth",
                  value: function() {
                      return this.showoff.offsetWidth
                  }
              }]), e
          }();
      n["default"] = u
  }, {
      "./utils": 4
  }],
  4: [function(e, t, n) {
      "use strict";

      function i(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(n, "__esModule", {
          value: !0
      });
      var o = function() {
              function e(e, t) {
                  for (var n = 0; n < t.length; n++) {
                      var i = t[n];
                      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                  }
              }
              return function(t, n, i) {
                  return n && e(t.prototype, n), i && e(t, i), t
              }
          }(),
          a = function() {
              function e() {
                  i(this, e)
              }
              return o(e, [{
                  key: "hasClass",
                  value: function(e, t) {
                      return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className)
                  }
              }, {
                  key: "addClass",
                  value: function(e, t) {
                      this.hasClass(e, t) || (e.className = e.className ? [e.className, t].join(" ") : t)
                  }
              }, {
                  key: "removeClass",
                  value: function(e, t) {
                      if (this.hasClass(e, t)) {
                          var n = e.className;
                          e.className = n.replace(new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)", "g"), " ")
                      }
                  }
              }, {
                  key: "toggleClass",
                  value: function(e, t) {
                      if (e.classList) e.classList.toggle(t);
                      else {
                          var n = e.className.split(" "),
                              i = n.indexOf(t);
                          i >= 0 ? n.splice(i, 1) : n.push(t), e.className = n.join(" ")
                      }
                  }
              }, {
                  key: "outerHeight",
                  value: function(e) {
                      var t = e.offsetHeight,
                          n = getComputedStyle(e);
                      return t += parseInt(n.marginTop) + parseInt(n.marginBottom)
                  }
              }, {
                  key: "is_touch_device",
                  value: function() {
                      return "ontouchstart" in window || navigator.maxTouchPoints
                  }
              }]), e
          }();
      n["default"] = a
  }, {}],
  5: [function(e, t, n) {
      "use strict";

      function i(e) {
          return e && e.__esModule ? e : {
              "default": e
          }
      }

      function o(e) {
          var t = document.querySelector(".off-canvas");
          e.preventDefault();
          var n = p.hasClass(t, "open") ? p.removeClass(t, "open") : p.addClass(t, "open");
          return n
      }

      function a(e) {
          e.preventDefault();
          for (var t = document.querySelectorAll(".primary-nav .chevron"), n = 0; n < t.length; n++) e.target !== t[n] && p.hasClass(t[n].nextElementSibling, "open") && p.removeClass(t[n].nextElementSibling, "open");
          p.hasClass(e.target.nextElementSibling, "open") ? p.removeClass(e.target.nextElementSibling, "open") : p.addClass(e.target.nextElementSibling, "open")
      }

      function s() {
          var e = document.querySelector(".mobile-menu-icon"),
              t = document.querySelector(".close-menu"),
              n = document.querySelectorAll(".primary-nav .chevron");
          e.addEventListener("touchstart", o), e.addEventListener("mousedown", o), t.addEventListener("touchstart", o), t.addEventListener("mousedown", o);
          for (var i = 0; i < n.length; i++) n[i].addEventListener("touchstart", a), n[i].addEventListener("mousedown", a);
          if (p.is_touch_device()) {
              var s = document.querySelector(".primary-nav");
              s.addEventListener("touchstart", function() {})
          }
      }

      function r() {
          var e = document.querySelector(".main-menu-wrapper");
          window.addEventListener("scroll", function() {
              var t = document.documentElement.scrollTop || document.body.scrollTop,
                  n = t > 40 ? p.addClass(e, "stick") : p.removeClass(e, "stick");
              return n
          })
      }

      function l() {
          var e = document.getElementById("scroll-top");
          e.addEventListener("click", function(e) {
              e.preventDefault(), (0, w["default"])()
          })
      }

      function u() {
          var e = document.getElementById("climbing-the-mountain");
          if (e) {
              var t = function() {
                  e.offsetWidth < 664;
                  e.offsetWidth < 664 ? p.hasClass(e, "narrow") || p.addClass(e, "narrow") : p.hasClass(e, "narrow") && p.removeClass(e, "narrow")
              };
              window.addEventListener("resize", t), t()
          }
      }
      var c = e("./lib/utils"),
          d = i(c),
          f = e("./lib/showoff"),
          h = i(f),
          v = e("./lib/feature-video"),
          m = i(v),
          g = e("./lib/scroll-to"),
          w = i(g),
          p = new d["default"];
      window.addEventListener("DOMContentLoaded", function() {
          if (s(), r(), l(), u(), null !== document.querySelector(".showoff")) {
              var e = new h["default"](".showoff");
              e.start()
          }
          if (p.hasClass(document.getElementsByTagName("BODY")[0], "home")) {
              new m["default"]("koapeobj5x")
          }
      })
  }, {
      "./lib/feature-video": 1,
      "./lib/scroll-to": 2,
      "./lib/showoff": 3,
      "./lib/utils": 4
  }]
}, {}, [5]);
