Function.prototype.myBind = function(context) {
  var fn = this;
  
  return function () {
    return fn.apply(context);
  };
  
};


function Cat(name) {
  this.name = name;
  this.meow = function () {
    console.log(this.name + " says meow");
  };
}

var c = new Cat('markov');

setInterval(c.meow.myBind(c), 1000);
