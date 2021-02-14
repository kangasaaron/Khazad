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
    _X = 0;
    _Y = 0;
    _Z = 0;

    constructor(X = 0, Y = 0, Z = 0) {
        Types.mustBeAll('finiteInteger', X, Y, Z);
        super();
        this._X = X;
        this._Y = Y;
        this._Z = Z;
    }
    getX() {
        return this._X;
    }
    getY() {
        return this._Y;
    }
    getZ() {
        return this._Z;
    }
    copy(ArgumentCoordinate) {
        Types.mustHaveAll(ArgumentCoordinate, 'getX', 'getY', 'getZ');
        Types.mustBeAll('finiteInteger', ArgumentCoordinate.getX(), ArgumentCoordinate.getY(), ArgumentCoordinate.getZ());
        this._X = ArgumentCoordinate.getX();
        this._Y = ArgumentCoordinate.getY();
        this._Z = ArgumentCoordinate.getZ();
    }
    clone() {
        let result = new ChunkCoordinate();
        result.copy(this);
        return result;
    }
    equals(that) {
        if (!Types.hasAll(that, 'getX', 'getY', 'getZ'))
            return false;
        if (!Types.are('finiteInteger', that.getX(), that.getY(), that.getZ()))
            return false;
        return this._X == that.getX() &&
            this._Y == that.getY() &&
            this._Z == that.getZ();
    }
    hashCode() { // TODO turn into getter
        let Key = 0;

        Key += this._X;
        Key <<= 12;
        Key += this._Y;
        Key <<= 12;
        Key += this._Z;

        return Key;
    }
    toString() {
        return `X ${this._X} Y ${this._Y} Z ${this._Z}`;
    }
    get vector() {
        let x = (this._X * BlockCoordinate.CHUNK_EDGE_SIZE);
        let y = (this._Y * BlockCoordinate.CHUNK_EDGE_SIZE);
        let z = (this._Z * BlockCoordinate.CHUNK_EDGE_SIZE);

        if (x < 0)
            x++;
        if (y < 0)
            y++;
        if (z < 0)
            z++;

        return new THREE.Vector3(x, y, z);
    }
}