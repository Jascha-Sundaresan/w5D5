function Game(gameBoard, readerInterface){
  this.reader = readerInterface();
  this.currentMark = 'x';
  this.gameBoard = gameBoard;
}

Game.prototype.promptMove = function (callback) {
  var currentGame = this;
  currentGame.reader.question("Enter x value to mark: ", function(xAxis) {
    currentGame.reader.question("Enter y value to mark: ", function(yAxis) {
      var xPos = parseInt(xAxis, 10);
      var yPos = parseInt(yAxis, 10);
      var pos = [xPos, yPos];
      callback(pos);
    });      
  });    
};

Game.prototype.move = function(pos) {
  if (this.validMove(pos)) {
    this.gameBoard.placeMark(pos, this.currentMark);
    return true;
  } else {
    return false;
  }
};

Game.prototype.validMove = function(pos){
  if (this.gameBoard.empty(pos)){
    return true;
  } else {
    return false;
  }
};

Game.prototype.swapCurrentMark = function(){
  if(this.currentMark === 'x'){
    this.currentMark = 'o';
  } else {
    this.currentMark = 'x';
  }
  console.log("Current Mark: " + this.currentMark);
};

Game.prototype.run = function(completionCallback){
  var tTTGame = this;
  this.gameBoard.display();
  this.swapCurrentMark();
  this.promptMove(function(pos) {
    if (tTTGame.move(pos) === false) {
      console.log("Can't place a mark there");
      tTTGame.swapCurrentMark();
    }
    if (!tTTGame.gameBoard.won()) {
      tTTGame.run(completionCallback);
    } else {
      console.log(tTTGame.gameBoard.winner + " wins!");
      return completionCallback();
    }
  });
  
};

module.exports = Game;