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

/**
 * Describes the location of a Region within the World map,
 * 
 * @author Impaler
 */

export class RegionCoordinate {
    constructor() {
        this.X = 0;
        this.Y = 0;
    }
    copy(ArgumentCoordinates) {
        if (!"X" in ArgumentCoordinates)
            throw new TypeError("RegionCoordinate copy parameter needs an X");
        if (!("Y" in ArgumentCoordinates))
            throw new TypeError("RegionCoordinate copy parameter needs an Y");
        if (!Number.isFinite(ArgumentCoordinates.X))
            throw new TypeError("RegionCoordinate copy parameter X must be a number");
        if (!Number.isFinite(ArgumentCoordinates.Y))
            throw new TypeError("RegionCoordinate copy parameter Y must be a number");
        // super();
        this.X = ArgumentCoordinates.X;
        this.Y = ArgumentCoordinates.Y;
    }
}
Serializable.becomeImplementedBy(RegionCoordinate);