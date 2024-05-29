if (typeof jQuery !== 'undefined') {
  window.Creative = {
    width: $('#creative_container').width(),
    height: $('#creative_container').height(),
    click: function (url, query) {
      // Manual override in creative's code
      if (typeof this.onclick === 'function') return this.onclick(url, query);
  
      if (!query) var query = {};
      if (Array.isArray(url) || (content && content[url])) {
        window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
              placeholder: url,
              query,
            }
          })
        );
      }
      else {
        content.tempClick = {
          type: 'click',
          value: url
        };
        window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
              placeholder: 'tempClick',
              query,
            }
          })
        );
  
        delete content.tempClick;
      }
    },
  };
  
  window.onerror = function(e) {
    $('#fallback').show().css('display', 'block');
    if (Creative.fallback && typeof Creative.fallback === 'function') {
      Creative.fallback(e);
    }
    return false;
  };
}
