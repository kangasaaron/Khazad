/* Copyright 2010 Kenneth 'Impaler' Ferland

 This file is part of Khazad.

 Khazad is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Khazad is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Khazad.  If not, see <http://www.gnu.org/licenses/> */

import { defineEnumOpen, Enum, Byte } from "../../other.js";
import { Types } from "../../other/Types.js";
import { Axis } from "./Axis.js";

/**
 * Core Enum for describing directions in cubic map space, all 26 cubes surrounding
 * a single cube are described as well as None to reference the original cube and
 * indicate non movement, Destination is used by pathfinding to indicate the end
 * of a path being reached.
 *
 * @author Impaler
 */



let Direction = defineEnumOpen({
        "name": "Direction",
        "klass": class DirectionClass extends Enum {
            AxisValues = [];
            constructor(value, name, XAxis, YAxis, ZAxis) {
                Types.mustBe('string', name);
                Types.mustBeAll('finiteInteger', value, XAxis, YAxis, ZAxis);
                super((new Byte(value)).valueOf(), name);

                this.AxisValues[Axis.AXIS_X.ordinal] = XAxis;
                this.AxisValues[Axis.AXIS_Y.ordinal] = YAxis;
                this.AxisValues[Axis.AXIS_Z.ordinal] = ZAxis;
            }
            invert() {
                return Opposites[this];
            }
            equals(other) {
                Types.mustBe(Direction, other);
                return this.name == other.name &&
                    this.valueOf() == other.valueOf() &&
                    this.AxisValues[Axis.AXIS_X.ordinal] == other.AxisValues[Axis.AXIS_X.ordinal] &&
                    this.AxisValues[Axis.AXIS_Y.ordinal] == other.AxisValues[Axis.AXIS_Y.ordinal] &&
                    this.AxisValues[Axis.AXIS_Z.ordinal] == other.AxisValues[Axis.AXIS_Z.ordinal]
            }
            getValueonAxis(axis) {
                Types.mustBe(Axis, axis);
                return this.AxisValues[axis.ordinal];
            }
            isPositive() {
                //TODO a bunch of bit manipulation
            }
            setVector(Vec) { // TODO turn into setter
                // Types.mustBe(THREE.Vector3, Vec);
                Types.mustHaveAll(Vec, "x", "y", "z");
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

let CARDINAL_DIRECTIONS = [
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_WEST
];

Direction.CARDINAL_DIRECTIONS = CARDINAL_DIRECTIONS;

let COMPASS_DIRECTIONS = [
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_WEST,
    Direction.DIRECTION_NORTHWEST,
    Direction.DIRECTION_SOUTHWEST,
    Direction.DIRECTION_SOUTHEAST,
    Direction.DIRECTION_NORTHEAST
];
Direction.COMPASS_DIRECTIONS = COMPASS_DIRECTIONS;

let AXIAL_DIRECTIONS = [
    Direction.DIRECTION_UP,
    Direction.DIRECTION_DOWN,
    Direction.DIRECTION_NORTH,
    Direction.DIRECTION_SOUTH,
    Direction.DIRECTION_EAST,
    Direction.DIRECTION_WEST
];
Direction.AXIAL_DIRECTIONS = AXIAL_DIRECTIONS;

let ANGULAR_DIRECTIONS = [
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

Direction.ANGULAR_DIRECTIONS = ANGULAR_DIRECTIONS;

let Opposites = {};
Opposites[Direction.DIRECTION_NONE] = Direction.DIRECTION_NONE;
Opposites[Direction.DIRECTION_UP] = Direction.DIRECTION_DOWN;
Opposites[Direction.DIRECTION_DOWN] = Direction.DIRECTION_UP;
Opposites[Direction.DIRECTION_NORTH] = Direction.DIRECTION_SOUTH;
Opposites[Direction.DIRECTION_UP_NORTH] = Direction.DIRECTION_DOWN_SOUTH;
Opposites[Direction.DIRECTION_DOWN_NORTH] = Direction.DIRECTION_UP_SOUTH;
Opposites[Direction.DIRECTION_SOUTH] = Direction.DIRECTION_NORTH;
Opposites[Direction.DIRECTION_UP_SOUTH] = Direction.DIRECTION_DOWN_NORTH;
Opposites[Direction.DIRECTION_DOWN_SOUTH] = Direction.DIRECTION_UP_NORTH;
Opposites[Direction.DIRECTION_EAST] = Direction.DIRECTION_WEST;
Opposites[Direction.DIRECTION_UP_EAST] = Direction.DIRECTION_DOWN_WEST;
Opposites[Direction.DIRECTION_DOWN_EAST] = Direction.DIRECTION_UP_WEST;
Opposites[Direction.DIRECTION_NORTHEAST] = Direction.DIRECTION_SOUTHWEST;
Opposites[Direction.DIRECTION_UP_NORTHEAST] = Direction.DIRECTION_DOWN_SOUTHWEST;
Opposites[Direction.DIRECTION_DOWN_NORTHEAST] = Direction.DIRECTION_UP_SOUTHWEST;
Opposites[Direction.DIRECTION_SOUTHEAST] = Direction.DIRECTION_NORTHWEST;
Opposites[Direction.DIRECTION_UP_SOUTHEAST] = Direction.DIRECTION_DOWN_NORTHWEST;
Opposites[Direction.DIRECTION_DOWN_SOUTHEAST] = Direction.DIRECTION_UP_NORTHWEST;
Opposites[Direction.DIRECTION_WEST] = Direction.DIRECTION_EAST;
Opposites[Direction.DIRECTION_UP_WEST] = Direction.DIRECTION_DOWN_EAST;
Opposites[Direction.DIRECTION_DOWN_WEST] = Direction.DIRECTION_UP_EAST;
Opposites[Direction.DIRECTION_NORTHWEST] = Direction.DIRECTION_SOUTHEAST;
Opposites[Direction.DIRECTION_UP_NORTHWEST] = Direction.DIRECTION_DOWN_SOUTHEAST;
Opposites[Direction.DIRECTION_DOWN_NORTHWEST] = Direction.DIRECTION_UP_SOUTHEAST;
Opposites[Direction.DIRECTION_SOUTHWEST] = Direction.DIRECTION_NORTHEAST;
Opposites[Direction.DIRECTION_UP_SOUTHWEST] = Direction.DIRECTION_DOWN_NORTHEAST;
Opposites[Direction.DIRECTION_DOWN_SOUTHWEST] = Direction.DIRECTION_UP_NORTHEAST;
Opposites[Direction.DIRECTION_DESTINATION] = Direction.DIRECTION_NONE;
Direction.Opposites = Opposites;

Object.freeze(Direction);

export { Direction };