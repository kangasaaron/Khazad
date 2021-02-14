import { RegionCoordinate } from "../../../Map.js";
import { Serializable, Types } from "../../../other.js";

QUnit.module("Map/Coordinates/RegionCoordinate test", function() {
    QUnit.test("statics test", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, RegionCoordinate));
    });
    QUnit.test("copy test", function(assert) {
        let original = new RegionCoordinate();
        assert.throws(function() {
            original.copy();
        });
        assert.throws(function() {
            original.copy(Math);
        });
        assert.throws(function() {
            original.copy({ getX: () => 0 });
        });
        assert.throws(function() {
            original.copy({ getX: () => 0, getY: () => "a" });
        });

        let rc = new RegionCoordinate();
        assert.ok(rc !== undefined);
        assert.ok(rc instanceof RegionCoordinate);
        assert.equal(rc.getX(), 0);
        assert.equal(rc.getY(), 0);

        rc.copy({ getX: () => 5, getY: () => 10 });
        assert.equal(rc.getX(), 5);
        assert.equal(rc.getY(), 10);

        let toCopy = new RegionCoordinate();
        toCopy._X = 1;
        toCopy._Y = 20;
        rc.copy(toCopy);
        assert.equal(rc.getX(), 1);
        assert.equal(rc.getY(), 20);
    });
});