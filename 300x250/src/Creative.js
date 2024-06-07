const Creative = {
  get width() {
    return document.documentElement.clientWidth;
  },
  get height() {
    return document.documentElement.clientHeight;
  },
  get environment() {
    if (["127.0.0.1", "localhost"].includes(window.location.hostname))
      return "localhost";
    if (window.location.hostname.indexOf("lemonpi.io") > -1) return "concept";
    if (
      window.location.hostname.indexOf(
        "lemonpi-prod-templates.s3.amazonaws.com"
      ) > -1
    )
      return "manage";
    return "live";
  },
  get isLive() {
    return this.environment === "live";
  },
  awaiters: [document.fonts.ready],
  addAwait: function (asyncFunction) {
    this.awaiters.push(asyncFunction);
    return asyncFunction;
  },
  awaitAll: function () {
    return Promise.all(this.awaiters);
  },
  click: function (url, query) {
    // Manual override in creative's code
    if (typeof this.onclick === "function") return this.onclick(url, query);

    if (!query) var query = {};
    if (Array.isArray(url) || (content && content[url])) {
      console.log("dispatch");
      window.dispatchEvent(
        new CustomEvent("lemonpi.interaction/click", {
          detail: {
            placeholder: url,
            query,
          },
        })
      );
    } else {
      content.tempClick = {
        type: "click",
        value: url,
      };
      window.dispatchEvent(
        new CustomEvent("lemonpi.interaction/click", {
          detail: {
            placeholder: "tempClick",
            query,
          },
        })
      );

      delete content.tempClick;
    }
  },
};

addEventListener("error", onFallback);
addEventListener("unhandledrejection", onFallback);

function onFallback() {
  document.getElementById("fallback").style.display = "block";
  document.getElementById("fallback").style.opacity = "1";
  if (Creative.fallback && typeof Creative.fallback === "function") {
    Creative.fallback(e);
  }
  return false;
}

export { Creative };
