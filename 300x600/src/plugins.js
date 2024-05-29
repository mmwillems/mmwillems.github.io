// @ts-nocheck
/* eslint-disable */
import { initCreative } from "./script.js";

/**
 * Lemonpi Boilerplate for plugin management in creative libraries
 * This implementation is 'borrowed' from Lemonpi studio
 * @owner: Bram Korsten
 * @date: September 12 2022
 */

// List of all the installed plugins.
// This is managed by the boilerplate extension.
// DO NOT MODIFY
var pluginSource = [
	/* @plugins */
	{
		name: "ghg",
		init: function () {
			return (function (a) {
				function t() {
					window.addEventListener("message", function (e) {
						var n;
						e.data &&
							"LP_EXEC_SCRIPT_RESPONSE" === e.data.name &&
							(((n = document.createElement("script")).text = e.data.script),
							document.body.appendChild(n));
					});
				}
				function r(e) {
					if (i && window.lemonpi.context) {
						var n = e.replace(/\$\{/, "").replace(/\}/, "").trim();
						return i[n];
					}
					return e;
				}
				function c(o) {
					var i;
					void 0 !== window.lemonpi &&
						((i = function (e) {
							for (var n in e)
								Object.prototype.hasOwnProperty.call(e, n) &&
									"delay" !== n &&
									$(n).css(e[n]);
						}),
						window.lemonpi.subscribe(function (e) {
							e = e && e.cssOverride && e.cssOverride.value;
							if (e)
								try {
									var n = JSON.parse(e),
										t = void 0 !== o ? o : n.delay;
									t
										? setTimeout(function () {
												return i(n);
										  }, JSON.parse(t))
										: i(n);
								} catch (e) {
									m && console.warn("Syntax error in cssOverride JSON", e);
								}
						}));
				}
				function s(e) {
					var n;
					void 0 !== window.lemonpi &&
						((n = document.querySelector("#creative_container")),
						((e = e).referer = r("${REFERER_URL_ENC}")),
						(e.creativeIsVisible = !!(
							n.offsetWidth ||
							n.offsetHeight ||
							n.getClientRects().length
						)),
						window.postMessage(e, "*"),
						window.parent.postMessage(e, "*"));
				}
				function d() {
					var n;
					e &&
						(n = setInterval(function () {
							var t, o, e;
							0 !== window.clickTag1.length &&
								(clearInterval(n),
								2 < (e = window.clickTag1.split("__AN_MACROS__")).length &&
									(e.pop(),
									e.shift(),
									(t = e.map(function (e) {
										e = e.split(":");
										return { macro: e[0], value: e[1] || "0" };
									})),
									"undefined" != typeof lemonpi &&
										void 0 !== lemonpi.context &&
										((o = window.open),
										(window.open = function (e) {
											for (
												var n =
													e.split("3D__AN_MACROS__")[0] +
													"3D" +
													("h" + e.split("__AN_MACROS__h")[1]);
												0 < t.length;

											)
												n = (n = n.replace(
													"(%253A" + t[0].macro + "%253A)",
													t[0].value
												)).replace("(%3A" + t[0].macro + "%3A)", t[0].value);
											o.call(window, n);
										}))));
						}, 100));
				}
				function l() {
					document.hidden || "function" != typeof window.onPageVisible
						? document.hidden &&
						  "function" == typeof window.onPageHidden &&
						  window.onPageHidden()
						: window.onPageVisible();
				}
				function o() {
					s({ name: "LEMONPI_CREATIVE_WILL_LOAD" });
				}
				var p = void 0,
					u = !1,
					w = "4005" === window.location.port,
					m =
						w ||
						-1 < window.location.hostname.indexOf("lemonpi.io") ||
						/lemonpi-prod-templates\.s3\.amazonaws\.com/.test(
							window.location.host
						),
					e = "string" == typeof clickTag1,
					i = void 0;
				return {
					creativeWillLoad: function (n) {
						window.lemonpi.context
							? window.lemonpi.context.subscribe(function (e) {
									(i = e.appnexus), t(), o(), n();
							  })
							: (t(), o(), n()),
							window.lemonpi.config && window.lemonpi.config.subscribe(s);
					},
					creativeDidRender: function () {
						var e, t, n, o, i;
						(-1 < window.location.href.indexOf("inapptesting=1") ||
							(!m &&
								void 0 !== window.screenad &&
								!window.screenad.isPreviewer)) &&
							(console.log = function (e) {
								s({ name: "LEMONPI_LOG", message: e });
							}),
							!w &&
								window.Raven &&
								"function" == typeof window.Raven.config &&
								window.Raven.config(
									"https://87dc5e0450d3461f83c185097b7db5cf@sentry.io/75086"
								).install(),
							c(),
							new URLSearchParams(window.location.search).has("inapptesting") ||
								(window.addEventListener("message", function (e) {
									e.data &&
										"LP_IS_IN_APP" === e.data.name &&
										(window.open = function (e) {
											e = { name: "LP_MRAID_CLICK", url: e };
											window.parent.postMessage(e, "*"),
												window.postMessage(e, "*");
										});
								}),
								(n = { name: "LP_REQUEST_IN_APP" }),
								window.parent.postMessage(n, "*"),
								window.postMessage(n, "*")),
							d(),
							(e = document.querySelector("head")),
							((n = document.createElement("style")).type = "text/css"),
							n.appendChild(
								document.createTextNode(
									"* { box-sizing: border-box; } #creative_container { cursor: pointer; -webkit-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -webkit-tap-highlight-color: rgba(0,0,0,0); -webkit-tap-highlight-color: transparent; -ms-user-select: none; -moz-user-select: none; -webkit-user-select: none; user-select: none }"
								)
							),
							e.appendChild(n),
							document
								.getElementById("creative_container")
								.addEventListener("mouseenter", function () {
									p = setTimeout(function () {
										u = !0;
									}, 1e3);
								}),
							document
								.getElementById("creative_container")
								.addEventListener("mouseleave", function () {
									clearTimeout(p);
								}),
							(t = setInterval(function () {
								var e = void 0,
									n = Math.abs(parseInt(a.loopstopDelay, 10)),
									e = isNaN(n) || 0 === n ? 15 : n;
								"function" == typeof window.onLoopStop &&
									(clearInterval(t),
									TweenMax.delayedCall(e, function () {
										window.onLoopStop();
									}));
							}, 100)),
							setTimeout(function () {
								return clearInterval(t);
							}, 500),
							(n = document
								.querySelector('meta[name="ad.size"]')
								.content.match(/\d+/g)),
							(o = { "336x280": 0.8928571429, "1272x328": 0.7625786164 }[
								n[0] + "x" + n[1]
							]),
							w &&
								a.previewScalifier &&
								o &&
								window.addEventListener("message", function (e) {
									e.data &&
										"LEMONPI_CREATIVE_RENDERED" === e.data.name &&
										(((e = document.querySelector(
											"#creative_container"
										)).style.transformOrigin = "0 0"),
										(e.style.webkitTransformOrigin = "0 0"),
										(e.style.transform = "scale(" + o + ")"),
										(e.style.webkitTransform = "scale(" + o + ")"));
								}),
							void 0 !== document.hidden &&
								document.addEventListener("visibilitychange", l, !1),
							(i = lemonpi.click),
							(window.lemonpi.click = function (e, n, t) {
								s({ name: "LP_CLICK" }), i(e, n, t);
							}),
							m &&
								$.getScript(
									"https://s3.eu-central-1.amazonaws.com/ghg-tools/ghg-banner-basics-debugger/debugger-v2.js",
									function () {
										var e, n;
										w &&
											((e = window.location.href.replace(
												"concept.html",
												"script.js"
											)),
											(n = new XMLHttpRequest()).addEventListener(
												"load",
												function (e) {
													e = e.currentTarget.responseText.match(
														/function executeScript\(plugins\) {[^]+?(?=\/\/ All the Creative's plugins.)/g
													);
													(e = e ? e[0] : "").match(/https?/gi) &&
														window.drawWarning(
															"error",
															"Found one or more hardcoded URL's in your creative, please move them to a placeholder."
														);
												}
											),
											n.open("get", e, !0),
											n.send());
									}
								),
							setTimeout(function () {
								var e = {
									name: "LEMONPI_CREATIVE_RENDERED",
									supplyType: r("${SUPPLY_TYPE}"),
									mraidVersion:
										"undefined" != typeof mraid
											? window.mraid.getVersion()
											: "n/a",
									appId: r("${EXT_APP_ID}"),
								};
								s(Object.assign(e));
							}, 1);
					},
					pluginApi: {
						getAppNexusMacro: r,
						getUserInteracted: function () {
							return u;
						},
						addMacrosToUrl: function (e) {
							return e
								.replace("${CREATIVE_ID}", r("${CREATIVE_ID}"))
								.replace("${USER_ID}", r("${USER_ID}"))
								.replace("${AUCTION_ID}", r("${AUCTION_ID}"))
								.replace("${CREATIVE_SIZE}", r("${CREATIVE_SIZE}"));
						},
						isInLemonpiStudio: w,
						isInAnyLemonpiEnvironment: m,
						getResizedImageUrl: function (e, n, t, o, i) {
							var a =
									"https://image.lemonpi.io/img/http://res.cloudinary.com/" +
									e +
									"/image/fetch/",
								e = "c_scale";
							return (
								t && (e += ",w_" + Math.round(parseFloat(t))),
								o && (e += ",h_" + Math.round(parseFloat(o))),
								i && (e += "/q_" + i),
								a +
									e +
									"/" +
									n.replace(/^(https?:)?\/\/image\.lemonpi\.io\/img\//i, "")
							);
						},
						cssOverride: c,
					},
				};
			})({ looping: false, previewScalifier: false, loopstopDelay: "15" });
		},
	},
	{
		name: "check",
		init: function () {
			return (function (e) {
				function i() {
					return !0;
				}
				function n() {
					return !1;
				}
				var r = e;
				"4005" !== window.location.port && (r = void 0);
				var o = navigator,
					t = o.userAgent,
					a = o.standalone,
					s = {
						retina: function () {
							return (
								(window.matchMedia &&
									(window.matchMedia(
										"only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)"
									).matches ||
										window.matchMedia(
											"only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)"
										).matches)) ||
								(window.devicePixelRatio && 2 <= window.devicePixelRatio)
							);
						},
						desktop: function () {
							return !this.mobile();
						},
						mobile: function () {
							return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
								t
							);
						},
						osx: function () {
							return /OS X/i.test(t);
						},
						windows: function () {
							return /Windows/i.test(t);
						},
						ios: function () {
							return /iPhone|iPad|iPod/i.test(t);
						},
						android: function () {
							return /Android/i.test(t);
						},
						ie: function () {
							return /MSIE|Trident/i.test(t);
						},
						ie9: function () {
							return /MSIE 9\./i.test(t);
						},
						ie10: function () {
							return /MSIE 10\./i.test(t);
						},
						ie11: function () {
							return /Trident\//i.test(t) && !/MSIE/i.test(t);
						},
						edge: function () {
							return /Edge\//i.test(t);
						},
						chrome: function () {
							return /Chrome\//i.test(t) && !/Edge\//i.test(t);
						},
						firefox: function () {
							return /Firefox\//i.test(t);
						},
						safari: function () {
							return (
								/Safari\//i.test(t) &&
								!/Chrome\//i.test(t) &&
								!/Edge\//i.test(t)
							);
						},
						inApp: function () {
							if (!this.mobile) return !1;
							if (this.ios()) {
								if (!a && !this.safari()) return !0;
							} else if (this.android())
								return /; wv|version\/[0-9]+\.[0-9]+/gi.test(t);
							return !1;
						},
					};
				if (r && void 0 !== r.deviceType)
					switch (r.deviceType) {
						case "desktop":
							(s.desktop = i), (s.mobile = n), (s.inApp = n);
							break;
						case "mobile":
							(s.desktop = n), (s.mobile = i), (s.inApp = n);
							break;
						case "in-app":
							(s.desktop = n), (s.mobile = i), (s.inApp = i);
							break;
						default:
							(s.desktop = i), (s.mobile = n), (s.inApp = n);
					}
				if (r && void 0 !== r.operatingSystem)
					switch (r.operatingSystem) {
						case "osx":
							(s.osx = i), (s.windows = n), (s.android = n), (s.ios = n);
							break;
						case "windows":
							(s.osx = n), (s.windows = i), (s.android = n), (s.ios = n);
							break;
						case "android":
							(s.osx = n), (s.windows = n), (s.android = i), (s.ios = n);
							break;
						case "ios":
							(s.osx = n), (s.windows = n), (s.android = n), (s.ios = i);
							break;
						default:
							(s.osx = n), (s.windows = n), (s.android = n), (s.ios = n);
					}
				if (r && void 0 !== r.browser)
					switch (r.browser) {
						case "chrome":
							(s.chrome = i),
								(s.safari = n),
								(s.firefox = n),
								(s.ie = n),
								(s.ie9 = n),
								(s.ie10 = n),
								(s.ie11 = n),
								(s.edge = n);
							break;
						case "safari":
							(s.chrome = n),
								(s.safari = i),
								(s.firefox = n),
								(s.ie = n),
								(s.ie9 = n),
								(s.ie10 = n),
								(s.ie11 = n),
								(s.edge = n);
							break;
						case "firefox":
							(s.chrome = n),
								(s.safari = n),
								(s.firefox = i),
								(s.ie = n),
								(s.ie9 = n),
								(s.ie10 = n),
								(s.ie11 = n),
								(s.edge = n);
							break;
						case "ie9":
							(s.chrome = n),
								(s.safari = n),
								(s.firefox = n),
								(s.ie = i),
								(s.ie9 = i),
								(s.ie10 = n),
								(s.ie11 = n),
								(s.edge = n);
							break;
						case "ie10":
							(s.chrome = n),
								(s.safari = n),
								(s.firefox = n),
								(s.ie = i),
								(s.ie9 = n),
								(s.ie10 = i),
								(s.ie11 = n),
								(s.edge = n);
							break;
						case "ie11":
							(s.chrome = n),
								(s.safari = n),
								(s.firefox = n),
								(s.ie = i),
								(s.ie9 = n),
								(s.ie10 = n),
								(s.ie11 = i),
								(s.edge = n);
							break;
						case "edge":
							(s.chrome = n),
								(s.safari = n),
								(s.firefox = n),
								(s.ie = n),
								(s.ie9 = n),
								(s.ie10 = n),
								(s.ie11 = n),
								(s.edge = i);
							break;
						default:
							(s.chrome = n),
								(s.safari = n),
								(s.firefox = n),
								(s.ie = n),
								(s.ie9 = n),
								(s.ie10 = n),
								(s.ie11 = n),
								(s.edge = n);
					}
				if (r && void 0 !== r.screenType)
					switch (r.screenType) {
						case "nonretina":
							s.retina = n;
							break;
						case "retina":
						default:
							s.retina = i;
					}
				return { pluginApi: s };
			})({
				deviceType: "mobile",
				operatingSystem: false,
				screenType: false,
				browser: false,
			});
		},
	},
	{
		name: "Kosi",
		init: function () {
			return (function e(x) {
				function t(t, e) {
					var n,
						i = Object.keys(t);
					return (
						Object.getOwnPropertySymbols &&
							((n = Object.getOwnPropertySymbols(t)),
							e &&
								(n = n.filter(function (e) {
									return Object.getOwnPropertyDescriptor(t, e).enumerable;
								})),
							i.push.apply(i, n)),
						i
					);
				}
				function T(i) {
					for (var e = 1; e < arguments.length; e++) {
						var o = null != arguments[e] ? arguments[e] : {};
						e % 2
							? t(Object(o), !0).forEach(function (e) {
									var t, n;
									(t = i),
										(n = o[(e = e)]),
										e in t
											? Object.defineProperty(t, e, {
													value: n,
													enumerable: !0,
													configurable: !0,
													writable: !0,
											  })
											: (t[e] = n);
							  })
							: Object.getOwnPropertyDescriptors
							? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o))
							: t(Object(o)).forEach(function (e) {
									Object.defineProperty(
										i,
										e,
										Object.getOwnPropertyDescriptor(o, e)
									);
							  });
					}
					return i;
				}
				function M() {
					return (M =
						Object.assign ||
						function (e) {
							for (var t = 1; t < arguments.length; t++) {
								var n,
									i = arguments[t];
								for (n in i)
									Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
							}
							return e;
						}).apply(this, arguments);
				}
				function j() {
					var e = 0,
						t = 0,
						n = document.querySelector('[name="ad.size"]');
					return (
						n
							? (n = n.getAttribute("content").match(/\d+/g)) &&
							  ((e = n[0] || 0), (t = n[1] || 0))
							: void 0 !== window.screenad &&
							  ((e = window.screenad.bannerwidth || 0),
							  (t = window.screenad.bannerheight || 0)),
						"".concat(e, "x").concat(t)
					);
				}
				var S,
					C =
						"localhost" === window.location.hostname ||
						"concept.html" === window.location.pathname.split("/")[2],
					A =
						C ||
						-1 < window.location.hostname.indexOf("lemonpi.io") ||
						/lemonpi-prod-templates\.s3\.amazonaws\.com/.test(
							window.location.host
						);
				function n(o, e, d) {
					function n(e, t) {
						return (
							(e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]")),
							(e = "[\\?&]".concat(e, "=([^&#]*)")),
							(e = new RegExp(e).exec(t)),
							t || window.location.href,
							null == e ? null : e[1]
						);
					}
					function t(i) {
						var o = window.open;
						window.open = function (e) {
							var t = e,
								n = e.match(m);
							return (
								n &&
									0 < n.length &&
									(function (e) {
										for (var t = e; t !== decodeURIComponent(t); )
											t = decodeURIComponent(t);
										return "(:variant:)" === t;
									})(n[0]) &&
									(t = e.replace(n[0], i)),
								o(t)
							);
						};
					}
					function r() {
						if (
							!(e =
								void 0 === window.lemonpi ||
								void 0 === window.lemonpi.layerMetadata ||
								0 === Object.keys(window.lemonpi.layerMetadata).length
									? ""
									: window.lemonpi.layerMetadata)
						)
							return {};
						var e = e[Object.keys(e)[0]].queryString,
							t = n("utm_source", e);
						return {
							cm: n("utm_medium", e),
							cs: t,
							cc: n("utm_content", e),
							cn: n("utm_campaign", e),
							ck: n("utm_term", e),
						};
					}
					var a = [
							"hover",
							"swipe",
							"click",
							"slide",
							"key_press",
							"time_spent_in_banner",
							"view_through_in_video",
							"other",
						],
						i = "advanced",
						c = "normal",
						s = o.name,
						u = e,
						l =
							A || (void 0 !== window.screenad && window.screenad.isPreviewer),
						w = c,
						f = !1,
						p = [],
						h = j(),
						m = /\([\S]+variant[\S]+\)/gi,
						v = "start",
						g = "",
						k = "",
						b = 0,
						y = { x: 0, y: 0 },
						O = C
							? "test"
							: void 0 !== window.screenad
							? window.screenad.isPreviewer
								? "acceptance"
								: "live"
							: A
							? "acceptance"
							: "live";
					function _(e, t) {
						return S && window.lemonpi.context
							? ((e = e.replace(/\$\{/, "").replace(/\}/, "").trim()),
							  S[e] || t)
							: t;
					}
					function P(e, t, n) {
						return {
							data: {
								uid: "0",
								gdpr_consent: !0,
								clientid: o.id,
								bannerid: u,
								bannersize: h,
								interactiontype: e,
								interactionlabel: t,
								interactionarea: n.interactionArea || "the creative",
								mousecoordinatesx: Math.round(y.x) || 0,
								mousecoordinatesy: Math.round(y.y) || 0,
								timepassed: n.timePassed || 0,
								phase: v,
								numberofeventstriggered: b,
								variant: g,
								lemonpiadsetid:
									((i = 0),
									window.lemonpi &&
										window.lemonpi.config &&
										window.lemonpi.config.subscribe &&
										window.lemonpi.config.subscribe(function (e) {
											i = e.adsetId || 0;
										}),
									i),
								appnexuscampaignid: String(_("${CP_ID}", "0")),
								appnexuscreativeid: String(_("${CREATIVE_ID}", "0")),
								templatetype: k,
								appnexusadvertiserid: String(_("${ADV_ID}", "0")),
								kosiversion: "4.1.5",
								environment: O,
								impressionid: "0",
								screenresolution: ""
									.concat(window.screen.width, "x")
									.concat(window.screen.height),
								devicepixelratio: window.devicePixelRatio || 1,
							},
						};
						var i;
					}
					function E(e) {
						var t,
							e = M({}, e.data),
							e =
								((t = e),
								Object.keys(t)
									.map(function (e) {
										return "".concat(e, "=").concat(encodeURIComponent(t[e]));
									})
									.join("&"));
						return "https://track.ghgjarvis.com/kosi" + "?".concat(e);
					}
					function I(e, t) {
						function n(e) {
							"viewability" === e.source
								? window.kosi.trackInteraction("other", "viewabilityplay", r)
								: e.target.autoplay && !c
								? ((c = !0),
								  window.kosi.trackInteraction("other", "autoplay", r))
								: window.kosi.trackInteraction("click", "play", r);
						}
						function i(e) {
							"string" == typeof e.source
								? window.kosi.trackInteraction(
										"other",
										"".concat(e.source, "_pause"),
										r
								  )
								: e.target.currentTime !== e.target.duration &&
								  window.kosi.trackInteraction("click", "pause", r);
						}
						function o(e, t) {
							clearTimeout(l),
								d.push(e),
								(l = setTimeout(function () {
									var e = d.reduce(function (e, t) {
										return T(T({}, e), t);
									}, {});
									(d = []), t(e);
								}, 1));
						}
						var r = "".concat(e.parentElement.id, "_").concat(t),
							a = { 25: !1, 50: !1, 75: !1, 100: !1 },
							c = !e.paused,
							s = !1,
							u = !1,
							d = [],
							l = null,
							w = 0;
						c &&
							(window.kosi.trackInteraction("other", "autoplay", r), (c = !0));
						$(e).bind("play", function (e) {
							o(e, n);
						}),
							$(e).bind("pause", function (e) {
								o(e, i);
							}),
							e.addEventListener("timeupdate", function (e) {
								var t = (e.target.currentTime / e.target.duration) * 100;
								s || u
									? s &&
									  0 === e.target.currentTime &&
									  !a[100] &&
									  (window.kosi.trackInteraction(
											"view_through_in_video",
											"quartile_100",
											r
									  ),
									  (a[100] = !0))
									: ((u = !0),
									  setTimeout(function () {
											s = !0;
									  }, 500)),
									Object.keys(a).forEach(function (e) {
										e <= t &&
											!a[e] &&
											(window.kosi.trackInteraction(
												"view_through_in_video",
												"quartile_".concat(e),
												r
											),
											(a[e] = !0));
									});
							}),
							e.addEventListener("volumechange", function (e) {
								e = e.target.volume;
								0 === e && w !== e
									? window.kosi.trackInteraction("click", "mute", r)
									: 0 < e &&
									  0 === w &&
									  window.kosi.trackInteraction("click", "unmute", r),
									(w = e);
							}),
							e.setAttribute("data-tracked", "");
					}
					if (
						(!(function () {
							try {
								return e("test");
							} catch (e) {}
							function e(e, t) {
								t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
								var n = document.createEvent("CustomEvent");
								return (
									n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
								);
							}
							(e.prototype = window.Event.prototype), (window.CustomEvent = e);
						})(),
						0 === arguments.length)
					)
						throw new Error("Kosi does not work without passing in a client.");
					return (
						$(d) &&
							$(d).on("mousemove", function (e) {
								y = { x: e.clientX, y: e.clientY };
							}),
						{
							log: function () {
								var e = [].slice.call(arguments),
									t = e[0],
									n = { event: "#e9575c", info: "#308ec4", warning: "#ff7e00" }[
										t
									];
								e.shift(),
									l && w === i
										? (e.unshift(
												"%cKosi ".concat(t, ":"),
												"background: ".concat(n, "; color: #fff")
										  ),
										  console.log.apply(console, e))
										: l &&
										  console.log(
												"%cKosi ".concat(t, ":"),
												"background: ".concat(n, "; color: #fff"),
												arguments[1]
										  );
							},
							warn: function (e) {
								this.log("warning", e);
							},
							depMessage: function (e, t) {
								this.log(
									"warning",
									'Kosi method "'
										.concat(e, '" is deprecated since Kosi version ')
										.concat(t, ".")
								);
							},
							setDebug: function (e) {
								l = e;
							},
							getClientConfig: function () {
								return { bannerId: u, clientId: s };
							},
							getDebug: function () {
								return l;
							},
							getDebugMode: function () {
								return w;
							},
							setDebugMode: function (e) {
								w = e;
							},
							setPhase: function (e) {
								v = e.toLowerCase();
							},
							setTemplateType: function (e) {
								k = e;
							},
							setVariant: function (e) {
								g &&
									this.warn(
										'Cannot set the variant to "'
											.concat(
												e,
												'". You can only set the variant once. The current variant is "'
											)
											.concat(g, '" and will remain unchanged.')
									),
									(g = e.toString()),
									t(e),
									x.trackMIAB && window.kosi.trackImpression();
							},
							getVariant: function () {
								return g;
							},
							firePixel: function (e, t) {
								$("body").append(
									'<img style="position:absolute;left:-20px;top:-20px" src="'.concat(
										e,
										'" />'
									)
								),
									t &&
										t.toString() &&
										this.warn(
											'The second parameter "allowOnNotPreferred" of method "firePixel", is deprecated and will be ignored.'
										);
							},
							setEnvironment: function (e) {
								var t = ["test", "acceptance", "live"];
								return t.includes(e)
									? (O = e)
									: this.warn(
											"The passed environment '"
												.concat(
													e,
													"' is not valid. Should be one of these values: "
												)
												.concat(t.join(", "))
									  );
							},
							setTrackingDisabled: function (e) {
								void 0 === e && (f = !0), (f = e);
							},
							getTrackingDisabled: function () {
								return f;
							},
							trackMouseHover: function (e, t, n, i) {
								var o = n,
									r = e,
									n = t,
									a = null,
									c = this,
									e = "start tracking mouse hover";
								(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
									navigator.userAgent
								) &&
									!i) ||
									(void 0 !== o
										? (e = "".concat(e, " on ").concat(n, " (").concat(o, ")"))
										: (o = "the creative"),
									this.log("info", e),
									(r = r || 1e3),
									-1 < p.indexOf("hover_".concat((n = void 0 === n ? d : n)))
										? this.warn(
												"You tried to add multiple trackers for mouse hover on ".concat(
													o,
													". Only the first works."
												)
										  )
										: (p.push("hover_".concat(n)),
										  $(n).hover(
												function () {
													a && clearTimeout(a),
														(a = setTimeout(function () {
															c.trackEvent("hover", o, { interactionArea: o });
														}, r));
												},
												function () {
													a && clearTimeout(a);
												}
										  )));
							},
							replaceMacros: function (e, t) {
								var n = e;
								return (
									Object.keys(t).forEach(function (e) {
										n = n.replace("(:".concat(e, ":)"), t[e]);
									}),
									n
								);
							},
							trackEvent: function (e, t, n, i) {
								var n = P(e, t, n, r()),
									o = E(n);
								(i && v !== i) ||
									((b += 1),
									this.log(
										"event",
										t ? "".concat(e, "::").concat(t) : e,
										n.data
									),
									("live" !== O && "acceptance" !== O) || this.firePixel(o));
							},
							trackTimeInBanner: function (e) {
								var t,
									n = this,
									i = 0,
									o = 0,
									r = e || [3, 5, 7, 9, 11, 12, 15, 20, 25, 30, 40, 50, 60],
									a = [];
								this.log("info", "start tracking time in banner"),
									$(d).on("mouseenter", function () {
										(o = new Date().getTime()),
											(t = setInterval(function () {
												var e,
													t = new Date().getTime(),
													t = ((i += t - o), (o = t), Math.round(i / 1e3));
												-1 < r.indexOf(t) &&
													-1 === a.indexOf(t) &&
													((e = a[a.length - 1]),
													a.push(t),
													n.trackEvent("time_spent_in_banner", "auto", {
														ev: e ? t - e : t,
														timePassed: t,
													}));
											}, 500));
									}),
									$(d).on("mouseleave", function () {
										clearInterval(t);
									});
							},
							trackVideos: function () {
								var e = document.querySelectorAll("video:not([data-tracked])");
								[].forEach.call(e, I), setInterval(this.trackVideos, 1e3);
							},
							trackManualTimeSpend: function (e, t) {
								this.trackEvent("time_spent_in_banner", "manual", {
									timePassed: e,
									interactionArea: t,
								});
							},
							trackImpression: function () {
								this.trackEvent("impression", "", "", null, "sp");
							},
							trackHeatmap: function (a, c) {
								function s() {
									clearTimeout(d);
								}
								function u(e) {
									return "function" == typeof e ? e() : e;
								}
								var d,
									l,
									w = this;
								(window.onmousemove = function (e) {
									for (var t, n, i, o, r = 0; r < a.length; r += 1)
										(t = a[r]),
											(n = e.clientX),
											(i = e.clientY),
											(o = t).x > n ||
											o.y > i ||
											!(o.x + o.width > n && o.y + o.height > i)
												? l === u(t.id) && ((l = void 0), s())
												: l !== u(t.id) &&
												  ((l = u(t.id)),
												  s(),
												  (d = setTimeout(function () {
														w.trackEvent("hover", l, { interactionArea: l });
												  }, c || 500)));
								}),
									$(document).mouseleave(s);
							},
							trackGridHeatmap: function (e, t, n) {
								var i,
									o,
									r = [],
									a = document.querySelector(d).clientWidth,
									c = document.querySelector(d).clientHeight,
									s = [
										"A",
										"B",
										"C",
										"D",
										"E",
										"F",
										"G",
										"H",
										"I",
										"J",
										"K",
										"L",
									],
									u = document.querySelectorAll(".kosi-grid-cell");
								for (
									[].forEach.call(u, function (e) {
										var t = e.getBoundingClientRect(),
											t = {
												x: t.left,
												y: t.top,
												width: t.width,
												height: t.height,
												id: e.id,
											};
										$(e).remove(), r.push(t);
									}),
										1 < arguments.length &&
											e < 2 &&
											t < 2 &&
											this.warn(
												"You called trackGridHeatmap with a 1x1 grid. Please use trackMouseHover instead."
											),
										i = 0;
									i < e;
									i += 1
								)
									for (o = 0; o < t; o += 1)
										r.push({
											x: i * Math.round(a / t),
											y: o * Math.round(c / e),
											width: Math.round(a / t),
											height: Math.round(c / e),
											id: "".concat(s[o], "_").concat(i),
										});
								0 < r.length && this.trackHeatmap(r, n);
							},
							trackClick: function (e, t) {
								var n = this,
									i = t || "the creative";
								0 < document.querySelectorAll(".kosiable").length &&
									this.warn(
										"the usage of .kosiable is no longer supported. Use trackGridHeatmap or trackGrid instead."
									),
									this.log("info", "start tracking click on ".concat(i)),
									-1 < p.indexOf("click_".concat(i)) &&
										this.warn(
											"You add multiple trackers for click. Only the first works."
										),
									p.push("click_".concat(i)),
									void 0 !== e
										? $(e).click(function () {
												n.trackEvent("click", i, { interactionArea: i });
										  })
										: window.addEventListener(
												"lemonpi.interaction/click",
												function (e) {
													n.trackEvent("click", "out", {
														interactionArea: e.detail.elementId || !1,
													});
												}
										  );
							},
							trackInteraction: function (e, t, n, i) {
								var o = n;
								if (
									(("string" != typeof n && void 0 !== n) ||
										(o = { interactionArea: n }),
									a.indexOf(e) < 0)
								)
									throw new Error(
										'You called kosi.trackInteraction with "'
											.concat(e, '", but only one of these values is allowed: ')
											.concat(a.join(", "))
									);
								this.trackEvent(e, (t = void 0 === t ? "" : t), o, i);
							},
							getBannerSize: j,
							setOnlyTrackOnPreferedPublishers: function () {
								this.depMessage("setOnlyTrackOnPreferedPublishers", "2.7.0");
							},
							getOnlyTrackOnPreferedPublishers: function () {
								this.depMessage("getOnlyTrackOnPreferedPublishers", "2.7.0");
							},
							isPreferedPublisher: function () {
								this.depMessage("isPreferedPublisher", "2.7.0");
							},
							setCustomTrackUrl: function () {
								this.depMessage("setCustomTrackUrl", "2.7.0");
							},
							setCollector: function () {
								this.depMessage("setCollector", "2.7.0");
							},
						}
					);
				}
				return (
					(window.kosiSettings = x),
					{
						creativeWillLoad: function (t) {
							window.lemonpi.context
								? window.lemonpi.context.subscribe(function (e) {
										(S = e.appnexus), t();
								  })
								: t();
						},
						creativeDidRender: function () {
							var e,
								t = !1;
							if (x && x.client && x.campaign)
								(e = (function (e) {
									e = e.split("::");
									return { name: e[0], id: parseInt(e[1], 10) };
								})(x.client)),
									(window.kosi = new n(e, x.campaign, "#creative_container")),
									window.addEventListener("message", function (e) {
										"EXECUTE_KOSI_METHOD" === e.data.type &&
											window.kosi &&
											"function" == typeof window.kosi[e.data.method] &&
											window.kosi[e.data.method].apply(
												window.kosi,
												e.data.args
											);
									});
							else {
								if (!x.client)
									throw new Error(
										"Kosi could not start because there is no selected client. Please select a client from the client dropdown in the configuration panel."
									);
								if (!x.campaign)
									throw new Error(
										"Kosi could not start because there is no campaign name provided. Please provide a campaign name in the campaing field using the configuration panel."
									);
							}
							window.kosi &&
								(x.trackHover && window.kosi.trackMouseHover(),
								x.trackClick && window.kosi.trackClick(),
								x.trackTimeSpent && window.kosi.trackTimeInBanner(),
								x.trackVideos && window.kosi.trackVideos(),
								x.trackFallback &&
									(window.onerror = function () {
										t ||
											(window.kosi.trackInteraction(
												"other",
												"fallback_triggered"
											),
											(t = !0));
									}),
								x.trackMIAB || window.kosi.trackImpression(),
								window.kosi &&
									window.kosi.getDebug() &&
									$.getScript(
										"https://s3-eu-west-1.amazonaws.com/kosi-assets/debugger/debugger_studio.js?v=2.0.0"
									));
						},
						pluginApi: n,
					}
				);
			})({
				trackVideos: false,
				campaign: "SEAT-1145",
				trackMIAB: false,
				trackTimeSpent: false,
				trackClick: false,
				trackHover: false,
				client: "SEAT::56",
				trackFallback: true,
			});
		},
	},

	/* @plugins-end */
];

