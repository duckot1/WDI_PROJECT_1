var Game = Game || {};

Game.buildGrid = function () {
  for (var i = 0; i < 144; i++) {
    Game.box = document.createElement('li');
    document.getElementById('grid').appendChild(Game.box);
  }
  console.log(Game.box);
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
