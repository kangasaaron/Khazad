import { defineEnumOpen, Enum } from "../../other/Shims.js";
import { Byte } from "../../other/Integers.js";
import { Axis } from "./Axis.js";

let Direction = defineEnumOpen({
        "name": "Direction",
        "klass": class Direction extends Enum {
            constructor(name, value, XAxis, YAxis, ZAxis) {
                super(name, new Byte(value));
                this.AxisValues = [];
                this.AxisValues[Axis.AXIS_X.ordinal] = XAxis;
                this.AxisValues[Axis.AXIS_Y.ordinal] = YAxis;
                this.AxisValues[Axis.AXIS_Z.ordinal] = ZAxis;
            }
            invert() {
                return Direction.Opposites[this];
            }
            equals(other) {
                return this.name == other.name &&
                    this.value.equals(other.value) &&
                    this.AxisValues[Axis.AXIS_X.ordinal] == other.AxisValues[Axis.AXIS_X.ordinal] &&
                    this.AxisValues[Axis.AXIS_Y.ordinal] == other.AxisValues[Axis.AXIS_Y.ordinal] &&
                    this.AxisValues[Axis.AXIS_Z.ordinal] == other.AxisValues[Axis.AXIS_Z.ordinal]
            }
            getValueonAxis(axis) {
                return this.AxisValues[axis.ordinal];
            }
            isPositive() {
                //TODO
            }
            setVector(Vec) { // TODO turn into setter
                Vec.x = this.getValueonAxis(Axis.AXIS_X);
                Vec.y = this.getValueonAxis(Axis.AXIS_Y);
                Vec.z = this.getValueonAxis(Axis.AXIS_Z);
            }
            toDegree() {
                switch (this) {
                    case Direction.DIRECTION_NORTH:
                    case Direction.DIRECTION_UP_NORTH:
                    case Direction.DIRECTION_DOWN_NORTH:
                        return 0;

                    case Direction.DIRECTION_SOUTH:
                    case Direction.DIRECTION_UP_SOUTH:
                    case Direction.DIRECTION_DOWN_SOUTH:
                        return 180;

                    case Direction.DIRECTION_EAST:
                    case Direction.DIRECTION_UP_EAST:
                    case Direction.DIRECTION_DOWN_EAST:
                        return 270;

                    case Direction.DIRECTION_WEST:
                    case Direction.DIRECTION_UP_WEST:
                    case Direction.DIRECTION_DOWN_WEST:
                        return 90;

                    case Direction.DIRECTION_NORTHWEST:
                    case Direction.DIRECTION_UP_NORTHWEST:
                    case Direction.DIRECTION_DOWN_NORTHWEST:
                        return 45;

                    case Direction.DIRECTION_SOUTHWEST:
                    case Direction.DIRECTION_UP_SOUTHWEST:
                    case Direction.DIRECTION_DOWN_SOUTHWEST:
                        return 135;

                    case Direction.DIRECTION_SOUTHEAST:
                    case Direction.DIRECTION_UP_SOUTHEAST:
                    case Direction.DIRECTION_DOWN_SOUTHEAST:
                        return 225;

                    case Direction.DIRECTION_NORTHEAST:
                    case Direction.DIRECTION_UP_NORTHEAST:
                    case Direction.DIRECTION_DOWN_NORTHEAST:
                        return 315;
                }
                return 0;
            }
        }
    },

    { "DIRECTION_NONE": 0, args: [0, 0, 0] },

    { "DIRECTION_UP": 1, args: [0, 0, 1] },

    { "DIRECTION_DOWN": 2, args: [0, 0, -1] },

    { "DIRECTION_NORTH": 8, args: [0, 1, 0] },

    { "DIRECTION_UP_NORTH": 9, args: [0, 1, 1] },

    { "DIRECTION_DOWN_NORTH": 10, args: [0, 1, -1] },

    { "DIRECTION_SOUTH": 16, args: [0, -1, 0] },

    { "DIRECTION_UP_SOUTH": 17, args: [0, -1, 1] },

    { "DIRECTION_DOWN_SOUTH": 18, args: [0, -1, -1] },

    { "DIRECTION_EAST": 64, args: [1, 0, 0] },

    { "DIRECTION_UP_EAST": 65, args: [1, 0, 1] },

    { "DIRECTION_DOWN_EAST": 66, args: [1, 0, -1] },

    { "DIRECTION_NORTHEAST": 72, args: [1, 1, 0] },

    { "DIRECTION_UP_NORTHEAST": 73, args: [1, 1, 1] },

    { "DIRECTION_DOWN_NORTHEAST": 74, args: [1, 1, -1] },

    { "DIRECTION_SOUTHEAST": 80, args: [1, -1, 0] },

    { "DIRECTION_UP_SOUTHEAST": 81, args: [1, -1, 1] },

    { "DIRECTION_DOWN_SOUTHEAST": 82, args: [1, -1, -1] },

    { "DIRECTION_WEST": 128, args: [-1, 0, 0] },

    { "DIRECTION_UP_WEST": 129, args: [-1, 0, 1] },

    { "DIRECTION_DOWN_WEST": 130, args: [-1, 0, -1] },

    { "DIRECTION_NORTHWEST": 136, args: [-1, 1, 0] },

    { "DIRECTION_UP_NORTHWEST": 137, args: [-1, 1, 1] },

    { "DIRECTION_DOWN_NORTHWEST": 138, args: [-1, 1, -1] },

    { "DIRECTION_SOUTHWEST": 144, args: [-1, -1, 0] },

    { "DIRECTION_UP_SOUTHWEST": 145, args: [-1, -1, 1] },

    { "DIRECTION_DOWN_SOUTHWEST": 146, args: [-1, -1, -1] },

    { "DIRECTION_DESTINATION": 36, args: [0, 0, 0] }
);

