var map = [
  "**********",
  "*        *",
  "*        *",
  "* ****** *",
  "*        *",
  "*        *",
  "* ****** *",
  "*        *",
  "*        *",
  "**********",
];

var V_UP = [0,-1];
var V_LEFT = [-1,0];
var V_RIGHT= [1,0];
var V_DOWN = [0,1];
var V_NONE = [0,0];

function init() {
  var stage = new createjs.Stage("demoCanvas");
  var map_data = buildMap(1024,800)
  for (t in map_data.tiles) {
    console.log(tiles[t]);
    stage.addChild(tiles[t]);
  }
  var ninja = {};
  ninja.avatar  = new createjs.Shape();
  ninja.radius = Math.min(map_data.t_dim.w, map_data.t_dim.h)/4;
  ninja.avatar.graphics.beginFill("black").drawCircle(0, 0, ninja.radius);
  ninja.avatar.x = 512;
  ninja.avatar.y = 400;
  ninja.direction = V_NONE;
  stage.addChild(ninja.avatar);
  createjs.Ticker.addEventListener("tick", handleTick);

  document.addEventListener('keydown', function(event) { keyDown(event, ninja); });
  document.addEventListener('keyup', function(event) { keyUp(event, ninja); });
  // TODO: framerate stuff
  function handleTick(event) {
    move(ninja,map_data);
    stage.update()
  }
}
function move(ninja,map_data) {
  var dir = ninja.direction
  var new_x = ninja.avatar.x + (dir[0] * 5);
  var new_y = ninja.avatar.y + (dir[1] * 5);
  var tile_x = Math.floor((new_x + (dir[0] * ninja.radius)) / map_data.t_dim.w);
  var tile_y = Math.floor((new_y + (dir[1] * ninja.radius)) / map_data.t_dim.h);
  if (map[tile_y][tile_x] != "*") {
    ninja.avatar.x += ninja.direction[0] * 5;
    ninja.avatar.y += ninja.direction[1] * 5;
  }
}

function keyDown(event, ninja) {
  switch (event.keyCode) {
    case 37:
      ninja.direction = V_LEFT;
      break;
    case 38:
      ninja.direction = V_UP;
      break;
    case 39:
      ninja.direction = V_RIGHT;
      break;
    case 40:
      ninja.direction = V_DOWN;
      break;
  }
}

function keyUp(event, ninja) {
  ninja.direction = V_NONE;
}

// Map
function buildMap(w, h) {

  var t_dim = {
    h: h / (10),
    w: w / (map[0].length)
  };
  var y = 0;
  var x = 0;
  var tile;
  tiles = []
  var wall = new createjs.Shape();
  wall.graphics.beginFill("#444").drawRect(0,0,t_dim.w,t_dim.h);
  var floor = new createjs.Shape();
  floor.graphics.beginFill("#eee").drawRect(0,0,t_dim.w,t_dim.h);;
  var tile;
  for (;y < 10; y++) {
    x = 0;
    for (; x < map[0].length; x++) {
      if (map[y][x] == '*') {
        tile = wall.clone();
      } else {
        tile = floor.clone();
      }
      tile.x = x * t_dim.w;
      tile.y = y * t_dim.h;
      tiles.push(tile);
    }
  }
  return {tiles:tiles, t_dim:t_dim};

}
