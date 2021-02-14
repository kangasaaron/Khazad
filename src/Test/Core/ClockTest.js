import { Clock } from "../../Core.js";
import { Serializable, Types, Long } from "../../other.js";
import { Mock } from "../MockClass.js"
import "../sinon-9.2.4.js";

QUnit.module("Core/Clock test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(Clock.serialVersionUID, 1);
        assert.ok(Types.isImplementedBy(Serializable, Clock));
    });

    function testThatCIsAsExpected(assert, c, expected) {
        for (let varname in c) {
            if (varname !== "__calls__" && typeof c[varname] !== "function") {
                if (Array.isArray(c[varname]))
                    assert.equal(JSON.stringify(c[varname]), JSON.stringify(expected[varname]), 'expected ' + varname);
                else if (c[varname] instanceof Long)
                    assert.ok(c[varname].equals(expected[varname]), 'expected ' + varname);
                else
                    assert.equal(c[varname], expected[varname], 'expected ' + varname);
            }
        }
    }

    QUnit.test("constructor test", function(assert) {
        let c = new Clock();
        assert.equal(c._started, false);
        assert.equal(c._paused, false);
        assert.equal(c._CPUClock, Date);
        assert.ok(Array.isArray(c._AccumulationVector));
        assert.equal(c._AccumulationVector.length, 1);
        assert.ok(c._AccumulationVector[0].equals(new Long(0)));
        assert.equal(c._SampleSize, 1);
        assert.ok(c._StartTime.equals(new Long(0)));
        assert.ok(c._PausedTime.equals(new Long(0)));
        assert.equal(c._AverageTime, 0);
        assert.ok(c._SamplingPause.equals(new Long(0)));

        let mc = new Clock(10);

        assert.equal(mc._SampleSize, 10);
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
        c._CPUClock = fakeCPUClock;
        let expected = c.clone();
        expected._StartTime = new Long(20);
        expected._started = true;
        expected._paused = false;
        expected._SampleIndex = 0;
        expected._SamplingPause = 0;
        expected._PausedTime = new Long(0);

        c._StartTime = null;
        c._started = null;
        c._paused = null;
        c._SampleIndex = null;
        c._SamplingPause = null;
        c._PausedTime = null;
        let ret = c.start();
        assert.ok(ret === undefined);

        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("stop() test", function(assert) {

        const sandbox = sinon.createSandbox();
        let c = new Clock();
        let stub = sandbox.stub(c, "elapsed").get(() => 10);
        let expected = c.clone();
        expected._started = false;
        expected._paused = false;
        expected._StartTime = new Long(0);
        expected._PausedTime = new Long(0);
        expected._SampleIndex = 0;
        c._started = null;
        c._paused = null;
        c._StartTime = null;
        c._PausedTime = null;
        c._SampleIndex = null;
        let a = c.stop();
        assert.equal(a, 10);

        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("get elapsed test", function(assert) {
        let c = new Clock();
        let expected = c.clone();

        c.elapsed;

        for (let varname in c) {
            if (varname !== "__calls__" && typeof c[varname] !== "function") {
                if (Array.isArray(c[varname]))
                    assert.equal(JSON.stringify(c[varname]), JSON.stringify(expected[varname]));
                else
                    assert.equal(c[varname], expected[varname], 'expected ' + varname);
            }
        }

        c._CPUClock = fakeCPUClock;

        c._StartTime = 5;
        c._PausedTime = 7;
        c._started = false;
        c._paused = false;
        assert.equal(c.elapsed, 0);

        c._started = true;
        c._paused = false;
        assert.equal(c.elapsed, 20 - 5);

        c._started = true;
        c._paused = true;
        assert.equal(c.elapsed, 7);
    });

    QUnit.test("pause test", function(assert) {
        let MockClock = Mock(Clock);
        MockClock.__override__('calculateAverage', false);

        let c = new MockClock();
        c._CPUClock = fakeCPUClock;
        c._started = false;
        c._paused = false;

        let expected = c.clone();

        c.pause();

        testThatCIsAsExpected(assert, c, expected);
        assert.ok(!('__calls__' in c), 'after first pause');

        c._started = false;
        c._paused = true;
        expected = c.clone();

        c.pause();

        testThatCIsAsExpected(assert, c, expected);
        assert.ok(!('__calls__' in c), 'after second pause');

        c._started = true;
        c._paused = true;
        expected = c.clone();

        c.pause();
        testThatCIsAsExpected(assert, c, expected);
        assert.ok(!('__calls__' in c), 'after third pause');

        c._StartTime = 2;
        c._SamplingPause = 5;
        c._SampleIndex = 0;
        c._AverageTime = 13;
        c._AccumulationVector = [];
        c._PausedTime = null;
        c._SampleSize = 1;
        c._started = true;
        c._paused = false;
        expected = c.clone();
        expected._paused = true;
        expected._AccumulationVector = [new Long(0)];
        expected._PausedTime = new Long(18);
        expected._SampleIndex = 0;
        c.pause();
        testThatCIsAsExpected(assert, c, expected);
        // assert.ok(c.__calls__.calculateAverage.length == 1, 'after fourth pause');

    });

    QUnit.test("unpause test", function(assert) {
        let c = new Clock();
        c._CPUClock = fakeCPUClock;
        c._paused = false;
        let expected = c.clone();

        c.unpause();
        testThatCIsAsExpected(assert, c, expected);

        c._paused = true;
        c._PausedTime = 2;
        expected = c.clone();
        expected._paused = false;
        expected._StartTime = 20 - 2;
        expected._SamplingPause = 2;
        expected._PausedTime = 0;
        c._StartTime = null;
        c._SamplingPause = null;

        c.unpause();
        testThatCIsAsExpected(assert, c, expected);
    });

    QUnit.test("sampleSize setter test", function(assert) {
        let c = new Clock();
        let expected = c.clone();
        expected._AccumulationVector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        expected._SampleSize = 20;
        c._SampleSize = null;
        c._AccumulationVector = null;
        c._SampleIndex = null;
        c._SamplingPause = null;
        c.sampleSize = 20;
        testThatCIsAsExpected(assert, c, expected);

        expected = c.clone();
        expected._AccumulationVector = [0];
        expected._SampleSize = 1;
        c._SampleSize = null;
        c._AccumulationVector = null;
        c.sampleSize = 0;
        testThatCIsAsExpected(assert, c, expected)
    });

    QUnit.test("calculateAverage test", function(assert) {
        Clock.TestClock.test_calculateAverage(assert, testThatCIsAsExpected);
    });

    QUnit.test("resetAccumulationVector", function(assert) {
        Clock.TestClock.test_resetAccumulationVector(assert, testThatCIsAsExpected);
    });

    QUnit.test("getAverage test", function(assert) {
        let c = new Clock();
        c._AverageTime = 12345;
        let expected = c.clone();
        assert.equal(c.average, 12345);
        testThatCIsAsExpected(assert, c, expected);
    });
});