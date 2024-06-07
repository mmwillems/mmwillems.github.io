const $1861964cd725ecc5$export$b74ff737e0e298b5 = ["gsap", "Hammer"];

/**
 * The logging module used by the creative cube plugin
 * This module is responsible for correctly styling the console output of the creative cube plugin.
 */ var $536de0e5e005783d$var$LogColor;
(function (LogColor) {
  LogColor["event"] = "#e9575c";
  LogColor["info"] = "#308ec4";
  LogColor["warning"] = "#FFAB00";
  LogColor["error"] = "#FF0000";
})($536de0e5e005783d$var$LogColor || ($536de0e5e005783d$var$LogColor = {}));
const $536de0e5e005783d$var$checkLogStyling = `
	background: #647475;
	color: #242424;
	font-weight: 700;
	padding: 2px 4px;
	border-radius: 2px;
	margin-right: 5px;
	display: inline-block;
`;
const $536de0e5e005783d$var$checkEventLogStyling = (color) => `
	background: ${color};
	color: #242424;
	padding: 2px 4px;
	border-radius: 2px;
	margin-right: 5px;
	display: inline-block;
`;
/**
 * Log a styled message to the browser console
 */ function $536de0e5e005783d$export$bef1f36f5486a6a3(type, label, ...data) {
  const color = $536de0e5e005783d$var$LogColor[type];
  console.log(
    `%cCUBE%c${type}%c\t`,
    $536de0e5e005783d$var$checkLogStyling,
    $536de0e5e005783d$var$checkEventLogStyling(color),
    "",
    label,
    ...data
  );
  if (type === "error") throw new Error(`${label}: ${data}`);
}

