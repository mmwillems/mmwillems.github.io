/**
 * Template Name
 * @Owner Your Name or Company
 * @Date 2023-04-12
 */

import { Creative } from "./Creative.js";
import { createCube } from "./creative-cube-plugin.js";
import { plugins } from "./plugins.js";

// Set values from LemonPI Manage-r
export function initCreative(content) {
  content = {
    cssOverride: {
      type: "text",
      value:
        '{\n\t"#cubeFace1_3 .copy, #cubeFace1_3 .copyShadow, #cubeFace1_5 .copy, #cubeFace1_5 .copyShadow": {\n\t\t"bottom": "-30px"\n\t},\n\t"#cubeFace0_1 .copy": {\n\t\t"left": "74%",\n\t\t"top": "51%"\n\t},\n\t"#cubeFace0_2 .copy": {\n\t\t"left": "54%",\n\t\t"top": "44%",\n\t\t"text-align": "left"\n\t},\n\t"#cubeFace0_3 .copy": {\n\t\t"left": "79%",\n\t\t"top": "49%"\n\t},\n\t"#cubeFace0_4 .copy": {\n\t\t"left": "112%",\n\t\t"top": "50%",\n\t\t"text-align": "left"\n\t}\n}',
    },
    cube2: {
      type: "collection",
      value: [
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/d8ed19667473f89dfcb4da3bbce91b56.jpg",
          },
          copyColor: {
            type: "text",
            value: "",
          },
          copy: {
            type: "text",
            value: "",
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/f892b62376004b021bccf615e3513b63.jpg",
          },
          copyColor: {
            type: "text",
            value: "",
          },
          copy: {
            type: "text",
            value: "",
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value:
              "https://assets.lemonpi.io/a/107/75ab231199e98b3f4b1c93d90ac76bbb.mp4",
          },
          bgImage: {
            type: "image",
            value: "",
          },
          copyColor: {
            type: "text",
            value: "",
          },
          copy: {
            type: "text",
            value: "",
          },
          videoStill: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/af7a3306473b86802fdfebaffa4664c9.png",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/53a2800f26adb0aca4872144b9c84649.jpg",
          },
          copyColor: {
            type: "text",
            value: "",
          },
          copy: {
            type: "text",
            value: "",
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/27bc28a9c5bfadb2d3d1040af9ea37f8.jpg",
          },
          copyColor: {
            type: "text",
            value: "",
          },
          copy: {
            type: "text",
            value: "",
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
      ],
    },
    logo: {
      type: "image",
      value:
        "https://assets.lemonpi.io/a/107/684ddc6a15676026ebaa455de78a4b27.svg",
    },
    cube1: {
      type: "collection",
      value: [
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/dca09b81ff3af288c71586cc3f968ffc.jpg",
          },
          copyColor: {
            type: "text",
            value: "",
          },
          copy: {
            type: "text",
            value: "",
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/786dfa015a93e0c472ac6bcdfa0e3b46.jpg",
          },
          copyColor: {
            type: "text",
            value: "#ffffff",
          },
          copy: {
            type: "text",
            value:
              '<span style="font-size: 15px; line-height: 24px; position: relative">TIJDELIJK EXTRA</span><br>\n<span style="font-size: 22px; top: -15px; left: 1px; position: relative">VOORDELIG</span><br>',
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value:
              "https://assets.lemonpi.io/a/107/6ded3d2db42f6ecf02dc18503f849913.mp4",
          },
          bgImage: {
            type: "image",
            value: "",
          },
          copyColor: {
            type: "text",
            value: "#ffffff",
          },
          copy: {
            type: "text",
            value:
              '<span style="font-size: 12px; line-height: 18px; left: 3px; position: relative">Private lease vanaf</span><br><span style="font-size: 46px; line-height: 68px; position: relative; top: -15px">€529</span>',
          },
          videoStill: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/892c029262f55ca529b275f67260ede7.png",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/b40ea085c686960655effabdff7ca12b.jpg",
          },
          copyColor: {
            type: "text",
            value: "#fff",
          },
          copy: {
            type: "text",
            value:
              '<span style="font-size: 15px; line-height: 24px">Bespaar tot</span><br>\n<span style="font-size: 27px; line-height: 40px; position: relative; top: -10px">€4.025</span><br>\n<span style="font-size: 12px; line-height: 18px; top: -36px; position: relative">extra voordeel</span>',
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
        {
          copyBgColor: {
            type: "text",
            value: "",
          },
          bgVideo: {
            type: "video",
            value: "",
          },
          bgImage: {
            type: "image",
            value:
              "https://assets.lemonpi.io/a/107/a76f853ae052cf7e57a63b1931439f8b.jpg",
          },
          copyColor: {
            type: "text",
            value: "#ffffff",
          },
          copy: {
            type: "text",
            value:
              '<span style="font-size: 16px; line-height: 18px; position: relative">Plan jouw</span><br><span style="font-size: 20px; line-height: 68px; position: relative; top: -28px">proefrit</span>',
          },
          videoStill: {
            type: "image",
            value: "",
          },
        },
      ],
    },
    fallbackImage: {
      type: "image",
      value: "",
    },
    fallbackUrl: {
      type: "click",
      value:
        "https://www.seat.nl/modellen/leon?utm_source=dv360_&utm_medium=display&utm_campaign=ao_sales_9605&utm_term=&utm_content=sell_300x250_&utm_id=google_dv360_",
    },
    extraFaceAnimation: {
      type: "text",
      value: "-3",
    },
    ctaCopy: {
      type: "text",
      value: "Ontdek 'm",
    },
    clickOut: {
      type: "click",
      value:
        "https://www.seat.nl/modellen/leon?utm_source=dv360_&utm_medium=display&utm_campaign=ao_sales_9605&utm_term=&utm_content=sell_300x250_&utm_id=google_dv360_",
    },
  };
  // kosi.setDebugMode("advanced");
  //#region SET DYNAMIC FALLBACK
  if (content.fallbackImage && content.fallbackImage.value)
    $(".fallback").css({
      "background-image": `url(${content.fallbackImage.value})`,
      "background-size": "cover",
    });

  $(".fallback").click(() =>
    window.dispatchEvent(
      new CustomEvent("lemonpi.interaction/click", {
        detail: {
          placeholder: "fallbackUrl",
        },
      })
    )
  );
  //#endregion END OF FALLBACK

  //#region VARS AND SETTINGS
  let loopstop = false;
  let finalCubes = [];
  let cubeImages = [];
  let cubesLenght = [];
  const extraFaceAnimation = parseContent(content.extraFaceAnimation);
  const ctaCopy = content.ctaCopy.value;
  let cubes;
  let indexUpdated = false;
  let userHovered = false;
  let userInteracting = false;

  const introAnimation = gsap.timeline();

  let cubeAttention0;
  let cubeattention1;

  const attentionAnimationTimeline = gsap.timeline({
    paused: true,
    repeat: 1,
  });

  const mainTimeline = gsap.timeline({ paused: true });

  gsap.delayedCall(15, function () {
    loopStop();
  });

  $("#cta").html(ctaCopy);
  $("#logo").attr("src", content.logo.value);

  //#endregion END OF VARS AND SETTINGS

  // FILTER CONTENT ON CUBES
  cubes = Object.keys(content)
    .filter((key) => key.includes("cube"))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: content[key] });
    }, {});

  //FILTER CUBES TO GET IMAGE URLS FOR PRELOADIMAGE FUNCTION
  $.each(cubes, function (cubeKey, cubeValue) {
    $.each(cubeValue.value, function (index, item) {
      // Controleer of het item een bgImage heeft en voeg het toe aan de cubeImages array
      if (item.bgImage && item.bgImage.value) {
        cubeImages.push(item.bgImage.value);
      }
    });
  });

  //#region FUNCTIONS
  const startBanner = () => {
    // CREATE CUBECONTAINER FOR EACH CUBE AND REMOVE TEMPLATE
    Object.keys(cubes).forEach((key, index) => {
      if (cubes[key].value.length > 0) {
        $("#cubeContainerTemplate")
          .clone()
          .appendTo(".mainCubeContainer")
          .attr("class", `cubeContainer`)
          .attr("id", `cubeContainer${index}`);

        $(`#cubeContainer${index}`).find("#cube").attr("id", `cube${index}`);
        $(`#cubeContainer${index}`)
          .find(".swipeIndicator")
          .addClass(`swipeIndicator${index}`);
      }
      if (index === Object.keys(cubes).length - 1) {
        $("#cubeContainerTemplate").remove();
      }
    });

    // CREATE CUBE FACES, ON COMPLETE CREATE CUBE
    Object.keys(cubes).forEach((key, index) => {
      cubesLenght.push(cubes[key].value.length + 2);
      if (cubes[key].value.length > 0) {
        createCubeFaces(
          cubes[`cube${index + 1}`].value,
          index,
          createCubeFunction
        );
      }
    });
    plugins.ghg.cssOverride();
    createAnimations();
    playBanner();
  };

  const clickOut = () => {
    window.dispatchEvent(
      new CustomEvent("lemonpi.interaction/click", {
        detail: {
          placeholder: "clickOut",
        },
      })
    );
  };
  const playBanner = () => {
    $("#creative_container").css("opacity", 1);
    $(".cubeContainer")
      .on("mouseenter touchstart", function (e) {
        cubeEnter(this);
      })
      .on("mouseleave touchend", function (e) {
        cubeLeave(this);
      });
    mainTimeline.play();
  };
  $("video").each(function (index, video) {
    video.currentTime = 0;
    video.play();
  });

  function preloadImages(array, callback) {
    let loadedIndex = 0;
    array.forEach((value) => {
      const url = value;
      if (!url) throw "Error: show fallback";
      var img = new Image();
      img.src = url;
      img.onload = () => {
        loadedIndex++;
        if (loadedIndex === array.length) callback();
      };
    });
  }

  const createVideo = (videoUrl, videoStillUrl, id, className, container) => {
    const video = $("<video>", {
      id: id || "video",
      class: className || "video",
      src: videoUrl,
    })
      .prop("muted", true)
      .prop("playsinline", true)
      .attr("muted", true)
      .attr("playsinline", true)
      .attr("loop", "loop")
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
        $(container).append(video);
      })
      .catch((error) => {
        preloadImage(videoStill, () => {
          $(container).append(videoStill);
        });
      });

    function preloadImage(element, callback) {
      if (!element) throw "Error: could not load image";
      element.get(0).onload = callback();
    }

    return { video, videoStill };
  };

  function createCubeFaces(cubeContent, cubeIndex, callback) {
    const originalFace = $(`#cube${cubeIndex}`).find("#cubeFaceTemplate");
    cubeContent.forEach((face, index, array) => {
      const newFace = originalFace
        .clone()
        .attr("id", `cubeFace${cubeIndex}_${index}`);
      $(`#cube${cubeIndex}`).append(newFace);

      // Delete the first cloned face
      if (index === array.length - 1) originalFace.remove();
      if (face["bgImage"].value)
        $(`#cubeFace${cubeIndex}_${index}`)
          .find(".image")
          .css({
            background: `url(${face["bgImage"].value})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          });

      if (face["bgVideo"].value) {
        // Usage example
        createVideo(
          face["bgVideo"].value,
          face["videoStill"].value,
          "video",
          "video",
          $(`#cubeFace${cubeIndex}_${index}`).find(".videoContainer")
        );
      }

      if (face["copy"].value) {
        $(`#cubeFace${cubeIndex}_${index}`)
          .find(".copy")
          .append(face["copy"].value);

        gsap.set($(`#cubeFace${cubeIndex}_${index}`).find(".copy"), { z: 0 });
      }

      if (face["copy"].value) {
        $(`#cubeFace${cubeIndex}_${index}`)
          .find(".copyShadow")
          .append(face["copy"].value);
      }

      if (face["copyColor"].value) {
        $(`#cubeFace${cubeIndex}_${index}`)
          .find(".copy")
          .css("color", face["copyColor"].value);
      }

      if (face["copyBgColor"].value) {
        $(`#cubeFace${cubeIndex}_${index}`)
          .find(".copyContainer")
          .css("background", face["copyBgColor"].value);
      }
    });

    callback(`#cubeContainer${cubeIndex}`, cubeIndex);
  }

  // CREATE THE CUBE
  function createCubeFunction(container, index) {
    finalCubes.push(
      createCube(container, {
        id: `cube${index}`,
        animationEase: "elastic.out(1, 0.75)",
        animationDuration: 15 / (cubesLenght[index] * 3),
        perspectiveFactor: [0.5],
        liveDrag: true,
        threshold: 0.01,
        direction: "x",
        onClick: (index) => {
          console.log("onClick, index:", index);
          Creative.click(["clickOut"]);
        },
      })
    );

    if (index + 1 !== Object.keys(cubes).length) {
      $(container).find(".logo").remove();
      $(container).find(".cta").remove();
    }
  }

  const onUserEnter = () => {
    userHovered = true;
    userInteracting = true;
    // attentionAnimationTimeline.kill();
    cubeAttention0.kill();
    cubeattention1.kill();
    introAnimation.kill();
    if (!indexUpdated) {
      gsap.to(".cube", {
        duration: 0.3,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
      });
    }

    $("video").each(function () {
      this.play();
    });

    gsap.to(".swipeIndicator", { autoAlpha: 0 });
  };
  const onUserLeave = () => {
    userInteracting = false;

    if (loopstop) {
      $("video").each(function () {
        this.pause();
      });
    }

    gsap.delayedCall(15, function () {
      $("video").each(function () {
        this.pause();
      });
    });
  };
  let copyAnimation;
  const cubeEnter = (e) => {
    copyAnimation = gsap.fromTo(
      $(e).find(".copy"),
      1,
      { z: 0.1 },
      {
        z: 5,
        repeat: -1,
        yoyo: true,
        ease: "Power1.easeInOut",
      }
    );
    gsap.to($(e).find(".copyShadow"), 0.5, {
      autoAlpha: 0.3,
    });
    $(e).css("z-index", 10);
  };

  const cubeLeave = (e) => {
    copyAnimation.pause();
    gsap.to($(e).find(".copyShadow"), 0.5, {
      autoAlpha: 0,
    });
    gsap.to($(e).find(".copy"), 0.5, {
      z: 0,
      yoyo: false,
      repeat: 0,
    });
    $(e).css("z-index", 1);
  };

  //#endregion END OF FUNCTIONS

  //#region ANIMATIONS

  const createAnimations = () => {
    // finalCubes.forEach((cube, index) => {
    // 	attentionAnimationTimeline
    // 		.add(
    // 			gsap.to(`.swipeIndicator${index}`, {
    // 				opacity: 1,
    // 				duration: 0.25,
    // 			})
    // 		)
    // 		.add(
    // 			gsap.to(`.swipeIndicator${index}`, {
    // 				x: -100,
    // 				duration: 0.5,
    // 				ease: "power2.inOut",
    // 			})
    // 		)
    // 		.add(
    // 			gsap.to(`.swipeIndicator${index}`, {
    // 				opacity: 0,
    // 				duration: 0.25,
    // 			}),
    // 			`+=0.5`
    // 		)
    // 		.add(() => {
    // 			if (userHovered) return;
    // 			cube.nextFace();
    // 			cube.currentRotation -= 360 / cube.amountOfFaces;
    // 		}, `-=1`);
    // });

    cubeAttention0 = gsap
      .timeline({
        paused: true,
        repeat: cubesLenght[0] + extraFaceAnimation,
        repeatDelay: 0.8,
      })
      .add(
        gsap.to(`.swipeIndicator0`, {
          opacity: 1,
          duration: 0.25,
        })
      )
      .add(
        gsap.to(`.swipeIndicator0`, {
          x: -100,
          duration: 0.3,
          ease: "power2.inOut",
        })
      )
      .add(
        gsap.to(`.swipeIndicator0`, {
          opacity: 0,
          duration: 0.25,
        }),
        `+=0.5`
      )
      .add(() => {
        if (userHovered) return;
        finalCubes[0].nextFace();
        finalCubes[0].currentRotation -= 360 / finalCubes[0].amountOfFaces;
      }, `<-=0.6`);

    cubeattention1 = gsap
      .timeline({
        paused: true,
        repeat: cubesLenght[1] + extraFaceAnimation,
        repeatDelay: 0.8,
      })
      .add(
        gsap.to(`.swipeIndicator1`, {
          opacity: 1,
          duration: 0.25,
        })
      )
      .add(
        gsap.to(`.swipeIndicator1`, {
          x: -100,
          duration: 0.3,
          ease: "power2.inOut",
        })
      )
      .add(
        gsap.to(`.swipeIndicator1`, {
          opacity: 0,
          duration: 0.25,
        }),
        `+=0.5`
      )
      .add(() => {
        if (userHovered) return;
        finalCubes[1].nextFace();
        finalCubes[1].currentRotation -= 360 / finalCubes[1].amountOfFaces;
      }, `<-=0.6`);

    introAnimation.staggerFrom(
      ".cube",
      2,
      {
        rotationY: function (index) {
          return index % 2 === 0 ? 120 : -120;
        },
        rotationX: 8,
        scale: 0.6,
        ease: "elastic.out(1,0.5)",
      },
      0
    );

    mainTimeline
      .add(introAnimation, 0)
      // .add(() => attentionAnimationTimeline.play(), 2);
      .add(cubeAttention0.play(), 2)
      .add(cubeattention1.play(), 3.2);
  };

  function loopStop() {
    loopstop = true;

    if (!userInteracting) {
      $("video").each(function (index, video) {
        video.currentTime = 0;
        video.pause();
      });
    }

    cubeAttention0.kill();
    cubeattention1.kill();

    if (!indexUpdated) {
      gsap.to(".cube", {
        duration: 0.3,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
      });
    }

    gsap.to(".swipeIndicator", { autoAlpha: 0 });
  }

  //#endregion END OF ANIMATIONS

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

  //#region EVENTLISTENERS
  $("#creative_container")
    .on("mouseenter touchstart", onUserEnter)
    .on("mouseleave touchend", onUserLeave);

  $("#cta, #logo").on("click", clickOut);

  document.addEventListener("cubeIndexUpdate", (e) => {
    indexUpdated = true;
  });

  //#endregion END OF EVENTLISTENERS

  //#region OTHER
  preloadImages(cubeImages, startBanner);
  //#endregion END OF OTHER
}
