$(document).ready(function(){
	$('h1').click(function(){
		$(this).hide();
	})
// create a grid object
var grid = {
  createRow : function (row_squares) {
    var row = []
    for (i=0; i < row_squares; i++) {
    	var cell = [" "];
    	row.push(cell);
    }
    console.log("createRow successful");
    return row;
  },
  createColumns : function (row) {
    grid_build = [];
    for (i=0; i< 40; i++) {
      grid_build.push(row)
    }
    console.log("createColumns successful");
    return grid_build;
  }
};
var new_rows = grid.createRow(40);
var snake_grid = grid.createColumns(new_rows);
//render the grid
function render(snake_grid) {
  console.log("begin render");
  for (row in snake_grid) {
    var block = snake_grid[row]
    $('.container').append('<div class= "row clearfix"> </div>')
    var $last = $('.row').last()    
    for (i = 0; i< 40; i++){
      $last.append('<div class = "block">'+block[i]+'</div>')
    }
  }
  $centerRow = $('.row').eq(19);
  $centerRowBlocks = $centerRow.children();
  $centerBlock = $centerRowBlocks.eq(19)
  $centerBlock = $centerBlock.replaceWith('<div class = "block"> O </div>');
  
}
render(snake_grid);
//define the snake
var snake = {
  intialPosition: [20,20],
  currentDirection: "r", /**Changed from initial direction w/o verification**/
  currentPosition: [19,19],
  currentLength: 1
}
var food = {

  randomNumGen   : function(){
    number = Math.floor(Math.random() * 39);
    return number;
  },
  randomNumber1  : Math.floor(Math.random() * 39),
  randomNumber2  : Math.floor(Math.random() * 39),
  currentPosition: [],

  place          : function(){
    $y_place = $('.row').eq(this.randomNumber2)
    $divs = $y_place.children()
    $x_place = $divs.eq(this.randomNumber1)
    $x_place.css("background-color", "red")
  },
  isEaten        : function(){
    console.log(snake.currentPosition);
    console.log(food.currentPosition);
    //figure out why snake.currentPosition and food.currentPostion aren't evaluating to the same thing.
    if(snake.currentPosition[0] === food.currentPosition[0] && snake.currentPosition[1] === food.currentPosition[1]){
      console.log("is Eaten if statement")
      this.randomNumber1 = this.randomNumGen();
      this.randomNumber2 = this.randomNumGen();
      food.place();
      food.currentPosition = []
      food.currentPosition.push(food.randomNumber1,food.randomNumber2)
    }
  }
    
};

food.currentPosition.push(food.randomNumber1,food.randomNumber2)
//change snake direction
$(document).keydown(function(event){
  event.preventDefault();
  var key = event.which;
  if (key === 37){
    console.log("Left!");
    snake.currentDirection = "l";
  } else if (key === 38){
    console.log("Up!");
     snake.currentDirection = "u";
  } else if (key === 39){
    console.log("Right!");
     snake.currentDirection = "r";
  } else if (key === 40){
    console.log("Down!");
     snake.currentDirection = "d";
  } else {
    console.log("what ya doing?");
  }
});

var move = {
  directions : function(){
    console.log("move.directions")
    console.log(snake.currentDirection)
    if (snake.currentDirection === "l" || snake.currentDirection === "r"){
      this.leftandright();
    }else if(snake.currentDirection === "u" || "d"){
      this.upanddown();
    }
  },
  upanddown : function(){
    console.log("up and down selections")
    var x_axis = snake.currentPosition[0]
    var y_axis = snake.currentPosition[1]
    if (snake.currentDirection === "u"){
      var movement = -1
    }else{
      var movement = +1 
    }
    // remove block
    move.removeBlock(x_axis,y_axis);
    /**
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $deletable_div = $div.eq(x_axis)
    $deletable_div.replaceWith('<div class = "block"> </div>');
    **/
    // move the snake one spot left
    y_axis = y_axis + movement
    snake.currentPosition[1] = y_axis
    //check to see if the food is eaten
    food.isEaten()
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $div = $div.eq(x_axis)
    $div.replaceWith('<div class = "block"> O </div>');
  },
  leftandright : function(){
    console.log("left and right selections")
    var x_axis = snake.currentPosition[0]
    var y_axis = snake.currentPosition[1]
    var movement = snake.currentDirection === "l" ? -1 : +1;
    $rows = $('.row').eq(y_axis)
    console.log(x_axis)
    $div = $rows.children()
    //remove old position
    $deletable_div = $div.eq(x_axis)
    $deletable_div.replaceWith('<div class = "block"> </div>');
    // move the snake one spot left
    x_axis = x_axis + movement
    snake.currentPosition[0] = x_axis
    //check to see if the food is eaten
    food.isEaten()
    $div = $div.eq(x_axis)
    $div.replaceWith('<div class = "block"> O </div>');
  },
  removeBlock: function(x_axis, y_axis){
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $deletable_div = $div.eq(x_axis)
    $deletable_div.replaceWith('<div class = "block"> </div>');
    return;
  }

}
var makeMove = function () {
  move.directions();
  offGrid();
};

var offGrid = function(){
  if(
      (snake.currentPosition[0] < 40) && 
      (snake.currentPosition[1] < 40) && 
      (snake.currentPosition[0] >= 0) &&
      (snake.currentPosition[1] >= 0)
      ){
    turn();
  }else{
    return;
  }
};

var turn = function(){
  setTimeout(makeMove, 750);
};
//initial move
console.log(food.currentPosition);

console.log(food.randomNumber2);
food.place();
turn();

    
});