// Fix for safari, render issues. Apply it always, because it doesn't cause any issues for other browsers either. But keeping functionality here to revert to '0' if needed on other browsers
const $53f0fee299d2753b$var$safariFix =
  /Safari\//i.test(navigator.userAgent) &&
  !/Chrome\//i.test(navigator.userAgent) &&
  !/Edge\//i.test(navigator.userAgent)
    ? 0.01
    : 0.01;
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
  const initCubeSettings = $53f0fee299d2753b$var$createSettings(
    userSettings,
    container
  );
  if (initCubeSettings) {
    const cubeSettings = {
      ...initCubeSettings,
      disableDrag: () => $53f0fee299d2753b$var$setDrag(false, cubeSettings),
      enableDrag: () => $53f0fee299d2753b$var$setDrag(true, cubeSettings),
      disableInteraction: () =>
        $53f0fee299d2753b$var$setInteraction(false, cubeSettings),
      enableInteraction: () =>
        $53f0fee299d2753b$var$setInteraction(true, cubeSettings),
      nextFace: () =>
        $53f0fee299d2753b$var$changeFace(1, "trigger", cubeSettings),
      previousFace: () =>
        $53f0fee299d2753b$var$changeFace(-1, "trigger", cubeSettings),
      goToFace: (face, relativeDuration) =>
        $53f0fee299d2753b$var$goToFace(
          face,
          "trigger",
          cubeSettings,
          relativeDuration
        ),
    };
    $53f0fee299d2753b$var$createCubeFaces(cubeSettings);
    $53f0fee299d2753b$var$createTouchEvents(cubeSettings);
    $53f0fee299d2753b$var$cubeCreated(cubeSettings, callbackFunction);
    return cubeSettings;
  } else {
    (0, $536de0e5e005783d$export$bef1f36f5486a6a3)(
      "error",
      "Error:",
      `There's an error in your settings`
    );
    return false;
  }
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
    isAnimating: false,
    dragDisabled: false,
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
  // Fix safari cursor bug
  document.onselectstart = function () {
    return false;
  };
  return {
    ...combinedSettings,
    ...calculatedSettings,
  };
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
  cubeSettings.cube.style.touchAction =
    cubeSettings.direction === "x" ? "none" : "none";
  cubeSettings.cube.style.height = `${cubeSettings.height}px`;
  cubeSettings.cube.style.width = `${cubeSettings.width}px`;
  cubeSettings.container.style.perspective =
    $53f0fee299d2753b$var$getPerspective(cubeSettings) || "none";
  // Set face styling
  [...cubeSettings.faces].forEach((element, index, array) => {
    const rotationAngle = cubeSettings.faceAngle * index;
    if (cubeSettings.direction === "x")
      element.style.transform = `rotateY(${rotationAngle}deg) translate3d(0, 0, ${translate}px)`;
    else
      element.style.transform = `rotateX(${rotationAngle}deg) translate3d(0, 0, ${translate}px)`;
    // Disable interaction with childNodes
    if (element.nodeType !== 1) return;
    element.style.touchAction = "none";
    element.style.pointerEvents = "none";
    element.style.userSelect = "none";
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
    event.preventDefault();
    if (
      !$53f0fee299d2753b$var$isValidDirection(event, cubeSettings) ||
      (event.type === "panmove" && cubeSettings.isAnimating) ||
      (event.type === "panmove" && !cubeSettings.interactionEnabled) ||
      (event.type === "panend" && !cubeSettings.interactionEnabled) ||
      (event.type === "panend" && cubeSettings.isAnimating) ||
      cubeSettings.dragDisabled
    )
      return;
    console.log(event);
    console.log(event.direction);
    const localXY =
      cubeSettings.direction === "x"
        ? Math.max(Math.min(event.deltaX / cubeSettings.width, 1), -1)
        : Math.max(Math.min(event.deltaY / cubeSettings.height, 1), -1) * -1;
    switch (event.type) {
      case "panmove":
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
const $53f0fee299d2753b$var$isValidDirection = (
  event,
  { direction: direction }
) =>
  (direction === "x" &&
    (event.direction === Hammer.DIRECTION_LEFT ||
      event.direction === Hammer.DIRECTION_RIGHT)) ||
  (direction === "y" &&
    (event.direction === Hammer.DIRECTION_UP ||
      event.direction === Hammer.DIRECTION_DOWN)) ||
  event.direction === Hammer.DIRECTION_NONE;
const $53f0fee299d2753b$var$cubeAnimation = (
  type,
  cubeSettings,
  faceChange,
  trigger
) => {
  const {
    cube: cube,
    direction: direction,
    currentRotation: currentRotation,
    faceAngle: faceAngle,
    liveDrag: liveDrag,
    threshold: threshold,
    animationDuration: animationDuration,
    animationEase: animationEase,
    currentAnimation: currentAnimation,
  } = cubeSettings;
  // Update cubeNextIndex as soon as possible
  cubeSettings.cubeNextIndex = $53f0fee299d2753b$var$getIndex(
    faceChange,
    cubeSettings
  );
  $53f0fee299d2753b$var$fireEvent("cubeNextIndexUpdate", cubeSettings, trigger);
  // Function to create animation settings
  const createAnimationSettings = (rotationValue) => ({
    onStart: $53f0fee299d2753b$var$setAnimationState,
    onComplete: $53f0fee299d2753b$var$setAnimationState,
    onStartParams: [true, type, cubeSettings],
    onCompleteParams: [false, type, cubeSettings],
    duration: animationDuration,
    ease: animationEase,
    [direction === "x" ? "rotationY" : "rotationX"]:
      rotationValue + $53f0fee299d2753b$var$safariFix,
  });
  // When dragging
  if (type === "move") {
    const rotationValue = currentRotation + faceAngle * faceChange * liveDrag;
    currentAnimation.add(
      gsap.set(cube, createAnimationSettings(rotationValue))
    );
    return;
  }
  // Return to start position when threshold value is not reached
  if (Math.abs(faceChange) < threshold) {
    const rotationValue = currentRotation;
    currentAnimation.add(gsap.to(cube, createAnimationSettings(rotationValue)));
    return;
  }
  // Invert direction when animation is being triggered
  const multiplier = trigger ? -1 : 1;
  cubeSettings.currentRotation +=
    faceAngle *
    (faceChange > threshold ? multiplier : -multiplier) *
    (trigger ? Math.abs(faceChange) : 1);
  $53f0fee299d2753b$var$updateIndex(faceChange, cubeSettings, trigger);
  // On release event
  currentAnimation.add(
    gsap.to(cube, createAnimationSettings(cubeSettings.currentRotation))
  );
};
const $53f0fee299d2753b$var$setDrag = (boolean, cubeSettings) => {
  cubeSettings.dragDisabled = !boolean;
};
const $53f0fee299d2753b$var$changeFace = (
  faceChange,
  trigger,
  cubeSettings
) => {
  if (
    !cubeSettings ||
    cubeSettings.isAnimating ||
    !cubeSettings.interactionEnabled
  )
    return;
  $53f0fee299d2753b$var$cubeAnimation(
    "edgeRelease",
    cubeSettings,
    faceChange,
    trigger
  );
};
const $53f0fee299d2753b$var$goToFace = (
  face,
  trigger,
  cubeSettings,
  relativeDuration
) => {
  if (
    !cubeSettings ||
    cubeSettings.isAnimating ||
    !cubeSettings.interactionEnabled ||
    isNaN(face)
  )
    return;
  const {
    currentIndex: currentIndex,
    amountOfFaces: amountOfFaces,
    animationDuration: animationDuration,
  } = cubeSettings;
  // Calculate difference in faces and take the shortest route
  let faceChange = (face - currentIndex) % amountOfFaces;
  if (faceChange > amountOfFaces / 2) faceChange -= amountOfFaces;
  else if (faceChange < -amountOfFaces / 2) faceChange += amountOfFaces;
  if (faceChange === 0) return;
  // Change transitionDuration
  const orgAnimationDuration = animationDuration;
  if (relativeDuration) cubeSettings.animationDuration *= Math.abs(faceChange);
  $53f0fee299d2753b$var$cubeAnimation(
    "edgeRelease",
    cubeSettings,
    faceChange,
    trigger
  );
  // Restore original animation duration
  cubeSettings.animationDuration = orgAnimationDuration;
};
const $53f0fee299d2753b$var$setInteraction = (boolean, cubeSettings) => {
  cubeSettings.interactionEnabled = boolean;
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
const $53f0fee299d2753b$var$getIndex = (faceChange, cubeSettings) => {
  // If cube is being dragged, change localXY float to full numbers
  if (faceChange > -1 && faceChange < 1) faceChange = faceChange < 0 ? 1 : -1;
  return cubeSettings.currentIndex + faceChange < 0
    ? cubeSettings.amountOfFaces + cubeSettings.currentIndex + faceChange
    : (cubeSettings.currentIndex + faceChange) % cubeSettings.amountOfFaces;
};
const $53f0fee299d2753b$var$updateIndex = (
  faceChange,
  cubeSettings,
  trigger
) => {
  cubeSettings.previousIndex = cubeSettings.currentIndex;
  cubeSettings.currentIndex = $53f0fee299d2753b$var$getIndex(
    faceChange,
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
const $53f0fee299d2753b$var$cubeCreated = (cubeSettings, callbackFunction) => {
  if (callbackFunction) callbackFunction(cubeSettings);
  $53f0fee299d2753b$var$fireEvent("cubeCreated", cubeSettings);
};
const $53f0fee299d2753b$var$checkDependencies = (dependencies) => {
  let foundAllDependencies = true;
  dependencies.forEach((dependency) => {
    if (typeof window !== "undefined") {
      const currentDependency = dependency;
      if (!window[currentDependency]) {
        (0, $536de0e5e005783d$export$bef1f36f5486a6a3)(
          "warning",
          "Warning:",
          `Needed dependency >> ${currentDependency} << was not found, please add it`
        );
        foundAllDependencies = false;
      }
    }
  });
  return foundAllDependencies;
};

export { $53f0fee299d2753b$export$ce223d612b94804b as createCube };
