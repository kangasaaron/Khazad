import { Serializable } from '../other/Serializable.js';

/**
 *
 * @author Impaler
 * @param {number} SamplingSize
 * @class
 */
export class Clock extends Serializable {
    constructor(SamplingSize) {
        super();
        this.started = false;
        this.paused = false;
        this.CPUClock = Date;
        this.AccumulationVector = [];
        this.SampleSize = 0;
        this.StartTime = 0;
        this.PausedTime = 0;
        this.AverageTime = 0;
        this.SamplingPause = 0;
        SamplingSize = SamplingSize || 0;
        this.setSampleSize(SamplingSize);
    }
    start() {
        this.StartTime = this.CPUClock.now();
        this.started = true;
        this.paused = false;
        this.SampleIndex = 0;
        this.PausedTime = 0;
        this.SamplingPause = 0;
    }
    stop() {
        var Elapsed = this.getElapsed();
        this.started = false;
        this.paused = false;
        this.StartTime = 0;
        this.PausedTime = 0;
        this.SampleIndex = 0;
        return Elapsed;
    }

    getElapsed() {
        if (this.started) {
            if (this.paused) {
                return this.PausedTime;
            } else {
                return this.CPUClock.now() - this.StartTime;
            }
        }
        return 0;
    }
    pause() {
        if ((this.started === true) && (this.paused === false)) {
            this.paused = true;
            this.AccumulationVector[this.SampleIndex] = this.CPUClock.now() - (this.StartTime + this.SamplingPause);
            this.PausedTime = this.CPUClock.now() - this.StartTime;
            this.SampleIndex++;
            if (this.SampleIndex === this.SampleSize) {
                this.calculateAverage();
            }
        }
    }
    unpause() {
        if (this.paused === true) {
            this.paused = false;
            this.StartTime = this.CPUClock.now() - this.PausedTime;
            this.SamplingPause = this.PausedTime;
            this.PausedTime = 0;
        }
    }
    resetAccumulationVector() {
        this.AccumulationVector = new Array(this.SampleSize).fill(0);
        this.SampleIndex = 0;
    }
    setSampleSize(Size) {
        this.SampleSize = Size;
        if (!this.SampleSize) {
            this.SampleSize = 1;
        }
        this.resetAccumulationVector();

        this.SamplingPause = 0;
    }

    calculateAverage() {
        var Total = 0,
            me = this;
        Total = this.AccumulationVector.reduce(function(sum, value, index) {
            if (index < me.SampleSize)
                sum += value;
            return sum;
        }, 0);
        // for (var i = 0; i < this.SampleSize; i++) {
        //     {
        //         Total += this.AccumulationVector[i];
        //     };
        // }

        this.resetAccumulationVector();
        this.AverageTime = Total / this.SampleSize;
    }

    getAverage() {
        return this.AverageTime;
    }

    clone() {
        let clonedClock = new Clock();
        clonedClock.started = this.started;
        clonedClock.paused = this.paused;
        clonedClock.CPUClock = this.CPUClock; // note this is a reference, and will be the same object
        clonedClock.AccumulationVector = this.AccumulationVector.slice();
        clonedClock.SampleSize = this.SampleSize;
        clonedClock.StartTime = this.StartTime;
        clonedClock.PausedTime = this.PausedTime;
        clonedClock.AverageTime = this.AverageTime;
        clonedClock.SamplingPause = this.SamplingPause;
        return clonedClock;
    }
}
Clock.serialVersionUID = 1;
