import { RegionCoordinate } from "../../../Map/Coordinates/RegionCoordinate.js";
import { Serializable } from "../../../other/Serializable.js";

QUnit.module("Map/Coordinates/RegionCoordinate test", function() {
    QUnit.test("statics test", function(assert) {
        assert.ok(Serializable.isImplementedByClass(RegionCoordinate));
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
            original.copy({ X: 0 });
        });
        assert.throws(function() {
            original.copy({ X: 0, Y: "a" });
        });

        let rc = new RegionCoordinate();
        assert.ok(rc !== undefined);
        assert.ok(rc instanceof RegionCoordinate);
        assert.ok(Serializable.isImplementedBy(rc));
        assert.equal(rc.X, 0);
        assert.equal(rc.Y, 0);

        rc.copy({ X: 5, Y: 10 });
        assert.equal(rc.X, 5);
        assert.equal(rc.Y, 10);

        let toCopy = new RegionCoordinate();
        toCopy.X = 1;
        toCopy.Y = 20;
        rc.copy(toCopy);
        assert.equal(rc.X, 1);
        assert.equal(rc.Y, 20);
    });
});