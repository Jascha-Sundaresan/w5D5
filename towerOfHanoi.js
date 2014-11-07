var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[1, 2, 3], [], []];
  
  this.isWon = function () {
    var fn = this;
    if (fn.stacks[1].length === 3){
      return true;
    } else if (fn.stacks[2].length === 3){
      return true;
    } else {
      return false;
    }
  };
  
  this.isValidMove = function (startTowerIdx, endTowerIdx) {
    var fn = this;
    if(fn.stacks[endTowerIdx].length === 0){
      return true;
    } else if (fn.stacks[endTowerIdx][(fn.stacks[endTowerIdx].length - 1)] <
      fn.stacks[startTowerIdx][(fn.stacks[startTowerIdx].length - 1)]) {
        return true;
    } else {
      return false;
    }
  };
  
  this.move = function (startTowerIdx, endTowerIdx) {
    var fn = this;
    if (fn.isValidMove(startTowerIdx, endTowerIdx)) {
      fn.stacks[endTowerIdx].push(fn.stacks[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };
  
  this.print = function () {
    console.log(JSON.stringify(this.stacks));
  };
  
  this.promptMove = function (callback) {
    this.print();
    reader.question("Choose tower to move from", function(startTower) {
      reader.question("Choose tower to move to", function(endTower) {
        var startTowerIdx = parseInt(startTower, 10);
        var endTowerIdx = parseInt(endTower, 10);
        callback(startTowerIdx, endTowerIdx);
      });      
    });    
  };
  
  this.run = function(completionCallback) {
    var fn = this;
    this.promptMove(function(startTowerIdx, endTowerIdx) {
      if (fn.move(startTowerIdx, endTowerIdx) === false) {
        console.log("Error, can't do that.");
      }
      if (!fn.isWon()) {
        fn.run(completionCallback);
      } else {
        console.log("You win.");
        return completionCallback();
      }
    });
    
  };  
}

var game = new HanoiGame();
game.run(function() {
  reader.close();
});