# Lost in Space

## Overview
For our first project on the GA Web development immersive we were required to build ourr own game using what we had learned over the first 2 weeks. This is the end product. A first person shooter made using HTML5, CSS3 and jQuery.

#### The game can be played here: <a href="https://desolate-crag-68495.herokuapp.com/">Lost in Space</a>

## How to play

### Story
Lost in Space puts the user in the cockpit of an inter-planetary space shuttle that has found itself in the midst of a dense asteroid feild somewhere in the far reaches of the galaxy. Your only option is to shoot your way out using the ships state of the art Pattern Mk11 Plasma Cannon, capable of turning even the largest of asteroids in to space dust.

### Weapon

Fire your weapon using the left mouse button. Be aware that you have a limited number (6) of charges in each clip. Press the reload button on the dashboard to recharge the clip.

### Health

If you are hit by an Asteroid you will lose 1 health bar. Your health is displayed in the bottom left hand side. If your health is completed depleted, game over. It is possible to regenrate 1 health bar by shooting one of the floating hearts.

## Idea

The idea behind Lost in space came from first person/ gallery shooters such as Tim Crisis and Point Blank. I decided early on to go with a space theme.

## JavaScript/jQuery
When I came up with the idea there were a number of features that I wanted to include.

### Animation
I quickly found a simple jQuey method that allowed me to move / alter the dimentions of divs (asteroids). I had to pass through a number of parameters including the new size / position (top and left).

I could also add a call back function to the animate method, which would only run if the animation was comleted. This allowed me to perform damage.

```
  $(a).animate({left: b, top: c, height: d, width: e}, Game.moveAwaySpeed, function(){
    $(this).remove();
    Game.shake('controls');
    Game.shake('range');
    Game.damage();
  });
```

### Hit detection
Once the animation was sorted I needed to add hit detection. This was achieved by adding an eventlistener to each div (asteroid).

The hit detector will also stop the animation and therefore avoid any damage (see above).

### Reload
An event listener was added to the range div (body of space) so that anytime the user fires it will perform a function that removes 1 li from the clip in the bottom left. If this clip (ul) is empty, or if the $('.ammoBox').length = 0 then the user will be unable to shoot the weapon. If the user then click on the reload button this will then refill the clip.

```
Game.addAmmo = function addAmmo() {
  var j = 0;
  var numberOfBullets = 6 - Game.ammo.length;
  for     (j; j < numberOfBullets; j++) {
    Game.bullet = document.createElement('li');
    Game.ammoBox.appendChild(Game.bullet);
    Game.bullet.setAttribute('class', 'ammo');
  }
}; 
```

## CSS
I wanted to give the idea that the user is sat inside a spaceship looking out into space. I achieved this simply by finding a basic dashboard and adding it to a background image of space. I downloaded the reload font from google fonts.

## Summary
Being a big fan of first person shooters myslef, this game was extremely satisfying to develop. I felt that I achieved what was set out in terms of features and styling. If I was add something it would be a more fluid leveling system. And an end to the game...




