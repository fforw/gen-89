var Demo;
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AABB.js":
/*!*********************!*\
  !*** ./src/AABB.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AABB; }
/* harmony export */ });
class AABB {
  constructor() {
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
  }
  add(x, y) {
    this.minX = Math.min(this.minX, x);
    this.minY = Math.min(this.minY, y);
    this.maxX = Math.max(this.maxX, x);
    this.maxY = Math.max(this.maxY, y);
  }
  get width() {
    return Math.ceil(this.maxX - this.minX);
  }
  get height() {
    return Math.ceil(this.maxY - this.minY);
  }
  get center() {
    return [this.minX + this.maxX >> 1, this.minY + this.maxY >> 1];
  }
  grow(n) {
    this.minX -= n;
    this.minY -= n;
    this.maxY += n;
    this.maxY += n;
  }
  shrink(dir, amount) {
    switch (dir) {
      case 0:
        this.minX += amount;
        this.minY += amount;
        break;
      case 1:
        this.maxX -= amount;
        this.minY += amount;
        break;
      case 2:
        this.maxX -= amount;
        this.maxY -= amount;
        break;
      case 3:
        this.minX += amount;
        this.maxY -= amount;
        break;
      default:
        throw new Error("Invalid direction: " + dir);
    }
  }
}

/***/ }),

/***/ "./src/easing.js":
/*!***********************!*\
  !*** ./src/easing.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "easeFlank": function() { return /* binding */ easeFlank; },
/* harmony export */   "easeInCubic": function() { return /* binding */ easeInCubic; },
/* harmony export */   "easeInOutCubic": function() { return /* binding */ easeInOutCubic; },
/* harmony export */   "easeInOutQuad": function() { return /* binding */ easeInOutQuad; },
/* harmony export */   "easeInOutQuart": function() { return /* binding */ easeInOutQuart; },
/* harmony export */   "easeInOutQuint": function() { return /* binding */ easeInOutQuint; },
/* harmony export */   "easeInQuad": function() { return /* binding */ easeInQuad; },
/* harmony export */   "easeInQuart": function() { return /* binding */ easeInQuart; },
/* harmony export */   "easeInQuint": function() { return /* binding */ easeInQuint; },
/* harmony export */   "easeOutCubic": function() { return /* binding */ easeOutCubic; },
/* harmony export */   "easeOutQuad": function() { return /* binding */ easeOutQuad; },
/* harmony export */   "easeOutQuart": function() { return /* binding */ easeOutQuart; },
/* harmony export */   "easeOutQuint": function() { return /* binding */ easeOutQuint; },
/* harmony export */   "linear": function() { return /* binding */ linear; }
/* harmony export */ });
// no easing, no acceleration
function linear(t) {
  return t;
}

// accelerating from zero velocity
function easeInQuad(t) {
  return t * t;
}

// decelerating to zero velocity
function easeOutQuad(t) {
  return t * (2 - t);
}

