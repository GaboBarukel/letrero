class Timer {
  constructor(callback, timeInterval, options) {
    this.callback = callback;
    this.timeInterval = timeInterval;
    this.options = options;
  }

  //Start timer
  start = () => {
    this.expected = Date.now() + this.timeInterval;
    if (this.options.immediate) {
      this.callback();
    }
    this.timeout = setTimeout(this.round, this.timeInterval);
  };

  //Stop timer
  stop = () => {
    clearTimeout(this.timeout);
  };

  //Method that take cares of running our callback and adjusting the time interval
  round = () => {
    let drift = Date.now() - this.expected;

    //Changing tabs error handling
    if (drift > this.timeInterval) {
      if (options.errorCalback) {
        this.options.errorCalback();
      }
    }

    this.callback();
    this.expected += this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}

export default Timer;
