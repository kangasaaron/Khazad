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
    Total = this._AccumulationVector.reduce(function(sum, value, index) {
        if (index < me._SampleSize)
            sum = new Long(sum + value);
        return sum;
    }, new Long(0));

    resetAccumulationVector.call(this);
    this._AverageTime = Total / this._SampleSize;
}

const resetAccumulationVector = function resetAccumulationVector() {
    this._AccumulationVector = new Array(this._SampleSize).fill(new Long(0));
    this._SampleIndex = 0;
}

class TestClock {
    static test_resetAccumulationVector(assert, testThatCIsAsExpected) {
        let c = new Clock();
        c._SampleSize = 4;
        let expected = c.clone();
        expected._AccumulationVector = [0, 0, 0, 0];
        c._AccumulationVector = null;
        c._SampleIndex = null;
        expected._SampleIndex = 0;

        resetAccumulationVector.call(c);
        testThatCIsAsExpected(assert, c, expected);
    }
    static test_calculateAverage(assert, testThatCIsAsExpected) {
        let c = new Clock();
        c._SampleIndex = 8;
        c._SampleSize = 5;
        c._AccumulationVector = [1, 2, 3, 4, 5, 6, 7, 8];
        let expected = c.clone();
        expected._AverageTime = 3;
        expected._AccumulationVector = [0, 0, 0, 0, 0];
        c._AverageTime = null;

        calculateAverage.call(c);
        testThatCIsAsExpected(assert, c, expected);
    }
}

export class Clock extends Serializable() {
    static TestClock = TestClock;
    _started = false;
    _paused = false;
    _CPUClock = Date;
    _AccumulationVector = [];
    _SampleSize = 0;
    _StartTime = new Long(0);
    _PausedTime = new Long(0);
    _AverageTime = 0;
    _SamplingPause = new Long(0);
    constructor(SamplingSize = 0) {
        super();
        this.sampleSize = SamplingSize;
    }
    start() {
        this._StartTime = new Long(this._CPUClock.now());
        this._started = true;
        this._paused = false;
        this._SampleIndex = 0;
        this._PausedTime = new Long(0);
        this._SamplingPause = new Long(0);
    }
    stop() {
        var Elapsed = this.elapsed;
        this._started = false;
        this._paused = false;
        this._StartTime = new Long(0);
        this._PausedTime = new Long(0);
        this._SampleIndex = 0;
        return Elapsed;
    }

    get elapsed() {
        if (this._started) {
            if (this._paused) {
                return new Long(this._PausedTime);
            } else {
                return new Long(this._CPUClock.now() - this._StartTime);
            }
        }
        return 0;
    }
    pause() {
        if ((this._started === true) && (this._paused === false)) {
            this._paused = true;
            this._AccumulationVector[this._SampleIndex] = new Long(this._CPUClock.now() - (this._StartTime + this._SamplingPause));
            this._PausedTime = new Long(this._CPUClock.now() - this._StartTime);
            this._SampleIndex++;
            if (this._SampleIndex === this._SampleSize) {
                calculateAverage.call(this);
            }
        }
    }
    unpause() {
        if (this._paused === true) {
            this._paused = false;
            this._StartTime = new Long(this._CPUClock.now() - this._PausedTime);
            this._SamplingPause = new Long(this._PausedTime);
            this._PausedTime = new Long(0);
        }
    }
    set sampleSize(Size) {
        this._SampleSize = Size;
        if (!Number.isFinite(this._SampleSize) || !this._SampleSize) {
            this._SampleSize = 1;
        }
        resetAccumulationVector.call(this);

        this._SamplingPause = new Long(0);
    }

    get average() {
        return this._AverageTime;
    }

    clone() {
        let clonedClock = new Clock();
        clonedClock._started = this._started;
        clonedClock._paused = this._paused;
        clonedClock._CPUClock = this._CPUClock; // note this is a reference, and will be the same object
        clonedClock._AccumulationVector = this._AccumulationVector.slice();
        clonedClock._SampleSize = this._SampleSize;
        clonedClock._StartTime = this._StartTime;
        clonedClock._PausedTime = this._PausedTime;
        clonedClock._AverageTime = this._AverageTime;
        clonedClock._SamplingPause = this._SamplingPause;
        return clonedClock;
    }
}