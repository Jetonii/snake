/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const SnakeView = __webpack_require__(/*! ./js/snake-view */ \"./src/js/snake-view.js\");\r\n\r\n$(function () {\r\n  const rootEl = $('.snake-game');\r\n  new SnakeView(rootEl);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/apple.js":
/*!*************************!*\
  !*** ./src/js/apple.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Coord = __webpack_require__(/*! ./coord */ \"./src/js/coord.js\");\r\n\r\nclass Apple {\r\n  constructor(board) {\r\n    this.board = board;\r\n    this.replace();\r\n  }\r\n\r\n  replace() {\r\n    let x = Math.floor(Math.random() * this.board.dim);\r\n    let y = Math.floor(Math.random() * this.board.dim);\r\n\r\n    // Don't place an apple where there is a snake\r\n    while (this.board.snake.isOccupying([x, y])) {\r\n      x = Math.floor(Math.random() * this.board.dim);\r\n      y = Math.floor(Math.random() * this.board.dim);\r\n    }\r\n\r\n    this.position = new Coord(x, y);\r\n  }\r\n\r\n}\r\n\r\nmodule.exports = Apple;\r\n\n\n//# sourceURL=webpack:///./src/js/apple.js?");

/***/ }),

/***/ "./src/js/board.js":
/*!*************************!*\
  !*** ./src/js/board.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Snake = __webpack_require__(/*! ./snake */ \"./src/js/snake.js\");\r\nconst Apple = __webpack_require__(/*! ./apple */ \"./src/js/apple.js\");\r\n\r\nclass Board {\r\n  constructor(dim) {\r\n    this.dim = dim;\r\n\r\n    this.snake = new Snake(this);\r\n    this.snake2 = new Snake(this)\r\n    this.apple = new Apple(this);\r\n    this.apple2 = new Apple(this);\r\n  }\r\n\r\n  static blankGrid(dim) {\r\n    const grid = [];\r\n\r\n    for (let i = 0; i < dim; i++) {\r\n      const row = [];\r\n      for (let j = 0; j < dim; j++) {\r\n        row.push(Board.BLANK_SYMBOL);\r\n      }\r\n      grid.push(row);\r\n    }\r\n\r\n    return grid;\r\n  }\r\n\r\n  render() {\r\n    const grid = Board.blankGrid(this.dim);\r\n\r\n    this.snake.segments.forEach( segment => {\r\n      grid[segment.i][segment.j] = Snake.SYMBOL;\r\n    });\r\n\r\n    this.snake2.segments.forEach( segment => {\r\n      grid[segment.i][segment.j] = Snake.SYMBOL;\r\n    });\r\n\r\n    grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;\r\n    grid[this.apple2.position.i][this.apple2.position.j] = Apple.SYMBOL;\r\n\r\n    // join it up\r\n    const rowStrs = [];\r\n    grid.map( row => row.join(\"\") ).join(\"\\n\");\r\n  }\r\n\r\n  validPosition(coord) {\r\n    return (coord.i >= 0) && (coord.i < this.dim) &&\r\n      (coord.j >= 0) && (coord.j < this.dim);\r\n  }\r\n}\r\n\r\nBoard.BLANK_SYMBOL = \".\";\r\n\r\nmodule.exports = Board;\r\n\n\n//# sourceURL=webpack:///./src/js/board.js?");

/***/ }),

/***/ "./src/js/coord.js":
/*!*************************!*\
  !*** ./src/js/coord.js ***!
  \*************************/
/***/ ((module) => {

eval("class Coord {\r\n    constructor(i, j) {\r\n      this.i = i;\r\n      this.j = j;\r\n    }\r\n  \r\n    equals(coord2) {\r\n        return (this.i == coord2.i) && (this.j == coord2.j);\r\n    }\r\n  \r\n    isOpposite(coord2) {\r\n      return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));\r\n    }\r\n  \r\n    plus(coord2) {\r\n      return new Coord(this.i + coord2.i, this.j + coord2.j);\r\n    }\r\n  }\r\n  \r\n  module.exports = Coord;\r\n  \n\n//# sourceURL=webpack:///./src/js/coord.js?");

/***/ }),

