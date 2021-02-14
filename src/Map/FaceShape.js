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

import { BlockShape } from "../Map.js";
import { Serializable } from "../other.js";
import { Direction } from "./Coordinates.js";

/**
 * Used to determine the Mesh used to build a Rendering of a Chunk
 *
 * @author Impaler
 */
export class FaceShape extends Serializable() {
    constructor(SourceShapeType, AdjacentShapeType, DirectionType) {
        super();
        this.SourceBlockData = (SourceShapeType && SourceShapeType.Data) ? SourceShapeType.Data : BlockShape.EMPTY_CUBE_DATA;
        this.AdjacentBlockData = (AdjacentShapeType && AdjacentShapeType.Data) ? AdjacentShapeType.Data : BlockShape.EMPTY_CUBE_DATA;
        this.FaceDirection = DirectionType || Direction.DIRECTION_DESTINATION;
    }
    equals(ArgumentShape) {
        let AdjacentEqual = false,
            SourceEqual = false,
            FaceEqual = false;
        if (ArgumentShape) {
            AdjacentEqual = this.AdjacentBlockData.equals(ArgumentShape.AdjacentBlockData);
            SourceEqual = this.SourceBlockData.equals(ArgumentShape.SourceBlockData);
            FaceEqual = this.FaceDirection === ArgumentShape.FaceDirection;
        } else {
            AdjacentEqual = this.AdjacentBlockData.equals(BlockShape.EMPTY_CUBE_DATA);
            SourceEqual = this.SourceBlockData.equals(BlockShape.EMPTY_CUBE_DATA);
            FaceEqual = this.FaceDirection === Direction.DIRECTION_NONE;
        }
        return SourceEqual && AdjacentEqual && FaceEqual;
    }
    notequal(ArgumentShape) {
        return this.SourceBlockData.notequal(ArgumentShape.SourceBlockData) || this.AdjacentBlockData.notequal(ArgumentShape.AdjacentBlockData) || this.FaceDirection !== ArgumentShape.FaceDirection;
    }
    getFaceDirection() {
        return this.FaceDirection;
    }
    getSourceBlockShape() {
        return new BlockShape(this.SourceBlockData);
    }
    getAdjacentBlockShape() {
        return new BlockShape(this.AdjacentBlockData);
    }
}