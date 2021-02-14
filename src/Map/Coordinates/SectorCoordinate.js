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

    constructor(x = 0, y = 0) {
        Types.mustBeAll('finiteInteger', x, y);
        super();
        this.X = new Byte(x);
        this.Y = new Byte(y);
    }

    equals(ArgumentCoordinates) {
        if (!ArgumentCoordinates)
            return false;
        if (ArgumentCoordinates === this)
            return true;
        if (!Types.hasAll(ArgumentCoordinates, 'X', 'Y'))
            return false;
        if (!Types.are('finiteNumber', ArgumentCoordinates.X, ArgumentCoordinates.Y))
            return false;
        return (ArgumentCoordinates.X.equals(this.X) && ArgumentCoordinates.Y.equals(this.Y));
    }

    copy(ArgumentCoordinates) {
        Types.mustHaveAll(ArgumentCoordinates, "X", "Y");
        Types.mustBeAll('finiteInteger', ArgumentCoordinates.X, ArgumentCoordinates.Y);
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