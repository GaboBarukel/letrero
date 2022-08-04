function Timer(callback, timeInterval, errorCallback) {
  this.timeInterval = timeInterval;

  //Start timer
  this.start = () => {
    this.expected = Date.now() + this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval);
    console.log("timer started");
  };
  //Stop timer
  this.stop = () => {
    clearTimeout(this.timeout);
    console.log("timer stopped");
  };
  //Method that take cares of running our callback and adjusting the time interval
  this.round = () => {
    let drift = Date.now() - this.expected;

    //Changing tabs error handling
    if (drift > this.timeInterval) {
      if (errorCallback) {
        errorCallback();
      }
    }

    callback();
    this.expected += this.timeInterval;
    // console.log(drift);
    // console.log(this.timeInterval - drift);
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}

export default Timer;