// Setup all the handlers for different callbacks within the plugins
var creativeWillLoadHandlers = [];
var creativeDidLoadHandlers = [];
var creativeWillRenderHandlers = [];
var creativeDidRenderHandlers = [];
var creativeWillOpenClickUrlHandlers = [];
var creativeDidOpenClickUrlHandlers = [];
var layerWillRenderHandlers = {};
var layerDidRenderHandlers = {};

// initialize all registered plugins, Collect all their callbacks and hooks
// In this implementation, all plugins are kicked off before the dynamic data is loaded
var pluginApis = {};
export var plugins = {};
for (var i = 0; i < pluginSource.length; i++) {
	var plugin = pluginSource[i];
	var instance = plugin.init() || {};

	instance.creativeWillLoad &&
		creativeWillLoadHandlers.push(instance.creativeWillLoad);
	instance.creativeDidLoad &&
		creativeDidLoadHandlers.push(instance.creativeDidLoad);
	instance.creativeWillRender &&
		creativeWillRenderHandlers.push(instance.creativeWillRender);
	instance.creativeDidRender &&
		creativeDidRenderHandlers.push(instance.creativeDidRender);
	instance.creativeWillOpenClickUrl &&
		creativeWillOpenClickUrlHandlers.push(instance.creativeWillOpenClickUrl);
	instance.creativeDidOpenClickUrl &&
		creativeDidOpenClickUrlHandlers.push(instance.creativeDidOpenClickUrl);
	instance.layerWillRender &&
		addLayerHandlers(
			plugin.name,
			instance.layerWillRender,
			layerWillRenderHandlers
		);
	instance.layerDidRender &&
		addLayerHandlers(
			plugin.name,
			instance.layerDidRender,
			layerDidRenderHandlers
		);

	plugins[plugin.name] = instance.pluginApi || {};
}

