import { ChunkCoordinate } from "../../../Map/Coordinates/ChunkCoordinate.js";

QUnit.module("Map/Coordinates/ChunkCoordinate test", function() {
    QUnit.test("constructor test", function(assert) {
        let a = new ChunkCoordinate();
        assert.ok(a instanceof ChunkCoordinate);
        assert.equal(a.X, 0);
        assert.equal(a.Y, 0);
        assert.equal(a.Z, 0);

        a = new ChunkCoordinate(2, 7, 6);
        assert.equal(a.X, 2);
        assert.equal(a.Y, 7);
        assert.equal(a.Z, 6);

        assert.throws(function() {
            let x = new ChunkCoordinate(Symbol(0));
        });
        assert.throws(function() {
            let x = new ChunkCoordinate(0, Symbol(0));
        });
        assert.throws(function() {
            let x = new ChunkCoordinate(0, 0, Symbol(0));
        });
    });

    QUnit.test("copy test", function(assert) {
        let original = new ChunkCoordinate(3, 4, 5);
        let toCopy = new ChunkCoordinate(7, 8, 9);
        assert.equal(original.X, 3);
        assert.equal(original.Y, 4);
        assert.equal(original.Z, 5);

        assert.equal(toCopy.X, 7);
        assert.equal(toCopy.Y, 8);
        assert.equal(toCopy.Z, 9);

        original.copy(toCopy);

        assert.equal(original.X, 7);
        assert.equal(original.Y, 8);
        assert.equal(original.Z, 9);

        assert.throws(function() {
            original.copy({});
        });
        assert.throws(function() {
            original.copy({ X: 0 });
        });
        assert.throws(function() {
            original.copy({ X: 0, Y: 0 });
        });
    });

    QUnit.test("clone test", function(assert) {
        let original = new ChunkCoordinate(6, 5, 4);
        let copy = original.clone();
        assert.ok(original !== copy);
        assert.ok(copy instanceof ChunkCoordinate);
        assert.equal(copy.X, 6);
        assert.equal(copy.Y, 5);
        assert.equal(copy.Z, 4);
    });

    QUnit.test("equals test", function(assert) {
        let original = new ChunkCoordinate(10, 11, 12);
        let compare = new ChunkCoordinate(10, 11, 12);
        assert.ok(original !== compare);
        assert.ok(original.equals(original));
        assert.ok(original.equals(compare));
        assert.ok(original.equals({ X: 10, Y: 11, Z: 12 }));
        assert.ok(!original.equals(Math));
        assert.ok(!original.equals({ X: 10 }));
    });

    QUnit.test("hashCode", function(assert) {
        let coord = new ChunkCoordinate(0, 0, 0);
        assert.equal(coord.hashCode(), 0);

        coord = new ChunkCoordinate(1, 0, 0);
        assert.equal(coord.hashCode(), 16777216);

        coord = new ChunkCoordinate(0, 1, 0);
        assert.equal(coord.hashCode(), 4096);

        coord = new ChunkCoordinate(0, 0, 1);
        assert.equal(coord.hashCode(), 1);

        coord = new ChunkCoordinate(1, 1, 1);
        assert.equal(coord.hashCode(), 16781313);
    });

    QUnit.test.todo("getVector", function(assert) {
        let coord = new ChunkCoordinate(10, 11, 12);
    })

    QUnit.test("toString test", function(assert) {
        let coord = new ChunkCoordinate(30, 40, 50);
        assert.equal(coord.toString(), "X 30 Y 40 Z 50");

        coord = new ChunkCoordinate();
        assert.equal(coord.toString(), "X 0 Y 0 Z 0");
    });
});