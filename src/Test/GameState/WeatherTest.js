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
        assert.ok(w.SunVec instanceof THREE.Vector3);
        assert.equal(w.Suncolor.getHex(), 0xffffff);
        assert.ok(w.Sun instanceof THREE.DirectionalLight);
        assert.equal(w.Sun.color.getHex(), w.Suncolor.clone().multiplyScalar(0.6).getHex());
        assert.ok(w.Rotation instanceof THREE.Quaternion);
        assert.equal(w.Rotation.x, 0, 'q x');
        assert.equal(w.Rotation.y, 0.0021816598343367697);
        assert.equal(w.Rotation.z, 0);
        assert.equal(w.Rotation.w, 0.9999976201773518);
    });

    QUnit.test("updateSun", function(assert) {
        const sandbox = sinon.createSandbox();
        let w = new Weather();
        w.Suncolor = new THREE.Color(0xfefefe);
        w.SunVec = new THREE.Vector3(0, 0, 2);

        w.updateSun();
        assert.ok(w.Sun.target.equals(w.SunVec));
        assert.equal(w.Sun.color.getHex(), w.Suncolor.clone().multiplyScalar(0.6).getHex());

        sandbox.restore();

        w = new Weather();
        w.Suncolor = new THREE.Color(0xfefefe);
        w.SunVec = new THREE.Vector3(0, 0, -2);

        w.updateSun();
        assert.ok(w.Sun.target.equals(w.SunVec));
        assert.equal(w.Sun.color.getHex(), w.Suncolor.clone().multiplyScalar(-1 * -2 * 0.6).getHex());

        sandbox.restore();
    });

    QUnit.test("wake", function(assert) {
        let w = new Weather();
        const sandbox = sinon.createSandbox();
        sandbox.stub(w, "updateSun").callsFake(() => true);
        w.WakeTick = 0;

        let result = w.wake(10);
        assert.equal(w.SunVec.x, 0);
        assert.equal(w.SunVec.y, 0.0021816598343367697);
        assert.equal(w.SunVec.z, 0);
        assert.equal(w.updateSun.callCount, 1);
        assert.equal(w.WakeTick, 10 + Temporal.TICKS_PER_MINUTE);
        assert.equal(result, w.WakeTick);

        sandbox.restore();

        sandbox.stub(w, "updateSun").callsFake(() => true);
        w.WakeTick = 100;
        result = w.wake(10);
        assert.equal(w.updateSun.callCount, 0);
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
        sandbox.spy(w.SunVec, "set");
        sandbox.spy(w.SunVec, "normalize")

        w.attachSun(fakeTerrainNode);

        assert.equal(w.SunVec.set.callCount, 1);
        assert.equal(w.SunVec.set.getCall(0).args[0], 0);
        assert.equal(w.SunVec.set.getCall(0).args[1], 0);
        assert.equal(w.SunVec.set.getCall(0).args[2], -1);
        assert.equal(w.SunVec.normalize.callCount, 1);
        assert.ok(w.Sun.target.equals(w.SunVec));
        assert.equal(fakeTerrainNode_addLightCalls.length, 1);
        assert.equal(fakeTerrainNode_addLightCalls[0][0], w.Sun);

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
        sandbox.stub(w, "updateSun").callsFake(() => true);

        w.Sun = null;
        w.readObject(objectInputStream);

        assert.equal(defaultReadObjectCallCount, 1);
        assert.ok(w.Sun instanceof THREE.DirectionalLight);
        assert.equal(w.updateSun.callCount, 1);

        sandbox.restore();
    });
});