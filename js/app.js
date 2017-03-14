var Game = Game || {};

Game.gameOver = function() {
  $('#range').append('<div class="finalScore"></div>');
  $('.finalScore').append('<button id="nextLevel">Next level</button>');
  $('#nextLevel').on('click', function(){
    $('.finalScore').remove();
    $('#range').off('click');
    Game.enemyInterval = Game.enemyInterval * 0.1;
    Game.moveAwaySpeed = Game.moveAwaySpeed * 0.1;
    Game.timesRunOne = 0;
    Game.timesRunTwo = 0;
    Game.timesRunThree = 0;
    Game.enemyOnetimes = Game.enemyOnetimes * 1.5;
    Game.enemyTwotimes = Game.enemyTwotimes * 1.5;
    Game.gameLength = 50000;
    Game.levels();
  });
};

Game.damage = function () {
  if (document.getElementsByClassName('health').length === 1) {
    $('#healthBox :last-child').remove();
    Game.$range.off('click');
    $('#reload').off('click');
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

Game.shake = function shake(a) {
  var div = document.getElementsByClassName(a);
  var interval = 100;
  var distance = 10;
  var times = 4;
  $(div).css('position', 'relative');
  for (var iter = 0; iter < (times + 1) ; iter++) {
    $(div).animate({
      left: ((iter % 2 === 0 ? distance : distance * -1))
    }, interval);
  }
  $(div).animate({ left: 0 }, interval);
};

Game.moveAway = function(a, b, c, d, e) {
  $(a).animate({left: b, top: c, height: d, width: e}, Game.moveAwaySpeed, function(){
    $(this).remove();
    Game.shake('controls');
    Game.shake('range');
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

Game.explosion = function (a, b) {
  $('#range').append('<div class="explosion"></div>');
  $('.explosion').css('top', a.top);
  $('.explosion').css('left', a.left);
  $('.explosion').css('width', b);
  $('.explosion').css('height', b);
  Game.explosionRemove = function () {
    $('.explosion').remove();
  };
  setTimeout(Game.explosionRemove, 1000);
};



Game.enemyHit = function enemyHit() {
  if (Game.ammo.length === 0) return console.log('reload');
  if (Game.health.length === 0) return console.log('you are dead');
  var position = $(this).position();
  var width = $(this).width();
  $(this).remove();
  $(this).stop();
  Game.explosion(position, width);
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
        this.$range.append('<div class="enemy" id="enemyOne"></div>');
        this.moveAway('#enemyOne', '325px', '200px', '+=200px', '+=200px');
        this.hitListener('#enemyOne');
        break;
      case 1:
        this.$range.append('<div class="enemy" id="enemyTwo"></div>');
        this.moveAway('#enemyTwo', '525px', '200px', '+=200px', '+=200px');
        this.hitListener('#enemyTwo');
        break;
      case 2:
        this.$range.append('<div class="enemy" id="enemyThree"></div>');
        this.moveAway('#enemyThree', '725px', '200px', '+=200px', '+=200px');
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
        this.$range.append('<div class="enemy" id="enemyFour"></div>');
        this.moveAway('#enemyFour', '325px', '400px', '+=150px', '+=150px');
        this.hitListener('#enemyFour');
        break;
      case 1:
        this.$range.append('<div class="enemy" id="enemyFive"></div>');
        this.moveAway('#enemyFive', '525px', '400px', '+=150px', '+=150px');
        this.hitListener('#enemyFive');
        break;
      case 2:
        this.$range.append('<div class="enemy" id="enemySix"></div>');
        this.moveAway('#enemySix', '725px', '400px', '+=150px', '+=150px');
        this.hitListener('#enemySix');
        break;
    }
  } else {
    clearInterval(Game.spawn);
  }
};

Game.healthSelector = function()  {
  if (Game.timesRunThree < 4){
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
  new Audio('./sounds/Laser_Cannon-Mike_Koenig-797224747.wav').play();
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
  Game.spawn = setInterval(Game.healthSelector.bind(Game), 20000);
};

Game.levels = function () {
  this.shotListener();
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
  this.health           = document.getElementsByClassName('health');
  this.$range           = $('#range');
  this.levelOneDelay    = 18000;
  this.gameLength       = 70000;
  this.$score           = $('#score');
  Game.moveAwaySpeed    = 3000;
  Game.moveAcrossSpeed  = 3000;
  Game.enemyOnetimes    = 16;
  Game.enemyTwotimes    = 11;
  Game.asteroids        = [];

  this.addAmmo();
  this.reload();
  this.levels();
};


// Game.startMenu = function() {
//
// }

window.onload = Game.buildGrid.bind(Game);
