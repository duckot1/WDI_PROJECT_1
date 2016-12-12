var Game = Game || {};

Game.gameOver = function() {
  $('#range').append('<div class="finalScore"></div>');
  $('.finalScore').html('You scored ' + Game.$score.html() + '. Play Again?');
  if (Game.$score > 100) {
    $('.finalScore').append('<button id="nextLevel">Next level</button>');
    
  } else {
    $('.finalScore').append('<button id="reset">Play Again</button>');
    $('#reset').on('click', function(){
      $('.finalScore').remove();
      Game.$score.html(0);
      Game.levels.bind(Game);
    });
  }

  console.log('gameOver');
};

Game.addAmmo = function addAmmo() {
  var j = 0;
  var numberOfBullets = 6 - Game.ammo.length;
  for     (j; j < numberOfBullets; j++) {
    Game.bullet = document.createElement('li');
    Game.ammoBox.appendChild(Game.bullet);
    Game.bullet.setAttribute('class', 'ammo');
  }
};

Game.reload = function reload() {
  this.reloadBox.addEventListener('click', this.addAmmo);
};

Game.moveAway = function(a, b) {
  $(a).animate({left: b, top: '50px', height: '-=200px', width: '-=200px'}, 3000, function(){
    $(this).remove();
  });
};

Game.moveAcross = function(a, b) {
  $(a).animate({left: b}, 3000, function(){
    $(this).remove();
  });
};

Game.enemyHit = function enemyHit() {
  if (Game.ammo.length === 0) return console.log('reload');
  $(this).remove();
  Game.$score.html(parseInt(Game.$score.html()) + 10);
  console.log('hit!');
};

Game.hitListener = function(a) {
  $(a).on('click', this.enemyHit);
};

Game.enemySelectorOne = function()  {
  if (Game.timesRunOne < 15){
    Game.timesRunOne += 1;
    var newEnemy = Math.floor(Math.random()*3);
    switch (newEnemy) {
      case 0:
        this.$range.append('<div id="enemyOne"></div>');
        this.moveAway('#enemyOne', '0px');
        this.hitListener('#enemyOne');
        break;
      case 1:
        this.$range.append('<div id="enemyTwo"></div>');
        this.moveAway('#enemyTwo', '100%');
        this.hitListener('#enemyTwo');
        break;
      case 2:
        this.$range.append('<div id="enemyThree"></div>');
        this.moveAway('#enemyThree', '0px');
        this.hitListener('#enemyThree');
        break;
    }
  } else {
    clearInterval(Game.spawn);
  }
};

Game.enemySelectorTwo = function()  {
  if (Game.timesRunTwo < 11){
    Game.timesRunTwo += 1;
    var newEnemy = Math.floor(Math.random()*3);
    switch (newEnemy) {
      case 0:
        this.$range.append('<div id="enemyFour"></div>');
        this.moveAway('#enemyFour', '100%');
        this.hitListener('#enemyFour');
        break;
      case 1:
        this.$range.append('<div id="enemyFive"></div>');
        this.moveAway('#enemyFive', '0px');
        this.hitListener('#enemyFive');
        break;
      case 2:
        this.$range.append('<div id="enemySix"></div>');
        this.moveAway('#enemySix', '100%');
        this.hitListener('#enemySix');
        break;
    }
  } else {
    clearInterval(Game.spawn);
  }
};

Game.enemySelectorThree = function()  {
  if (Game.timesRunThree < 8){
    Game.timesRunThree += 1;
    var newEnemy = Math.floor(Math.random()*3);
    switch (newEnemy) {
      case 0:
        this.$range.append('<div id="enemySeven"></div>');
        this.moveAcross('#enemySeven', '100%');
        this.hitListener('#enemySeven');
        break;
      case 1:
        this.$range.append('<div id="enemyEight"></div>');
        this.moveAcross('#enemyEight', '0px');
        this.hitListener('#enemyEight');
        break;
      case 2:
        this.$range.append('<div id="enemyNine"></div>');
        this.moveAcross('#enemyNine', '100%');
        this.hitListener('#enemyNine');
        break;
    }
  } else {
    clearInterval(Game.spawn);
  }
};

Game.shoot = function shoot() {
  if (this.ammo.length === 0) return console.log('Please reload');
  console.log('Shot fired!');
  this.ammoBox.removeChild(this.ammo[0]);
};

Game.shotListener = function() {
  this.$range.on('click', this.shoot.bind(this));
};

Game.createEnemies = function () {
  Game.timesRunOne = 0;
  Game.spawn = setInterval(this.enemySelectorOne.bind(this), this.enemyInterval);
};

Game.createEnemiesTwo = function () {
  Game.timesRunTwo = 0;
  Game.spawn = setInterval(Game.enemySelectorTwo.bind(Game), 4000);
};

Game.createEnemiesThree = function () {
  Game.timesRunThree = 0;
  Game.spawn = setInterval(Game.enemySelectorThree.bind(Game), 4000);
};

Game.levels = function () {
  this.createEnemies();
  setTimeout(this.createEnemiesTwo, this.levelOneDelay);
  setTimeout(this.createEnemiesThree, 30000);
};

// Game.controls = function() {
//   Game.controls
//   this.reloadButton = document.createElement('div');
//   .appendChild(this.reloadButton);
//   this.reloadButton.setAttribute('id', 'reload');
//   this.ammoBox = document.createElement('div');
//   document.getElementsByClassName('controls').appendChild(this.ammoBox);
//   this.ammoBox.setAttribute('id', 'ammoBox');
//   this.chamber = document.createElement('ul');
//   document.getElementById('ammoBox').appendChild(this.chamber);
//   $('.controls').append('<div id="score"></div>');
// };

Game.buildGrid = function () {

  // this.controls();

  this.numberOfBullets  = 6;
  this.enemyInterval    = 4000;
  this.ammoBox          = document.getElementById('ammoBox');
  this.ammo             = document.getElementsByClassName('ammo');
  this.reloadBox        = document.getElementById('reload');
  this.$range           = $('#range');
  this.levelOneDelay    = 18000;
  this.gameLength       = 5000;
  this.$score           = $('#score');

  this.addAmmo();
  this.shotListener();
  this.reload();
  this.levels();
  setTimeout(this.gameOver, this.gameLength);
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
