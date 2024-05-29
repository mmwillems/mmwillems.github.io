/**
 * IPXL BLACK FRIDAY DEALS
 * @Owner Bas Pagie
 * @Date 2022-10-19
 */

//////////////
// SETTINGS //
//////////////

var contentManage;
var cubeAnimation;
var loopstop = false;
var interacted = false;
var clickOut;
var cubeSettings = [];
var imagesToLoad = [];

/////////////////////
// INTRO ANIMATION //
/////////////////////

var introAnimation = new TimelineMax()
  .from(".logo", 0.5, { autoAlpha: 0, rotation: 0.02, ease: Sine.easeOut }, 0.1)
  .from(".run0", 0.5, { autoAlpha: 0, x: -50, rotation: 0.02, ease: Sine.easeOut }, 0.3)
  .from(".run1", 0.5, { autoAlpha: 0, x: -50, rotation: 0.02, ease: Sine.easeOut }, 0.5)
  .from(".run2", 0.5, { autoAlpha: 0, x: -50, rotation: 0.02, ease: Sine.easeOut }, 0.7)
  .from(".run3", 0.5, { autoAlpha: 0, x: -50, rotation: 0.02, ease: Sine.easeOut }, 0.9)
  .fromTo(".sliding_bg", 18, { x: 0 }, { x: -650, rotation: 0.02, ease: Sine.easeOut }, 0.1)
  .fromTo(".footer", 15, { x: 0 }, { x: -600, rotation: 0.02, ease: Linear.easeNone }, 0.1)

  .fromTo(".patternbg", 1, { height: 111 }, { height: 30, y: 43, rotation: 0.02, ease: Sine.easeOut }, 2)
  .to(".run, .run1, .run2, .run3", 0.5, { autoAlpha: 0, rotation: 0.02, ease: Sine.easeOut }, 2)
  .from(".mouth2", 0.5, { autoAlpha: 0, ease: Sine.easeOut }, 2)
  .from(".header1", 0.5, { autoAlpha: 0, y: 130, ease: Sine.easeOut }, 2.2)
  .from(".header2", 0.5, { autoAlpha: 0, y: -70, ease: Sine.easeOut }, 2.25)

  .from(".cubeMainContainer", 0.3, { autoAlpha: 0, y: 30, ease: Sine.easeOut }, 4.7)
  .from(".mainTitleContainer", 0.3, { y: -30, autoAlpha: 0, ease: Sine.easeOut }, 4.5)
  .from(
    ".subTitle",
    0.6,
    {
      autoAlpha: 0,
      rotation: 15,
      ease: Sine.easeOut,
      onComplete: function () {
        interacted == false ? cubeAnimation.play() : cubeAnimation.stop();
        attentionCtaAnimation.play();
      },
    },
    5.25
  )
  .from(".next, .prev", 0.3, { y: -15, autoAlpha: 0, ease: Sine.easeOut }, 5)
  .to(".header1, .header2, .sliding_bg, .mouth2, .mouth1", 0.3, { autoAlpha: 0, ease: Sine.easeOut }, 4.5)

  .fromTo(".cta", 1, { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Expo.easeInOut }, 4.5)
  .to(".cube, .gesture", 0.5, { display: "block", rotation: 0.02, ease: Sine.easeOut }, 4.75);

////////////////
// TINMELINES //
////////////////

var attentionCtaAnimation = new TimelineMax({ repeat: -1, repeatDelay: 1 })
  .to(".ctaArrow", 0.1, { x: -5 })
  .to(".ctaArrow", 1, { x: 0, ease: Elastic.easeOut })
  .to(".nextArrow", 0.1, { x: -5 }, 1)
  .to(".nextArrow", 1, { x: 0, ease: Elastic.easeOut }, 1)
  .to(".previousArrow", 0.1, { x: -5 }, 1)
  .to(".previousArrow", 1, { x: 0, ease: Elastic.easeOut }, 1);

