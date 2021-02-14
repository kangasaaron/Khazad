import { Temporal } from "../../GameState.js";
import { Comparable, Serializable, Types } from "../../other.js";

QUnit.module("GameState/Temporal tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Temporal));
        assert.ok(Types.isImplementedBy(Comparable, Temporal));

        assert.ok(Temporal.serialVersionUID, 1);
        assert.ok(Temporal.TICKS_PER_SECOND, 12);
        assert.ok(Temporal.TICKS_PER_MINUTE, 12 * 60);
        assert.ok(Temporal.TICKS_PER_HOUR, 12 * 60 * 60);
        assert.ok(Temporal.TICKS_PER_DAY, 12 * 60 * 60 * 24);
        assert.ok(Temporal.TICKS_PER_WEEK, 12 * 60 * 60 * 24 * 7);
        assert.ok(Temporal.TICKS_PER_MONTH, 12 * 60 * 60 * 24 * 7 * 4);
        assert.ok(Temporal.TICKS_PER_YEAR, 12 * 60 * 60 * 24 * 7 * 4 * 12);
    });

    QUnit.test("constructor", function(assert) {
        let a = new Temporal();
        assert.ok(a instanceof Temporal);
        assert.equal(a.ID, 0);
        assert.equal(a.WakeTick, 1);

        assert.ok("wake" in a && typeof a.wake == "function")
        assert.ok("Retire" in a && typeof a.Retire == "function")
    });

    QUnit.test("compareTo", function(assert) {
        let a = new Temporal();
        a.WakeTick = 20;
        let b = new Temporal();
        b.WakeTick = 10;

        assert.equal(a.compareTo(b), 1);
        assert.equal(b.compareTo(a), -1);
        assert.equal(b.compareTo(b), 0);
        assert.equal(a.compareTo(Math), 1);
    });

    QUnit.test("getID", function(assert) {
        let a = new Temporal();
        a.ID = Symbol("hey");
        assert.equal(a.ID, a.getID());
    });

    QUnit.test("ResetWakeTick", function(assert) {
        let a = new Temporal();
        a.WakeTick = 100;
        a.ResetWakeTick(250);
        assert.equal(a.WakeTick, 250);
    });
});