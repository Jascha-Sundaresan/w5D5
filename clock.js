function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function (currentTime) {
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  console.log(hours + ":" + minutes + ":" + seconds);
  // Format the time in HH:MM:SS
};

Clock.prototype.run = function () {
  var currentTime = new Date();
  this.printTime(currentTime);
  setInterval(this._tick.bind(this, currentTime), Clock.TICK);
  // 1. Set the currentTime.
  // 2. Call printTime.
  // 3. Schedule the tick interval.
};

Clock.prototype._tick = function (time) {
  var currentSeconds = time.getSeconds();
  var newTime = currentSeconds + 5;
  time.setSeconds(newTime);
  this.printTime(time);
  // 1. Increment the currentTime.
  // 2. Call printTime.
};

var clock = new Clock();
clock.run();