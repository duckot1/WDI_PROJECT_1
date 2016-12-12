var Game = Game || {};

Game.addAmmo = function addAmmo() {
  var j = 0;
  var numberOfBullets = 6 - Game.$ammo.length;
  for (j; j < numberOfBullets; j++) {
    Game.$ammoBox.append('<li class="ammo"></li>');
  }
};

Game.reload = function reload() {
  this.$reloadBox.on('click', this.addAmmo);
};

Game.moveLeft = function(a, b) {
  $(a).animate({left: b, top: '50px', height: '-=200px', width: '-=200px'}, 3500, function(){
    $(this).remove();
  });
};

Game.moveRight = function(a, b) {
  $(a).animate({left: b, top: '100px', height: '-=200px', width: '-=200px'}, 3500, function(){
    $(this).remove();
  });
};

Game.enemyHit = function enemyHit() {
  if (Game.$ammo.length === 0) return console.log('reload');
  $(this).remove();
  $('#score').html(parseInt($('#score').html()) + 10);
  console.log('hit!');
};

Game.hitListener = function(a) {
  $(a).on('click', this.enemyHit);
};

Game.enemySelectorOne = function()  {
  var newEnemy = Math.floor(Math.random()*3);
  switch (newEnemy) {
    case 0:
      this.$range.append('<div id="enemyOne"></div>');
      this.moveLeft('#enemyOne', '0px');
      this.hitListener('#enemyOne');
      break;
    case 1:
      this.$range.append('<div id="enemyTwo"></div>');
      this.moveRight('#enemyTwo', '100%');
      this.hitListener('#enemyTwo');
      break;
    case 2:
      this.$range.append('<div id="enemyThree"></div>');
      this.moveLeft('#enemyThree', '0px');
      this.hitListener('#enemyThree');
      break;
  }
};

Game.enemySelectorTwo = function()  {
  var newEnemy = Math.floor(Math.random()*3);
  switch (newEnemy) {
    case 0:
      this.$range.append('<div id="enemyFour"></div>');
      this.moveRight('#enemyFour', '100%');
      this.hitListener('#enemyFour');
      break;
    case 1:
      this.$range.append('<div id="enemyFive"></div>');
      this.moveLeft('#enemyFive', '0px');
      break;
    case 2:
      this.$range.append('<div id="enemySix"></div>');
      this.moveRight('#enemySix', '100%');
      this.hitListener('#enemySix');
      break;
  }
};

Game.shoot = function shoot() {
  if (this.$ammo.length === 0) return console.log('Please reload');
  console.log('Shot fired!');
  this.$ammoBox.removeChild(this.$ammo[0]);
};

Game.shotListener = function() {
  this.$range.on('click', this.shoot.bind(this));
};

Game.createEnemies = function () {
  setInterval(this.enemySelectorOne.bind(this), this.enemyInterval);
};

Game.createEnemiesTwo = function () {
  setInterval(Game.enemySelectorTwo.bind(Game), 10000);
};

Game.levels = function () {
  this.createEnemies();
  setTimeout(this.createEnemiesTwo, this.levelOneDelay);
};


Game.buildGrid = function () {

  $('.controls').append('<div id="score"></div>');
  $('.controls').append('<div id="reload"></div>');
  $('.controls').append('<div id="ammoBox"></div>');
  $('#ammoBox').append('<ul></ul>');

  this.numberOfBullets  = 6;
  this.enemyInterval    = 5000;
  this.$ammoBox         = $('#ammoBox');
  this.$ammo            = $('.ammo');
  this.$reloadBox       = $('#reload');
  this.$range           = $('#range');
  this.levelOneDelay    = this.enemyInterval * 4;

  this.shotListener();
  this.levels();
  this.reload();
  Game.addAmmo();
};

// Game.startMenu = function() {
//
// }

window.onload = Game.buildGrid.bind(Game);



// Deprecated
//
// Game.damage = function () {
//   if (document.getElementsByClassName('health').length === 1) {
//     $('#healthBox :last-child').remove();
//     $('#grid').remove();
//     Game.gameOver = document.createElement('li');
//     document.getElementsByClassName('grid').appendChild(Game.gameOver);
//     Game.gameOver.setAttribute('class', 'gameOver');
//     $('gameOver').html('GAME OVER!');
//   } else {
//     $('#healthBox :last-child').remove();
//   }
// };


// counter ++ for score
// for loop for grid listening for shot/potentially jQuery
// random point on the screen
// random number for difficulty


// pseudo code

// grid on top of a background image
// boxes on the grid become clickable in a certain series (fixed)
// player has to click each box before a timer runs out
// if the player fails to click the box in time they lose some life
// if life runs out game over
// 10 points for each kill


// add reload function
// add more levels through constructor functions
// add difficulty by decresing time/adding miss probability
// add bonus sniper level
// add multiple background images and a hover listener function for moving gun
// add friendlies

//css
// image for terrorists
// image for background
// cursor change
// animations??


//set timeout`
//adding then removing the class
//set interval
