import { Axis, BlockCoordinate, Direction } from "../../../Map.js";
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

        let firstBlockCoordinate = new BlockCoordinate();
        assert.ok(firstBlockCoordinate instanceof BlockCoordinate, "First BlockCoordinate");
        assert.equal(firstBlockCoordinate.DetailLevel, 0);
        assert.equal(firstBlockCoordinate.Data, 0);
        assert.equal(firstBlockCoordinate.Size, 32);
        assert.equal(firstBlockCoordinate.Max, 32767);
        assert.equal(firstBlockCoordinate.Mask, 31);
        assert.equal(firstBlockCoordinate.Shift, 5);

        firstBlockCoordinate = new BlockCoordinate(2);
        assert.equal(firstBlockCoordinate.DetailLevel, 2, "Second BlockCoordinate");
        assert.equal(firstBlockCoordinate.Data, 0);
        assert.equal(firstBlockCoordinate.Size, 8);
        assert.equal(firstBlockCoordinate.Max, 511);
        assert.equal(firstBlockCoordinate.Mask, 7);
        assert.equal(firstBlockCoordinate.Shift, 3);

        firstBlockCoordinate = new BlockCoordinate(7, 13);
        assert.equal(firstBlockCoordinate.DetailLevel, 7, "Third BlockCoordinate");
        assert.equal(firstBlockCoordinate.Data, 13);
        assert.equal(firstBlockCoordinate.Size, 1073741824);
        assert.equal(firstBlockCoordinate.Max, -1);
        assert.equal(firstBlockCoordinate.Mask, 1073741823);
        assert.equal(firstBlockCoordinate.Shift, -2);

        let secondBlockCoordinate = new BlockCoordinate(firstBlockCoordinate);
        assert.equal(secondBlockCoordinate.DetailLevel, 7, "Fourth BlockCoordinate");
        assert.equal(secondBlockCoordinate.Data, 13);
        assert.equal(secondBlockCoordinate.Size, 1073741824);
        assert.equal(secondBlockCoordinate.Max, -1);
        assert.equal(secondBlockCoordinate.Mask, 1073741823);
        assert.equal(secondBlockCoordinate.Shift, -2);
    });

    QUnit.test("set DetailLevel test", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.DetailLevel = (0);
        assert.equal(blockCoordinate.DetailLevel, 0, '0,0');
        assert.equal(blockCoordinate.Data, 0);
        assert.equal(blockCoordinate.Size, 32);
        assert.equal(blockCoordinate.Max, 32767);
        assert.equal(blockCoordinate.Mask, 31);
        assert.equal(blockCoordinate.Shift, 5);

        blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.DetailLevel = (2);
        assert.equal(blockCoordinate.DetailLevel, 2, '2,4');
        assert.equal(blockCoordinate.Data, 4);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);
    });

    QUnit.test("translate test", function(assert) {
        let blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.translate(Direction.DIRECTION_NORTH);
        assert.equal(blockCoordinate.DetailLevel, 2);
        assert.equal(blockCoordinate.Data, 20);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);

        blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.translate(Direction.DIRECTION_UP_NORTH);
        assert.equal(blockCoordinate.DetailLevel, 2);
        assert.equal(blockCoordinate.Data, 21);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);

        blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.translate(Direction.DIRECTION_DOWN_NORTH);
        assert.equal(blockCoordinate.DetailLevel, 2);
        assert.equal(blockCoordinate.Data, 19);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);

        blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.translate(Direction.DIRECTION_NORTH, 2);
        assert.equal(blockCoordinate.DetailLevel, 2);
        assert.equal(blockCoordinate.Data, 28);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);

        blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.translate(Direction.DIRECTION_UP_NORTH, 2);
        assert.equal(blockCoordinate.DetailLevel, 2);
        assert.equal(blockCoordinate.Data, 30);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);

        blockCoordinate = new BlockCoordinate(2, 4);
        blockCoordinate.translate(Direction.DIRECTION_DOWN_NORTH, 2);
        assert.equal(blockCoordinate.DetailLevel, 2);
        assert.equal(blockCoordinate.Data, 26);
        assert.equal(blockCoordinate.Size, 8);
        assert.equal(blockCoordinate.Max, 511);
        assert.equal(blockCoordinate.Mask, 7);
        assert.equal(blockCoordinate.Shift, 3);
    });

    QUnit.test("set test", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.set(30);
        assert.equal(blockCoordinate.DetailLevel, 0);
        assert.equal(blockCoordinate.Data, 30);
        assert.equal(blockCoordinate.Size, 32);
        assert.equal(blockCoordinate.Max, 32767);
        assert.equal(blockCoordinate.Mask, 31);
        assert.equal(blockCoordinate.Shift, 5);

        blockCoordinate.set(Axis.AXIS_Z, 5);
        assert.equal(blockCoordinate.DetailLevel, 0);
        assert.equal(blockCoordinate.Data, 5);
        assert.equal(blockCoordinate.Size, 32);
        assert.equal(blockCoordinate.Max, 32767);
        assert.equal(blockCoordinate.Mask, 31);
        assert.equal(blockCoordinate.Shift, 5);

        blockCoordinate.set(Axis.AXIS_X, 5);
        assert.equal(blockCoordinate.DetailLevel, 0);
        assert.equal(blockCoordinate.Data, 5125);
        assert.equal(blockCoordinate.Size, 32);
        assert.equal(blockCoordinate.Max, 32767);
        assert.equal(blockCoordinate.Mask, 31);
        assert.equal(blockCoordinate.Shift, 5);

        blockCoordinate.set(Axis.AXIS_Y, 5);
        assert.equal(blockCoordinate.DetailLevel, 0);
        assert.equal(blockCoordinate.Data, 5285);
        assert.equal(blockCoordinate.Size, 32);
        assert.equal(blockCoordinate.Max, 32767);
        assert.equal(blockCoordinate.Mask, 31);
        assert.equal(blockCoordinate.Shift, 5);

        blockCoordinate.set(30, 30, 30);
        assert.equal(blockCoordinate.DetailLevel, 0);
        assert.equal(blockCoordinate.Data, 31710);
        assert.equal(blockCoordinate.Size, 32);
        assert.equal(blockCoordinate.Max, 32767);
        assert.equal(blockCoordinate.Mask, 31);
        assert.equal(blockCoordinate.Shift, 5);
    });

    QUnit.test("get BlockIndex test", function(assert) {
        let blockCoordinate = new BlockCoordinate(),
            newValue = Math.floor(Math.random() * 127);
        blockCoordinate.Data = newValue;
        assert.equal(blockCoordinate.getBlockIndex(), newValue);
    });

    QUnit.test("get coordinates", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.set(5, 10, 15);
        blockCoordinate.DetailLevel = (0);
        assert.equal(5, blockCoordinate.getX());
        assert.equal(10, blockCoordinate.getY());
        assert.equal(15, blockCoordinate.getZ());
        assert.equal(170, blockCoordinate.getXY());
    });

    QUnit.test("next", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.set(20);
        blockCoordinate.next();
        assert.equal(blockCoordinate.getBlockIndex(), 21);
    });

    QUnit.test("skipAlongAxis", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.set(4, 6, 8);
        blockCoordinate.skipAlongAxis(Axis.AXIS_Z);
        assert.equal(blockCoordinate.getX(), 4);
        assert.equal(blockCoordinate.getY(), 7);
        assert.equal(blockCoordinate.getZ(), 0);

        blockCoordinate.set(4, 6, 8);
        blockCoordinate.skipAlongAxis(Axis.AXIS_Y);
        assert.equal(blockCoordinate.getX(), 5);
        assert.equal(blockCoordinate.getY(), 0);
        assert.equal(blockCoordinate.getZ(), 8);

        blockCoordinate.set(4, 6, 8);
        blockCoordinate.skipAlongAxis(Axis.AXIS_X);
        assert.equal(blockCoordinate.getX(), 0);
        assert.equal(blockCoordinate.getY(), 6);
        assert.equal(blockCoordinate.getZ(), 8);
    });

    QUnit.test("end", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.set(20);
        assert.equal(blockCoordinate.end(), false);

        blockCoordinate.set(-1);
        assert.equal(blockCoordinate.end(), true);

        blockCoordinate.set(blockCoordinate.Max + 1);
        assert.equal(blockCoordinate.end(), true);
    });

    QUnit.test("copy", function(assert) {
        let blockCoordinate = new BlockCoordinate(1, 20);
        let copiedBlockCoordinate = new BlockCoordinate(0, 0);
        copiedBlockCoordinate.copy(blockCoordinate);
        assert.equal(copiedBlockCoordinate.Data, 20);
        assert.equal(copiedBlockCoordinate.DetailLevel, 1);
    });

    QUnit.test("clone", function(assert) {
        let blockCoordinate = new BlockCoordinate(2, 4);
        let clonedBlockCoordinate = blockCoordinate.clone();

        assert.equal(clonedBlockCoordinate.DetailLevel, 2);
        assert.equal(clonedBlockCoordinate.Data, 4);
        assert.equal(clonedBlockCoordinate.Size, 8);
        assert.equal(clonedBlockCoordinate.Max, 511);
        assert.equal(clonedBlockCoordinate.Mask, 7);
        assert.equal(clonedBlockCoordinate.Shift, 3);
    });

    QUnit.test("equals", function(assert) {
        let blockCoordinate = new BlockCoordinate(5, 6);
        let otherBlockCoordinate = new BlockCoordinate(5, 6);

        assert.ok(blockCoordinate !== otherBlockCoordinate);
        assert.ok(blockCoordinate.equals(otherBlockCoordinate));
        assert.ok(blockCoordinate.equals(blockCoordinate));

        otherBlockCoordinate.DetailLevel = 7;
        assert.ok(!blockCoordinate.equals(otherBlockCoordinate));
    });

    QUnit.test("getValueonAxis", function(assert) {
        let blockCoordinate = new BlockCoordinate();
        blockCoordinate.set(10, 20, 30);
        assert.equal(blockCoordinate.getValueonAxis(Axis.AXIS_X), 10);
        assert.equal(blockCoordinate.getValueonAxis(Axis.AXIS_Y), 20);
        assert.equal(blockCoordinate.getValueonAxis(Axis.AXIS_Z), 30);
    });

    QUnit.test("hashCode", function(assert) {
        let blockCoordinate = new BlockCoordinate(0, 100);
        assert.equal(blockCoordinate.hashCode(), 100);
    })
});