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

import { Serializable, Byte } from "../../other.js";
import { Types } from "../../other/Types.js";

/**
 * Provides the location of a Sector within a Region, the world is only 1 Sector thick 
 * meaning a Sector has only an X and Y location coordinates within it's Region.
 * 
 * @author Impaler
 */
export class SectorCoordinate extends Serializable() {
    _X = new Byte(0);
    _Y = new Byte(0);

    constructor(x = 0, y = 0) {
        Types.mustBeAll('finiteInteger', x, y);
        super();
        this._X = new Byte(x);
        this._Y = new Byte(y);
    }
    getX() {
        return this._X;
    }
    getY() {
        return this._Y;
    }

    equals(that) {
        if (!that)
            return false;
        if (that === this)
            return true;
        if (!Types.hasAll(that, 'getX', 'getY'))
            return false;
        if (!Types.are('finiteNumber', that.getX(), that.getY()))
            return false;
        return (that.getX().valueOf() === this._X.valueOf()) && (that.getY().valueOf() === this._Y.valueOf())
    }

    copy(ArgumentCoordinates) {
        Types.mustHaveAll(ArgumentCoordinates, "getX", "getY");
        Types.mustBeAll('finiteInteger', ArgumentCoordinates.getX(), ArgumentCoordinates.getY());
        this._X = new Byte(ArgumentCoordinates.getX());
        this._Y = new Byte(ArgumentCoordinates.getY());
    }

    hashCode() { // TODO turn into getter
        let hash = 3;
        hash += 17 * this._X;
        hash += 37 * this._Y;
        return hash;
    }
}