import { Pool } from "../../PathFinding.js";
import { Serializable, Types } from "../../other.js";
import "../sinon-9.2.4.js";

QUnit.module("PathFinding/Pool tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Pool));
    });

    QUnit.test('constructor, getters, setter, wipe', function(assert) {
        let p = new Pool();
        assert.equal(p._ObjectCount, 0);
        assert.equal(p._InUse, false);
        assert.equal(p._ObjectFactory, null);
        assert.ok(Array.isArray(p._ObjectPool) && p._ObjectPool.length == 0);

        assert.equal(p.InUse, false);
        p.InUse = true;
        assert.equal(p.InUse, true);

        let f = new Object();
        p.InUse = false;
        p.Factory = f;
        assert.equal(p._ObjectFactory, f);
        assert.equal(p.InUse, true);

        p.wipe();
        assert.ok(Array.isArray(p._ObjectPool) && p._ObjectPool.length == 0);
        assert.equal(p._ObjectCount, 0);
    });

    QUnit.test('provide/release', function(assert) {
        const sandbox = sinon.createSandbox();


        let testClass = class testClass {
            provide() {
                return new testClass();
            }
        };
        let newTestClass = new testClass();


        let p = new Pool();
        p.Factory = newTestClass;

        let result = p.provide();

        assert.ok(result instanceof testClass);
        assert.equal(p._ObjectCount, 1);
        assert.equal(p._ObjectPool[0], result);

        p._ObjectCount = 0;
        let result2 = p.provide();

        assert.ok(result2 instanceof testClass);
        assert.equal(p._ObjectCount, 1);
        assert.equal(p._ObjectPool[0], result2);

        result = p.provide();
        assert.ok(result instanceof testClass);
        assert.equal(p._ObjectCount, 2);
        assert.equal(p._ObjectPool[1], result);

        p.release();
        assert.equal(p.InUse, false);
        assert.equal(p._ObjectCount, 0);
        assert.equal(p._ObjectFactory, null);
        assert.equal(p._ObjectCount, 0);
        assert.equal(p._ObjectPool.length, 2);
        assert.equal(p._ObjectPool[0], result2);
        assert.equal(p._ObjectPool[1], result);
    });

});