var Game = Game || {};

Game.gameOver = function() {
  $('#range').append('<div class="finalScore"></div>');
  $('.finalScore').html('You scored ' + Game.$score.html() + '. Play Again?');
  if (parseInt((Game.$score).html()) > 100) {
    $('.finalScore').append('<button id="nextLevel">Next level</button>');
    $('#nextLevel').on('click', function(){
      $('.finalScore').remove();
      Game.enemyInterval = Game.enemyInterval * 0.8;
      Game.moveAwaySpeed = Game.moveAwaySpeed * 0.8;
      Game.timesRunOne = 0;
      Game.timesRunTwo = 0;
      Game.timesRunThree = 0;
      Game.enemyOnetimes = Game.enemyOnetimes * 1.5;
      Game.enemyTwotimes = Game.enemyTwotimes * 1.5;
      Game.levels();
    });
  } else {
    $('.finalScore').append('<button id="reset">Play Again</button>');
    $('#reset').on('click', function(){
      $('.finalScore').remove();
      Game.$score.html(0);
      Game.levels();
    });
  }

  console.log('gameOver');
};

Game.damage = function () {
  if (document.getElementsByClassName('health').length === 1) {
    $('#healthBox :last-child').remove();
    console.log('Game over');
  } else {
    $('#healthBox :last-child').remove();
  }
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

Game.moveAway = function(a, b, c) {
  $(a).animate({left: b, top: c, height: '+=200px', width: '+=200px'}, Game.moveAwaySpeed, function(){
    $(this).remove();
    Game.damage();
  });
};

Game.moveAcross = function(a, b) {
  $(a).animate({left: b}, Game.moveAcrossSpeed, function(){
    $(this).remove();
  });
};

Game.healthRegen = function healthRegen() {
  if (Game.ammo.length === 0) return console.log('reload');
  $(this).stop();
  $(this).remove();
  if (document.getElementsByClassName('health').length < 5) {
    $('#healthBox').append('<li class="health"></li>');
  }
  console.log('hit!');
};

Game.healthListener = function(a) {
  $(a).on('click', this.healthRegen);
};

Game.enemyHit = function enemyHit() {
  if (Game.ammo.length === 0) return console.log('reload');
  $(this).stop();
  $(this).remove();
  Game.$score.html(parseInt(Game.$score.html()) + 10);
  console.log('hit!');
};

Game.hitListener = function(a) {
  $(a).on('click', this.enemyHit);
};

Game.enemySelectorOne = function()  {
  if (Game.timesRunOne < Game.enemyOnetimes){
    Game.timesRunOne += 1;
    var newEnemy = Math.floor(Math.random()*3);
    switch (newEnemy) {
      case 0:
        this.$range.append('<div id="enemyOne"></div>');
        this.moveAway('#enemyOne', '325px', '200px');
        this.hitListener('#enemyOne');
        break;
      case 1:
        this.$range.append('<div id="enemyTwo"></div>');
        this.moveAway('#enemyTwo', '525px', '200px');
        this.hitListener('#enemyTwo');
        break;
      case 2:
        this.$range.append('<div id="enemyThree"></div>');
        this.moveAway('#enemyThree', '725px', '200px');
        this.hitListener('#enemyThree');
        break;
    }
  } else {
    clearInterval(Game.spawn);
  }
};

Game.enemySelectorTwo = function()  {
  if (Game.timesRunTwo < Game.enemyTwotimes){
    Game.timesRunTwo += 1;
    var newEnemy = Math.floor(Math.random()*3);
    switch (newEnemy) {
      case 0:
        this.$range.append('<div id="enemyFour">a</div>');
        this.moveAway('#enemyFour', '325px', '400px');
        this.hitListener('#enemyFour');
        break;
      case 1:
        this.$range.append('<div id="enemyFive">a</div>');
        this.moveAway('#enemyFive', '525px', '400px');
        this.hitListener('#enemyFive');
        break;
      case 2:
        this.$range.append('<div id="enemySix">a</div>');
        this.moveAway('#enemySix', '725px', '400px');
        this.hitListener('#enemySix');
        break;
    }
  } else {
    clearInterval(Game.spawn);
  }
};

Game.healthSelector = function()  {
  if (Game.timesRunThree < 8){
    Game.timesRunThree += 1;
    var newEnemy = Math.floor(Math.random()*3);
    switch (newEnemy) {
      case 0:
        this.$range.append('<div id="healthOne"></div>');
        this.moveAcross('#healthOne', '100%');
        this.healthListener('#healthOne');
        break;
      case 1:
        this.$range.append('<div id="healthTwo"></div>');
        this.moveAcross('#healthTwo', '0px');
        this.healthListener('#healthTwo');
        break;
      case 2:
        this.$range.append('<div id="healthThree"></div>');
        this.moveAcross('#healthThree', '100%');
        this.healthListener('#healthThree');
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
  Game.spawn = setInterval(Game.enemySelectorTwo.bind(Game), Game.enemyInterval);
};

Game.createHealth = function () {
  Game.timesRunThree = 0;
  Game.spawn = setInterval(Game.healthSelector.bind(Game), 10000);
};

Game.levels = function () {
  this.createEnemies();
  this.createHealth();
  setTimeout(this.createEnemiesTwo, this.levelOneDelay);
  setTimeout(this.gameOver, this.gameLength);
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
  this.gameLength       = 70000;
  this.$score           = $('#score');
  Game.moveAwaySpeed    = 3000;
  Game.moveAcrossSpeed  = 3000;
  Game.enemyOnetimes    = 16;
  Game.enemyTwotimes    = 11;

  this.addAmmo();
  this.shotListener();
  this.reload();
  this.levels();
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
