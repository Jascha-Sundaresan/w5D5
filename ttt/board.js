Array.prototype.transpose = function () {
  var columns = [];
  for (var i = 0; i < this[0].length; i++) {
    columns.push([]);
  }

  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      columns[j].push(this[i][j]);
    }
  }

  return columns;
};

function Board() {
  this.gameBoard = [["","",""],["","",""],["","",""]];
  
  this.horizontal = function () {
    for(var i = 0; i < 3; i++){
     if(this.gameBoard[i] == "o,o,o"){
       this.winner = 'o';
       return true;
     }else if (this.gameBoard[i] == "x,x,x"){
       this.winner = 'x';
       return true;
     }
   }
   return false;
  };
  
  this.vertical = function () {
    var transBoard = this.gameBoard.transpose()
    if (transBoard.horizontal){
      return true;
    } else {
      return false;
    }
    
  };
  
  this.diagonal = function () {
    var arr1 = [];
    var arr2 = [];
    for(var i = 0; i < 3; i++){
      arr1[i] = this.gameBoard[i][i];
      arr2[i] = this.gameBoard[2 - i][i];
    }
    if (arr1 == "x,x,x" || arr2 == "x,x,x"){
      this.winner = 'x';
      return true;
    } else if (arr1 == "o,o,o" || arr2 == "o,o,o"){
      this.winner = 'o';
      return true;
    } else {
      return false;
    }
    
  };
  
  this.won = function () {
    if (this.horizontal() || this.vertical() || this.diagonal()){
      return true;
    } else {
      return false;
    }
  };
  
  this.empty = function(pos) {
    var x = pos[0];
    var y = pos[1];
      console.log("board pos " + this.gameBoard[0][0])
    if (this.gameBoard[x][y] === ""){
      return true;
    } else {
      return false;
    }
  };
  
  this.placeMark = function (pos, mark) {
    var x = pos[0];
    var y = pos[1];
    this.gameBoard[x][y] = mark;
  };
  
  this.display = function () {
    console.log(this.gameBoard[0]);
    console.log(this.gameBoard[1]);
    console.log(this.gameBoard[2]);
  };
}

module.exports = Board;