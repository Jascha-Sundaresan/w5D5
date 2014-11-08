var Elements = require("./ttt");

var readline = require("readline");

var gameBoard = new Elements.Board();
var ttt = new Elements.Game(gameBoard, function(){
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
});

ttt.run(function(){
  ttt.reader.close();
});