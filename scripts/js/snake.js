// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$(function() {
  var Snake, canvas, cell, checkCollision, createFood, ctx, d1, d2, dt1, dt2, food, h, h_px, init, paint, paintCell, primary, s1, s1_array, s2, s2_array, score1, score2, secondary, w, w_px;
  primary = '#f40';
  secondary = '#333';
  canvas = $('#canvas');
  ctx = canvas[0].getContext('2d');
  w_px = canvas.width();
  h_px = canvas.height();
  cell = 10;
  w = w_px / cell;
  h = h_px / cell;
  Snake = (function() {
    function Snake(direction, load_pos) {
      this.direction = direction;
      this.load_pos = load_pos;
      this.checkCollision = __bind(this.checkCollision, this);
      this.step = __bind(this.step, this);
      this.init = __bind(this.init, this);
    }

    Snake.prototype.init = function() {
      var dir, dir_temp, nodes;
      nodes = [];
      dir = this.direction;
      dir_temp = this.direction;
      return {
        score: 0,
        speed: 5
      };
    };

    Snake.prototype.step = function() {
      var tail1, x_head, y_head;
      x_head = this.nodes[0].x;
      y_head = this.nodes[0].y;
      this.dir = this.dir_temp;
      switch (this.dir) {
        case "right":
          x_head++;
          break;
        case "left":
          x_head--;
          break;
        case "up":
          y_head--;
          break;
        case "down":
          y_head++;
      }
      if (checkCollision() === true) {
        init(0);
      } else if (lead_x1 === food.x && lead_y1 === food.y) {
        tail1 = {
          x: lead_x1,
          y: lead_y1
        };
        score1++;
        return createFood();
      } else {
        tail1 = s1_array.pop();
        tail1.x = lead_x1;
        return tail1.y = lead_y1;
      }
    };

    Snake.prototype.checkCollision = function() {
      var node, _i, _len, _ref, _ref1, _ref2;
      if ((0 <= (_ref = this.x_head) && _ref < w) && (0 <= (_ref1 = this.y_head) && _ref1 < h)) {
        _ref2 = this.nodes;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          node = _ref2[_i];
          if (node.x === this.x_head && node.y === this.y_head) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    };

    return Snake;

  })();
  s1 = new Snake("right", 0);
  s2 = new Snake("left", 0);
  d1 = dt1 = 'right';
  d2 = dt2 = 'left';
  score1 = 0;
  score2 = 0;
  food = '';
  s1_array = [];
  s2_array = [];
  checkCollision = function(x, y, array1, array2) {
    var full_array, pos, _i, _len;
    full_array = array1.concat(array2);
    if ((0 <= x && x < w) && (0 <= y && y < h)) {
      for (_i = 0, _len = full_array.length; _i < _len; _i++) {
        pos = full_array[_i];
        if (pos.x === x && pos.y === y) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };
  createFood = function() {
    return food = {
      x: Math.round(Math.random() * (w - 1)),
      y: Math.round(Math.random() * (h - 1))
    };
  };
  paintCell = function(x, y) {
    ctx.fillStyle = primary;
    return ctx.fillRect(x * cell, y * cell, cell, cell);
  };
  paint = function() {
    var c, lead_x1, lead_x2, lead_y1, lead_y2, score_text, tail1, tail2, _i, _j, _len, _len1;
    ctx.fillStyle = secondary;
    ctx.fillRect(0, 0, w_px, h_px);
    lead_x1 = s1_array[0].x;
    lead_y1 = s1_array[0].y;
    lead_x2 = s2_array[0].x;
    lead_y2 = s2_array[0].y;
    d1 = dt1;
    d2 = dt2;
    switch (d1) {
      case "right":
        lead_x1++;
        break;
      case "left":
        lead_x1--;
        break;
      case "up":
        lead_y1--;
        break;
      case "down":
        lead_y1++;
    }
    switch (d2) {
      case "right":
        lead_x2++;
        break;
      case "left":
        lead_x2--;
        break;
      case "up":
        lead_y2--;
        break;
      case "down":
        lead_y2++;
    }
    if (checkCollision(lead_x1, lead_y1, s1_array, s2_array) === true) {
      init(0);
      return;
    } else if (lead_x1 === food.x && lead_y1 === food.y) {
      tail1 = {
        x: lead_x1,
        y: lead_y1
      };
      score1++;
      createFood();
    } else {
      tail1 = s1_array.pop();
      tail1.x = lead_x1;
      tail1.y = lead_y1;
    }
    if (checkCollision(lead_x2, lead_y2, s1_array, s2_array) === true) {
      init(0);
      return;
    } else if (lead_x2 === food.x && lead_y2 === food.y) {
      tail2 = {
        x: lead_x2,
        y: lead_y2
      };
      score2++;
      createFood();
    } else {
      tail2 = s2_array.pop();
      tail2.x = lead_x2;
      tail2.y = lead_y2;
    }
    s1_array.unshift(tail1);
    s2_array.unshift(tail2);
    for (_i = 0, _len = s1_array.length; _i < _len; _i++) {
      c = s1_array[_i];
      paintCell(c.x, c.y);
    }
    for (_j = 0, _len1 = s2_array.length; _j < _len1; _j++) {
      c = s2_array[_j];
      paintCell(c.x, c.y);
    }
    paintCell(food.x, food.y);
    score_text = "Score 1: " + score1 + "     Score 2: " + score2;
    return ctx.fillText(score_text, 5, h_px - 5);
  };
  $(document).keydown(function(e) {
    switch (e.which) {
      case 37:
        if (d1 !== "right") {
          return dt1 = "left";
        }
        break;
      case 38:
        if (d1 !== "down") {
          return dt1 = "up";
        }
        break;
      case 39:
        if (d1 !== "left") {
          return dt1 = "right";
        }
        break;
      case 40:
        if (d1 !== "up") {
          return dt1 = "down";
        }
        break;
      case 65:
        if (d2 !== "right") {
          return dt2 = "left";
        }
        break;
      case 87:
        if (d2 !== "down") {
          return dt2 = "up";
        }
        break;
      case 68:
        if (d2 !== "left") {
          return dt2 = "right";
        }
        break;
      case 83:
        if (d2 !== "up") {
          return dt2 = "down";
        }
    }
  });
  init = function(num) {
    var game_loop, i, _i;
    s1_array = [];
    s2_array = [];
    for (i = _i = 4; _i >= 0; i = --_i) {
      s1_array.push({
        x: i,
        y: 0
      });
      s2_array.push({
        x: w - 1 - i,
        y: h - 1
      });
    }
    d1 = dt1 = 'right';
    d2 = dt2 = 'left';
    score1 = score2 = 0;
    createFood();
    if (num === 0) {
      clearInterval(game_loop);
    }
    if (num === 1) {
      return game_loop = setInterval(paint, 60);
    }
  };
  return init(1);
});

/*
//@ sourceMappingURL=snake.map
*/
