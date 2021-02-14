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

import { Byte, Long, Short, Serializable, Types } from "../other.js";
import { BlockCoordinate, Direction, Axis } from "./Coordinates.js";

/**
 * Holds corner height values used to determine sloped shapes and Meshes
 * of map tiles
 *
 * @author Impaler
 */

export class BlockShape extends Serializable() {
    constructor(...args) {
        super();
        if (args.length == 0) {
            this.constructor_byte(BlockShape.CUBE_TOP_HEIGHT);
        } else if (args.length === 1) {
            if (args[0] instanceof Byte) {
                this.constructor_byte(args[0]);
            } else {
                this.constructor_short(args[0]);
            }
        } else if (args.length == 4) {
            this.constructor_four_bytes(args[0], args[1], args[2], args[3]);
        } else if (args.length === 5) {
            this.constructor_five_bytes(args[0], args[1], args[2], args[3], args[4]);
        }
    }
    constructor_four_bytes(SWCornerHeight, SECornerHeight, NWCornerHeight, NECornerHeight) {
        Types.mustBeAll('finiteInteger', SWCornerHeight, SECornerHeight, NWCornerHeight, NECornerHeight);
        this.constructor_five_bytes(SWCornerHeight, SECornerHeight, NWCornerHeight, NECornerHeight, new Byte(0));
    }
    constructor_byte(NewHeight) {
        Types.mustBe('finiteInteger', NewHeight);
        this.constructor_five_bytes(NewHeight, NewHeight, NewHeight, NewHeight, new Byte(0));
    }
    constructor_five_bytes(SWCornerHeight, SECornerHeight, NWCornerHeight, NECornerHeight, Flags) {
        Types.mustBeAll('finiteInteger', SWCornerHeight, SECornerHeight, NWCornerHeight, NECornerHeight, Flags);
        this.constructor_short(new Short(
            new Short(new Short(SWCornerHeight << BlockShape.SWSHIFT) & BlockShape.SWMASK) |
            new Short(new Short(SECornerHeight << BlockShape.SESHIFT) & BlockShape.SEMASK) |
            new Short(new Short(NWCornerHeight << BlockShape.NWSHIFT) & BlockShape.NWMASK) |
            new Short(new Short(NECornerHeight << BlockShape.NESHIFT) & BlockShape.NEMASK) |
            new Short(Flags & BlockShape.FLAGMASK)
        ));
    }
    constructor_short(newData) {
        Types.mustBe('finiteInteger', newData);
        this.Data = newData;
    }
    getData() {
        return this.Data;
    }
    setData(value) {
        this.Data = value;
    }
    getSouthWestCorner() {
        return new Byte(new Short(new Short(this.Data & BlockShape.SWMASK) >> BlockShape.SWSHIFT) & new Short(7));
    }

    getSouthEastCorner() {
        return new Byte(new Short(new Short(this.Data & BlockShape.SEMASK) >> BlockShape.SESHIFT) & new Short(7));
    }

    getNorthWestCorner() {
        return new Byte(new Short(new Short(this.Data & BlockShape.NWMASK) >> BlockShape.NWSHIFT) & new Short(7));
    }

    getNorthEastCorner() {
        return new Byte(new Short(new Short(this.Data & BlockShape.NEMASK) >> BlockShape.NESHIFT) & new Short(7));
    }
    setSouthWestCorner(Height) {
        Types.mustBe('finiteInteger', Height);
        this.Data = new Short(this.Data & ~BlockShape.SWMASK);
        this.Data = new Short(this.Data | new Short(new Short(new Byte(Height) << BlockShape.SWSHIFT) & BlockShape.SWMASK));
    }

    setSouthEastCorner(Height) {
        Types.mustBe('finiteInteger', Height);
        this.Data = new Short(this.Data & ~BlockShape.SEMASK);
        this.Data = new Short(this.Data | new Short(new Short(new Byte(Height) << BlockShape.SESHIFT) & BlockShape.SEMASK));
    }

    setNorthWestCorner(Height) {
        Types.mustBe('finiteInteger', Height);
        this.Data = new Short(this.Data & ~BlockShape.NWMASK);
        this.Data = new Short(this.Data | new Short(new Short(new Byte(Height) << BlockShape.NWSHIFT) & BlockShape.NWMASK));
    }

    setNorthEastCorner(Height) {
        Types.mustBe('finiteInteger', Height);
        this.Data = new Short(this.Data & ~BlockShape.NEMASK);
        this.Data = new Short(this.Data | new Short(new Short(new Byte(Height) << BlockShape.NESHIFT) & BlockShape.NEMASK));
    }

