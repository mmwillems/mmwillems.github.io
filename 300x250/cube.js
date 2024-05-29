function cube(currentCube, panelFields, index) {
  // Used to determine perspective and drag thresholds, relative to the amount of faces
  const perspectiveFactor = [0, 0, 3, 3, 1, 0.6, 0.45, 0.35, 0.3, 0.25, 0.2];
  const dragResistanceFactor = [0, 0, 0.3, 0.5, 0.7, 0.75, 0.8, 0.85, 0.87, 0.89, 0.9];

  const calculateFaceDistance = (size, angle) => size / 2 / Math.tan((angle / 2) * (Math.PI / 180));

  // Used to disable clicks while dragging
  let clickEnabled = true;

  const isAndroid = /Android/i.test('${USER_AGENT}'.indexOf('${') > -1
    ? navigator.userAgent
    : '${USERAGENT}');

  const isIphone = /iPhone|iPad|iPod/i.test('${USER_AGENT})'.indexOf('${') > -1
    ? navigator.userAgent
    : '${USERAGENT}');

  const onDragEnd = (event) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
  };

  const onThrowComplete = function onThrowComplete(event) {
    // Enable click after throw complete
    if (!clickEnabled && !this.settings.clickWhileDragging) clickEnabled = true;

    this.isInClickAnimation = false;
  };

  const onUpdate = function onUpdate() {
    // Disable click onDrag if clickWhileDragging is 'false'
    if (this.settings.clickWhileDragging === false) clickEnabled = false;

    const previousFace = this.currentFace;

    TweenMax.set(this.cube, {
      rotationX: -this.nullObject[0]._gsTransform.y % 360,
      rotationY: this.nullObject[0]._gsTransform.x % 360,
    });

    const transform = this.settings.orientation === 'vertical'
      ? this.nullObject[0]._gsTransform.y
      : this.nullObject[0]._gsTransform.x;

    this.currentFace = -Math.round(transform / this.faceAngle)
      % this.faces.length;

    if (this.currentFace < 0) {
      this.currentFace += this.faces.length;
    }

    if (previousFace !== this.currentFace && typeof this.settings.onFaceUpdate === 'function') {
      this.settings.onFaceUpdate(Math.abs(this.currentFace));
    }
  };

  const autoSwipeAnimation = function autoSwipeAnimation() {
    this.isInClickAnimation = true;
    // Move the cube
    console.log(this.nullObject)
    TweenMax.to(this.cube, 0.8, {
      x: this.settings.orientation === 'vertical' ? undefined : `-=${this.faceAngle}`,
      y: this.settings.orientation === 'vertical' ? `-=${this.faceAngle}` : undefined,
      onUpdate: onUpdate.bind(this),
      onComplete: onThrowComplete.bind(this),
      ease: Power2.easeInOut,
    });

    const x = this.settings.orientation === 'vertical'
      ? undefined
      : this.width * 0.35;

    const y = this.settings.orientation === 'vertical'
      ? this.height * 0.35
      : undefined;

    // Move the gesture
    new TimelineMax()
      .fromTo(
        this.gesture, 0.3, {
        x, y, autoAlpha: 0, scale: 2,
      },
        { autoAlpha: 1, scale: 1 },
      )
      .to(this.gesture, 0.8, { x: x * -1, y: y * -1, ease: Power2.easeInOut }, '-=0.3')
      .to(this.gesture, 0.3, { autoAlpha: 0 });
  };

  const onCubeSnap = function onCubeSnap(endValue, faceAngle) {
    if (faceAngle) return Math.round(endValue / faceAngle) * faceAngle;
    return Math.round(endValue / this.faceAngle) * this.faceAngle;
  };

  const moveCubeNext = function moveCubeNext() {
    if (!this.isInClickAnimation) {
      this.isInClickAnimation = true;

      TweenMax.to(this.nullObject, 0.8, {
        x: this.settings.orientation === 'vertical' ? undefined : onCubeSnap(this.nullObject[0]._gsTransform.x - this.faceAngle, this.faceAngle),
        y: this.settings.orientation === 'vertical' ? onCubeSnap(this.nullObject[0]._gsTransform.y - this.faceAngle, this.faceAngle) : undefined,
        onUpdate: onUpdate.bind(this),
        onComplete: onThrowComplete.bind(this, { event: 'clickNext' }),
        ease: Power2.easeInOut,
      });
    }
  };

  const moveCubePrev = function moveCubePrev() {
    if (!this.isInClickAnimation) {
      this.isInClickAnimation = true;

      TweenMax.to(this.nullObject, 0.8, {
        x: this.settings.orientation === 'vertical' ? undefined : onCubeSnap(this.nullObject[0]._gsTransform.x + this.faceAngle, this.faceAngle),
        y: this.settings.orientation === 'vertical' ? onCubeSnap(this.nullObject[0]._gsTransform.y + this.faceAngle, this.faceAngle) : undefined,
        onUpdate: onUpdate.bind(this),
        onComplete: onThrowComplete.bind(this, { event: 'clickPrev' }),
        ease: Power2.easeInOut,
      });
    }
  };

  const positionFace = function positionFace(index, element) {
    // ios 13+ fix
    // if (isIphone) $(element).on('touchstart', () => event.preventDefault());

    $(element).css({
      transform: this.settings.orientation === 'vertical'
        ? `rotateX(-${this.faceAngle * index}deg) translateZ(${this.faceDistance}px)`
        : `rotateY(${this.faceAngle * index}deg) translateZ(${this.faceDistance}px)`,
      backfaceVisibility: 'hidden',
      position: 'absolute',
      height: this.height,
      width: this.width,
    });
  };

  // Check for clickLayers layers
  const checkClickLayers = (clickLayers) => {
    if (clickLayers.length > 0 && clickLayers.length < $('.cube > div').length) throw new Error(`Please add ${$('.cube > div').length} "Cube click layers", and make them Clickable.`);
  };

  const onClick = function onClick() {
    //custom added (change this when you use it in DCS or other adserver)
    // var clickOut = cubeSettings[this.currentFace].click;
    // window.open(clickOut, '_blank')
  };

  const onUserEnter = function onUserEnter() {
    this.draggable.endDrag();
  };

  const onUserLeave = function onUserLeave() {
    this.autoSwiper.restart();
    this.autoSwiper.stop();
  };

  const initCube = function initCube() {
    this.faces = $(this.cube.find('> div').get().reverse());

    this.faceAngle = 360 / this.faces.length;
    this.faceDistance = calculateFaceDistance(this.settings.orientation === 'vertical'
      ? this.height
      : this.width, this.faceAngle);

    this.faces.each(positionFace.bind(this));

    // Fix perspective issues android
    const cssStyling = isAndroid ? {
      transformPerspective: `${this.settings.perspective || this.width * perspectiveFactor[this.faces.length]}px`,
      height: this.height,
      width: this.width,
    } : {
        perspective: `${this.settings.perspective || this.width * perspectiveFactor[this.faces.length]}px`,
        height: this.height,
        width: this.width,
      };

    this.cube
      .css('transform', `translateZ(-${this.faceDistance}px)`)
      .wrap($('<div class="cubeContainer">').css(cssStyling))
      .parent()
      .after(this.gesture);

    // eslint-disable-next-line prefer-destructuring
    this.draggable = Draggable.create(this.nullObject, {
      dragResistance: dragResistanceFactor[this.faces.length],
      type: this.settings.orientation === 'vertical' ? 'y' : 'x',
      onClick: !isAndroid ? onClick.bind(this) : undefined,
      allowNativeTouchScrolling: false,
      onThrowUpdate: onUpdate.bind(this),
      onThrowComplete: onThrowComplete.bind(this),
      snap: onCubeSnap.bind(this),
      onDrag: onUpdate.bind(this),
      trigger: this.cube,
      maxDuration: 0.6,
      throwProps: true,
      lockAxis: true,
      onDragEnd,
    })[0];

    // Android-specific click (in-app fix)
    if (isAndroid) {
      this.cube.click(onClick.bind(this));
    }

    if (this.settings.autoSwipe) {
      this.autoSwiper.play();
    }

    $('#creative_container')
      .on('mouseenter touchstart', onUserEnter.bind(this))
      .on('mouseleave touchend', onUserLeave.bind(this));

    TweenMax.to('#creative_container', 0.2, { autoAlpha: 1 });
  };

  const Cube = function Cube() {
    const defaultSettings = {
      controlPrev: $('#cube_controls #prev'),
      controlNext: $('#cube_controls #next'),
    };
    this.settings = Object.assign(defaultSettings, panelFields);
    this.nullObject = $('<div>').css('display', 'none').prependTo('#creative_container');
    this.cube = $('#'+currentCube).css({
      transformStyle: 'preserve-3d',
      background: 'none',
    });
    this.width = Math.round(this.cube.outerWidth());
    this.height = Math.round(this.cube.outerHeight());
    this.seenAllFaces = false;
    this.currentFace = 0;
    this.isInClickAnimation = false;
    this.facesSeen = {};

    this.next = () => {
      moveCubeNext.call(this);
    };

    this.prev = () => {
      moveCubePrev.call(this);
    };

    this.settings.controlNext.click(() => {
      moveCubeNext.call(this);
    });

    this.settings.controlPrev.click(() => {
      moveCubePrev.call(this);
    });

    this.autoSwiper = new TimelineMax({ repeat: -1, paused: true })
      .insert(autoSwipeAnimation.bind(this), this.settings.swipeIntervalTime || 3);

    // this.gesture = $('<div id="gesture">').css({
    //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    //   top: `${(this.height / 2) - 16}px`,
    //   left: `${(this.width / 2) - 16}px`,
    //   visibility: 'hidden',
    //   position: 'absolute',
    //   borderRadius: '50%',
    //   background: '#fff',
    //   height: '32px',
    //   width: '32px',
    //   opacity: 0,
    // });

    // // Stop repeating animations after 30 seconds, if AppNexus tells us to
    window.onLoopStop = () => this.autoSwiper.stop();

    switch (true) {
      // Handle errors
      case !window.ThrowPropsPlugin:
        throw new Error('Please add the "GreenSock ThrowPropsPlugin" plugin.');

      // Custom cube
      default: {
        initCube.call(this);
        break;
      }
    }
  };
  //console.log(new Cube(currentCube))
  return new Cube(currentCube);
}