// Start loading plugins (allowing plugins to load async data)
var pluginsLoading = 0;
var pluginsLoadingDone = function () {};
for (var i = 0; i < creativeWillLoadHandlers.length; i++) {
	var creativeWillLoadHandler = creativeWillLoadHandlers[i];
	if (creativeWillLoadHandler.length > 0) {
		pluginsLoading++;
		creativeWillLoadHandler(function () {
			pluginsLoading--;
			if (pluginsLoading === 0) {
				pluginsLoadingDone();
			}
		});
	} else {
		creativeWillLoadHandler();
	}
}

// Utility function that calls the callback as soon as all plugins are done loading
function awaitPlugins(callback) {
	if (pluginsLoading === 0) {
		callback();
		initCreative();
		return;
	}

	pluginsLoadingDone = function () {
		callback();
		initCreative();
	};
}

// Utility function to add keyed handlers (used for behaviours)
function addLayerHandlers(name, handlers, target) {
	for (var key in handlers) {
		if (handlers.hasOwnProperty(key)) {
			var newKey = name + "." + key;
			target[newKey] = handlers[key];
		}
	}
}

// Utility function that calls all passed layer handlers
function callLayerHandlers(handlers) {
	for (var key in handlers) {
		if (handlers.hasOwnProperty(key)) {
			var elements = document.querySelectorAll(
				"[data-studio-behaviour='" + key + "']"
			);

			for (var i = 0; i < elements.length; i++) {
				handlers[key](elements[i]);
			}
		}
	}
}