/**
function move () {

  switch (snake.currentDirection) {
    case 'l':
      console.log("take er left");
      $rows = $('.row').eq(snake.currentPosition[1])
      $div = $rows.children()
      //remove old position
      $deletable_div = $div.eq(snake.currentPosition[0])
      $deletable_div.replaceWith('<div class = "block"> </div>');
      // move the snake one spot left
      snake.currentPosition[0] = snake.currentPosition[0] - 1
      $div = $div.eq(snake.currentPosition[0])
      $div.replaceWith('<div class = "block"> O </div>');

      break;
    case 'u':
      console.log("take er up");
      //remove old position
      $rows = $('.row').eq(snake.currentPosition[1])
      $div = $rows.children()
      $deletable_div = $div.eq(snake.currentPosition[0])
      $deletable_div.replaceWith('<div class = "block"> </div>');
      // move the snake one spot left
      snake.currentPosition[1] = snake.currentPosition[1] - 1
      
      $rows = $('.row').eq(snake.currentPosition[1])
      $div = $rows.children()
      $div = $div.eq(snake.currentPosition[0])
      $div.replaceWith('<div class = "block"> O </div>');
      break;
    case 'r':
      console.log("take er right")

      console.log("take er left");
      $rows = $('.row').eq(snake.currentPosition[1])
      $div = $rows.children()
      //remove old position
      $deletable_div = $div.eq(snake.currentPosition[0])
      $deletable_div.replaceWith('<div class = "block"> </div>');
      // move the snake one spot left
      snake.currentPosition[0] = snake.currentPosition[0] + 1
      $div = $div.eq(snake.currentPosition[0])
      $div.replaceWith('<div class = "block"> O </div>');

      break;
    case 'd':
      console.log("down she goes");

      //remove old position
      $rows = $('.row').eq(snake.currentPosition[1])
      $div = $rows.children()
      $deletable_div = $div.eq(snake.currentPosition[0])
      $deletable_div.replaceWith('<div class = "block"> </div>');
      // move the snake one spot left
      snake.currentPosition[1] = snake.currentPosition[1] + 1
      
      $rows = $('.row').eq(snake.currentPosition[1])
      $div = $rows.children()
      $div = $div.eq(snake.currentPosition[0])
      $div.replaceWith('<div class = "block"> O </div>');

      break;
    default:
      console.log("damn it, what now")
  }

};
**/

