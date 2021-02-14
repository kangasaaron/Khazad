import { Axis, BlockShape, Direction } from "../../Map.js";
import { Byte, Short } from "../../other.js";

QUnit.module("Map/BlockShape tests", function() {
    QUnit.test('statics', function(assert) {
        assert.equal(BlockShape.BELOW_CUBE_HEIGHT, 0);

        assert.equal(BlockShape.serialVersionUID, 1);
        // Defined values for determining how many vertical fractions exist in a cube
        assert.equal(BlockShape.BELOW_CUBE_HEIGHT, 0);
        assert.equal(BlockShape.CUBE_BOTTOM_HEIGHT, 1);
        assert.equal(BlockShape.HEIGHT_FRACTIONS, 4);
        assert.equal(BlockShape.CUBE_TOP_HEIGHT, 5);
        // BitPacking  SWW SEE NWW NEE FLAG
        //             FED CBA 987 654 3210
        // Mask values used to extract values for a corner
        assert.equal(BlockShape.SWMASK, new Short(57344).valueOf());
        assert.equal(BlockShape.SEMASK, 7168);
        assert.equal(BlockShape.NWMASK, 896);
        assert.equal(BlockShape.NEMASK, 112);
        // Names for the specific Flags and the Mask to retrive them
        assert.equal(BlockShape.FLAGMASK, 15);
        assert.equal(BlockShape.SPLITMASK, 1);
        assert.equal(BlockShape.VERTICALMASK, 2);
        assert.equal(BlockShape.UNUSED1MASK, 4);
        assert.equal(BlockShape.UNUSED2MASK, 8);
        // Shifting values used to extract values for a corner
        assert.equal(BlockShape.SWSHIFT, 13);
        assert.equal(BlockShape.SESHIFT, 10);
        assert.equal(BlockShape.NWSHIFT, 7);
        assert.equal(BlockShape.NESHIFT, 4);
        // Bit compressed heights of each corner and flags

        assert.equal(BlockShape.EMPTY_CUBE_DATA, 0);
    });

    QUnit.test("constructor / getData tests", function(assert) {
        let a = new BlockShape();
        assert.ok(a instanceof BlockShape);
        assert.ok(a.getData() == -18736);

        a = new BlockShape(new Byte(30));
        assert.ok(a instanceof BlockShape);
        assert.ok(a.getData() == -9376);

        a = new BlockShape(new Short(300));
        assert.ok(a instanceof BlockShape);
        assert.ok(a.getData() == 300);

        a = new BlockShape(new Byte(0), new Byte(5), new Byte(10), new Byte(15), new Byte(127));
        assert.ok(a instanceof BlockShape);
        assert.ok(a.getData() == 5503);

        a = new BlockShape(new Byte(0), new Byte(5), new Byte(10), new Byte(15));
        assert.ok(a instanceof BlockShape);
        assert.ok(a.getData() == 5488);
    });

    QUnit.test("setData / getData tests", function(assert) {
        let a = new BlockShape(new Short(400));
        assert.ok(a.getData() == 400);
        a.setData(200);
        assert.ok(a.getData() == 200);
    });

    QUnit.test("set/get corners", function(assert) {
        let a = new BlockShape();
        assert.ok(a.getSouthWestCorner() == 5);
        assert.ok(a.getSouthEastCorner() == 5);
        assert.ok(a.getNorthWestCorner() == 5);
        assert.ok(a.getNorthEastCorner() == 5);

        a.setSouthWestCorner(1);
        a.setSouthEastCorner(2);
        a.setNorthWestCorner(3);
        a.setNorthEastCorner(4);

        assert.ok(a.getSouthWestCorner() == 1);
        assert.ok(a.getSouthEastCorner() == 2);
        assert.ok(a.getNorthWestCorner() == 3);
        assert.ok(a.getNorthEastCorner() == 4);
    });

    QUnit.test("equals, notequal, copy & clone", function(assert) {
        let a = new BlockShape(new Short(200)),
            b = new BlockShape(new Short(200));
        assert.ok(a !== b);
        assert.ok(a.equals(b));
        assert.ok(a.equals(a));
        let c = new BlockShape();
        assert.ok(a.notequal(c));
        c.copy(a);
        assert.ok(c.equals(b));
        let d = b.clone();
        assert.ok(a.equals(d));

    });

    QUnit.test("isSolid", function(assert) {
        let a = new BlockShape();
        assert.ok(a.isSolid());

        a.setSouthEastCorner(0);
        assert.ok(!a.isSolid());
    });

    QUnit.test("isEmpty", function(assert) {
        let a = new BlockShape(new Short(0));
        assert.ok(a.isEmpty());

        a.setSouthEastCorner(5);
        assert.ok(!a.isEmpty());
    });
    QUnit.test("volume, isSplit", function(assert) {
        let a = new BlockShape(new Short(100));
        assert.equal(a.volume(), 0);
        assert.equal(a.isSplit(), false);

        a.setData(new Short(new Short(a.getData() & BlockShape.FLAGMASK) | BlockShape.SPLITMASK));

        assert.equal(a.volume(), -24);
        assert.equal(a.isSplit(), true);
    });

    QUnit.test("getCenterHeight", function(assert) {
        let a = new BlockShape(new Byte(5), new Byte(0));
        assert.equal(a.getCenterHeight(), -0.75);

        a.setData(new Short(new Short(a.getData() & BlockShape.FLAGMASK) | BlockShape.SPLITMASK));
        assert.equal(a.getCenterHeight(), -0.75);


        a = new BlockShape(new Byte(5), new Byte(4), new Byte(3), new Byte(2), new Byte(0));
        assert.equal(a.getCenterHeight(), 0.125);

        a.setData(new Short(new Short(a.getData() & BlockShape.FLAGMASK) | BlockShape.SPLITMASK));
        assert.equal(a.getCenterHeight(), -0.75);
    });

    QUnit.test("getDirectionEdgeHeight", function(assert) {
        let a = new BlockShape(new Byte(1), new Byte(2), new Byte(3), new Byte(4), new Byte(0));
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_NONE), 0);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DESTINATION), 0);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_NORTH), 0.125, "DIRECTION_NORTH");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_NORTH), 0.125);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_NORTH), 0.125);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_SOUTH), -0.375, "DIRECTION_SOUTH");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_SOUTH), -0.375);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_SOUTH), -0.375);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_EAST), 0, "DIRECTION_EAST");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_EAST), 0);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_EAST), 0);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_WEST), -0.25, "DIRECTION_WEST");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_WEST), -0.25);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_WEST), -0.25);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_NORTHWEST), 0, "DIRECTION_NORTHWEST");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_NORTHWEST), 0);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_NORTHWEST), 0);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_SOUTHWEST), -0.5, "DIRECTION_SOUTHWEST");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_SOUTHWEST), -0.5);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_SOUTHWEST), -0.5);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_SOUTHEAST), -0.25, "DIRECTION_SOUTHEAST");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_SOUTHEAST), -0.25);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_SOUTHEAST), -0.25);

        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_NORTHEAST), 0.25, "DIRECTION_NORTHEAST");
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_UP_NORTHEAST), 0.25);
        assert.equal(a.getDirectionEdgeHeight(Direction.DIRECTION_DOWN_NORTHEAST), 0.25);
    });
    QUnit.test("isLightPassable", function(assert) {
        let a = new BlockShape();

        assert.equal(a.isLightPassable(Axis.AXIS_X), false);
        assert.equal(a.isLightPassable(Axis.AXIS_Y), false);
        assert.equal(a.isLightPassable(Axis.AXIS_Z), false);

        a.setData(new Short(new Short(a.getData() & BlockShape.FLAGMASK) | BlockShape.SPLITMASK));

        assert.equal(a.isLightPassable(Axis.AXIS_X), false);
        assert.equal(a.isLightPassable(Axis.AXIS_Y), false);
        assert.equal(a.isLightPassable(Axis.AXIS_Z), true);
    });
    QUnit.test("isExcavationEquivalent", function(assert) {
        let a = new BlockShape(new Byte(3), new Byte(3), new Byte(3), new Byte(3));
        let b = new BlockShape(new Byte(3), new Byte(3), new Byte(3), new Byte(3));
        let c = new BlockShape(new Byte(1), new Byte(1), new Byte(1), new Byte(1));

        assert.ok(a.isExcavationEquivalent(b));
        assert.ok(a.isExcavationEquivalent(c));
    });
    QUnit.test("isSky", function(assert) {
        let a = new BlockShape(new Byte(0), new Byte(0), new Byte(0), new Byte(0));
        assert.ok(a.isSky());
    });
    QUnit.test("hasFloor/hasCeiling/hasFace", function(assert) {
        let a = new BlockShape();

        assert.equal(a.hasFace(), false);

        assert.equal(a.hasFace(Direction.DIRECTION_EAST), true);
        assert.equal(a.hasFace(Direction.DIRECTION_WEST), true);
        assert.equal(a.hasFace(Direction.DIRECTION_NORTH), true);
        assert.equal(a.hasFace(Direction.DIRECTION_SOUTH), true);
        assert.equal(a.hasFace(Direction.DIRECTION_UP), false);
        assert.equal(a.hasCeiling(), false);
        assert.equal(a.hasFace(Direction.DIRECTION_DOWN), false);
        assert.equal(a.hasFloor(), false);

        a.setData(new Short(new Short(a.getData() & BlockShape.FLAGMASK) | BlockShape.SPLITMASK));

        assert.equal(a.hasFace(Direction.DIRECTION_UP), false);
        assert.equal(a.hasCeiling(), false);
        assert.equal(a.hasFace(Direction.DIRECTION_DOWN), false);
        assert.equal(a.hasFloor(), false);

        a = new BlockShape(new Short(0));
        assert.equal(a.hasFace(), false, 'empty param');

        assert.equal(a.hasFace(Direction.DIRECTION_EAST), false);
        assert.equal(a.hasFace(Direction.DIRECTION_WEST), false);
        assert.equal(a.hasFace(Direction.DIRECTION_NORTH), false);
        assert.equal(a.hasFace(Direction.DIRECTION_SOUTH), false);
        assert.equal(a.hasFace(Direction.DIRECTION_UP), false);
        assert.equal(a.hasCeiling(), false);
        assert.equal(a.hasFace(Direction.DIRECTION_DOWN), false);
        assert.equal(a.hasFloor(), false);

        a.setData(new Short(new Short(a.getData() & BlockShape.FLAGMASK) | BlockShape.SPLITMASK));

        assert.equal(a.hasFace(Direction.DIRECTION_UP), false);
        assert.equal(a.hasCeiling(), false);
        assert.equal(a.hasFace(Direction.DIRECTION_DOWN), false);
        assert.equal(a.hasFloor(), false);


    });
});