var content = {};

// Wait for all plugins to be done loading
awaitPlugins(function () {
	// Notify plugins that the Creative is done loading
	for (var i = 0; i < creativeDidLoadHandlers.length; i++) {
		creativeDidLoadHandlers[i]();
	}

	// Notify plugins that the Creative will start rendering
	for (var i = 0; i < creativeWillRenderHandlers.length; i++) {
		creativeWillRenderHandlers[i]();
	}

	// Notify plugins that layers will start rendering
	callLayerHandlers(layerWillRenderHandlers);

	var started = false;

	pluginApis = plugins; // Support older versions

	lemonpi.subscribe(function (cont) {
		if (started) {
			return;
		}
		started = true;

		content = cont;
		window.content = cont;

		// Render (show) the Creative
		document.querySelector("#creative_container").style.display = "";

		// Notify plugins that layers are done rendering
		callLayerHandlers(layerDidRenderHandlers);

		// Notify plugins that the Creative is done rendering
		for (var i = 0; i < creativeDidRenderHandlers.length; i++) {
			creativeDidRenderHandlers[i]();
		}

		// Eval the user script, pass in the plugin APIs.
		// Evalled on the next animation frame to ensure the
		// repaint caused by making the '#creative_container' visible
		// has finished.
		window.requestAnimationFrame(function () {
			var initInterval = setInterval(function () {
				if (typeof initCreative === "function") {
					clearInterval(initInterval);
					initCreative(content);
				}
			}, 10);
		});
	});
});
