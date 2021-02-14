import { Serializable, Enum, Types } from "../../other.js";
import { MovementModality, MovementType } from "../../PathFinding.js";

QUnit.module("PathFinding/MovementType tests", function() {
    QUnit.test("enum", function(assert) {
        assert.ok(Types.isExtendedBy(Enum, MovementType))
        assert.equal(MovementType.MOVEMENT_TYPE_WALK, 0);
        assert.equal(MovementType.MOVEMENT_TYPE_WHEEL, 1);
        assert.equal(MovementType.MOVEMENT_TYPE_CLIMB, 2);
        assert.equal(MovementType.MOVEMENT_TYPE_SWIM, 3);
        assert.equal(MovementType.MOVEMENT_TYPE_FLY, 4);
    });
});

QUnit.module("PathFinding/MovementModality tests", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(MovementModality.serialVersionUID, 1);
        assert.ok(Types.isImplementedBy(Serializable, MovementModality));
    });

    QUnit.test("constructor", function(assert) {
        assert.throws(function() {
            let m = new MovementModality();
        });
        assert.throws(function() {
            let m = new MovementModality("a");
        });
        assert.throws(function() {
            let m = new MovementModality(1);
        });
        assert.throws(function() {
            let m = new MovementModality(1, 2);
        });
        assert.throws(function() {
            let m = new MovementModality(1, "a");
        });
        assert.throws(function() {
            let m = new MovementModality(1, 2, "a");
        });

        let m = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 2, 3);
        assert.equal(m.MovementTypeCapable[MovementType.MOVEMENT_TYPE_SWIM], true);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_SWIM], 2);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_SWIM], 3);
    });
    QUnit.test("equals", function(assert) {
        let m = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 2, 3),
            n = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 2, 3),
            o = new MovementModality(MovementType.MOVEMENT_TYPE_WALK, 3, 4);
        assert.ok(m.equals(m));
        assert.ok(m.equals(n));
        assert.ok(!m.equals(o));
        assert.ok(!m.equals());
        assert.ok(!m.equals(Object));
        assert.ok(!m.equals("a"));

        assert.ok(n.equals(m));
        assert.ok(n.equals(n));
        assert.ok(!n.equals(o));
        assert.ok(!n.equals());
        assert.ok(!n.equals(Object));
        assert.ok(!n.equals("a"));

        assert.ok(!o.equals(m));
        assert.ok(!o.equals(n));
        assert.ok(o.equals(o));
        assert.ok(!o.equals());
        assert.ok(!o.equals(Object));
        assert.ok(!o.equals("a"));
    });
    QUnit.test("hashCode", function(assert) {
        let m = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 2, 3),
            n = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 20, 53),
            o = new MovementModality(MovementType.MOVEMENT_TYPE_WALK, 3, 4);
        assert.equal(m.hashCode(), 3);
        assert.equal(n.hashCode(), 3);
        assert.equal(o.hashCode(), 3);
    });
    QUnit.test("setModalitySpeed", function(assert) {
        let m = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 2, 3);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_WALK], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_WHEEL], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_CLIMB], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_SWIM], 2);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_FLY], 0);

        m.setModalitySpeed(MovementType.MOVEMENT_TYPE_SWIM, 5);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_WALK], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_WHEEL], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_CLIMB], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_SWIM], 5);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_FLY], 0);

        m.setModalitySpeed(MovementType.MOVEMENT_TYPE_WALK, 5);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_WALK], 5);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_WHEEL], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_CLIMB], 0);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_SWIM], 5);
        assert.equal(m.MovementTypeSpeed[MovementType.MOVEMENT_TYPE_FLY], 0);

    });
    QUnit.test("setModalitySize", function(assert) {
        let m = new MovementModality(MovementType.MOVEMENT_TYPE_SWIM, 1, 2);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_WALK], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_WHEEL], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_CLIMB], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_SWIM], 2);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_FLY], 0);

        m.setModalitySize(MovementType.MOVEMENT_TYPE_SWIM, 5);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_WALK], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_WHEEL], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_CLIMB], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_SWIM], 5);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_FLY], 0);

        m.setModalitySize(MovementType.MOVEMENT_TYPE_WALK, 5);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_WALK], 5);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_WHEEL], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_CLIMB], 0);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_SWIM], 5);
        assert.equal(m.MovementTypeSize[MovementType.MOVEMENT_TYPE_FLY], 0);
    });
});