import { Weather, Temporal } from "../../GameState.js";
import { Serializable, Types } from "../../other.js";


QUnit.module("GameState/Weather tests", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(Weather.serialVersionUID, 1);
        assert.ok(Types.isExtendedBy(Temporal, Weather));
        assert.ok(Types.isImplementedBy(Serializable, Weather));
    });

    QUnit.test("constructor", function(assert) {
        let w = new Weather();
        assert.ok(w._SunVec instanceof THREE.Vector3);
        assert.equal(w._Suncolor.getHex(), 0xffffff);
        assert.ok(w._Sun instanceof THREE.DirectionalLight);
        assert.equal(w._Sun.color.getHex(), w._Suncolor.clone().multiplyScalar(0.6).getHex());
        assert.ok(w._Rotation instanceof THREE.Quaternion);
        assert.equal(w._Rotation.x, 0, 'q x');
        assert.equal(w._Rotation.y, 0.0021816598343367697);
        assert.equal(w._Rotation.z, 0);
        assert.equal(w._Rotation.w, 0.9999976201773518);
    });

    QUnit.test("_updateSun", function(assert) {
        const sandbox = sinon.createSandbox();
        let w = new Weather();
        w._Suncolor = new THREE.Color(0xfefefe);
        w._SunVec = new THREE.Vector3(0, 0, 2);

        w._updateSun();
        assert.ok(w._Sun.target.equals(w._SunVec));
        assert.equal(w._Sun.color.getHex(), w._Suncolor.clone().multiplyScalar(0.6).getHex());

        sandbox.restore();

        w = new Weather();
        w._Suncolor = new THREE.Color(0xfefefe);
        w._SunVec = new THREE.Vector3(0, 0, -2);

        w._updateSun();
        assert.ok(w._Sun.target.equals(w._SunVec));
        assert.equal(w._Sun.color.getHex(), w._Suncolor.clone().multiplyScalar(-1 * -2 * 0.6).getHex());

        sandbox.restore();
    });

    QUnit.test("wake", function(assert) {
        let w = new Weather();
        const sandbox = sinon.createSandbox();
        sandbox.stub(w, "_updateSun").callsFake(() => true);
        w.WakeTick = 0;

        let result = w.wake(10);
        assert.equal(w._SunVec.x, 0);
        assert.equal(w._SunVec.y, 0.0021816598343367697);
        assert.equal(w._SunVec.z, 0);
        assert.equal(w._updateSun.callCount, 1);
        assert.equal(w.WakeTick, 10 + Temporal.TICKS_PER_MINUTE);
        assert.equal(result, w.WakeTick);

        sandbox.restore();

        sandbox.stub(w, "_updateSun").callsFake(() => true);
        w.WakeTick = 100;
        result = w.wake(10);
        assert.equal(w._updateSun.callCount, 0);
        assert.equal(result, 100);
    });

    QUnit.test("attachSun", function(assert) {
        const sandbox = sinon.createSandbox();
        let w = new Weather();
        let fakeTerrainNode_addLightCalls = [];
        let fakeTerrainNode = {
            addLight: function(...args) {
                fakeTerrainNode_addLightCalls.push(args);
            }
        };
        sandbox.spy(w._SunVec, "set");
        sandbox.spy(w._SunVec, "normalize")

        w.attachSun(fakeTerrainNode);

        assert.equal(w._SunVec.set.callCount, 1);
        assert.equal(w._SunVec.set.getCall(0).args[0], 0);
        assert.equal(w._SunVec.set.getCall(0).args[1], 0);
        assert.equal(w._SunVec.set.getCall(0).args[2], -1);
        assert.equal(w._SunVec.normalize.callCount, 1);
        assert.ok(w._Sun.target.equals(w._SunVec));
        assert.equal(fakeTerrainNode_addLightCalls.length, 1);
        assert.equal(fakeTerrainNode_addLightCalls[0][0], w._Sun);

        sandbox.restore();
    });

    QUnit.test("readObject", function(assert) {
        const sandbox = sinon.createSandbox();

        let w = new Weather();
        let defaultReadObjectCallCount = 0;
        let objectInputStream = {
            defaultReadObject() {
                defaultReadObjectCallCount++;
            }
        };
        sandbox.stub(w, "_updateSun").callsFake(() => true);

        w._Sun = null;
        w.readObject(objectInputStream);

        assert.equal(defaultReadObjectCallCount, 1);
        assert.ok(w._Sun instanceof THREE.DirectionalLight);
        assert.equal(w._updateSun.callCount, 1);

        sandbox.restore();
    });
});