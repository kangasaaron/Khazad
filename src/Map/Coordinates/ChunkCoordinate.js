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

import { BlockCoordinate } from "./BlockCoordinate.js";
import "../../other/three.min.js";
import { Types } from "../../other/Types.js";
import { Serializable } from "../../other/Serializable.js";

/**
 * Used to refrence Cells in HashMaps by relative position, X and Y values are 16
 * times the true Map Coordinate, Z values are equal.
 *
 * @author Impaler
 */
export class ChunkCoordinate extends Serializable() {
    X = 0;
    Y = 0;
    Z = 0;

    constructor(X = 0, Y = 0, Z = 0) {
        Types.mustBeAll('finiteInteger', X, Y, Z);
        super();
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    copy(ArgumentCoordinate) {
        Types.mustHaveAll(ArgumentCoordinate, 'X', 'Y', 'Z');
        Types.mustBeAll('finiteInteger', ArgumentCoordinate.X, ArgumentCoordinate.Y, ArgumentCoordinate.Z);
        this.X = ArgumentCoordinate.X;
        this.Y = ArgumentCoordinate.Y;
        this.Z = ArgumentCoordinate.Z;
    }
    clone() {
        let result = new ChunkCoordinate();
        result.copy(this);
        return result;
    }
    equals(that) {
        if (!Types.hasAll(that, 'X', 'Y', 'Z'))
            return false;
        if (!Types.are('finiteInteger', that.X, that.Y, that.Z))
            return false;
        return this.X == that.X &&
            this.Y == that.Y &&
            this.Z == that.Z;
    }
    hashCode() { // TODO turn into getter
        let Key = 0;

        Key += this.X;
        Key <<= 12;
        Key += this.Y;
        Key <<= 12;
        Key += this.Z;

        return Key;
    }
    toString() {
        return `X ${this.X} Y ${this.Y} Z ${this.Z}`;
    }
    get vector() { // TODO turn into getter
        let x = (this.X * BlockCoordinate.CHUNK_EDGE_SIZE);
        let y = (this.Y * BlockCoordinate.CHUNK_EDGE_SIZE);
        let z = (this.Z * BlockCoordinate.CHUNK_EDGE_SIZE);

        if (x < 0)
            x++;
        if (y < 0)
            y++;
        if (z < 0)
            z++;

        return new THREE.Vector3(x, y, z);
    }
}