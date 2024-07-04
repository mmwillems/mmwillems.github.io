//settings
var creativeWidth = $("#creative_container").width();
var creativeHeight = $("#creative_container").height();

var loopstop = false;

//timeline settings
var mainTimeline = new gsap.timeline({ paused: true });
var ctaAnimation = new gsap.timeline({ paused: true, repeat: -1 });

// Set values from LemonPI Manage-r
function initCreative(content2) {
  window.content = content2;
  setContent();
  interaction();

  createVideo(
    content.videoBackground.value,
    content.videoFallback.value,
    "videoBackground",
    "videoBackground",
    "#videoContainer",
    createAnimations
  );
}

////////////////
// ANIMATIONS //
////////////////

const createAnimations = () => {
  gsap.set("#bannerContent", { autoAlpha: 1 });

  ctaAnimation.add(ctaAttentionAnimation, 3);

  mainTimeline
    .from("#ctaContainer", { duration: 0.5, y: 10, autoAlpha: 0 }, 0)
    .add(() => {
      if (content.pancake.value) {
        gsap.fromTo(
          "#pancake",
          { duration: 0.35, scale: 0 },
          { scale: 1, ease: Back.easeOut.config(1.7) }
        );
      }
    }, 2)
    .add(() => {
      ctaAnimation.play();
    })
    .play();
};

/////////////////
// INTERACTION //
/////////////////

const interaction = () => {
  $("#creative_container").on({
    mouseenter: onUserEnter,
    mouseleave: onUserLeave,
  });
};

///////////////
// FUNCTIONS //
///////////////

// loopstop
gsap.delayedCall(15, function () {
  loopstop = true;
  ctaAnimation.pause();
});

const setContent = () => {
  // kosi.setVariant(content.variant.value);

  $("#ctaContainer").html(
    `${content.ctaCopy.value} <img id="ctaArrow" src='${content.ctaArrow.value}'>`
  );

  if (content.disclaimer.value) {
    $("#disclaimer").html(content.disclaimer.value);
  } else {
    $("#disclaimer").remove();
    $(".ctaContainer").css("bottom", "15px");
  }

  if (plugins.check.windows()) {
    $(".ctaContainer").css({ padding: "0.6em 0.9em 0.65em" });
  } else if (plugins.check.osx()) {
    if (plugins.check.safari()) {
      $(".ctaContainer").css({ padding: "0.5em 0.9em 0.6em" });
    }
  }

  $("#logo").css({
    backgroundImage: `url(${content.logo.value})`,
  });
  if (content.pancake.value) {
    $("#pancake").css({
      backgroundImage: `url(${getResizedImageUrl(
        parseContent(content.pancake),
        getElementDimensions("#pancake", true).width,
        getElementDimensions("#pancake", true).height,
        75
      )})`,
    });
    gsap.set("#pancake", { scale: 0 });
  } else {
    $("#pancake").remove();
  }

  if (content.fallback && content.fallback.value)
    $("#fallback").css({ backgroundImage: `url(${content.fallback.value})` });
};

const ctaAttentionAnimation = () => {
  new TimelineMax()
    .to(".ctaContainer", 0.1, { scale: 1.1 })
    .to(".ctaContainer", 1, { scale: 1, ease: Elastic.easeOut });
};

const onUserEnter = () => {
  $(".ctaContainer").addClass("hover");
  ctaAnimation.pause();
};

const onUserLeave = () => {
  $(".ctaContainer").removeClass("hover");
  if (!loopstop) {
    ctaAnimation.restart();
  }
};

const createVideo = (
  videoUrl,
  videoStillUrl,
  id,
  className,
  container,
  callback
) => {
  const video = $("<video>", {
    id: id || "video",
    class: className || "video",
    src: videoUrl,
  })
    .prop("muted", true)
    .prop("playsinline", true)
    .attr("muted", true)
    .attr("playsinline", true)
    .get(0);

  const videoStill = $("<img>", {
    alt: id ? id + "Still" : "videoStill",
    id: id ? id + "Still" : "videoStill",
    class: className ? className + "Still" : "videoStill",
    src: videoStillUrl,
  });

  video
    .play()
    .then(() => {
      // console.log("everything is great, video can start playing");
      $(container).append(video);
      callback(video);
    })
    .catch((error) => {
      // console.log(`something wen\'t wrong, here\'s the output: \n ${error}`);
      preloadImage(videoStill, () => {
        $(container).append(videoStill);
        callback(videoStill);
      });
    });

  function preloadImage(element, callback) {
    if (!element) throw "Error: could not load image";
    element.get(0).onload = callback();
  }

  return { video, videoStill };
};

/**
 * Function that automatically parses content,
 * and returns either the string, json object or false
 * based on the value of the content.
 */
function parseContent(contentToParse) {
  if (
    !contentToParse ||
    contentToParse.value === "" ||
    contentToParse.value === "EMPTY" ||
    contentToParse.value === "false"
  )
    return false;
  if (contentToParse.value === "true" || contentToParse.value === "TRUE")
    return true;
  try {
    return JSON.parse(contentToParse.value);
  } catch (e) {
    return contentToParse.value;
  }
}

/**
 * Get the dimensions of an element. Element can be a string or a DOM element.
 * Use scalePixelRatio to automatically return retina values on retina screens.
 */
const getElementDimensions = (element, scalePixelRatio) => {
  const factor = scalePixelRatio && window.devicePixelRatio > 1 ? 2 : 1;
  return {
    width: $(element).outerWidth() * factor,
    height: $(element).outerHeight() * factor,
  };
};

/**
 * Get a perfectly sized image as per your specifications.
 */
const getResizedImageUrl = (url, width, height, quality, scaleType) => {
  if (url.indexOf("__lemonpi_assets__") > -1) return url;
  const baseUrl =
    "https://image.lemonpi.io/img/http://res.cloudinary.com/ghg/image/fetch/";
  let resizeParameters = scaleType ? scaleType : "c_scale";

  if (width) resizeParameters += `,w_${Math.round(parseFloat(width))}`;

  if (height) resizeParameters += `,h_${Math.round(parseFloat(height))}`;

  if (quality) resizeParameters += `/q_${quality}`;

  // Remove LP caching from the URL if it's there
  const newUrl = url.replace(/^(https?:)?\/\/image\.lemonpi\.io\/img\//i, "");

  return `${baseUrl}${resizeParameters}/${newUrl}`;
};