    equals(that) {
        if (that === this)
            return true;
        if (!Types.has(that, "Data"))
            return false;
        if (!Types.is('finiteInteger', that.Data))
            return false;
        return Number(that.Data) === Number(this.Data);
    }
    notequal(that) {
        return !(this.equals(that));
    }
    copy(that) {
        Types.mustHave(that, "Data");
        Types.mustBe('finiteInteger', that.Data);
        this.Data = new Short(that.Data);
    }
    clone() {
        let newShape = new BlockShape();
        newShape.copy(this);
        return newShape;
    }

    isSolid() {
        return (this.getSouthWestCorner() >= BlockShape.CUBE_TOP_HEIGHT) && (this.getSouthEastCorner() >= BlockShape.CUBE_TOP_HEIGHT) && (this.getNorthWestCorner() >= BlockShape.CUBE_TOP_HEIGHT) && (this.getNorthEastCorner() >= BlockShape.CUBE_TOP_HEIGHT);
    }
    isEmpty() {
        return (this.getSouthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT) && (this.getSouthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT) && (this.getNorthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT) && (this.getNorthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT);
    }
    isSplit() {
        return (this.Data & BlockShape.SPLITMASK) > 0 ? true : false;
    }

    volume() {
        let sum1, sum2;
        if (this.isSplit()) {
            sum1 = this.getNorthWestCorner() + this.getNorthEastCorner() + this.getSouthEastCorner() - 3;
            sum2 = this.getNorthWestCorner() + this.getSouthWestCorner() + this.getSouthEastCorner() - 3;
        } else {
            sum1 = this.getSouthWestCorner() + this.getNorthWestCorner() + this.getNorthEastCorner() - 3;
            sum2 = this.getSouthWestCorner() + this.getSouthEastCorner() + this.getNorthEastCorner() - 3;
        }
        return ((Math.min(sum1, 0) + Math.min(sum2, 0)) * 4);
    }
    getCenterHeight() {
        if (this.isSplit()) {
            return (((this.getNorthWestCorner() + this.getSouthEastCorner() - 2) / 2.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;
        } else {
            return (((this.getSouthWestCorner() + this.getNorthEastCorner() - 2) / 2.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;
        }
    }

    getDirectionEdgeHeight(DirectionType) {
        Types.mustBe(Direction, DirectionType);
        switch (DirectionType) {

            case Direction.DIRECTION_NORTH:
            case Direction.DIRECTION_UP_NORTH:
            case Direction.DIRECTION_DOWN_NORTH:
                return (((this.getNorthWestCorner() + this.getNorthEastCorner() - 2) / 2.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_SOUTH:
            case Direction.DIRECTION_UP_SOUTH:
            case Direction.DIRECTION_DOWN_SOUTH:
                return (((this.getSouthWestCorner() + this.getSouthEastCorner() - 2) / 2.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_EAST:
            case Direction.DIRECTION_UP_EAST:
            case Direction.DIRECTION_DOWN_EAST:
                return (((this.getNorthEastCorner() + this.getSouthEastCorner() - 2) / 2.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_WEST:
            case Direction.DIRECTION_UP_WEST:
            case Direction.DIRECTION_DOWN_WEST:
                return (((this.getNorthWestCorner() + this.getSouthWestCorner() - 2) / 2.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_NORTHWEST:
            case Direction.DIRECTION_UP_NORTHWEST:
            case Direction.DIRECTION_DOWN_NORTHWEST:
                return ((this.getNorthWestCorner() - 1.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_SOUTHWEST:
            case Direction.DIRECTION_UP_SOUTHWEST:
            case Direction.DIRECTION_DOWN_SOUTHWEST:
                return ((this.getSouthWestCorner() - 1.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_SOUTHEAST:
            case Direction.DIRECTION_UP_SOUTHEAST:
            case Direction.DIRECTION_DOWN_SOUTHEAST:
                return ((this.getSouthEastCorner() - 1.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;

            case Direction.DIRECTION_NORTHEAST:
            case Direction.DIRECTION_UP_NORTHEAST:
            case Direction.DIRECTION_DOWN_NORTHEAST:
                return ((this.getNorthEastCorner() - 1.0) / BlockShape.HEIGHT_FRACTIONS) - BlockCoordinate.HALF_BLOCK;
        }

        return 0;
    }
    isLightPassable(LightingAxis) {
        Types.mustBe(Axis, LightingAxis);
        switch (LightingAxis) {
            case Axis.AXIS_X:
                return false;

            case Axis.AXIS_Y:

                return false;
            case Axis.AXIS_Z:
                if (this.isSplit()) {
                    if (this.getSouthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT)
                        return true;
                    if (this.getNorthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT)
                        return true;
                    return false;
                } else {
                    if (this.getNorthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT)
                        return true;
                    if (this.getSouthWestCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthEastCorner() <= BlockShape.CUBE_BOTTOM_HEIGHT)
                        return true;
                    return false;
                }
        }
        return true;
    }
    isExcavationEquivalent(Arg) {
        Types.mustAll(Arg, "getNorthEastCorner", "getSouthEastCorner", "getNorthWestCorner", "getSouthWestCorner");
        let NE = Arg.getNorthEastCorner() <= this.getNorthEastCorner(),
            SE = Arg.getSouthEastCorner() <= this.getSouthEastCorner(),
            NW = Arg.getNorthWestCorner() <= this.getNorthWestCorner(),
            SW = Arg.getSouthWestCorner() <= this.getSouthWestCorner();

        return NE && SE && NW && SW;
    }

    isSky() {
        let Counter = 0;

        if (this.getSouthWestCorner() < BlockShape.CUBE_BOTTOM_HEIGHT)
            Counter++;
        if (this.getSouthEastCorner() < BlockShape.CUBE_BOTTOM_HEIGHT)
            Counter++;
        if (this.getNorthEastCorner() < BlockShape.CUBE_BOTTOM_HEIGHT)
            Counter++;
        if (this.getNorthWestCorner() < BlockShape.CUBE_BOTTOM_HEIGHT)
            Counter++;

        if (Counter >= 2) {
            return true;
        }

        return false;
    }
    hasFace(DirectionType) {
        if (!Types.is(Direction, DirectionType))
            return false;
        if (DirectionType == Direction.DIRECTION_DOWN)
            return this.hasFloor();
        if (DirectionType == Direction.DIRECTION_UP)
            return this.hasCeiling();
        if (DirectionType == Direction.DIRECTION_EAST)
            return (this.getSouthEastCorner() > BlockShape.CUBE_BOTTOM_HEIGHT || this.getNorthEastCorner() > BlockShape.CUBE_BOTTOM_HEIGHT);
        if (DirectionType == Direction.DIRECTION_WEST)
            return (this.getSouthWestCorner() > BlockShape.CUBE_BOTTOM_HEIGHT || this.getNorthWestCorner() > BlockShape.CUBE_BOTTOM_HEIGHT);
        if (DirectionType == Direction.DIRECTION_NORTH)
            return (this.getNorthEastCorner() > BlockShape.CUBE_BOTTOM_HEIGHT || this.getNorthWestCorner() > BlockShape.CUBE_BOTTOM_HEIGHT);
        if (DirectionType == Direction.DIRECTION_SOUTH)
            return (this.getSouthEastCorner() > BlockShape.CUBE_BOTTOM_HEIGHT || this.getSouthWestCorner() > BlockShape.CUBE_BOTTOM_HEIGHT);

        return false;
    }
    hasFloor() {
        if (this.isSplit()) {
            if (this.getSouthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
                return true;
            if (this.getNorthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
                return true;
            return false;
        } else {
            if (this.getNorthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
                return true;
            if (this.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getSouthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && this.getNorthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
                return true;
            return false;
        }
    }

    hasCeiling() {
        if (this.isSplit()) {
            if (this.getSouthEastCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getNorthEastCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getNorthWestCorner() == BlockShape.CUBE_TOP_HEIGHT)
                return true;
            if (this.getNorthWestCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getSouthWestCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getSouthEastCorner() == BlockShape.CUBE_TOP_HEIGHT)
                return true;
            return false;
        } else {
            if (this.getNorthEastCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getNorthWestCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getSouthWestCorner() == BlockShape.CUBE_TOP_HEIGHT)
                return true;
            if (this.getSouthWestCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getSouthEastCorner() == BlockShape.CUBE_TOP_HEIGHT && this.getNorthEastCorner() == BlockShape.CUBE_TOP_HEIGHT)
                return true;
            return false;
        }
    }
}

// Defined values for determining how many vertical fractions exist in a cube
BlockShape.BELOW_CUBE_HEIGHT = new Byte(0);
BlockShape.CUBE_BOTTOM_HEIGHT = new Byte(1);
BlockShape.HEIGHT_FRACTIONS = new Byte(4);
BlockShape.CUBE_TOP_HEIGHT = new Byte(5);
// BitPacking  SWW SEE NWW NEE FLAG
//             FED CBA 987 654 3210
// Mask values used to extract values for a corner
BlockShape.SWMASK = new Short(57344);
BlockShape.SEMASK = new Short(7168);
BlockShape.NWMASK = new Short(896);
BlockShape.NEMASK = new Short(112);
// Names for the specific Flags and the Mask to retrive them
BlockShape.FLAGMASK = new Short(15);
BlockShape.SPLITMASK = new Short(1);
BlockShape.VERTICALMASK = new Short(2);
BlockShape.UNUSED1MASK = new Short(4);
BlockShape.UNUSED2MASK = new Short(8);
// Shifting values used to extract values for a corner
BlockShape.SWSHIFT = new Short(13);
BlockShape.SESHIFT = new Short(10);
BlockShape.NWSHIFT = new Short(7);
BlockShape.NESHIFT = new Short(4);
// Bit compressed heights of each corner and flags

BlockShape.EMPTY_CUBE_DATA = new Short(0);