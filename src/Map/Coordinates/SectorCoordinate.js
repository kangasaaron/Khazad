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

import { Serializable } from "../../other/Serializable.js";
import { Byte } from "../../other/Integers.js";


/**
 * Provides the location of a Sector within a Region, the world is only 1 Sector thick 
 * meaning a Sector has only an X and Y location coordinates within it's Region.
 * 
 * @author Impaler
 */
export class SectorCoordinate {

    constructor(x = 0, y = 0) {
        if (!Number.isFinite(x))
            throw new TypeError("SectorCoordinate constructor parameter X must be a number");
        if (!Number.isFinite(y))
            throw new TypeError("SectorCoordinate constructor parameter Y must be a number");
        this.X = new Byte(x);
        this.Y = new Byte(y);
    }

    equals(ArgumentCoordinates) {
        if (!ArgumentCoordinates)
            return false;
        if (ArgumentCoordinates === this)
            return true;
        if (ArgumentCoordinates.X === undefined || ArgumentCoordinates.X === null)
            return false;
        if (ArgumentCoordinates.Y === undefined || ArgumentCoordinates.Y === null)
            return false;
        return (ArgumentCoordinates.X.equals(this.X) && ArgumentCoordinates.Y.equals(this.Y));
    }

    copy(ArgumentCoordinates) {
        if (!("X" in ArgumentCoordinates))
            throw new TypeError("can't copy ArgumentCoordinates");
        if (!("Y" in ArgumentCoordinates))
            throw new TypeError("can't copy ArgumentCoordinates");
        this.X = new Byte(ArgumentCoordinates.X);
        this.Y = new Byte(ArgumentCoordinates.Y);
    }

    hashCode() { // TODO turn into getter
        let hash = 3;
        hash += 17 * this.X;
        hash += 37 * this.Y;
        return hash;
    }
}

Serializable.becomeImplementedBy(SectorCoordinate);