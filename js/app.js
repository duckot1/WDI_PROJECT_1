var Game = Game || {};

Game.hitListener2 = function(a, b) {
  Game.targets = document.getElementsByClassName('target');
  Game.targets[0].addEventListener('click', function(){
    this.className = 'boxes';
  });
  Game.targets[1].addEventListener('click', function(){
    this.className = 'boxes';
  });
  if (Game.targets.length > 0) {
    Game.setTargetTwo(a + 10, b + 15);
  }
};

Game.setTargetTwo = function(a, b) {
  Game.boxes = document.getElementsByClassName('boxes');
  Game.boxes[a].setAttribute('class', 'target');
  Game.boxes[b].setAttribute('class', 'target');
  Game.hitListener2(a, b);
};

Game.hitListener = function(b) {
  Game.target = document.getElementsByClassName('target');
  Game.target[0].addEventListener('click', function(){
    Game.target[0].className = 'boxes';
    if (b < 48){
      Game.setTarget(b + 18);
      console.log(b);
    } else {
      Game.setTargetTwo(14, 58);
    }
  });
};


Game.setTarget = function (a) {
  Game.boxes = document.getElementsByClassName('boxes');
  Game.boxes[a].setAttribute('class', 'target');
  Game.hitListener(a);
};

Game.buildGrid = function () {
  for (var i = 0; i < 80; i++) {
    Game.box = document.createElement('li');
    document.getElementById('grid').appendChild(Game.box);
    Game.box.setAttribute('class', 'boxes');
  }
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
