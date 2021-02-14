import { Zone, MapCoordinate } from "../../Map.js";
import { VolumeSelection } from "../../Interface.js";
import { Serializable, Types } from "../../other.js";
import { BitSet } from "../../other/BitSet.js";
import "../sinon-9.2.4.js";
import { ChunkCoordinate } from "../../Map/Coordinates.js";

QUnit.module("Map/Zone tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Zone.serialVersionUID, 1);
        assert.ok(Types.isImplementedBy(Serializable, Zone));
    });

    QUnit.test("constructor / getters", function(assert) {
        //test that the vars are set
        // test that the volumes are set
        let param1 = [
            new VolumeSelection(new MapCoordinate(new ChunkCoordinate(0, 0, 0)), new MapCoordinate(new ChunkCoordinate(1, 1, 1))),
            new VolumeSelection(new MapCoordinate(new ChunkCoordinate(0, 0, 0)), new MapCoordinate(new ChunkCoordinate(0, 0, 0)))
        ];
        let ZoneAddSelectionCalls = [];
        class FakeZone extends Zone {
            addSelection(...args) {
                ZoneAddSelectionCalls.push(args);
            }
        }

        let z = new FakeZone(param1, 12);

        assert.ok(z.ID, 12);
        assert.ok(Types.is("map", z.zoneMap) && z.zoneMap.size === 0);
        assert.equal(z.Dirty, true);

        assert.equal(ZoneAddSelectionCalls.length, 2);
        assert.equal(ZoneAddSelectionCalls[0][0], param1[0]);
        assert.equal(ZoneAddSelectionCalls[1][0], param1[1]);

        // test that it throws with bad params
        assert.throws(function() {
            let a = new Zone(12);
        });
        assert.throws(function() {
            let a = new Zone(["a"]);
        });
        assert.throws(function() {
            let a = new Zone([], "hello");
        });
    });

    QUnit.test("readObject", function(assert) {
        let z = new Zone();
        let fakeObjectInputStream_defaultReadObject_calls = [];
        let fakeObjectInputStream = {
            "defaultReadObject": function(...args) {
                fakeObjectInputStream_defaultReadObject_calls.push(args);
            }
        };

        z.Dirty = false;
        z.readObject(fakeObjectInputStream);
        assert.equal(z.Dirty, true);
        assert.equal(fakeObjectInputStream_defaultReadObject_calls.length, 1);

    });
    QUnit.test("addSelection/removeSelection", function(assert) {
        let z = new Zone();
        z.Dirty = false;
        let v = new VolumeSelection(new MapCoordinate(new ChunkCoordinate(0, 0, 0)), new MapCoordinate(new ChunkCoordinate(1, 1, 2)));

        z.addSelection(v);
        assert.equal(z.zoneMap.size, 2);
        assert.equal(z.Dirty, true);
    });
    QUnit.test("addMapCoordinate/removeMapCoordinate/isCoordinateInZone", function(assert) {
        let z = new Zone();
        z.Dirty = false;
        let m = new MapCoordinate(new ChunkCoordinate(0, 0, 0));

        assert.ok(!z.isCoordinateInZone(m));
        z.addMapCoordinate(m);
        assert.equal(z.Dirty, true);
        assert.ok(z.isCoordinateInZone(m));
        z.Dirty = false;
        z.removeMapCoordinate(m);
        assert.equal(z.Dirty, true);
        assert.ok(!z.isCoordinateInZone(m));

        m = new MapCoordinate(new ChunkCoordinate(1, 2, 3));

        assert.ok(!z.isCoordinateInZone(m));
        z.addMapCoordinate(m);
        assert.equal(z.Dirty, true);
        assert.ok(z.isCoordinateInZone(m));
        z.Dirty = false;
        z.removeMapCoordinate(m);
        assert.equal(z.Dirty, true);
        assert.ok(!z.isCoordinateInZone(m));


        let n = new MapCoordinate(new ChunkCoordinate(30, 40, 50))

        assert.ok(!z.isCoordinateInZone(m));
        assert.ok(!z.isCoordinateInZone(n));
        z.addMapCoordinate(m);
        z.addMapCoordinate(n);
        assert.equal(z.Dirty, true);
        assert.ok(z.isCoordinateInZone(m));
        assert.ok(z.isCoordinateInZone(n));
        z.Dirty = false;
        z.removeMapCoordinate(m);
        z.removeMapCoordinate(n);
        assert.equal(z.Dirty, true);
        assert.ok(!z.isCoordinateInZone(m));
        assert.ok(!z.isCoordinateInZone(n));
    });
});