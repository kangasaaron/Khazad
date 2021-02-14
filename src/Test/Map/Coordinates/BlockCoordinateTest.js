import { Axis } from "../../../Map/Coordinates/Axis.js";
import { BlockCoordinate } from "../../../Map/Coordinates/BlockCoordinate.js";
import { Direction } from "../../../Map/Coordinates/Direction.js";
import { Mock } from "../../MockClass.js";

QUnit.module("Map/Coordinates/BlockCoordinate", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(BlockCoordinate);
        assert.equal(BlockCoordinate.HALF_BLOCK, 0.5);
        assert.equal(BlockCoordinate.CHUNK_EDGE_SIZE, 32);
        assert.equal(BlockCoordinate.BLOCK_BITMASK, 31);
        assert.equal(BlockCoordinate.BLOCK_BITSHIFT_X, 2);
        assert.equal(BlockCoordinate.BLOCK_BITSHIFT_Y, 1);
        assert.equal(BlockCoordinate.BLOCK_BITSHIFT_Z, 0);
        assert.equal(BlockCoordinate.BLOCKS_PER_CHUNK, 32768);
        assert.equal(BlockCoordinate.CHUNK_DETAIL_LEVELS, 6);
    });

    QUnit.test("constructor", function(assert) {
        let MockBlockCoordinate = Mock(BlockCoordinate);
        MockBlockCoordinate.__override__('setDetailLevel');
        let a = new MockBlockCoordinate();
        assert.ok(a instanceof BlockCoordinate);
        assert.equal(a.DetailLevel, 0);
        assert.equal(a.Data, 0);
        assert.equal(a.Size, 0);
        assert.equal(a.Max, 0);
        assert.equal(a.Mask, 0);
        assert.equal(a.Shift, 0);
        assert.equal(a.__calls__.setDetailLevel.length, 1);
        assert.equal(a.__calls__.setDetailLevel[0].args[0], 0);

        a = new MockBlockCoordinate(2);
        assert.equal(a.DetailLevel, 2);
        assert.equal(a.Data, 0);
        assert.equal(a.Size, 0);
        assert.equal(a.Max, 0);
        assert.equal(a.Mask, 0);
        assert.equal(a.Shift, 0);
        assert.equal(a.__calls__.setDetailLevel.length, 1);
        assert.equal(a.__calls__.setDetailLevel[0].args[0], 2);

        a = new MockBlockCoordinate(7, 13);
        assert.equal(a.DetailLevel, 7);
        assert.equal(a.Data, 13);
        assert.equal(a.Size, 0);
        assert.equal(a.Max, 0);
        assert.equal(a.Mask, 0);
        assert.equal(a.Shift, 0);
        assert.equal(a.__calls__.setDetailLevel.length, 1);
        assert.equal(a.__calls__.setDetailLevel[0].args[0], 7);

        let b = new MockBlockCoordinate(a);
        assert.equal(b.DetailLevel, 7);
        assert.equal(b.Data, 13);
        assert.equal(b.Size, 0);
        assert.equal(b.Max, 0);
        assert.equal(b.Mask, 0);
        assert.equal(b.Shift, 0);
        assert.equal(b.__calls__.setDetailLevel.length, 1);
        assert.equal(b.__calls__.setDetailLevel[0].args[0], 7);
    });

    QUnit.test("setDetailLevel test", function(assert) {
        let b = new BlockCoordinate();
        b.setDetailLevel(0);
        assert.equal(b.DetailLevel, 0, '0,0');
        assert.equal(b.Data, 0);
        assert.equal(b.Size, 32);
        assert.equal(b.Max, 32767);
        assert.equal(b.Mask, 31);
        assert.equal(b.Shift, 5);

        b = new BlockCoordinate(2, 4);
        b.setDetailLevel(2);
        assert.equal(b.DetailLevel, 2, '2,4');
        assert.equal(b.Data, 4);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);
    });

    QUnit.test("translate test", function(assert) {
        let b = new BlockCoordinate(2, 4);
        b.translate(Direction.DIRECTION_NORTH);
        assert.equal(b.DetailLevel, 2);
        assert.equal(b.Data, 20);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);

        b = new BlockCoordinate(2, 4);
        b.translate(Direction.DIRECTION_UP_NORTH);
        assert.equal(b.DetailLevel, 2);
        assert.equal(b.Data, 21);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);

        b = new BlockCoordinate(2, 4);
        b.translate(Direction.DIRECTION_DOWN_NORTH);
        assert.equal(b.DetailLevel, 2);
        assert.equal(b.Data, 19);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);

        b = new BlockCoordinate(2, 4);
        b.translate(Direction.DIRECTION_NORTH, 2);
        assert.equal(b.DetailLevel, 2);
        assert.equal(b.Data, 28);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);

        b = new BlockCoordinate(2, 4);
        b.translate(Direction.DIRECTION_UP_NORTH, 2);
        assert.equal(b.DetailLevel, 2);
        assert.equal(b.Data, 30);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);

        b = new BlockCoordinate(2, 4);
        b.translate(Direction.DIRECTION_DOWN_NORTH, 2);
        assert.equal(b.DetailLevel, 2);
        assert.equal(b.Data, 26);
        assert.equal(b.Size, 8);
        assert.equal(b.Max, 511);
        assert.equal(b.Mask, 7);
        assert.equal(b.Shift, 3);
    });

    QUnit.test("set test", function(assert) {
        let b = new BlockCoordinate();
        b.set(30);
        assert.equal(b.DetailLevel, 0);
        assert.equal(b.Data, 30);
        assert.equal(b.Size, 32);
        assert.equal(b.Max, 32767);
        assert.equal(b.Mask, 31);
        assert.equal(b.Shift, 5);

        b.set(Axis.AXIS_Z, 5);
        assert.equal(b.DetailLevel, 0);
        assert.equal(b.Data, 5);
        assert.equal(b.Size, 32);
        assert.equal(b.Max, 32767);
        assert.equal(b.Mask, 31);
        assert.equal(b.Shift, 5);

        b.set(Axis.AXIS_X, 5);
        assert.equal(b.DetailLevel, 0);
        assert.equal(b.Data, 5125);
        assert.equal(b.Size, 32);
        assert.equal(b.Max, 32767);
        assert.equal(b.Mask, 31);
        assert.equal(b.Shift, 5);

        b.set(Axis.AXIS_Y, 5);
        assert.equal(b.DetailLevel, 0);
        assert.equal(b.Data, 5285);
        assert.equal(b.Size, 32);
        assert.equal(b.Max, 32767);
        assert.equal(b.Mask, 31);
        assert.equal(b.Shift, 5);

        b.set(30, 30, 30);
        assert.equal(b.DetailLevel, 0);
        assert.equal(b.Data, 31710);
        assert.equal(b.Size, 32);
        assert.equal(b.Max, 32767);
        assert.equal(b.Mask, 31);
        assert.equal(b.Shift, 5);
    });

    QUnit.test("getBlockIndex test", function(assert) {
        let b = new BlockCoordinate(),
            newValue = Symbol('New Value');
        b.Data = newValue;
        assert.equal(b.getBlockIndex(), newValue);
    });

    QUnit.test("get coordinates", function(assert) {
        let c = new BlockCoordinate();
        c.set(5, 10, 15);
        c.setDetailLevel(0);
        assert.equal(5, c.getX());
        assert.equal(10, c.getY());
        assert.equal(15, c.getZ());
        assert.equal(170, c.getXY());
    });

    QUnit.test("next", function(assert) {
        let c = new BlockCoordinate();
        c.set(20);
        c.next();
        assert.equal(c.getBlockIndex(), 21);
    });

    QUnit.test("skipAlongAxis", function(assert) {
        let c = new BlockCoordinate();
        c.set(4, 6, 8);
        c.skipAlongAxis(Axis.AXIS_Z);
        assert.equal(c.getX(), 4);
        assert.equal(c.getY(), 7);
        assert.equal(c.getZ(), 0);

        c.set(4, 6, 8);
        c.skipAlongAxis(Axis.AXIS_Y);
        assert.equal(c.getX(), 5);
        assert.equal(c.getY(), 0);
        assert.equal(c.getZ(), 8);

        c.set(4, 6, 8);
        c.skipAlongAxis(Axis.AXIS_X);
        assert.equal(c.getX(), 0);
        assert.equal(c.getY(), 6);
        assert.equal(c.getZ(), 8);
    });

    QUnit.test("end", function(assert) {
        let c = new BlockCoordinate();
        c.set(20);
        assert.equal(c.end(), false);

        c.set(-1);
        assert.equal(c.end(), true);

        c.set(c.Max + 1);
        assert.equal(c.end(), true);
    });

    QUnit.test("copy", function(assert) {
        let c = new BlockCoordinate(1, 20);
        let d = new BlockCoordinate(0, 0);
        d.copy(c);
        assert.equal(d.Data, 20);
        assert.equal(d.DetailLevel, 1);
    });

    QUnit.test("clone", function(assert) {
        let c = new BlockCoordinate(2, 4);
        let cloned = c.clone();

        assert.equal(cloned.DetailLevel, 2);
        assert.equal(cloned.Data, 4);
        assert.equal(cloned.Size, 8);
        assert.equal(cloned.Max, 511);
        assert.equal(cloned.Mask, 7);
        assert.equal(cloned.Shift, 3);
    });

    QUnit.test("equals", function(assert) {
        let c = new BlockCoordinate(5, 6);
        let d = new BlockCoordinate(5, 6);

        assert.ok(c !== d);
        assert.ok(c.equals(d));
        assert.ok(c.equals(c));

        d.setDetailLevel(7);
        assert.ok(!c.equals(d));
    });

    QUnit.test("getValueonAxis", function(assert) {
        let c = new BlockCoordinate();
        c.set(10, 20, 30);
        assert.equal(c.getValueonAxis(Axis.AXIS_X), 10);
        assert.equal(c.getValueonAxis(Axis.AXIS_Y), 20);
        assert.equal(c.getValueonAxis(Axis.AXIS_Z), 30);
    });

    QUnit.test("hashCode", function(assert) {
        let c = new BlockCoordinate(0, 100);
        assert.equal(c.hashCode(), 100);
    })
});