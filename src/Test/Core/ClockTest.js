import { Clock } from "../../Core/Clock.js";
import { Mock } from "../MockClass.js"

QUnit.module("Core/Clock test", function() {
    QUnit.test("statics test", function(assert) {
        assert.ok(Clock.serialVersionUID !== null);
    });

    function testThatCIsAsExpected(assert, c, expected) {
        for (let varname in c) {
            if (varname !== "__calls__" && typeof c[varname] !== "function") {
                if (Array.isArray(c[varname]))
                    assert.equal(JSON.stringify(c[varname]), JSON.stringify(expected[varname]));
                else
                    assert.equal(c[varname], expected[varname], 'expected ' + varname);
            }
        }
    }

    QUnit.test("constructor test", function(assert) {
        let c = new Clock();
        assert.equal(c.started, false);
        assert.equal(c.paused, false);
        assert.equal(c.CPUClock, Date);
        assert.ok(Array.isArray(c.AccumulationVector));
        assert.equal(c.AccumulationVector.length, 1);
        assert.equal(c.AccumulationVector[0], 0)
        assert.equal(c.SampleSize, 1);
        assert.equal(c.StartTime, 0);
        assert.equal(c.PausedTime, 0);
        assert.equal(c.AverageTime, 0);
        assert.equal(c.SamplingPause, 0);

        let MockClock = Mock(Clock);
        MockClock.__override__('setSampleSize', true);

        let mc = new MockClock();

        assert.equal(mc.SampleSize, 1, 'sample size defaults correctly to 1');
        assert.equal(mc.__calls__.setSampleSize.length, 1);
        assert.equal(mc.__calls__.setSampleSize[0].args[0], 0);
    });

    let fakeCPUClockNow = 20;
    let fakeCPUClock = {
        now: function() {
            return fakeCPUClockNow;
        }
    }

    QUnit.test("start() test", function(assert) {
        let c = new Clock();
        // mess with initial state
        c.CPUClock = fakeCPUClock;
        let expected = c.clone();
        expected.StartTime = 20;
        expected.started = true;
        expected.paused = false;
        expected.SampleIndex = 0;
        expected.SamplingPause = 0;
        expected.PausedTime = 0;

        c.StartTime = null;
        c.started = null;
        c.paused = null;
        c.SampleIndex = null;
        c.SamplingPause = null;
        c.PausedTime = null;
        let ret = c.start();
        assert.ok(ret === undefined);

        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("stop() test", function(assert) {
        let MockClock = Mock(Clock);
        MockClock.__override__('getElapsed', false, 10);
        let c = new MockClock();
        c.CPUClock = fakeCPUClock;
        let expected = c.clone();
        expected.started = false;
        expected.paused = false;
        expected.StartTime = 0;
        expected.PausedTime = 0;
        expected.SampleIndex = 0;
        c.started = null;
        c.paused = null;
        c.StartTime = null;
        c.PausedTime = null;
        c.SampleIndex = null;
        let a = c.stop();
        assert.equal(a, 10);

        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("getElapsed test", function(assert) {
        let c = new Clock();
        let expected = c.clone();

        c.getElapsed();

        for (let varname in c) {
            if (varname !== "__calls__" && typeof c[varname] !== "function") {
                if (Array.isArray(c[varname]))
                    assert.equal(JSON.stringify(c[varname]), JSON.stringify(expected[varname]));
                else
                    assert.equal(c[varname], expected[varname], 'expected ' + varname);
            }
        }

        c.CPUClock = fakeCPUClock;

        c.StartTime = 5;
        c.PausedTime = 7;
        c.started = false;
        c.paused = false;
        assert.equal(c.getElapsed(), 0);

        c.started = true;
        c.paused = false;
        assert.equal(c.getElapsed(), 20 - 5);

        c.started = true;
        c.paused = true;
        assert.equal(c.getElapsed(), 7);
    });

    QUnit.test("pause test", function(assert) {
        let MockClock = Mock(Clock);
        MockClock.__override__('calculateAverage', false);

        let c = new MockClock();
        c.CPUClock = fakeCPUClock;
        c.started = false;
        c.paused = false;

        let expected = c.clone();

        c.pause();

        testThatCIsAsExpected(assert, c, expected);
        assert.ok(!('__calls__' in c));

        c.started = false;
        c.paused = true;
        expected = c.clone();

        c.pause();

        testThatCIsAsExpected(assert, c, expected);
        assert.ok(!('__calls__' in c));

        c.started = true;
        c.paused = true;
        expected = c.clone();

        c.pause();
        testThatCIsAsExpected(assert, c, expected);
        assert.ok(!('__calls__' in c));

        c.StartTime = 2;
        c.SamplingPause = 5;
        c.SampleIndex = 0;
        c.AccumulationVector = [];
        c.PausedTime = null;
        c.SampleSize = 1;
        c.started = true;
        c.paused = false;
        expected = c.clone();
        expected.paused = true;
        expected.AccumulationVector = [13];
        expected.PausedTime = 18;
        expected.SampleIndex = 1;
        c.pause();
        testThatCIsAsExpected(assert, c, expected);
        assert.ok(c.__calls__.calculateAverage.length == 1);

    });

    QUnit.test("unpause test", function(assert) {
        let c = new Clock();
        c.CPUClock = fakeCPUClock;
        c.paused = false;
        let expected = c.clone();

        c.unpause();
        testThatCIsAsExpected(assert, c, expected);

        c.paused = true;
        c.PausedTime = 2;
        expected = c.clone();
        expected.paused = false;
        expected.StartTime = 20 - 2;
        expected.SamplingPause = 2;
        expected.PausedTime = 0;
        c.StartTime = null;
        c.SamplingPause = null;

        c.unpause();
        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("setSampleSize test", function(assert) {
        let c = new Clock();
        let expected = c.clone();
        expected.AccumulationVector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        expected.SampleSize = 20;
        c.SampleSize = null;
        c.AccumulationVector = null;
        c.SampleIndex = null;
        c.SamplingPause = null;
        c.setSampleSize(20);
        testThatCIsAsExpected(assert, c, expected);

        expected = c.clone();
        expected.AccumulationVector = [0];
        expected.SampleSize = 1;
        c.SampleSize = null;
        c.AccumulationVector = null;
        c.setSampleSize(0);
        testThatCIsAsExpected(assert, c, expected)
    });

    QUnit.test("calculateAverage test", function(assert) {
        let c = new Clock();
        c.SampleIndex = 8;
        c.SampleSize = 5;
        c.AccumulationVector = [1, 2, 3, 4, 5, 6, 7, 8];
        let expected = c.clone();
        expected.AverageTime = 3;
        expected.AccumulationVector = [0, 0, 0, 0, 0];
        c.AverageTime = null;

        c.calculateAverage();
        testThatCIsAsExpected(assert, c, expected);

    });

    QUnit.test("resetAccumulationVector", function(assert) {
        let c = new Clock();
        c.SampleSize = 4;
        let expected = c.clone();
        expected.AccumulationVector = [0, 0, 0, 0];
        c.AccumulationVector = null;
        c.SampleIndex = null;
        expected.SampleIndex = 0;

        c.resetAccumulationVector();
        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("getAverage test", function(assert) {
        let c = new Clock();
        c.AverageTime = 12345;
        let expected = c.clone();
        assert.equal(c.getAverage(), 12345);
        testThatCIsAsExpected(assert, c, expected);
    });
});