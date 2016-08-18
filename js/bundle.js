/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__(1);
	const HanoiGame = __webpack_require__(2);

	$( () => {
	  const el = $('.toh');
	  const game = new HanoiGame();
	  console.log("working");
	  new HanoiView(game, el);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function HanoiView(game, el){
	  this.game = game;
	  this.$el = el;
	  this.clickedTower = undefined;
	  this.setupTowers();
	  this.clickTower();
	}

	HanoiView.prototype.setupTowers = function() {
	  let $tower0 = $("<ul>").attr("data-num", 0).addClass('0').addClass('group');
	  let $tower1 = $("<ul>").attr("data-num", 1).addClass('1').addClass('group');
	  let $tower2 = $("<ul>").attr("data-num", 2).addClass('2').addClass('group');
	  for(let i = 1; i < 4; i++) {
	    let $disk = $("<li>").attr("data-size", i).addClass('group');
	    $disk.addClass(`disk${i}`);
	    $tower0.append($disk);
	  }
	  this.$el.append($tower0);
	  this.$el.append($tower1);
	  this.$el.append($tower2);
	};

	HanoiView.prototype.render = function(num) {
	  let $towerFrom = $('ul').filter(`.${this.clickedTower}`);
	  let $towerTo = $('ul').filter(`.${num}`);

	  for(let i = 1; i < 4; i++) {
	    let diskClass = `.disk${i}`;
	    console.log(diskClass);
	    let $childFrom = $towerFrom.children().filter(diskClass);
	    console.log($childFrom);
	    if ($childFrom.is("li")) {
	      $childFrom.remove();
	      $towerTo.prepend($childFrom);
	      return;
	    }
	  }
	};

	HanoiView.prototype.clickTower = function() {
	  $('ul').on("click", event => {
	    let $tower = $(event.currentTarget);
	    let num = $tower.data("num");
	    if (this.clickedTower === undefined) {
	      this.clickedTower = num;
	    } else {
	      if (this.game.move(this.clickedTower, num)) {
	        this.render(num);
	      } else {
	          alert("Invalid Move! Try again.");
	      }
	      this.clickedTower = undefined;
	    }
	  });
	};

	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ }
/******/ ]);