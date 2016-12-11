var Game = Game || {};

Game.reload = function () {
  Game.ammo = document.getElementsByClassName('ammo');
  document.getElementById('reload').addEventListener('click', function(){
    for (var j = 0; j < (6 - Game.ammo.length); j++) {
      Game.bullet = document.createElement('li');
      document.getElementById('ammoBox').appendChild(Game.bullet);
      Game.bullet.setAttribute('class', 'ammo');
      console.log(Game.ammo.length);
    }
  });
};

Game.checkEnemies = function (a, b) {
  if (Game.targets.length === 0){
    clearTimeout(Game.timer);
    if (b < 72) {
      Game.setTargetTwo(a + 5, b + 6);
    } else {
      Game.setTargetThree();
    }
  }
};

Game.damage = function () {
  if (document.getElementsByClassName('health').length === 1) {
    $('#healthBox :last-child').remove();
    $('#grid').remove();
    Game.gameOver = document.createElement('li');
    document.getElementById('grid').appendChild(Game.gameOver);
    Game.gameOver.setAttribute('class', 'gameOver');
    $('gameOver').html('GAME OVER!');
  } else {
    $('#healthBox :last-child').remove();
  }
};

Game.setTargetThree = function() {
  console.log('game over');
};

Game.hitListener2 = function(a, b) {
  Game.ammo = document.getElementsByClassName('ammo');
  Game.targets = document.getElementsByClassName('target');
  Game.targets[1].addEventListener('click', function(){
    if (Game.ammo.length === 0) {
      console.log('reload');
    } else {
      this.className = 'boxes';
      console.log(Game.targets.length);
      Game.checkEnemies(a, b);
    }
  });
  Game.targets[0].addEventListener('click', function(){
    if (Game.ammo.length === 0) {
      console.log('reload');
    } else {
      this.className = 'boxes';
      console.log(Game.targets.length);
      Game.checkEnemies(a, b);
    }
  });
  Game.reload();
};

Game.setTargetTwo = function(a, b) {
  Game.ammo = document.getElementsByClassName('ammo');
  Game.boxes = document.getElementsByClassName('boxes');
  Game.boxes[a].setAttribute('class', 'target');
  Game.boxes[b].setAttribute('class', 'target');
  Game.hitListener2(a, b);
  Game.timer = setTimeout(Game.damage, 4000);
};

Game.hitListener = function(b) {
  Game.ammo = document.getElementsByClassName('ammo');
  Game.target = document.getElementsByClassName('target');
  Game.target[0].addEventListener('click', function(){
    if (Game.ammo.length === 0) {
      console.log('reload');
    } else {
      clearTimeout(Game.timer);
      Game.target[0].className = 'boxes';
      if (b < 48){
        Game.setTarget(b + 18);
        console.log(b);
      } else {
        Game.setTargetTwo(14, 58);
      }
    }
  });
  Game.reload();
};



Game.shotListener = function() {
  Game.ammo = document.getElementsByClassName('ammo');
  Game.boxes = document.getElementsByClassName('boxes');
  for (var i = 0; i < Game.boxes.length; i++) {
    Game.boxes[i].addEventListener('click', function(){
      if (Game.ammo.length === 0) {
        console.log('reload');
      } else {
        console.log('bang');
        document.getElementById('ammoBox').removeChild(Game.ammo[0]);
      }
    });
  }
  Game.reload();
};

Game.setTarget = function (a) {
  Game.boxes = document.getElementsByClassName('boxes');
  Game.boxes[a].setAttribute('class', 'target');
  Game.hitListener(a);
  Game.timer = setTimeout(Game.damage, 2000);
};






Game.buildGrid = function () {
  for (var i = 0; i < 80; i++) {
    Game.box = document.createElement('li');
    document.getElementById('grid').appendChild(Game.box);
    Game.box.setAttribute('class', 'boxes');
  }
  for (var j = 0; j < 6; j++) {
    Game.bullet = document.createElement('li');
    document.getElementById('ammoBox').appendChild(Game.bullet);
    Game.bullet.setAttribute('class', 'ammo');
  }
  Game.shotListener();
  Game.setTarget(13);
};



window.onload = function() {
  Game.buildGrid();
};



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
