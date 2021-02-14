import { SectorCoordinate } from "../../../Map/Coordinates/SectorCoordinate.js";
import { Serializable, Types } from "../../../other.js";

QUnit.module("Map/Coordinates/SectorCoordinate test", function() {

    QUnit.test("statics tesT", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, SectorCoordinate));
    });

    QUnit.test("constructor test", function(assert) {
        assert.throws(function() {
            let sectorCoordinate = new SectorCoordinate(0, "a");
        });

        let sectorCoordinate = new SectorCoordinate(0, 1);
        assert.ok(sectorCoordinate !== undefined);
        assert.ok(sectorCoordinate instanceof SectorCoordinate);
        assert.equal(sectorCoordinate.getX(), 0);
        assert.equal(sectorCoordinate.getY(), 1);
    });

    QUnit.test("equals test", function(assert) {
        let coord1 = new SectorCoordinate();
        let coord2 = new SectorCoordinate();
        assert.ok(coord1.equals(coord2));

        assert.ok(coord1.equals(coord1));

        assert.ok(!coord1.equals(Math));

        assert.ok(!coord1.equals(null));
        assert.ok(!coord1.equals(undefined));
        let c3 = new SectorCoordinate(1, 2);
        assert.ok(!coord1.equals(c3));
    });

    QUnit.test("copy test", function(assert) {
        let coord1 = new SectorCoordinate();
        let coord2 = new SectorCoordinate(4, 5);

        assert.equal(coord1.getX(), 0);
        assert.equal(coord1.getY(), 0);

        assert.equal(coord2.getX(), 4);
        assert.equal(coord2.getY(), 5);

        coord1.copy(coord2);

        assert.equal(coord1.getX(), 4);
        assert.equal(coord1.getY(), 5);
    });

    QUnit.test("hashCode test", function(assert) {
        let coord1 = new SectorCoordinate(0, 0);
        assert.equal(coord1.hashCode(), 3)

        let coord2 = new SectorCoordinate(1, 0);
        assert.equal(coord2.hashCode(), 20);

        let coord3 = new SectorCoordinate(0, 1);
        assert.equal(coord3.hashCode(), 40);

        let coord4 = new SectorCoordinate(1, 1);
        assert.equal(coord4.hashCode(), 57);
    });
});