Direction.ONEMASK = new Byte(18);
Direction.ZEROMASK = new Byte(219);
Direction.XORMASK = new Byte(73);

Direction.CARDINAL_DIRECTIONS = [
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_WEST
];

Direction.COMPASS_DIRECTIONS = [
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_WEST,
    Direction.DIRECTION_NORTHWEST,
    Direction.DIRECTION_SOUTHWEST,
    Direction.DIRECTION_SOUTHEAST,
    Direction.DIRECTION_NORTHEAST
];

Direction.AXIAL_DIRECTIONS = [
    Direction.DIRECTION_UP,
    Direction.DIRECTION_DOWN,
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_WEST
];


Direction.ANGULAR_DIRECTIONS = [
    Direction.DIRECTION_NONE,
    Direction.DIRECTION_UP,
    Direction.DIRECTION_DOWN,
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_UP_NORTH,
    Direction.DIRECTION_DOWN_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_UP_SOUTH,
    Direction.DIRECTION_DOWN_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_UP_EAST,
    Direction.DIRECTION_DOWN_EAST,
    Direction.DIRECTION_NORTHEAST,
    Direction.DIRECTION_UP_NORTHEAST,
    Direction.DIRECTION_DOWN_NORTHEAST,
    Direction.DIRECTION_SOUTHEAST,
    Direction.DIRECTION_UP_SOUTHEAST,
    Direction.DIRECTION_DOWN_SOUTHEAST,
    Direction.DIRECTION_WEST,
    Direction.DIRECTION_UP_WEST,
    Direction.DIRECTION_DOWN_WEST,
    Direction.DIRECTION_NORTHWEST,
    Direction.DIRECTION_UP_NORTHWEST,
    Direction.DIRECTION_DOWN_NORTHWEST,
    Direction.DIRECTION_SOUTHWEST,
    Direction.DIRECTION_UP_SOUTHWEST,
    Direction.DIRECTION_DOWN_SOUTHWEST
];

Direction.Opposites = {};
Direction.Opposites[Direction.DIRECTION_NONE] = Direction.DIRECTION_NONE;
Direction.Opposites[Direction.DIRECTION_UP] = Direction.DIRECTION_DOWN;
Direction.Opposites[Direction.DIRECTION_DOWN] = Direction.DIRECTION_UP;
Direction.Opposites[Direction.DIRECTION_NORTH] = Direction.DIRECTION_SOUTH;
Direction.Opposites[Direction.DIRECTION_UP_NORTH] = Direction.DIRECTION_DOWN_SOUTH;
Direction.Opposites[Direction.DIRECTION_DOWN_NORTH] = Direction.DIRECTION_UP_SOUTH;
Direction.Opposites[Direction.DIRECTION_SOUTH] = Direction.DIRECTION_NORTH;
Direction.Opposites[Direction.DIRECTION_UP_SOUTH] = Direction.DIRECTION_DOWN_NORTH;
Direction.Opposites[Direction.DIRECTION_DOWN_SOUTH] = Direction.DIRECTION_UP_NORTH;
Direction.Opposites[Direction.DIRECTION_EAST] = Direction.DIRECTION_WEST;
Direction.Opposites[Direction.DIRECTION_UP_EAST] = Direction.DIRECTION_DOWN_WEST;
Direction.Opposites[Direction.DIRECTION_DOWN_EAST] = Direction.DIRECTION_UP_WEST;
Direction.Opposites[Direction.DIRECTION_NORTHEAST] = Direction.DIRECTION_SOUTHWEST;
Direction.Opposites[Direction.DIRECTION_UP_NORTHEAST] = Direction.DIRECTION_DOWN_SOUTHWEST;
Direction.Opposites[Direction.DIRECTION_DOWN_NORTHEAST] = Direction.DIRECTION_UP_SOUTHWEST;
Direction.Opposites[Direction.DIRECTION_SOUTHEAST] = Direction.DIRECTION_NORTHWEST;
Direction.Opposites[Direction.DIRECTION_UP_SOUTHEAST] = Direction.DIRECTION_DOWN_NORTHWEST;
Direction.Opposites[Direction.DIRECTION_DOWN_SOUTHEAST] = Direction.DIRECTION_UP_NORTHWEST;
Direction.Opposites[Direction.DIRECTION_WEST] = Direction.DIRECTION_EAST;
Direction.Opposites[Direction.DIRECTION_UP_WEST] = Direction.DIRECTION_DOWN_EAST;
Direction.Opposites[Direction.DIRECTION_DOWN_WEST] = Direction.DIRECTION_UP_EAST;
Direction.Opposites[Direction.DIRECTION_NORTHWEST] = Direction.DIRECTION_SOUTHEAST;
Direction.Opposites[Direction.DIRECTION_UP_NORTHWEST] = Direction.DIRECTION_DOWN_SOUTHEAST;
Direction.Opposites[Direction.DIRECTION_DOWN_NORTHWEST] = Direction.DIRECTION_UP_SOUTHEAST;
Direction.Opposites[Direction.DIRECTION_SOUTHWEST] = Direction.DIRECTION_NORTHEAST;
Direction.Opposites[Direction.DIRECTION_UP_SOUTHWEST] = Direction.DIRECTION_DOWN_NORTHEAST;
Direction.Opposites[Direction.DIRECTION_DOWN_SOUTHWEST] = Direction.DIRECTION_UP_NORTHEAST;
Direction.Opposites[Direction.DIRECTION_DESTINATION] = Direction.DIRECTION_NONE;


export { Direction };