import { Actor, Temporal } from "../../GameState.js";
import { Serializable, Types } from "../../other.js";
import { MapCoordinate } from "../../Map.js";

QUnit.module("GameState/Actor tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Actor))
        assert.equal(Actor.serialVersionUID, 1);
        assert.ok(Types.isExtendedBy(Temporal, Actor));
    });

    QUnit.test("constructor", function(assert) {
        assert.throws(function() {
            let a = new Actor();
        });
        assert.throws(function() {
            let a = new Actor(1);
        });

        let mc = new MapCoordinate();
        let a = new Actor(1, mc);

        assert.equal(a.ID, 1);
        assert.equal(a.LocationCoordinates, mc);
        assert.equal(a.Hidden, false);
        assert.equal(a.Dirty, true);
        assert.equal(a.isDirty(), true);
        assert.equal(a.Visible, false);
    });

    QUnit.test("setLocation / getLocation", function(assert) {
        let mc1 = new MapCoordinate();
        let a = new Actor(1, mc1);
        let mc2 = new MapCoordinate();
        a.Dirty = false;

        assert.equal(a.Dirty, false);
        assert.equal(a.getLocation(), mc1);

        a.setLocation(mc2);

        assert.equal(a.Dirty, true);
        assert.equal(a.LocationCoordinates, mc2)
    });

    QUnit.test("setVisible", function(assert) {
        let mc = new MapCoordinate();
        let actor = new Actor(1, mc);
        assert.equal(actor.Visible, false);
        actor.Dirty = false;

        actor.setVisible(true);
        assert.equal(actor.Visible, true);
        assert.equal(actor.Dirty, true);

        actor.Dirty = false;
        actor.setVisible(true);
        assert.equal(actor.Visible, true);
        assert.equal(actor.Dirty, false);
    });

    QUnit.test("readObject", function(assert) {
        let mc = new MapCoordinate();

        let actor = new Actor(1, mc);

        let pretendObjectInputStream = {
            calls: 0,
            defaultReadObject: function defaultReadObject() {
                this.calls++;
            }
        }

        actor.Dirty = false;
        actor.readObject(pretendObjectInputStream);

        assert.equal(actor.Dirty, true);
        assert.equal(pretendObjectInputStream.calls, 1);

    });
});