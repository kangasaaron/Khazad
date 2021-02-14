import { Serializable, Long } from '../other.js';
/**
 *
 * @author Impaler
 * @param {number} SamplingSize
 * @class
 */

// private

const calculateAverage = function calculateAverage() {
    var Total = 0,
        me = this;
    Total = this.AccumulationVector.reduce(function(sum, value, index) {
        if (index < me.SampleSize)
            sum = new Long(sum + value);
        return sum;
    }, new Long(0));

    this.resetAccumulationVector();
    this.AverageTime = Total / this.SampleSize;
}

export class Clock extends Serializable() {
    constructor(SamplingSize = 0) {
        super();
        this.started = false;
        this.paused = false;
        this.CPUClock = Date;
        this.AccumulationVector = [];
        this.SampleSize = 0;
        this.StartTime = new Long(0);
        this.PausedTime = new Long(0);
        this.AverageTime = 0;
        this.SamplingPause = new Long(0);
        this.setSampleSize(SamplingSize);
    }
    start() {
        this.StartTime = new Long(this.CPUClock.now());
        this.started = true;
        this.paused = false;
        this.SampleIndex = 0;
        this.PausedTime = new Long(0);
        this.SamplingPause = new Long(0);
    }
    stop() {
        var Elapsed = this.getElapsed();
        this.started = false;
        this.paused = false;
        this.StartTime = new Long(0);
        this.PausedTime = new Long(0);
        this.SampleIndex = 0;
        return Elapsed;
    }

    getElapsed() { // TODO turn into getter;
        if (this.started) {
            if (this.paused) {
                return new Long(this.PausedTime);
            } else {
                return new Long(this.CPUClock.now() - this.StartTime);
            }
        }
        return 0;
    }
    pause() {
        if ((this.started === true) && (this.paused === false)) {
            this.paused = true;
            this.AccumulationVector[this.SampleIndex] = new Long(this.CPUClock.now() - (this.StartTime + this.SamplingPause));
            this.PausedTime = new Long(this.CPUClock.now() - this.StartTime);
            this.SampleIndex++;
            if (this.SampleIndex === this.SampleSize) {
                calculateAverage.call(this);
            }
        }
    }
    unpause() {
        if (this.paused === true) {
            this.paused = false;
            this.StartTime = new Long(this.CPUClock.now() - this.PausedTime);
            this.SamplingPause = new Long(this.PausedTime);
            this.PausedTime = new Long(0);
        }
    }
    resetAccumulationVector() {
        this.AccumulationVector = new Array(this.SampleSize).fill(new Long(0));
        this.SampleIndex = 0;
    }

    setSampleSize(Size) { // TODO turn into setter
        this.SampleSize = Size;
        if (!Number.isFinite(this.SampleSize) || !this.SampleSize) {
            this.SampleSize = 1;
        }
        this.resetAccumulationVector();

        this.SamplingPause = new Long(0);
    }

    getAverage() { // TODO turn into getter
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