var mainTimeline = new TimelineMax({ paused: true }).add(introAnimation);

var shine_scroller = new TimelineMax().from(".footer", 15, { x: 0, ease: Linear.easeNone }, 0.1);

var handAnimation = new TimelineMax()
  .fromTo(".pointerCube", 0.3, { scale: 1.3 }, { autoAlpha: 1, scale: 1, ease: Sine.easeOut }, 0)
  .to(".pointerCube", 0.4, { x: -180, ease: Sine.easeOut }, 0.3)
  .to(".pointerCube", 0.3, { autoAlpha: 0, ease: Sine.easeOut }, 0.8);
cubeAnimation = new TimelineMax({ paused: true, repeat: 3, repeatDelay: 2 })
  .add(handAnimation, 2)
  .add(function () {
    cubes[0].next();
  }, 2)
  .add(function () {
    cubes[1].next();
  }, 2);

function initCreative(content) {
  $(document).ready(function () {
    ///////////////////////////////
    // SETTING CONTENT VARIABLES //
    ///////////////////////////////

    // Changing name of content from Manage + Fallback
    contentManage = {
      main_title2: {
        type: "text",
        value: "deals",
      },
      main_title1: {
        type: "text",
        value: "<span>BLACK</span> FRIDAY",
      },
      logo: {
        type: "image",
        value: "https://assets.lemonpi.io/a/773/bb323c5d9bd12ff1ac06bd10e719742a.svg",
      },
      cta_url: {
        type: "click",
        value: "https://www.iciparisxl.be/",
      },
      cube1: {
        type: "collection",
        value: [
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/cfadc70dde5603ddc17cf701a1c2a1f6.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/221d8b81f733b15061fce711743b30e2.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/23f3c5751a19e1eff587fbd932912e67.svg",
            },
          },
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/c4ec3c948a115c828a93c903921f05de.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/6f2a99f721042920f6d9861e7d1613b2.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/c0010842ac2a4c89373f9b0f55e509ce.svg",
            },
          },
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/8f04632c8e050be8bc21690212091176.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/4ab8a1931e6bae4654ad4d2b203a7a15.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/df4e39d392715c69192e916ef6702df0.svg",
            },
          },
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/514cdc357f604b4edde46219d56708c1.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/18db4d4d0b8321eb73b3c0033127a5c8.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/e46ac12a06110a4db7a856a07ef29009.svg",
            },
          },
        ],
      },
      fallback: {
        type: "image",
        value: "https://assets.lemonpi.io/a/773/5dd4d2ac39fa654e99aa6a3955227686.png",
      },
      intro_title1: {
        type: "text",
        value: "<span>BLACK</span> FRIDAY",
      },
      intro_title2: {
        type: "text",
        value: "deals",
      },
      product_swipe: {
        type: "image",
        value: "https://assets.lemonpi.io/a/773/241361bf9510f3fb5edfabdd0ff71e60.png",
      },
      cta_copy: {
        type: "text",
        value: "SHOP DEALS",
      },
      cube0: {
        type: "collection",
        value: [
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/3d1622bb16e046a000c00891eb9b57a1.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/fc68de54b6627c18c9e444ee0a36fe34.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/f924f03476ebab87d2a07da638c91bde.svg",
            },
          },
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/5e69aed4dad4bf65ce54ed66a7f52107.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/89748fd4cd258587c57299944668c151.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/514936cdebd8980d354dd17502bc0ce6.svg",
            },
          },
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/70e06d26b059540e4c11d8eb94433e57.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/aa0bca69e30d9ed22cd2b593cc02b3f0.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/62e7f1fca7004c66baa2ac2d2dd8222a.svg",
            },
          },
          {
            pattern: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/c15f1b6ab91bd00ee66124eb8ceb4f3a.png",
            },
            product: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/c4c64659b70e781a07924c42ed0b4071.png",
            },
            pancake: {
              type: "image",
              value: "https://assets.lemonpi.io/a/773/c03c61a086f4c0ae1a7310266d0050f4.svg",
            },
          },
        ],
      },
      current_day: {
        type: "text",
        value: "",
      },
      sliding_bg: {
        type: "image",
        value: "https://lemonpi-prod-templates.s3.amazonaws.com/a773/15058/5/ff8f15cd5d424dc7a7e071d39f7775bc/265.png",
      },
      day_array: {
        type: "text",
        value: '["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"]',
      },
      footer_strip: {
        type: "image",
        value: "https://assets.lemonpi.io/a/672/9dda048f8979cea0a9b95a024731f82c.png",
      },
      mouth1: {
        type: "image",
        value: "https://assets.lemonpi.io/a/773/765f27b51bb7bb13f21ce4ef3cbe6ba6.png",
      },
      mouth0: {
        type: "image",
        value: "https://assets.lemonpi.io/a/773/a36d00a0738ea566a1736bd443d824bf.png",
      },
    };

    fallback = contentManage.fallback.value;
    $(".fallback").css("background", "url(" + fallback + ")");

    // Adding content
    // COPY
    ctaCopy = contentManage.cta_copy.value;
    introTitle1 = contentManage.intro_title1.value;
    introTitle2 = contentManage.intro_title2.value;
    mainTitle1 = contentManage.main_title1.value;
    mainTitle2 = contentManage.main_title2.value;

    $(".ctaCopy").html(ctaCopy);
    $(".header1").html(introTitle1);
    $(".header2").html(introTitle2);
    $("mainTitle").html(mainTitle1);

    // IMAGES
    logo = contentManage.logo.value;
    productSwipe = contentManage.product_swipe.value;
    slidingBg = contentManage.sliding_bg.value;
    mouth0 = contentManage.mouth0.value;
    mouth1 = contentManage.mouth1.value;
    footerStrip = contentManage.footer_strip.value;

    imagesToLoad = [logo, productSwipe, slidingBg, mouth0, mouth1, footerStrip];

    $(".mainLogo").css("background-image", "url(" + logo + ")");
    $(".pointerCube").css("background-image", "url(" + productSwipe + ")");
    $(".sliding_bg").css("background-image", "url(" + slidingBg + ")");
    $(".mouth1").css("background-image", "url(" + mouth0 + ")");
    $(".mouth2").css("background-image", "url(" + mouth1 + ")");
    $(".footer").css("background-image", "url(" + footerStrip + ")");

    // Setting up weekday copy
    var weekday = JSON.parse(contentManage.day_array.value);
    var d = new Date();
    var currentDay = d.getDay();

    if (contentManage.current_day.value !== "") {
      weekdayNum = contentManage.current_day.value;
    } else {
      weekdayNum = currentDay;
    }

    dayCopy = weekday[weekdayNum];
    var dealCopy = dayCopy + " " + mainTitle2;
    $(".subTitle").html(dealCopy);

    // Cube settings
    cubeFirst = contentManage.cube0.value;
    cubeSecond = contentManage.cube1.value;

    cubeSettings = [[cubeFirst], [cubeSecond]];

    clickOut = content.cta_url.value;

    // Start animations if everything is loaded
    preloadImages(imagesToLoad, playBanner);
  });
}

