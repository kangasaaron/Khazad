import { SectorCoordinate } from "../../../Map/Coordinates/SectorCoordinate.js";
import { Serializable } from "../../../other/Serializable.js";

QUnit.module("Map/Coordinates/SectorCoordinate test", function() {

    QUnit.test("statics tesT", function(assert) {
        assert.ok(Serializable.isImplementedByClass(SectorCoordinate));
    });

    QUnit.test("constructor test", function(assert) {
        assert.throws(function() {
            let rc = new SectorCoordinate(0, "a");
        });

        let rc = new SectorCoordinate(0, 1);
        assert.ok(rc !== undefined);
        assert.ok(rc instanceof SectorCoordinate);
        assert.ok(Serializable.isImplementedBy(rc));
        assert.equal(rc.X, 0);
        assert.equal(rc.Y, 1);
    });

    QUnit.test("equals test", function(assert) {
        let c1 = new SectorCoordinate();
        let c2 = new SectorCoordinate();
        assert.ok(c1.equals(c2));

        assert.ok(c1.equals(c1));

        assert.ok(!c1.equals(Math));

        assert.ok(!c1.equals(null));
        assert.ok(!c1.equals(undefined));
        let c3 = new SectorCoordinate(1, 2);
        assert.ok(!c1.equals(c3));
    });

    QUnit.test("copy test", function(assert) {
        let c1 = new SectorCoordinate();
        let c2 = new SectorCoordinate(4, 5);

        assert.equal(c1.X, 0);
        assert.equal(c1.Y, 0);

        assert.equal(c2.X, 4);
        assert.equal(c2.Y, 5);

        c1.copy(c2);

        assert.equal(c1.X, 4);
        assert.equal(c1.Y, 5);
    });

    QUnit.test("hashCode test", function(assert) {
        let c1 = new SectorCoordinate(0, 0);
        assert.equal(c1.hashCode(), 3)

        let c2 = new SectorCoordinate(1, 0);
        assert.equal(c2.hashCode(), 20);

        let c3 = new SectorCoordinate(0, 1);
        assert.equal(c3.hashCode(), 40);

        let c4 = new SectorCoordinate(1, 1);
        assert.equal(c4.hashCode(), 57);
    });
});