var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfLessThan (el1, el2, callback) {
  console.log("el1: " + el1 + " el2: " + el2);
  reader.question("Is el1 lower? ('yes' or 'no') ", function(answer) {
    var userAnswer = answer;
    if (userAnswer === "yes"){
      return callback(true);
    } else if (userAnswer === "no") {
      return callback(false);
    }
  });
  // Prompt user to tell us whether el1 < el2; pass true back to the
  // callback if true; else false.
}

function innerBubbleSortLoop (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfLessThan(arr[i], arr[i + 1], function (isLessThan) {
      if (!isLessThan) {
        var placeholder = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = placeholder;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
   }
  if (i === (arr.length - 1)) {
    outerBubbleSortLoop(madeAnySwaps);      
  } 
  
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfLessThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
}

function absurdBubbleSort (arr, sortCompletionCallback) {
  function outerBubbleSortLoop (madeAnySwaps) {
    // Begin an inner loop if `madeAnySwaps` is true, else call
    // `sortCompletionCallback`.
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});