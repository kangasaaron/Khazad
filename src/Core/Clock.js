/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var Core;
(function (Core) {
    var LwjglTimer = /** @class */ (function () {
        function LwjglTimer() {
        }
        LwjglTimer.prototype.getTime = function () {
            return Date.now();
        };
        return LwjglTimer;
    }());
    Core.LwjglTimer = LwjglTimer;
    LwjglTimer["__class"] = "Core.LwjglTimer";
    /**
     *
     * @author Impaler
     * @param {number} SamplingSize
     * @class
     */
    var Clock = /** @class */ (function () {
        function Clock(SamplingSize) {
            if (this.StartTime === undefined) {
                this.StartTime = 0;
            }
            if (this.PausedTime === undefined) {
                this.PausedTime = 0;
            }
            if (this.SampleSize === undefined) {
                this.SampleSize = 0;
            }
            if (this.SampleIndex === undefined) {
                this.SampleIndex = 0;
            }
            if (this.SamplingPause === undefined) {
                this.SamplingPause = 0;
            }
            if (this.AverageTime === undefined) {
                this.AverageTime = 0;
            }
            if (this.AcumulationVector === undefined) {
                this.AcumulationVector = null;

            }
            if (this.started === undefined) {
                this.started = false;
            }
            if (this.paused === undefined) {
                this.paused = false;
            }
            if (this.CPUClock === undefined) {
                this.CPUClock = null;
            }
            this.CPUClock = new Core.LwjglTimer();
            this.StartTime = 0;
            this.PausedTime = 0;
            this.started = false;
            this.paused = false;
            this.AverageTime = 0;
            this.SamplingPause = 0;
            this.setSampleSize(SamplingSize);

        }
        Clock.prototype.start = function () {
            this.StartTime = this.CPUClock.getTime();
            this.started = true;
            this.paused = false;
            this.SampleIndex = 0;
            this.PausedTime = 0;
            this.SamplingPause = 0;
        };
        Clock.prototype.stop = function () {
            var Elapsed = this.getElapsed();
            this.started = false;
            this.paused = false;
            this.StartTime = 0;
            this.PausedTime = 0;
            this.SampleIndex = 0;
            return Elapsed;
        };

        Clock.prototype.getElapsed = function () {
            if (this.started) {
                if (this.paused) {
                    return this.PausedTime;
                }
                else {
                    return this.CPUClock.getTime() - this.StartTime;
                }
            }
            return 0;
        };
        Clock.prototype.pause = function () {
            if ((this.started === true) && (this.paused === false)) {
                this.paused = true;
                this.AcumulationVector[this.SampleIndex] = this.CPUClock.getTime() - (this.StartTime + this.SamplingPause);
                this.PausedTime = this.CPUClock.getTime() - this.StartTime;
                this.SampleIndex++;
                if (this.SampleIndex === this.SampleSize) {
                    this.calculateAverage();
                }
            }
        };
        Clock.prototype.unpause = function () {
            if (this.paused === true) {
                this.paused = false;
                this.StartTime = this.CPUClock.getTime() - this.PausedTime;
                this.SamplingPause = this.PausedTime;
                this.PausedTime = 0;
            }
        };
        Clock.prototype.setSampleSize = function (Size) {
            this.SampleSize = Size;
            if (this.SampleSize === 0) {
                this.SampleSize = 1;
            }
            this.AcumulationVector = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(this.SampleSize);
            this.SampleIndex = 0;

            this.SamplingPause = 0;
        };
        /*private*/ Clock.prototype.calculateAverage = function () {
            var Total = 0;
            for (var i = 0; i < this.SampleSize; i++) {
                {
                    Total += this.AcumulationVector[i];
                }
                ;
            }
            this.SampleIndex = 0;
            this.AcumulationVector = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(this.SampleSize);
            this.AverageTime = Total / this.SampleSize;
        };
        Clock.prototype.getAverage = function () {
            return this.AverageTime;
        };

        Clock.serialVersionUID = 1;
        return Clock;
    }());
    Core.Clock = Clock;
    Clock["__class"] = "Core.Clock";
    Clock["__interfaces"] = ["java.io.Serializable"];
})(Core || (Core = {}));