/***/ "./src/js/snake-view.js":
/*!******************************!*\
  !*** ./src/js/snake-view.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/js/board.js\");\r\n\r\nclass View {\r\n  constructor($el) {\r\n    this.$el = $el;\r\n\r\n    this.board = new Board(20);\r\n    this.setupGrid();\r\n\r\n    this.intervalId = window.setInterval(\r\n      this.step.bind(this),\r\n      View.STEP_MILLIS\r\n    );\r\n   \r\n    $(window).on(\"keydown\", this.handleKeyEvent.bind(this));\r\n    \r\n  }\r\n\r\n  handleKeyEvent(event) {\r\n    if (View.KEYS[event.keyCode]) {\r\n      this.board.snake.turn(View.KEYS[event.keyCode]);\r\n    }\r\n  }\r\n\r\n  render() {\r\n    // simple text based rendering\r\n    // this.$el.html(this.board.render());\r\n\r\n    this.updateClasses(this.board.snake.segments, \"snake\");\r\n    this.updateClasses([this.board.apple.position], \"apple\");\r\n  }\r\n\r\n  updateClasses(coords, className) {\r\n    this.$li.filter(`.${className}`).removeClass();\r\n\r\n    coords.forEach( coord => {\r\n      const flatCoord = (coord.i * this.board.dim) + coord.j;\r\n      this.$li.eq(flatCoord).addClass(className);\r\n    });\r\n  }\r\n\r\n  setupGrid() {\r\n    let html = \"\";\r\n\r\n    for (let i = 0; i < this.board.dim; i++) {\r\n      html += \"<ul>\";\r\n      for (let j = 0; j < this.board.dim; j++) {\r\n        html += \"<li></li>\";\r\n      }\r\n      html += \"</ul>\";\r\n    }\r\n\r\n    this.$el.html(html);\r\n    this.$li = this.$el.find(\"li\");\r\n  }\r\n\r\n  step() {\r\n    if (this.board.snake.segments.length > 0) {\r\n      this.board.snake.move();\r\n      this.render();\r\n    } else {\r\n      alert(\"You lose!\");\r\n      window.clearInterval(this.intervalId);\r\n    }\r\n  }\r\n\r\n}\r\n\r\nView.KEYS = {\r\n  38: \"N\",\r\n  39: \"E\",\r\n  40: \"S\",\r\n  37: \"W\",\r\n  65: 'W',\r\n  83: 'S',\r\n  68: 'E', \r\n  87: 'N'\r\n};\r\n\r\nView.STEP_MILLIS = 100;\r\n\r\nmodule.exports = View;\r\n\n\n//# sourceURL=webpack:///./src/js/snake-view.js?");

/***/ }),

/***/ "./src/js/snake.js":
/*!*************************!*\
  !*** ./src/js/snake.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Coord = __webpack_require__(/*! ./coord */ \"./src/js/coord.js\");\r\n\r\nclass Snake {\r\n  constructor(board) {\r\n    this.dir = \"N\";\r\n    this.turning = false;\r\n    this.board = board;\r\n    this.points = 0\r\n    const center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));\r\n    this.segments = [center];\r\n    this.growTurns = 3;\r\n    // document.querySelector('h2').text += points\r\n\r\n  }\r\n\r\n  eatApple() {\r\n    if (this.head().equals(this.board.apple.position)) {\r\n      this.growTurns += 3;\r\n      this.points+=10\r\n      \r\n      document.querySelector('h2').textContent = 'Points: ' + this.points\r\n      console.log(this.points)\r\n      return true;\r\n    } else {\r\n      return false;\r\n    }\r\n  }\r\n\r\n  isOccupying(array) {\r\n    let result = false;\r\n    this.segments.forEach( segment => {\r\n      if (segment.i === array[0] && segment.j === array[1]) {\r\n        result = true;\r\n        return result;\r\n      }\r\n    });\r\n    return result;\r\n  }\r\n\r\n  head() {\r\n    return this.segments.slice(-1)[0];\r\n  }\r\n\r\n  isValid() {\r\n    const head = this.head();\r\n\r\n    if (!this.board.validPosition(this.head())) {\r\n      return false;\r\n    }\r\n\r\n    for (let i = 0; i < this.segments.length - 1; i++) {\r\n      if (this.segments[i].equals(head)) {\r\n        return false;\r\n      }\r\n    }\r\n\r\n    return true;\r\n  }\r\n\r\n  move() {\r\n    // move snake forward\r\n    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));\r\n\r\n    // allow turning again\r\n    this.turning = false;\r\n\r\n    // maybe eat an apple\r\n    if (this.eatApple()) {\r\n      this.board.apple.replace();\r\n    }\r\n\r\n    // if not growing, remove tail segment\r\n    if (this.growTurns > 0) {\r\n      this.growTurns -= 1;\r\n    } else {\r\n      this.segments.shift();\r\n    }\r\n\r\n    // destroy snake if it eats itself or runs off grid\r\n    if (!this.isValid()) {\r\n      this.segments = [];\r\n    }\r\n  }\r\n\r\n  turn(dir) {\r\n    // avoid turning directly back on yourself\r\n    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||\r\n      this.turning) {\r\n      return;\r\n    } else {\r\n      this.turning = true;\r\n      this.dir = dir;\r\n    }\r\n  }\r\n}\r\n\r\nSnake.DIFFS = {\r\n  \"N\": new Coord(-1, 0),\r\n  \"E\": new Coord(0, 1),\r\n  \"S\": new Coord(1, 0),\r\n  \"W\": new Coord(0, -1)\r\n};\r\n\r\nSnake.SYMBOL = \"S\";\r\nSnake.GROW_TURNS = 3;\r\n\r\nmodule.exports = Snake;\r\n\n\n//# sourceURL=webpack:///./src/js/snake.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;