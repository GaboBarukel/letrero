class Timer{
  constructor(callback, timeInterval, errorCallback){
    this.callback = callback
    this.timeInterval = timeInterval
    this.errorCallback = errorCallback
  }

  //Start timer
  start = () => {
    this.expected = Date.now() + this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval);
    console.log("timer started");
  }

  //Stop timer
  stop = () => {
    clearTimeout(this.timeout);
    console.log("timer stopped");
  }

  //Method that take cares of running our callback and adjusting the time interval
  round = () => {
    let drift = Date.now() - this.expected;

    //Changing tabs error handling
    if (drift > this.timeInterval) {
      if (errorCallback) {
        this.errorCallback();
      }
    }

    this.callback();
    this.expected += this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  }
}

export default Timer;
