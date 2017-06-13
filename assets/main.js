$(document).ready(function(){
	$('h1').click(function(){
		$(this).hide();
	})

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

var snake = {
  intialPosition: [20,20],
  currentDirection: "r", /**Changed from initial direction w/o verification**/
  currentPosition: [19,19]
}

$(document).keydown(function(event){
  event.preventDefault();
  var key = event.which;
  if (key === 37){
    console.log("turn left!");
    snake.currentDirection = "l";
    console.log(snake.currentDirection);
  } else if (key === 38){
    console.log("Up! Up! Up");
     snake.currentDirection = "u";
     console.log(snake.currentDirection);
  } else if (key === 39){
    console.log("Right!");
     snake.currentDirection = "r";
     console.log(snake.currentDirection);
  } else if (key === 40){
    console.log("Down!");
     snake.currentDirection = "d";
     console.log(snake.currentDirection);
  } else {
    console.log("what ya doing?");
  }
});

var move = {
  directions : function(){
    console.log("it worked")
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

    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $deletable_div = $div.eq(x_axis)
    $deletable_div.replaceWith('<div class = "block"> </div>');
    // move the snake one spot left
    y_axis = y_axis + movement
    
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    $div = $div.eq(x_axis)
    $div.replaceWith('<div class = "block"> O </div>');


  },
  leftandright : function(){
    console.log("left and right selections")
    var x_axis = snake.currentPosition[0]
    var y_axis = snake.currentPosition[1]
    var movement = snake.currentDirection === "l" ? -1 : +1
    $rows = $('.row').eq(y_axis)
    $div = $rows.children()
    //remove old position
    $deletable_div = $div.eq(x_axis)
    $deletable_div.replaceWith('<div class = "block"> </div>');
    // move the snake one spot left
    x_axis = x_axis + movement
    $div = $div.eq(x_axis)
    $div.replaceWith('<div class = "block"> O </div>');

  }

}

function endTurn () {
  move.directions();
};

setTimeout(endTurn, 4000)




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

