import { Axis } from "../../../Map/Coordinates/Axis.js";
import { Direction } from "../../../Map/Coordinates/Direction.js";
import { Serializable } from "../../../other/Serializable.js";
import { Enum } from "../../../other/Shims.js";

QUnit.module("Map/Coordinates/Direction test", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(Direction.DIRECTION_NONE, 0, 'DIRECTION_NONE');
        assert.ok(Direction.DIRECTION_NONE instanceof Enum);
        assert.ok(Direction.DIRECTION_NONE instanceof Direction);
        assert.equal(Direction.DIRECTION_NONE.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_NONE.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_NONE.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP, 1, 'DIRECTION_UP');
        assert.ok(Direction.DIRECTION_UP instanceof Enum);
        assert.ok(Direction.DIRECTION_UP instanceof Direction);
        assert.equal(Direction.DIRECTION_UP.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_UP.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_UP.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN, 2, 'DIRECTION_DOWN');
        assert.ok(Direction.DIRECTION_DOWN instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_DOWN.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_DOWN.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_NORTH, 8, 'DIRECTION_NORTH');
        assert.ok(Direction.DIRECTION_NORTH instanceof Enum);
        assert.ok(Direction.DIRECTION_NORTH instanceof Direction);
        assert.equal(Direction.DIRECTION_NORTH.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_NORTH.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_NORTH.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_NORTH, 9, 'DIRECTION_UP_NORTH');
        assert.ok(Direction.DIRECTION_UP_NORTH instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_NORTH instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_NORTH.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_UP_NORTH.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_UP_NORTH.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_NORTH, 10, 'DIRECTION_DOWN_NORTH');
        assert.ok(Direction.DIRECTION_DOWN_NORTH instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_NORTH instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_SOUTH, 16, 'DIRECTION_SOUTH');
        assert.ok(Direction.DIRECTION_SOUTH instanceof Enum);
        assert.ok(Direction.DIRECTION_SOUTH instanceof Direction);
        assert.equal(Direction.DIRECTION_SOUTH.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_SOUTH.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_SOUTH.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_SOUTH, 17, 'DIRECTION_UP_SOUTH');
        assert.ok(Direction.DIRECTION_UP_SOUTH instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_SOUTH instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_SOUTH.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_UP_SOUTH.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_UP_SOUTH.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_SOUTH, 18, 'DIRECTION_DOWN_SOUTH');
        assert.ok(Direction.DIRECTION_DOWN_SOUTH instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_SOUTH instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_EAST, 64, 'DIRECTION_EAST');
        assert.ok(Direction.DIRECTION_EAST instanceof Enum);
        assert.ok(Direction.DIRECTION_EAST instanceof Direction);
        assert.equal(Direction.DIRECTION_EAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_EAST.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_EAST.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_EAST, 65, 'DIRECTION_UP_EAST');
        assert.ok(Direction.DIRECTION_UP_EAST instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_EAST instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_EAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_UP_EAST.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_UP_EAST.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_EAST, 66, 'DIRECTION_DOWN_EAST');
        assert.ok(Direction.DIRECTION_DOWN_EAST instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_EAST instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_EAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_DOWN_EAST.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_DOWN_EAST.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_NORTHEAST, 72, 'DIRECTION_NORTHEAST');
        assert.ok(Direction.DIRECTION_NORTHEAST instanceof Enum);
        assert.ok(Direction.DIRECTION_NORTHEAST instanceof Direction);
        assert.equal(Direction.DIRECTION_NORTHEAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_NORTHEAST.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_NORTHEAST.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_NORTHEAST, 73, 'DIRECTION_UP_NORTHEAST');
        assert.ok(Direction.DIRECTION_UP_NORTHEAST instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_NORTHEAST instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST, 74, 'DIRECTION_DOWN_NORTHEAST');
        assert.ok(Direction.DIRECTION_DOWN_NORTHEAST instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_NORTHEAST instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_SOUTHEAST, 80, 'DIRECTION_SOUTHEAST');
        assert.ok(Direction.DIRECTION_SOUTHEAST instanceof Enum);
        assert.ok(Direction.DIRECTION_SOUTHEAST instanceof Direction);
        assert.equal(Direction.DIRECTION_SOUTHEAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_SOUTHEAST.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_SOUTHEAST.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_SOUTHEAST, 81, 'DIRECTION_UP_SOUTHEAST');
        assert.ok(Direction.DIRECTION_UP_SOUTHEAST instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_SOUTHEAST instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST, 82, 'DIRECTION_DOWN_SOUTHEAST');
        assert.ok(Direction.DIRECTION_DOWN_SOUTHEAST instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_SOUTHEAST instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.AxisValues[Axis.AXIS_X], 1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_WEST, 128, 'DIRECTION_WEST');
        assert.ok(Direction.DIRECTION_WEST instanceof Enum);
        assert.ok(Direction.DIRECTION_WEST instanceof Direction);
        assert.equal(Direction.DIRECTION_WEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_WEST.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_WEST.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_WEST, 129, 'DIRECTION_UP_WEST');
        assert.ok(Direction.DIRECTION_UP_WEST instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_WEST instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_WEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_UP_WEST.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_UP_WEST.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_WEST, 130, 'DIRECTION_DOWN_WEST');
        assert.ok(Direction.DIRECTION_DOWN_WEST instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_WEST instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_WEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_DOWN_WEST.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_DOWN_WEST.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_NORTHWEST, 136, 'DIRECTION_NORTHWEST');
        assert.ok(Direction.DIRECTION_NORTHWEST instanceof Enum);
        assert.ok(Direction.DIRECTION_NORTHWEST instanceof Direction);
        assert.equal(Direction.DIRECTION_NORTHWEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_NORTHWEST.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_NORTHWEST.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_NORTHWEST, 137, 'DIRECTION_UP_NORTHWEST');
        assert.ok(Direction.DIRECTION_UP_NORTHWEST instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_NORTHWEST instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST, 138, 'DIRECTION_DOWN_NORTHWEST');
        assert.ok(Direction.DIRECTION_DOWN_NORTHWEST instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_NORTHWEST instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.AxisValues[Axis.AXIS_Y], 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_SOUTHWEST, 144, 'DIRECTION_SOUTHWEST');
        assert.ok(Direction.DIRECTION_SOUTHWEST instanceof Enum);
        assert.ok(Direction.DIRECTION_SOUTHWEST instanceof Direction);
        assert.equal(Direction.DIRECTION_SOUTHWEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_SOUTHWEST.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_SOUTHWEST.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.DIRECTION_UP_SOUTHWEST, 145, 'DIRECTION_UP_SOUTHWEST');
        assert.ok(Direction.DIRECTION_UP_SOUTHWEST instanceof Enum);
        assert.ok(Direction.DIRECTION_UP_SOUTHWEST instanceof Direction);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.AxisValues[Axis.AXIS_Z], 1);

        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST, 146, 'DIRECTION_DOWN_SOUTHWEST');
        assert.ok(Direction.DIRECTION_DOWN_SOUTHWEST instanceof Enum);
        assert.ok(Direction.DIRECTION_DOWN_SOUTHWEST instanceof Direction);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.AxisValues[Axis.AXIS_X], -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.AxisValues[Axis.AXIS_Y], -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.AxisValues[Axis.AXIS_Z], -1);

        assert.equal(Direction.DIRECTION_DESTINATION, 36, 'DIRECTION_DESTINATION');
        assert.ok(Direction.DIRECTION_DESTINATION instanceof Enum);
        assert.ok(Direction.DIRECTION_DESTINATION instanceof Direction);
        assert.equal(Direction.DIRECTION_DESTINATION.AxisValues[Axis.AXIS_X], 0);
        assert.equal(Direction.DIRECTION_DESTINATION.AxisValues[Axis.AXIS_Y], 0);
        assert.equal(Direction.DIRECTION_DESTINATION.AxisValues[Axis.AXIS_Z], 0);

        assert.equal(Direction.ONEMASK, 18, 'Masks');
        assert.equal(Direction.ZEROMASK, 219);
        assert.equal(Direction.XORMASK, 73);

        assert.ok(Array.isArray(Direction.CARDINAL_DIRECTIONS), 'CARDINAL_DIRECTIONS');
        assert.equal(Direction.CARDINAL_DIRECTIONS[0], Direction.DIRECTION_NORTH);
        assert.equal(Direction.CARDINAL_DIRECTIONS[1], Direction.DIRECTION_SOUTH);
        assert.equal(Direction.CARDINAL_DIRECTIONS[2], Direction.DIRECTION_EAST);
        assert.equal(Direction.CARDINAL_DIRECTIONS[3], Direction.DIRECTION_WEST);

        assert.ok(Array.isArray(Direction.COMPASS_DIRECTIONS), 'COMPASS_DIRECTIONS');
        assert.equal(Direction.COMPASS_DIRECTIONS[0], Direction.DIRECTION_NORTH);
        assert.equal(Direction.COMPASS_DIRECTIONS[1], Direction.DIRECTION_SOUTH);
        assert.equal(Direction.COMPASS_DIRECTIONS[2], Direction.DIRECTION_EAST);
        assert.equal(Direction.COMPASS_DIRECTIONS[3], Direction.DIRECTION_WEST);
        assert.equal(Direction.COMPASS_DIRECTIONS[4], Direction.DIRECTION_NORTHWEST);
        assert.equal(Direction.COMPASS_DIRECTIONS[5], Direction.DIRECTION_SOUTHWEST);
        assert.equal(Direction.COMPASS_DIRECTIONS[6], Direction.DIRECTION_SOUTHEAST);
        assert.equal(Direction.COMPASS_DIRECTIONS[7], Direction.DIRECTION_NORTHEAST);

        assert.ok(Array.isArray(Direction.AXIAL_DIRECTIONS), "AXIAL_DIRECTIONS");
        assert.equal(Direction.AXIAL_DIRECTIONS[0], Direction.DIRECTION_UP);
        assert.equal(Direction.AXIAL_DIRECTIONS[1], Direction.DIRECTION_DOWN);
        assert.equal(Direction.AXIAL_DIRECTIONS[2], Direction.DIRECTION_NORTH);
        assert.equal(Direction.AXIAL_DIRECTIONS[3], Direction.DIRECTION_SOUTH);
        assert.equal(Direction.AXIAL_DIRECTIONS[4], Direction.DIRECTION_EAST);
        assert.equal(Direction.AXIAL_DIRECTIONS[5], Direction.DIRECTION_WEST);


        assert.ok(Array.isArray(Direction.ANGULAR_DIRECTIONS), "ANGULAR_DIRECTIONS");
        assert.equal(Direction.ANGULAR_DIRECTIONS[0], Direction.DIRECTION_NONE);
        assert.equal(Direction.ANGULAR_DIRECTIONS[1], Direction.DIRECTION_UP);
        assert.equal(Direction.ANGULAR_DIRECTIONS[2], Direction.DIRECTION_DOWN);
        assert.equal(Direction.ANGULAR_DIRECTIONS[3], Direction.DIRECTION_NORTH);
        assert.equal(Direction.ANGULAR_DIRECTIONS[4], Direction.DIRECTION_UP_NORTH);
        assert.equal(Direction.ANGULAR_DIRECTIONS[5], Direction.DIRECTION_DOWN_NORTH);
        assert.equal(Direction.ANGULAR_DIRECTIONS[6], Direction.DIRECTION_SOUTH);
        assert.equal(Direction.ANGULAR_DIRECTIONS[7], Direction.DIRECTION_UP_SOUTH);
        assert.equal(Direction.ANGULAR_DIRECTIONS[8], Direction.DIRECTION_DOWN_SOUTH);
        assert.equal(Direction.ANGULAR_DIRECTIONS[9], Direction.DIRECTION_EAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[10], Direction.DIRECTION_UP_EAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[11], Direction.DIRECTION_DOWN_EAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[12], Direction.DIRECTION_NORTHEAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[13], Direction.DIRECTION_UP_NORTHEAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[14], Direction.DIRECTION_DOWN_NORTHEAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[15], Direction.DIRECTION_SOUTHEAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[16], Direction.DIRECTION_UP_SOUTHEAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[17], Direction.DIRECTION_DOWN_SOUTHEAST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[18], Direction.DIRECTION_WEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[19], Direction.DIRECTION_UP_WEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[20], Direction.DIRECTION_DOWN_WEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[21], Direction.DIRECTION_NORTHWEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[22], Direction.DIRECTION_UP_NORTHWEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[23], Direction.DIRECTION_DOWN_NORTHWEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[24], Direction.DIRECTION_SOUTHWEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[25], Direction.DIRECTION_UP_SOUTHWEST);
        assert.equal(Direction.ANGULAR_DIRECTIONS[26], Direction.DIRECTION_DOWN_SOUTHWEST);

    });

    QUnit.test("Invert test", function(assert) {
        assert.equal(Direction.DIRECTION_NONE.invert(), Direction.DIRECTION_NONE);

        assert.equal(Direction.DIRECTION_UP.invert(), Direction.DIRECTION_DOWN);
        assert.equal(Direction.DIRECTION_DOWN.invert(), Direction.DIRECTION_UP);

        assert.equal(Direction.DIRECTION_NORTH.invert(), Direction.DIRECTION_SOUTH);
        assert.equal(Direction.DIRECTION_UP_NORTH.invert(), Direction.DIRECTION_DOWN_SOUTH);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.invert(), Direction.DIRECTION_UP_SOUTH);

        assert.equal(Direction.DIRECTION_SOUTH.invert(), Direction.DIRECTION_NORTH);
        assert.equal(Direction.DIRECTION_UP_SOUTH.invert(), Direction.DIRECTION_DOWN_NORTH);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.invert(), Direction.DIRECTION_UP_NORTH);

        assert.equal(Direction.DIRECTION_EAST.invert(), Direction.DIRECTION_WEST);
        assert.equal(Direction.DIRECTION_UP_EAST.invert(), Direction.DIRECTION_DOWN_WEST);
        assert.equal(Direction.DIRECTION_DOWN_EAST.invert(), Direction.DIRECTION_UP_WEST);
        assert.equal(Direction.DIRECTION_NORTHEAST.invert(), Direction.DIRECTION_SOUTHWEST);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.invert(), Direction.DIRECTION_DOWN_SOUTHWEST);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.invert(), Direction.DIRECTION_UP_SOUTHWEST);
        assert.equal(Direction.DIRECTION_SOUTHEAST.invert(), Direction.DIRECTION_NORTHWEST);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.invert(), Direction.DIRECTION_DOWN_NORTHWEST);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.invert(), Direction.DIRECTION_UP_NORTHWEST);

        assert.equal(Direction.DIRECTION_WEST.invert(), Direction.DIRECTION_EAST);
        assert.equal(Direction.DIRECTION_UP_WEST.invert(), Direction.DIRECTION_DOWN_EAST);
        assert.equal(Direction.DIRECTION_DOWN_WEST.invert(), Direction.DIRECTION_UP_EAST);
        assert.equal(Direction.DIRECTION_NORTHWEST.invert(), Direction.DIRECTION_SOUTHEAST);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.invert(), Direction.DIRECTION_DOWN_SOUTHEAST);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.invert(), Direction.DIRECTION_UP_SOUTHEAST);
        assert.equal(Direction.DIRECTION_SOUTHWEST.invert(), Direction.DIRECTION_NORTHEAST);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.invert(), Direction.DIRECTION_DOWN_NORTHEAST);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.invert(), Direction.DIRECTION_UP_NORTHEAST);

        assert.equal(Direction.DIRECTION_DESTINATION.invert(), Direction.DIRECTION_NONE);
    });

    QUnit.test("equals test", function(assert) {
        assert.ok(Direction.DIRECTION_NONE.equals(Direction.DIRECTION_NONE));
        assert.ok(Direction.DIRECTION_UP.equals(Direction.DIRECTION_UP));
        assert.ok(Direction.DIRECTION_DOWN.equals(Direction.DIRECTION_DOWN));
        assert.ok(Direction.DIRECTION_NORTH.equals(Direction.DIRECTION_NORTH));
        assert.ok(Direction.DIRECTION_UP_NORTH.equals(Direction.DIRECTION_UP_NORTH));
        assert.ok(Direction.DIRECTION_DOWN_NORTH.equals(Direction.DIRECTION_DOWN_NORTH));
        assert.ok(Direction.DIRECTION_SOUTH.equals(Direction.DIRECTION_SOUTH));
        assert.ok(Direction.DIRECTION_UP_SOUTH.equals(Direction.DIRECTION_UP_SOUTH));
        assert.ok(Direction.DIRECTION_DOWN_SOUTH.equals(Direction.DIRECTION_DOWN_SOUTH));
        assert.ok(Direction.DIRECTION_EAST.equals(Direction.DIRECTION_EAST));
        assert.ok(Direction.DIRECTION_UP_EAST.equals(Direction.DIRECTION_UP_EAST));
        assert.ok(Direction.DIRECTION_DOWN_EAST.equals(Direction.DIRECTION_DOWN_EAST));
        assert.ok(Direction.DIRECTION_NORTHEAST.equals(Direction.DIRECTION_NORTHEAST));
        assert.ok(Direction.DIRECTION_UP_NORTHEAST.equals(Direction.DIRECTION_UP_NORTHEAST));
        assert.ok(Direction.DIRECTION_DOWN_NORTHEAST.equals(Direction.DIRECTION_DOWN_NORTHEAST));
        assert.ok(Direction.DIRECTION_SOUTHEAST.equals(Direction.DIRECTION_SOUTHEAST));
        assert.ok(Direction.DIRECTION_UP_SOUTHEAST.equals(Direction.DIRECTION_UP_SOUTHEAST));
        assert.ok(Direction.DIRECTION_DOWN_SOUTHEAST.equals(Direction.DIRECTION_DOWN_SOUTHEAST));
        assert.ok(Direction.DIRECTION_WEST.equals(Direction.DIRECTION_WEST));
        assert.ok(Direction.DIRECTION_UP_WEST.equals(Direction.DIRECTION_UP_WEST));
        assert.ok(Direction.DIRECTION_DOWN_WEST.equals(Direction.DIRECTION_DOWN_WEST));
        assert.ok(Direction.DIRECTION_NORTHWEST.equals(Direction.DIRECTION_NORTHWEST));
        assert.ok(Direction.DIRECTION_UP_NORTHWEST.equals(Direction.DIRECTION_UP_NORTHWEST));
        assert.ok(Direction.DIRECTION_DOWN_NORTHWEST.equals(Direction.DIRECTION_DOWN_NORTHWEST));
        assert.ok(Direction.DIRECTION_SOUTHWEST.equals(Direction.DIRECTION_SOUTHWEST));
        assert.ok(Direction.DIRECTION_UP_SOUTHWEST.equals(Direction.DIRECTION_UP_SOUTHWEST));
        assert.ok(Direction.DIRECTION_DOWN_SOUTHWEST.equals(Direction.DIRECTION_DOWN_SOUTHWEST));
        assert.ok(Direction.DIRECTION_DESTINATION.equals(Direction.DIRECTION_DESTINATION));
    });

    QUnit.test("getValueonAxis test", function(assert) {
        assert.equal(Direction.DIRECTION_NONE.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_NONE');
        assert.equal(Direction.DIRECTION_NONE.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_NONE.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_UP');
        assert.equal(Direction.DIRECTION_UP.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_UP.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_DOWN');
        assert.equal(Direction.DIRECTION_DOWN.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_DOWN.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_NORTH.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_NORTH');
        assert.equal(Direction.DIRECTION_NORTH.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_NORTH.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_NORTH.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_UP_NORTH');
        assert.equal(Direction.DIRECTION_UP_NORTH.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_UP_NORTH.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_DOWN_NORTH');
        assert.equal(Direction.DIRECTION_DOWN_NORTH.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_SOUTH.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_SOUTH');
        assert.equal(Direction.DIRECTION_SOUTH.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_SOUTH.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_SOUTH.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_UP_SOUTH');
        assert.equal(Direction.DIRECTION_UP_SOUTH.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_UP_SOUTH.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_DOWN_SOUTH');
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_EAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_EAST');
        assert.equal(Direction.DIRECTION_EAST.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_EAST.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_EAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_UP_EAST');
        assert.equal(Direction.DIRECTION_UP_EAST.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_UP_EAST.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_EAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_DOWN_EAST');
        assert.equal(Direction.DIRECTION_DOWN_EAST.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_DOWN_EAST.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_NORTHEAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_NORTHEAST');
        assert.equal(Direction.DIRECTION_NORTHEAST.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_NORTHEAST.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_UP_NORTHEAST');
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_DOWN_NORTHEAST');
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_SOUTHEAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_SOUTHEAST');
        assert.equal(Direction.DIRECTION_SOUTHEAST.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_SOUTHEAST.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_UP_SOUTHEAST');
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.getValueonAxis(Axis.AXIS_X), 1, 'DIRECTION_DOWN_SOUTHEAST');
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_WEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_WEST');
        assert.equal(Direction.DIRECTION_WEST.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_WEST.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_WEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_UP_WEST');
        assert.equal(Direction.DIRECTION_UP_WEST.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_UP_WEST.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_WEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_DOWN_WEST');
        assert.equal(Direction.DIRECTION_DOWN_WEST.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_DOWN_WEST.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_NORTHWEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_NORTHWEST');
        assert.equal(Direction.DIRECTION_NORTHWEST.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_NORTHWEST.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_UP_NORTHWEST');
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_DOWN_NORTHWEST');
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.getValueonAxis(Axis.AXIS_Y), 1);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_SOUTHWEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_SOUTHWEST');
        assert.equal(Direction.DIRECTION_SOUTHWEST.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_SOUTHWEST.getValueonAxis(Axis.AXIS_Z), 0);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_UP_SOUTHWEST');
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.getValueonAxis(Axis.AXIS_Z), 1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.getValueonAxis(Axis.AXIS_X), -1, 'DIRECTION_DOWN_SOUTHWEST');
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.getValueonAxis(Axis.AXIS_Y), -1);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.getValueonAxis(Axis.AXIS_Z), -1);

        assert.equal(Direction.DIRECTION_DESTINATION.getValueonAxis(Axis.AXIS_X), 0, 'DIRECTION_DESTINATION');
        assert.equal(Direction.DIRECTION_DESTINATION.getValueonAxis(Axis.AXIS_Y), 0);
        assert.equal(Direction.DIRECTION_DESTINATION.getValueonAxis(Axis.AXIS_Z), 0);
    });

    QUnit.test.todo("isPositive", function(assert) {

    });

    QUnit.test("setVector test", function(assert) {
        let v = {};
        Direction.DIRECTION_NONE.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_NONE');
        assert.equal(v.y, 0);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_UP');
        assert.equal(v.y, 0);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_DOWN');
        assert.equal(v.y, 0);
        assert.equal(v.z, -1);

        Direction.DIRECTION_NORTH.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_NORTH');
        assert.equal(v.y, 1);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_NORTH.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_UP_NORTH');
        assert.equal(v.y, 1);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_NORTH.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_DOWN_NORTH');
        assert.equal(v.y, 1);
        assert.equal(v.z, -1);

        Direction.DIRECTION_SOUTH.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_SOUTH');
        assert.equal(v.y, -1);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_SOUTH.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_UP_SOUTH');
        assert.equal(v.y, -1);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_SOUTH.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_DOWN_SOUTH');
        assert.equal(v.y, -1);
        assert.equal(v.z, -1);

        Direction.DIRECTION_EAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_EAST');
        assert.equal(v.y, 0);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_EAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_UP_EAST');
        assert.equal(v.y, 0);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_EAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_DOWN_EAST');
        assert.equal(v.y, 0);
        assert.equal(v.z, -1);

        Direction.DIRECTION_NORTHEAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_NORTHEAST');
        assert.equal(v.y, 1);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_NORTHEAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_UP_NORTHEAST');
        assert.equal(v.y, 1);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_NORTHEAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_DOWN_NORTHEAST');
        assert.equal(v.y, 1);
        assert.equal(v.z, -1);

        Direction.DIRECTION_SOUTHEAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_SOUTHEAST');
        assert.equal(v.y, -1);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_SOUTHEAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_UP_SOUTHEAST');
        assert.equal(v.y, -1);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_SOUTHEAST.setVector(v);
        assert.equal(v.x, 1, 'DIRECTION_DOWN_SOUTHEAST');
        assert.equal(v.y, -1);
        assert.equal(v.z, -1);

        Direction.DIRECTION_WEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_WEST');
        assert.equal(v.y, 0);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_WEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_UP_WEST');
        assert.equal(v.y, 0);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_WEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_DOWN_WEST');
        assert.equal(v.y, 0);
        assert.equal(v.z, -1);

        Direction.DIRECTION_NORTHWEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_NORTHWEST');
        assert.equal(v.y, 1);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_NORTHWEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_UP_NORTHWEST');
        assert.equal(v.y, 1);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_NORTHWEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_DOWN_NORTHWEST');
        assert.equal(v.y, 1);
        assert.equal(v.z, -1);

        Direction.DIRECTION_SOUTHWEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_SOUTHWEST');
        assert.equal(v.y, -1);
        assert.equal(v.z, 0);
        Direction.DIRECTION_UP_SOUTHWEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_UP_SOUTHWEST');
        assert.equal(v.y, -1);
        assert.equal(v.z, 1);
        Direction.DIRECTION_DOWN_SOUTHWEST.setVector(v);
        assert.equal(v.x, -1, 'DIRECTION_DOWN_SOUTHWEST');
        assert.equal(v.y, -1);
        assert.equal(v.z, -1);

        Direction.DIRECTION_DESTINATION.setVector(v);
        assert.equal(v.x, 0, 'DIRECTION_DESTINATION');
        assert.equal(v.y, 0);
        assert.equal(v.z, 0);
    });

    QUnit.test("toDegree", function(assert) {
        assert.equal(Direction.DIRECTION_NORTH.toDegree(), 0);
        assert.equal(Direction.DIRECTION_UP_NORTH.toDegree(), 0);
        assert.equal(Direction.DIRECTION_DOWN_NORTH.toDegree(), 0);

        assert.equal(Direction.DIRECTION_SOUTH.toDegree(), 180);
        assert.equal(Direction.DIRECTION_UP_SOUTH.toDegree(), 180);
        assert.equal(Direction.DIRECTION_DOWN_SOUTH.toDegree(), 180);

        assert.equal(Direction.DIRECTION_EAST.toDegree(), 270);
        assert.equal(Direction.DIRECTION_UP_EAST.toDegree(), 270);
        assert.equal(Direction.DIRECTION_DOWN_EAST.toDegree(), 270);

        assert.equal(Direction.DIRECTION_WEST.toDegree(), 90);
        assert.equal(Direction.DIRECTION_UP_WEST.toDegree(), 90);
        assert.equal(Direction.DIRECTION_DOWN_WEST.toDegree(), 90);

        assert.equal(Direction.DIRECTION_NORTHWEST.toDegree(), 45);
        assert.equal(Direction.DIRECTION_UP_NORTHWEST.toDegree(), 45);
        assert.equal(Direction.DIRECTION_DOWN_NORTHWEST.toDegree(), 45);

        assert.equal(Direction.DIRECTION_SOUTHWEST.toDegree(), 135);
        assert.equal(Direction.DIRECTION_UP_SOUTHWEST.toDegree(), 135);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHWEST.toDegree(), 135);

        assert.equal(Direction.DIRECTION_SOUTHEAST.toDegree(), 225);
        assert.equal(Direction.DIRECTION_UP_SOUTHEAST.toDegree(), 225);
        assert.equal(Direction.DIRECTION_DOWN_SOUTHEAST.toDegree(), 225);

        assert.equal(Direction.DIRECTION_NORTHEAST.toDegree(), 315);
        assert.equal(Direction.DIRECTION_UP_NORTHEAST.toDegree(), 315);
        assert.equal(Direction.DIRECTION_DOWN_NORTHEAST.toDegree(), 315);

        assert.equal(Direction.DIRECTION_NONE.toDegree(), 0);
        assert.equal(Direction.DIRECTION_DESTINATION.toDegree(), 0);
    });
});