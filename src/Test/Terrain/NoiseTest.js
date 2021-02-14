import { Noise } from "../../Terrain.js";
import "../sinon-9.2.4.js";

QUnit.module("Terrain/Noise tests", function() {
    QUnit.test("noise", function(assert) {
        const sandbox = sinon.createSandbox();

        sandbox.stub(Noise, "noise2d").callsFake(() => true);
        sandbox.stub(Noise, "noise3d").callsFake(() => true);
        sandbox.stub(Noise, "noise4d").callsFake(() => true);

        assert.throws(function() {
            Noise.noise();
        });

        assert.throws(function() {
            Noise.noise(123);
        });

        assert.throws(function() {
            Noise.noise("a");
        });

        Noise.noise(123, 456);
        assert.equal(Noise.noise2d.callCount, 1, 'first noise call');
        assert.equal(Noise.noise2d.getCall(0).args[0], 123);
        assert.equal(Noise.noise2d.getCall(0).args[1], 456);
        assert.equal(Noise.noise3d.callCount, 0);
        assert.equal(Noise.noise4d.callCount, 0);

        Noise.noise(123, 456, 789);
        assert.equal(Noise.noise2d.callCount, 1, 'second noise call');
        assert.equal(Noise.noise3d.callCount, 1);
        assert.equal(Noise.noise3d.getCall(0).args[0], 123);
        assert.equal(Noise.noise3d.getCall(0).args[1], 456);
        assert.equal(Noise.noise3d.getCall(0).args[2], 789);
        assert.equal(Noise.noise4d.callCount, 0);

        Noise.noise(123, 456, 789, 1011);
        assert.equal(Noise.noise2d.callCount, 1, 'third noise call');
        assert.equal(Noise.noise3d.callCount, 1);
        assert.equal(Noise.noise4d.callCount, 1);
        assert.equal(Noise.noise4d.getCall(0).args[0], 123);
        assert.equal(Noise.noise4d.getCall(0).args[1], 456);
        assert.equal(Noise.noise4d.getCall(0).args[2], 789);
        assert.equal(Noise.noise4d.getCall(0).args[3], 1011);

        Noise.noise(123, 456, 789, 1011, 1213);
        assert.equal(Noise.noise2d.callCount, 1, 'fourth noise call');
        assert.equal(Noise.noise3d.callCount, 1);
        assert.equal(Noise.noise4d.callCount, 2);
        assert.equal(Noise.noise4d.getCall(0).args[0], 123);
        assert.equal(Noise.noise4d.getCall(0).args[1], 456);
        assert.equal(Noise.noise4d.getCall(0).args[2], 789);
        assert.equal(Noise.noise4d.getCall(0).args[3], 1011);
        assert.equal(Noise.noise4d.getCall(0).args.length, 4);

        sandbox.restore();
    });

    QUnit.test("noise 2d", function(assert) {
        assert.equal(Noise.noise2d(0, 0), 0);
        assert.equal(Noise.noise2d(1, 1), -0.44026771907549944);
        assert.equal(Noise.noise2d(100, 2), 0.047328385188573026);
    });

    QUnit.test("noise 3d", function(assert) {
        assert.equal(Noise.noise3d(10, 0, 0), -0.652221399176956);
        assert.equal(Noise.noise3d(10, 1, 2), 0.10787818930040982);
        assert.equal(Noise.noise3d(9, 1, 3), 0.6522213991769574);
    });

    QUnit.test("noise 4d", function(assert) {
        assert.equal(Noise.noise4d(2, 10, 0, 0), -0.2953304802216037);
        assert.equal(Noise.noise4d(2, 10, 1, 1), 0.3023878653538425);
        assert.equal(Noise.noise4d(2, 10, 100, 2), -0.7965565601420834);
    });
});