/////////////////////
// INITIATE BANNER //
/////////////////////

function playBanner() {
  setTimeout(function () {
    initiateCube(contentManage);
    $("#click").css("opacity", "1");
    mainTimeline.play();
  }, 300);
}

///////////////
// FUNCTIONS //
///////////////

function onUserLeave() {
  $(".cta").removeClass("ctaHover");
  cubes[0].draggable.endDrag();
  cubes[1].draggable.endDrag();
}

function onUserEnter() {
  interacted = true;
  TweenMax.to(".pointerCube", 0.2, { autoAlpha: 0, ease: Sine.easeOut });
  cubeAnimation.stop();
  $(".cta").addClass("ctaHover");
  new TimelineMax().to(".ctaArrow", 0.1, { x: -5 }).to(".ctaArrow", 1, { x: 0, ease: Elastic.easeOut });
}

/////////////
// CALLOUT //
/////////////

$("#click").on("mouseenter touchstart", onUserEnter).on("mouseleave touchend", onUserLeave).click(clickOut);

$("#next").click(function () {
  cubes[0].next();
  cubes[1].next();
});

$("#prev").click(function () {
  cubes[0].prev();
  cubes[1].prev();
});

///////////////////
// CUBE SETTINGS //
///////////////////

function preloadImages(imageArray, callbackFunction) {
  var preloadCount = 0;

  function doCallback() {
    if (preloadCount === imageArray.length) callbackFunction();
  }
  imageArray.forEach(function (value, index) {
    if (value) {
      var img = new Image();
      img.src = value;
      img.onload = function () {
        preloadCount++;
        doCallback();
      };
    } else {
      preloadCount++;
      doCallback();
    }
  });
}

