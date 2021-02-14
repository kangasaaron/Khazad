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

import { Serializable } from "../../other.js";
import { Types } from "../../other/Types.js";

/**
 * Describes the location of a Region within the World map,
 * 
 * @author Impaler
 */

export class RegionCoordinate extends Serializable() {
    _X = 0;
    _Y = 0;

    copy(ArgumentCoordinates) {
        Types.mustHaveAll(ArgumentCoordinates, 'getX', 'getY');
        Types.mustBeAll('finiteInteger', ArgumentCoordinates.getX(), ArgumentCoordinates.getY());
        this._X = ArgumentCoordinates.getX();
        this._Y = ArgumentCoordinates.getY();
    }
    getX() {
        return this._X;
    }
    getY() {
        return this._Y;
    }
    equals(that) {
        if (this === that)
            return true;
        return this.getX() == that.getX() && this.getY() == that.getY();
    }
}