// acceleration until halfway, then deceleration
function easeInOutQuad(t) {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// accelerating from zero velocity
function easeInCubic(t) {
  return t * t * t;
}

// decelerating to zero velocity
function easeOutCubic(t) {
  return --t * t * t + 1;
}

// acceleration until halfway, then deceleration
function easeInOutCubic(t) {
  return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// accelerating from zero velocity
function easeInQuart(t) {
  return t * t * t * t;
}

// decelerating to zero velocity
function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}

// acceleration until halfway, then deceleration
function easeInOutQuart(t) {
  return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

// accelerating from zero velocity
function easeInQuint(t) {
  return t * t * t * t * t;
}

// decelerating to zero velocity
function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}

// acceleration until halfway, then deceleration
function easeInOutQuint(t) {
  return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}
function easeFlank(v) {
  const plateau = 0.3;
  if (v < plateau) {
    return 0;
  } else if (v >= 1 - plateau) {
    return 1;
  } else {
    const scale = 1 - 2 * plateau;
    return easeInOutQuint((v - plateau) / scale);
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var domready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domready */ "./node_modules/domready/ready.js");
/* harmony import */ var domready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(domready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var spectral_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! spectral.js */ "./node_modules/spectral.js/spectral.js");
/* harmony import */ var spectral_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(spectral_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var performance_now__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! performance-now */ "./node_modules/performance-now/lib/performance-now.js");
/* harmony import */ var performance_now__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(performance_now__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/dist/esm/simplex-noise.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _AABB__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AABB */ "./src/AABB.js");
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./easing */ "./src/easing.js");







const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;
const config = {
  width: 0,
  height: 0
};

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;
function drawGrid() {
  const {
    width,
    height
  } = config;
  const cx = width >> 1;
  const cy = height >> 1;
  for (let i = 0; i < 12; i++) {
    const r = Math.floor(Math.min(cx, cy) * 0.95);
    const a = i * TAU / 12;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function setupClip(i, r) {
  const {
    width,
    height
  } = config;
  const cx = width >> 1;
  const cy = height >> 1;
  const aabb = new _AABB__WEBPACK_IMPORTED_MODULE_5__["default"]();
  const a0 = TAU / 12 + (i + 1) * TAU / 6;
  const a1 = (i + 1) * TAU / 6;
  const a2 = TAU / 12 + i * TAU / 6;
  const x = cx + Math.cos(a0) * r;
  const y = cy + Math.sin(a0) * r;
  const x2 = cx + Math.cos(a1) * r;
  const y2 = cy + Math.sin(a1) * r;
  const x3 = cx + Math.cos(a2) * r;
  const y3 = cy + Math.sin(a2) * r;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(cx, cy);
  ctx.clip();
  aabb.add(cx, cy);
  aabb.add(x, y);
  aabb.add(x2, y2);
  aabb.add(x3, y3);
  return aabb;
}
let noiseFn;
function randomSpeed() {
  return 0.001 + Math.random() * 0.002;
}
class RandomValue {
  constructor() {
    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random();
    let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.random();
    let z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.random();
    let a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.random() * TAU;
    let speed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : randomSpeed();
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.dx = 0;
    this.dy = 0;
    this.dz = 0;
    this.pow = 1;
    this.x = x;
    this.y = y;
    this.z = z;
    this.dx = Math.cos(a) * speed;
    this.dy = Math.sin(a) * speed;
    this.dz = 0;
  }
  valueOf() {
    let v = 0.5 + noiseFn(this.x, this.y, this.z) * 0.5;
    return Math.pow(v, this.pow);
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
  }
}
function getShaped(rndA2) {
  const v = +rndA2;
  let value = Math.floor(v * 6) / 6;
  return value + (0,_easing__WEBPACK_IMPORTED_MODULE_6__.easeFlank)((v - value) * 6) / 6;
}
domready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  canvas = document.getElementById("screen");
  ctx = canvas.getContext("2d");
  const width = window.innerWidth | 0;
  const height = window.innerHeight | 0;
  config.width = width;
  config.height = height;
  canvas.width = width;
  canvas.height = height;
  let frameCounter = 0;
  let last = performance_now__WEBPACK_IMPORTED_MODULE_2___default()();
  const cx = width >> 1;
  const cy = height >> 1;
  let run = 0;
  const paint = () => {
    const activeRun = ++run;
    noiseFn = (0,simplex_noise__WEBPACK_IMPORTED_MODULE_3__.createNoise3D)();
    const rndA = new RandomValue();
    const rndA2 = new RandomValue(undefined, undefined, undefined, undefined, 0.0003);
    const rndR = new RandomValue();
    const rndR2 = new RandomValue();
    const rndColor = new RandomValue();
    const rndWidth = new RandomValue();
    rndR2.pow = 2;
    rndWidth.pow = 2;
    const palette = ["#000", ...spectral_js__WEBPACK_IMPORTED_MODULE_1___default().palette("rgba(32,82,255,0.5)", "rgba(255,255,255,0.85)", 23, (spectral_js__WEBPACK_IMPORTED_MODULE_1___default().RGBA))];
    const accent = Math.random() < 0.5 ? "#82f563" : "#ff426a";
    const lineCount = 120;
    const accents = [];
    for (let i = 0; i < lineCount; i++) {
      if (Math.random() < 1 / 24) {
        accents.push(i);
      }
    }
    const animate = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#fff";
      //drawGrid()

      const max = 250;
      ctx.fillStyle = "#fff";
      const size = Math.min(cx, cy) * 1.2;
      for (let i = 0; i < lineCount; i++) {
        rndR.z = i;
        rndR2.z = i;
        rndA.z = i;
        rndA2.z = i;
        rndColor.z = i;
        rndWidth.z = i;
        const a = rndA * TAU / 12;
        const r = Math.floor(rndR * (size - max * 0.5));
        const a2 = (getShaped(rndA2) + 1 / 12) * TAU;
        const r2 = Math.floor(rndR2 * max * 0.5);
        const x = cx + Math.cos(a) * r + Math.cos(a2) * r2;
        const y = cy + Math.sin(a) * r + Math.sin(a2) * r2;
        const x2 = cx + Math.cos(a) * r + Math.cos(a2 + TAU / 2) * r2;
        const y2 = cy + Math.sin(a) * r + Math.sin(a2 + TAU / 2) * r2;
        ctx.strokeStyle = accents.indexOf(i) >= 0 ? accent : palette[0 | rndColor * palette.length];
        ctx.lineWidth = 1 + Math.floor(rndWidth * 4);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      {
        const r = Math.floor(size);

        // mirror once
        ctx.save();
        ctx.translate(0, cy);
        ctx.scale(1, -1);
        ctx.translate(0, -cy);
        ctx.strokeStyle = "#f00";
        setupClip(-1, r);
        const sh = Math.sin(TAU / 12) * r;
        ctx.drawImage(ctx.canvas, cx, cy, r, sh, cx, cy, r, sh);
        ctx.restore();

        // rotational symmetry
        for (let i = 0; i < 5; i++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(TAU / 6 * (i + 1));
          ctx.translate(-cx, -cy);
          const aabb = setupClip(-1, r);

          // const sh = Math.sin(TAU/12) * r
          ctx.drawImage(ctx.canvas, aabb.minX, aabb.minY, aabb.width, aabb.height, aabb.minX, aabb.minY, aabb.width, aabb.height);
          // ctx.fillStyle ="rgba(255,0,255, 0.15)"
          // ctx.fillRect(0,0,width,height)
          ctx.restore();
        }
        rndA.update();
        rndA2.update();
        rndR.update();
        rndR2.update();
        rndColor.update();
        rndWidth.update();
        frameCounter++;
      }
      if (run === activeRun) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // window.setInterval(() => {
  //
  //     const now = perfNow();
  //
  //     const delta = now - last
  //     last = now;
  //
  //     console.log(delta, "ms. fps = ", frameCounter * 1000 / delta)
  //     frameCounter = 0
  //
  // }, 3000)

  paint();
  canvas.addEventListener("click", paint, true);
});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkDemo"] = self["webpackChunkDemo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	Demo = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle-main-bbf4716bcf16621b5f6a.js.map