const $1861964cd725ecc5$export$b74ff737e0e298b5 = ["gsap", "Hammer"];

let $53f0fee299d2753b$var$allSettings;
let $53f0fee299d2753b$var$safariFix;
/**
 * @typedef {Object} UserSettingsObject
 * @property {string} creativeContainerId - The ID of the container element.
 * @property {HTMLElement} container - The container element.
 * @property {string} cubeClass - The class name for the cube.
 * @property {number} height - The height of the cube.
 * @property {number} width - The width of the cube.
 * @property {number} currentIndex - The current index of the cube.
 * @property {number} previousIndex - The previous index of the cube (optional).
 * @property {number} currentRotation - The current rotation of the cube.
 * @property {'x' | 'y'} direction - The rotation direction of the cube.
 * @property {number[]} perspectiveFactor - The perspective factors for the cube.
 * @property {number} threshold - The threshold value.
 * @property {number} animationDuration - The duration of the transition animation.
 * @property {string} animationEase - The animation ease type.
 * @property {GSAPTimeline} autoSlider - The auto slider timeline.
 * @property {GSAPTimeline} currentAnimation - The current animation timeline.
 * @property {false | number} liveDrag - The live drag value.
 * @property {boolean} forcedEnd - Indicates if the animation is forced to end.
 * @property {boolean} isAnimating - Indicates if the cube is currently animating.
 * @property {boolean} interactionEnabled - Indicates if interaction is enabled.
 * @property {number} clickThreshold - The click threshold value.
 * @property {CallbackFunction} onClick - The callback function for click events.
 * @property {HTMLElement=} touchElement - The touch element (optional).
 */ /**
 * Create a cube.
 *
 * @param {string} container - The container element ID or selector.
 * @param {UserSettingsObject} userSettings - The user settings object.
 * @param {CubeCreatedCallbackFunction} callbackFunction - An optional callback function.
 * @returns {AllSettings | false} The cube settings or false if there was an error.
 */ const $53f0fee299d2753b$export$ce223d612b94804b = (
  container,
  userSettings,
  callbackFunction
) => {
  const dependencyCheck = $53f0fee299d2753b$var$checkDependencies(
    (0, $1861964cd725ecc5$export$b74ff737e0e298b5)
  );
  if (!dependencyCheck) return false;
  let cubeSettings = $53f0fee299d2753b$var$createSettings(
    userSettings,
    container
  );

  const newCubeSettings = {
    ...cubeSettings,
    disableInteraction: () => $53f0fee299d2753b$var$setInteraction(false),
    enableInteraction: () => $53f0fee299d2753b$var$setInteraction(true),
    nextFace: () =>
      $53f0fee299d2753b$var$changeFace(-1, "trigger", cubeSettings),
    previousFace: () =>
      $53f0fee299d2753b$var$changeFace(1, "trigger", cubeSettings),
  };
  // Fix for safari, render issues
  $53f0fee299d2753b$var$safariFix =
    /Safari\//i.test(navigator.userAgent) &&
    !/Chrome\//i.test(navigator.userAgent) &&
    !/Edge\//i.test(navigator.userAgent)
      ? 0.01
      : 0.01;
  if (newCubeSettings) {
    $53f0fee299d2753b$var$createCubeFaces(newCubeSettings);
    $53f0fee299d2753b$var$createTouchEvents(newCubeSettings);
    $53f0fee299d2753b$var$cubeCreated(newCubeSettings, callbackFunction);
    return newCubeSettings;
  } else throw `[CUBE PLUGIN] There's an error in your settings`;
};
const $53f0fee299d2753b$var$createSettings = (userSettings, container) => {
  const cubeContainer = document.querySelector(container);
  if (!cubeContainer) return false;
  const defaultSettings = {
    creativeContainerId: "#creative_container",
    container: cubeContainer,
    cubeClass: ".cube",
    height: cubeContainer.clientHeight,
    width: cubeContainer.clientWidth,
    currentIndex: 0,
    previousIndex: undefined,
    currentRotation: 0,
    direction: "x",
    perspectiveFactor: [
      "none",
      "none",
      3,
      3,
      1,
      0.6,
      0.45,
      0.35,
      0.3,
      0.25,
      0.2,
    ],
    threshold: 0.15,
    animationDuration: 0.75,
    animationEase: "elastic.out(1.1,1)",
    autoSlider: gsap.timeline(),
    currentAnimation: gsap.timeline(),
    liveDrag: 1,
    forcedEnd: false,
    isAnimating: false,
    interactionEnabled: true,
    clickThreshold: 5,
    onClick: (...args) => args,
    touchElement: undefined,
  };
  const combinedSettings = {
    ...defaultSettings,
    ...userSettings,
  };
  const cubeElement = combinedSettings.container.querySelector(
    combinedSettings.cubeClass
  );
  if (!cubeElement) return false;
  // Calculate settings here
  const calculatedSettings = {
    cube: cubeElement,
    faces: cubeElement.children,
    amountOfFaces: cubeElement.children.length,
    faceAngle: 360 / cubeElement.children.length,
    liveDrag:
      combinedSettings.liveDrag === false ? 0 : combinedSettings.liveDrag,
  };
  $53f0fee299d2753b$var$allSettings = {
    ...combinedSettings,
    ...calculatedSettings,
  };
  // Fix safari cursor bug
  document.onselectstart = function () {
    return false;
  };
  return $53f0fee299d2753b$var$allSettings;
};
const $53f0fee299d2753b$var$calculateAdjacent = ({
  faceAngle: faceAngle,
  width: width,
  height: height,
  direction: direction,
}) => {
  if (faceAngle === 360) return 0;
  const length = direction === "x" ? width : height;
  return length / 2 / Math.tan((faceAngle / 2) * (Math.PI / 180));
};
const $53f0fee299d2753b$var$createCubeFaces = (cubeSettings) => {
  // Calculate translation
  const translate = $53f0fee299d2753b$var$calculateAdjacent(cubeSettings);
  // Set cube styling
  cubeSettings.cube.style.transformStyle = "preserve-3d";
  cubeSettings.cube.style.transform = `translate3d(0px, 0px, ${
    translate * -1
  }px)`;
  cubeSettings.cube.style.touchAction = "none";
  cubeSettings.cube.style.height = `${cubeSettings.height}px`;
  cubeSettings.cube.style.width = `${cubeSettings.width}px`;
  cubeSettings.container.style.perspective =
    $53f0fee299d2753b$var$getPerspective(cubeSettings) || "none";
  // Set face styling
  [...cubeSettings.faces].forEach((element, index, array) => {
    const rotationAngle = cubeSettings.faceAngle * index;
    // Fix for safari, render issues
    // TODO: REMOVE SAFARI FIX FROM TRANSFORM IF NOT NEEDED HERE, ALREADY IN CUBE ANIMATION
    // const safariFix = /Safari\//i.test(navigator.userAgent) && !/Chrome\//i.test(navigator.userAgent) && !/Edge\//i.test(navigator.userAgent) ? 0 : 0;
    // if (cubeSettings.direction === 'x') {
    //   element.style.transform = `rotateY(${rotationAngle + safariFix}deg) translate3d(0, 0, ${translate}px)`;
    // } else {
    //   element.style.transform = `rotateX(${rotationAngle + safariFix}deg) translate3d(0, 0, ${translate}px)`;
    // }
    //TODO: REMOVE TILL HERE
    if (cubeSettings.direction === "x")
      element.style.transform = `rotateY(${rotationAngle}deg) translate3d(0, 0, ${translate}px)`;
    else
      element.style.transform = `rotateX(${rotationAngle}deg) translate3d(0, 0, ${translate}px)`;
    // Disable interaction with childNodes
    if (element.nodeType !== 1) return;
    element.style.touchAction = "none";
    element.style.pointerEvents = "none";
    element.style.willChange = "transform";
    // Disable backface-visibility on the second face if only two faces
    if (array.length === 2 && index === 1)
      element.style.backfaceVisibility = "hidden";
  });
};
const $53f0fee299d2753b$var$getPerspective = (cubeSettings) => {
  const {
    direction: direction,
    width: width,
    height: height,
    perspectiveFactor: perspectiveFactor,
    amountOfFaces: amountOfFaces,
  } = cubeSettings;
  const multiplier = direction === "x" ? width : height;
  const lastPerspectiveFactor = perspectiveFactor[perspectiveFactor.length - 1];
  if (
    perspectiveFactor[amountOfFaces] === undefined &&
    lastPerspectiveFactor !== undefined
  ) {
    if (lastPerspectiveFactor === "none") return false;
    else return `${lastPerspectiveFactor * multiplier}px`;
  } else {
    const perspectiveValue = perspectiveFactor[amountOfFaces] * multiplier;
    return `${perspectiveValue}px`;
  }
};
const $53f0fee299d2753b$var$cubeOnClick = (cubeSettings) => {
  $53f0fee299d2753b$var$fireEvent("cubeOnClick", cubeSettings);
  if (!cubeSettings.onClick) return;
  cubeSettings.onClick(cubeSettings.currentIndex);
};
const $53f0fee299d2753b$var$createTouchEvents = (cubeSettings) => {
  // Create touch events
  const hammer = new Hammer(
    cubeSettings.touchElement || cubeSettings.container
  );
  const hammerTap = new Hammer(
    cubeSettings.touchElement || cubeSettings.container
  );
  hammer.get("pan").set({
    direction: Hammer.DIRECTION_ALL,
  });
  hammerTap.on("tap", () => {
    $53f0fee299d2753b$var$cubeOnClick(cubeSettings);
  });
  hammer.on("panmove panstart panend", (event) => {
    if (
      (event.type === "panmove" && cubeSettings.isAnimating) ||
      (event.type === "panmove" && !cubeSettings.interactionEnabled) ||
      (event.type === "panend" && !cubeSettings.interactionEnabled) ||
      (event.type === "panend" && cubeSettings.isAnimating)
    )
      return;
    const localXY =
      cubeSettings.direction === "x"
        ? Math.max(Math.min(event.deltaX / cubeSettings.width, 1), -1)
        : Math.max(Math.min(event.deltaY / cubeSettings.height, 1), -1);
    switch (event.type) {
      case "panmove":
        if (
          cubeSettings.container &&
          !cubeSettings.container.matches(":hover")
        ) {
          hammer.stop(true);
          cubeSettings.forcedEnd = true;
          $53f0fee299d2753b$var$cubeAnimation(
            "edgeRelease",
            cubeSettings,
            localXY
          );
        } else
          $53f0fee299d2753b$var$cubeAnimation("move", cubeSettings, localXY);
        break;
      case "panend":
        $53f0fee299d2753b$var$cubeAnimation("release", cubeSettings, localXY);
        break;
      case "tap":
        $53f0fee299d2753b$var$cubeOnClick(cubeSettings);
        break;
      default:
        break;
    }
  });
};
const $53f0fee299d2753b$var$cubeAnimation = (
  type,
  cubeSettings,
  localXY,
  trigger
) => {
  cubeSettings.cubeNextIndex = $53f0fee299d2753b$var$getIndex(
    localXY > 0 ? -1 : 1,
    cubeSettings
  );
  if (type === "move")
    cubeSettings.currentAnimation.add(
      gsap.set(cubeSettings.cube, {
        onStart: $53f0fee299d2753b$var$setAnimationState,
        onComplete: $53f0fee299d2753b$var$setAnimationState,
        onStartParams: [true, type, cubeSettings],
        onCompleteParams: [false, type, cubeSettings],
        [cubeSettings.direction === "x" ? "rotationY" : "rotationX"]:
          cubeSettings.currentRotation +
          cubeSettings.faceAngle * localXY * cubeSettings.liveDrag,
      })
    );
  else {
    if (localXY > cubeSettings.threshold) {
      cubeSettings.currentRotation =
        cubeSettings.currentRotation + cubeSettings.faceAngle;
      $53f0fee299d2753b$var$updateIndex(-1, cubeSettings, trigger);
    } else if (localXY < cubeSettings.threshold * -1) {
      cubeSettings.currentRotation =
        cubeSettings.currentRotation - cubeSettings.faceAngle;
      $53f0fee299d2753b$var$updateIndex(1, cubeSettings, trigger);
    }
    cubeSettings.currentAnimation.add(
      gsap.to(cubeSettings.cube, {
        onStart: $53f0fee299d2753b$var$setAnimationState,
        onComplete: $53f0fee299d2753b$var$setAnimationState,
        onStartParams: [true, type, cubeSettings],
        onCompleteParams: [false, type, cubeSettings],
        duration: cubeSettings.animationDuration,
        ease: cubeSettings.animationEase,
        [cubeSettings.direction === "x" ? "rotationY" : "rotationX"]:
          cubeSettings.currentRotation + $53f0fee299d2753b$var$safariFix,
      })
    );
  }
  $53f0fee299d2753b$var$fireEvent("cubeNextIndexUpdate", cubeSettings, trigger);
};
const $53f0fee299d2753b$var$changeFace = (direction, trigger, cubeSettings) => {
  if (
    !$53f0fee299d2753b$var$allSettings ||
    $53f0fee299d2753b$var$allSettings.isAnimating ||
    !$53f0fee299d2753b$var$allSettings.interactionEnabled
  )
    return;
  $53f0fee299d2753b$var$cubeAnimation(
    "edgeRelease",
    cubeSettings,
    direction,
    trigger
  );
};
const $53f0fee299d2753b$var$setInteraction = (boolean) => {
  if (!$53f0fee299d2753b$var$allSettings) return;
  $53f0fee299d2753b$var$allSettings.interactionEnabled = boolean;
};
const $53f0fee299d2753b$var$setAnimationState = (
  boolean,
  type,
  cubeSettings
) => {
  cubeSettings.isAnimating = boolean;
  if (!boolean && (type === "edgeRelease" || type === "release"))
    cubeSettings.currentAnimation.clear();
};
const $53f0fee299d2753b$var$getIndex = (direction, cubeSettings) => {
  return cubeSettings.currentIndex + direction < 0
    ? cubeSettings.amountOfFaces + cubeSettings.currentIndex + direction
    : (cubeSettings.currentIndex + direction) % cubeSettings.amountOfFaces;
};
const $53f0fee299d2753b$var$updateIndex = (
  direction,
  cubeSettings,
  trigger
) => {
  cubeSettings.previousIndex = cubeSettings.currentIndex;
  cubeSettings.currentIndex = $53f0fee299d2753b$var$getIndex(
    direction,
    cubeSettings
  );
  $53f0fee299d2753b$var$fireEvent("cubeIndexUpdate", cubeSettings, trigger);
};
const $53f0fee299d2753b$var$fireEvent = (eventName, cubeSettings, trigger) => {
  let event;
  switch (eventName) {
    case "cubeIndexUpdate":
      event = new CustomEvent(eventName, {
        detail: {
          currentIndex: cubeSettings.currentIndex,
          previousIndex: cubeSettings.previousIndex,
          cubeSettings: cubeSettings,
          trigger: trigger,
        },
      });
      document.dispatchEvent(event);
      break;
    case "cubeNextIndexUpdate":
      event = new CustomEvent(eventName, {
        detail: {
          cubeNextIndex: cubeSettings.cubeNextIndex,
          previousIndex: cubeSettings.previousIndex,
          cubeSettings: cubeSettings,
          trigger: trigger,
        },
      });
      document.dispatchEvent(event);
      break;
    case "cubeCreated":
      event = new CustomEvent(eventName, {
        detail: {
          cubeSettings: cubeSettings,
          trigger: trigger,
        },
      });
      document.dispatchEvent(event);
      break;
    case "cubeOnClick":
      event = new CustomEvent(eventName, {
        detail: {
          currentIndex: cubeSettings.currentIndex,
          cubeSettings: cubeSettings,
          trigger: trigger,
        },
      });
      document.dispatchEvent(event);
      break;
    default:
      break;
  }
};
const $53f0fee299d2753b$var$cubeCreated = (
  newCubeSettings,
  callbackFunction
) => {
  if (callbackFunction) callbackFunction(newCubeSettings);
  $53f0fee299d2753b$var$fireEvent("cubeCreated", newCubeSettings);
};
const $53f0fee299d2753b$var$checkDependencies = (dependencies) => {
  let foundAllDependencies = true;
  dependencies.forEach((dependency) => {
    if (typeof window !== "undefined") {
      const currentDependency = dependency;
      if (!window[currentDependency]) {
        console.error(
          `[CUBE PLUGIN] Needed dependency >> ${currentDependency} << was not found, please add it`
        );
        foundAllDependencies = false;
      }
    }
  });
  return foundAllDependencies;
};

export { $53f0fee299d2753b$export$ce223d612b94804b as createCube };