function initiateCube(content) {
  //variables for the cubes
  saveSlide = $("#slide");
  cubeContainer = $("#cube");
  $("#cube, #slide").remove();

  //array for all the cubes so they can be targeted later
  cubes = [];
  // console.log(content);
  //for each cube in the cubeSettings array create a cube with on a randowm side of tyhe cube the discount message
  $(cubeSettings).each(function (index, setting) {
    newCubeContainer = cubeContainer.clone().attr("id", "cube" + index);
    $("#cubeMainContainer").append(newCubeContainer);
    createSlides(setting[0], index);
    cubes[index] = cube("cube" + index, {
      draggableContainer: $("cube" + index),
    });
    cubes[index].settings.autoSwipe = false;
  });
}

//create the slides and the cube with the randoom slide for the discount message
function createSlides(setting, indexCube) {
  $(setting).each(function (index, settings) {
    newSlide = saveSlide.clone().addClass("slide" + index);
    $("#cube" + indexCube).prepend(newSlide);

    cubeProductsImage = settings.product.value;
    cubePancakeImage = settings.pancake.value;
    cubePatternsImage = settings.pattern.value;

    newSlide
      .find(".facePatern")
      .attr("id", "facePatern" + index)
      .css("background-image", "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(32,34,36,0) 31%, rgba(0,0,0,0) 100%), url(" + cubePatternsImage + ")");

    newSlide
      .find(".faceProduct")
      .attr("id", "faceProduct" + index)
      .css("background-image", "url(" + cubeProductsImage + ")");

    newSlide
      .find(".facePancake")
      .attr("id", "facePancake" + index)
      .css("background-image", "url(" + cubePancakeImage + ")");
  });
}

//get random number between 2 values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

setTimeout(function () {
  loopstop = true;
  cubeAnimation.progress(1).stop();
  attentionCtaAnimation.stop();
  // cubeSlider.autoSwiper.stop();
  // isAutoplay = false;
  // shine_scroller.pause();
}, 15000);

function clickOut(event) {
  if (
    event.target.id == "cubeMainContainer" ||
    event.target.id == "next" ||
    event.target.id == "prev" ||
    event.target.id == "nextArrow" ||
    event.target.id == "previousArrow"
  ) {
    return;
  }

  // console.log(event.target.parentElement);
  window.dispatchEvent(
    new CustomEvent("lemonpi.interaction/click", {
      detail: {
        placeholder: "cta_url",
      },
    })
  );
}

function stylingOverride() {
  var styling = content.cssOverride && content.cssOverride.value && parseJSON(content.cssOverride.value);
  if (!styling) return;
  for (var prop in styling) {
    if (Object.prototype.hasOwnProperty.call(styling, prop)) {
      $(prop).css(styling[prop]);
    }
  }
}

function parseJSON(parseThis) {
  try {
    return JSON.parse(parseThis);
  } catch (error) {
    return false;
  }
}
