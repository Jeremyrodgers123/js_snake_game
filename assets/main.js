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
  currentDirection: "r",
  currentPosition: [[19,19]],
  biteself : function(){
  var size = snake.currentPosition.length

    while (size > 1 ) {
      var array = size - 1
      var x_cordinate = snake.currentPosition[array][0]
      var y_cordinate = snake.currentPosition[array][1]
      if (snake.currentPosition[0][0]=== x_cordinate && snake.currentPosition[0][1] === y_cordinate) {
        alert("game over")
      // end game
      snake.currentPosition[0][0] = 42
      snake.currentPosition[0][1] = 42
      offGrid()
      }
    size = size -1 
    }
  }
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
    if(snake.currentPosition[0][0] === food.currentPosition[0] && snake.currentPosition[0][1] === food.currentPosition[1]){
      console.log("is Eaten if statement")
      this.randomNumber1 = this.randomNumGen();
      this.randomNumber2 = this.randomNumGen();
      food.place();
      food.currentPosition = []
      food.currentPosition.push(food.randomNumber1,food.randomNumber2)

      return true;   
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
    //console.log("move.directions")
    //console.log(snake.currentDirection)
    if (snake.currentDirection === "l" || snake.currentDirection === "r"){
      //console.log("directions function")
      this.leftandright();
    }else if(snake.currentDirection === "u" || "d"){
      this.upanddown();
    }
  },
  upanddown : function(){
    //console.log("up and down selections")
    var head_x_axis = snake.currentPosition[0][0]
    var head_y_axis = snake.currentPosition[0][1]
    var tail_array_index = snake.currentPosition.length -1
    var tail_x_axis = snake.currentPosition[tail_array_index][0];
    var tail_y_axis = snake.currentPosition[tail_array_index][1];
    if (snake.currentDirection === "u"){
      var movement = -1
    }else{
      var movement = +1 
    }

    // move the snake one spot left
    head_y_axis = head_y_axis + movement
    

    console.log("snake current position before unshift")
    console.log(snake.currentPosition)
    snake.currentPosition.unshift([head_x_axis, head_y_axis])
    

    console.log("snake current position after unshift")
    console.log(snake.currentPosition)
   

     //check to see if the food is eaten
     //food.isEaten()
    if (food.isEaten()){
      move.addBlock(head_x_axis,head_y_axis);
      console.log('current position after add')
      console.log(snake.currentPosition)
    }else{
    // remove block

    move.removeBlock(tail_x_axis,tail_y_axis);
    snake.currentPosition.pop()
    move.addBlock(head_x_axis,head_y_axis);
    console.log("snake current position")
    console.log(snake.currentPosition)
   }



    
  },
  leftandright : function(){
    console.log("left and right selections")
    var head_x_axis = snake.currentPosition[0][0];
    var head_y_axis = snake.currentPosition[0][1];
    var tail_array_index = snake.currentPosition.length -1
    var tail_x_axis = snake.currentPosition[tail_array_index][0];
    var tail_y_axis = snake.currentPosition[tail_array_index][1];

    var movement = snake.currentDirection === "l" ? -1 : +1;
    // move the snake one spot left
    head_x_axis = head_x_axis + movement
     
    console.log("snake current position before unshift")
    console.log(snake.currentPosition)
    snake.currentPosition.unshift([head_x_axis, head_y_axis])
    

    console.log("snake current position after unshift")
    console.log(snake.currentPosition)
   
    //check to see if the food is eaten
    if (food.isEaten()){
       move.addBlock(head_x_axis,head_y_axis);
    }else{
      move.removeBlock(tail_x_axis,tail_y_axis);
      snake.currentPosition.pop()
      move.addBlock(head_x_axis,head_y_axis);
    }  
  },
  removeBlock: function(x_axis, y_axis){
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $deletable_div = $div.eq(x_axis)
    $deletable_div.replaceWith('<div class = "block"> </div>');
    return;
  },

  addBlock : function(x_axis, y_axis){
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $div = $div.eq(x_axis)
    $div.replaceWith('<div class = "block"> O </div>');
  }

}
var makeMove = function () {
  console.log(snake.currentPosition[0])
  move.directions();
  offGrid();
  snake.biteself();
};

var offGrid = function(){
  if(
      (snake.currentPosition[0][0] < 40) && 
      (snake.currentPosition[0][1] < 40) && 
      (snake.currentPosition[0][0] >= 0) &&
      (snake.currentPosition[0][1] >= 0)
      ){
    turn();
  }else{
    return;
  }
};

var turn = function(){
  setTimeout(makeMove, 300);
};
//initial move

console.log(food.currentPosition);

console.log(food.randomNumber2);
food.place();
turn();

    
});
