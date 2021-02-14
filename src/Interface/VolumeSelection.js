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

import { MapCoordinate } from "../Map.js";
import { Types } from "../other/Types.js";

/**
 *
 * @author Impaler
 */

export class VolumeSelection {
    _OriginLocation = new MapCoordinate();
    _TerminalLocation = new MapCoordinate();
    // Used by Rendering
    _Dirty = true;

    constructor(SelectionOrigin = new MapCoordinate(), SelectionTerminus = new MapCoordinate()) {
        Types.mustBeAll(MapCoordinate, SelectionOrigin, SelectionTerminus);
        if (SelectionOrigin && SelectionTerminus)
            this.setSize(SelectionOrigin, SelectionTerminus);
    }
    setSize(SelectionOrigin, SelectionTerminus) {
        Types.mustBeAll(MapCoordinate, SelectionOrigin, SelectionTerminus);
        let maxX = Math.max(SelectionTerminus.getX(), SelectionOrigin.getX());
        let maxY = Math.max(SelectionTerminus.getY(), SelectionOrigin.getY());
        let maxZ = Math.max(SelectionTerminus.getZ(), SelectionOrigin.getZ());

        let minX = Math.min(SelectionTerminus.getX(), SelectionOrigin.getX());
        let minY = Math.min(SelectionTerminus.getY(), SelectionOrigin.getY());
        let minZ = Math.min(SelectionTerminus.getZ(), SelectionOrigin.getZ());

        this._OriginLocation.set(minX, minY, minZ);
        this._TerminalLocation.set(maxX, maxY, maxZ);
    }
}