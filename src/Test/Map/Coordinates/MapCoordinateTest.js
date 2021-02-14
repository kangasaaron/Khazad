import { BlockCoordinate, ChunkCoordinate, Direction, MapCoordinate, SectorCoordinate, RegionCoordinate } from "../../../Map.js";
import { Serializable, Types } from "../../../other.js";

QUnit.module("Map/Coordinates/MapCoordinate test", function() {

    QUnit.test("statics test", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, MapCoordinate));
    });

    QUnit.test("constructor test", function(assert) {
        let m = new MapCoordinate();
        assert.ok(m !== null);
        assert.ok(m instanceof MapCoordinate);
        assert.ok(m.Region instanceof RegionCoordinate);
        assert.equal(m.Region.X, 0);
        assert.equal(m.Region.Y, 0);
        assert.ok(m.Sector instanceof SectorCoordinate);
        assert.equal(m.Sector.X, 0);
        assert.equal(m.Sector.Y, 0);
        assert.ok(m.Chunk instanceof ChunkCoordinate);
        assert.equal(m.Chunk.X, 0);
        assert.equal(m.Chunk.Y, 0);
        assert.equal(m.Chunk.Z, 0);
        assert.ok(m.Block instanceof BlockCoordinate);
        assert.equal(m.Block.Data, 0);
        assert.equal(m.Block.DetailLevel, 0);

        let c = new ChunkCoordinate(10, 15, 20);
        let b = new BlockCoordinate(5, 6);
        m = new MapCoordinate(c, b)
        assert.ok(m !== null);
        assert.ok(m instanceof MapCoordinate);
        assert.ok(m.Region instanceof RegionCoordinate);
        assert.equal(m.Region.X, 0);
        assert.equal(m.Region.Y, 0);
        assert.ok(m.Sector instanceof SectorCoordinate);
        assert.equal(m.Sector.X, 0);
        assert.equal(m.Sector.Y, 0);
        assert.ok(m.Chunk instanceof ChunkCoordinate);
        assert.equal(m.Chunk.X, 10);
        assert.equal(m.Chunk.Y, 15);
        assert.equal(m.Chunk.Z, 20);
        assert.ok(m.Block instanceof BlockCoordinate);
        assert.equal(m.Block.DetailLevel, 5);
        assert.equal(m.Block.Data, 6);

        assert.throws(function() {
            let d = new MapCoordinate("jeff", "cat");
        });
    });

    QUnit.test("set...", function(assert) {
        let m = new MapCoordinate();
        assert.equal(m.Chunk.X, 0);
        assert.equal(m.Chunk.Y, 0);
        assert.equal(m.Chunk.Z, 0);

        let c = new ChunkCoordinate(1, 2, 3);
        m.setChunkCoordinate(c);
        assert.equal(m.Chunk.X, 1);
        assert.equal(m.Chunk.Y, 2);
        assert.equal(m.Chunk.Z, 3);

        assert.throws(function() {
            a.setChunkCoordinate();
        });

        assert.throws(function() {
            m.setChunkCoordinate("cat");
        });

        let b = new BlockCoordinate(2, 6);
        m.setBlockCoordinate(b);
        assert.equal(m.Block.DetailLevel, 2);
        assert.equal(m.Block.Data, 6);

        assert.throws(function() {
            a.setBlockCoordinate();
        });

        assert.throws(function() {
            m.setBlockCoordinate("cat");
        });

        m.set(3, 4, 5);
        assert.equal(m.getX(), 3);
        assert.equal(m.getY(), 4);
        assert.equal(m.getZ(), 5);
    });

    QUnit.test("getVector test", function(assert) {
        let a = new MapCoordinate();
        a.set(3, 4, 5);
        assert.ok((a.getVector()).equals(new THREE.Vector3(3, 4, 5)));
    });
    QUnit.test("translate test", function(assert) {
        let a = new MapCoordinate();
        assert.equal(a.getX(), 0);
        assert.equal(a.getY(), 0);
        assert.equal(a.getZ(), 0);
        a.translate(Direction.DIRECTION_EAST);
        assert.equal(a.getX(), 1);
        assert.equal(a.getY(), 0);
        assert.equal(a.getZ(), 0);
        a.translate(Direction.DIRECTION_NORTH);
        assert.equal(a.getX(), 1);
        assert.equal(a.getY(), 1);
        assert.equal(a.getZ(), 0);
        a.translate(Direction.DIRECTION_UP);
        assert.equal(a.getX(), 1);
        assert.equal(a.getY(), 1);
        assert.equal(a.getZ(), 1);
    });
    QUnit.test("translateCube test", function(assert) {
        let a = new MapCoordinate();
        assert.equal(a.getX(), 0);
        assert.equal(a.getY(), 0);
        assert.equal(a.getZ(), 0);
        a.translateCube(Direction.DIRECTION_EAST, 10);
        assert.equal(a.getX(), 10);
        assert.equal(a.getY(), 0);
        assert.equal(a.getZ(), 0);
        a.translateCube(Direction.DIRECTION_NORTH, 9);
        assert.equal(a.getX(), 10);
        assert.equal(a.getY(), 9);
        assert.equal(a.getZ(), 0);
        a.translateCube(Direction.DIRECTION_UP, 8);
        assert.equal(a.getX(), 10);
        assert.equal(a.getY(), 9);
        assert.equal(a.getZ(), 8);

    });
    QUnit.test("equals test", function(assert) {
        let a = new MapCoordinate();
        let b = new MapCoordinate();
        assert.ok(a !== b);
        assert.ok(a.equals(a));
        assert.ok(a.equals(b));
        b.set(1, 0, 0);
        assert.ok(!a.equals(b));
        assert.ok(!a.equals());
        assert.ok(!a.equals(Math));
        assert.ok(!a.equals({}));
    });
    QUnit.test("clone test", function(assert) {
        let a = new MapCoordinate(new ChunkCoordinate(1, 2, 3), new BlockCoordinate(0, 78));
        a.Sector = new SectorCoordinate(10, 11);
        a.Region = new RegionCoordinate();
        a.Region.X = 9;
        a.Region.Y = 8;
        let b = a.clone();

        assert.equal(b.Chunk.X, 1);
        assert.equal(b.Chunk.Y, 2);
        assert.equal(b.Chunk.Z, 3);

        assert.equal(b.Block.DetailLevel, 0);
        assert.equal(b.Block.Data, 78);

        assert.equal(b.Region.X, 9);
        assert.equal(b.Region.Y, 8);

        assert.equal(b.Sector.X, 10);
        assert.equal(b.Sector.Y, 11);

    });
    QUnit.test("copy test", function(assert) {
        let m = new MapCoordinate(new ChunkCoordinate(1, 2, 3), new BlockCoordinate(0, 78));
        m.Sector = new SectorCoordinate(10, 11);
        m.Region = new RegionCoordinate();
        m.Region.X = 9;
        m.Region.Y = 8;
        let b = new MapCoordinate();
        b.copy(m);

        assert.equal(b.Chunk.X, 1);
        assert.equal(b.Chunk.Y, 2);
        assert.equal(b.Chunk.Z, 3);

        assert.equal(b.Block.DetailLevel, 0);
        assert.equal(b.Block.Data, 78);

        assert.equal(b.Region.X, 9);
        assert.equal(b.Region.Y, 8);

        assert.equal(b.Sector.X, 10);
        assert.equal(b.Sector.Y, 11);
    });
    QUnit.test("hashCode test", function(assert) {
        let m = new MapCoordinate(new ChunkCoordinate(1, 2, 3), new BlockCoordinate(0, 78));
        assert.equal(m.hashCode(), 484);
    });
});