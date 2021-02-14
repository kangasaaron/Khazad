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

import { Byte } from "../../other.js";
import { Types } from "../../other/Types.js";
import { BlockCoordinate } from "./BlockCoordinate.js";
import { Direction } from "./Direction.js";

/**
 * Describes the location of a Face, a face is normally the 2D space between
 * two map cube volumes but slopes can occour inside cubic volumes and are identified
 * with a NONE direction or angular directions, short Coordinates refere to the Cells 
 * array of cubes, a CellCoordinate is thus needed to fully resolve the map location of a Face
 *
 * @author Impaler
 */
export class FaceCoordinate extends BlockCoordinate {
    constructor(...args) {
        if (args.length == 0) {
            super(0);
            this.FaceDirection = Direction.DIRECTION_DESTINATION;
        } else if (args.length == 1) {
            Types.mustBe(FaceCoordinate, args[0]);
            super(args[0]);
            Types.mustBe(Direction, args[0].FaceDirection);
            this.FaceDirection = args[0].FaceDirection;
        } else if (args.length == 2) {
            Types.mustBe(BlockCoordinate, args[0]);
            super(args[0]);
            Types.mustBe(Direction, args[1]);
            this.FaceDirection = args[1];
        }
    }
    set(...args) { // TODO turn into setter(s)
        if (args.length == 1) {
            this.setByFaceCoordinate(args[0]);
        } else if (args.length == 2) {
            this.setByIntDirection(args[0], args[1]);
        } else if (args.length == 4) {
            this.setByIntIntIntDirection(args[0], args[1], args[2], args[3]);
        }
    }
    setByFaceCoordinate(ArgumentCoordinates) {
        super.copy(ArgumentCoordinates);
        Types.mustBe(Direction, ArgumentCoordinates.FaceDirection);
        this.FaceDirection = ArgumentCoordinates.FaceDirection;
    }
    setByIntDirection(CubeIndex, DirectionComponent) {
        super.set(CubeIndex);
        Types.mustBe(Direction, DirectionComponent);
        this.FaceDirection = DirectionComponent;
    }
    setByIntIntIntDirection(NewX, NewY, NewZ, DirectionComponent) {
        super.set(NewX, NewY, NewZ);
        Types.mustBe(Direction, DirectionComponent);
        this.FaceDirection = DirectionComponent;
    }
    getCoordinates() { // TODO turn into getter
        return this.getBlockIndex();
    }
    getFaceDirection() { // TODO turn into getter
        return this.FaceDirection;
    }
    equals(ArgumentCoordinates) {
        if (!ArgumentCoordinates) return false;
        if (ArgumentCoordinates === this)
            return true;
        if (!Types.hasAll(ArgumentCoordinates, 'DetailLevel', 'Data', 'FaceDirection'))
            return false;
        return this.FaceDirection == ArgumentCoordinates.FaceDirection && this.Data === ArgumentCoordinates.Data && this.DetailLevel.equals(ArgumentCoordinates.DetailLevel);
    }
    hashCode() { // TODO turn into getter
        let Key = this.Data;
        Key <<= 10;
        Key += this.FaceDirection;

        return Key;
    }
}