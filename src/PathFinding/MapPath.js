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

import { MapCoordinate } from "../Map/Coordinates.js";
import { Serializable, addPropertyToClass } from "../other.js";
import { MovementModality, MovementType } from "../PathFinding.js";

/**
 * Abstract Base for the Path representations, all Paths implementations have a
 * corresponding PathWalker class that they will return and which will read
 * from only that type of Path.
 *
 * Implementations: CoordinatePath, VectorPath
 *
 * @author Impaler
 */
export class MapPath extends Serializable() {
    Length = 0;
    StepCount = 0;
    StartCoordinates = new MapCoordinate();
    GoalCoordinates = new MapCoordinate();
    MovementModality = null;
    constructor() {
        super();
        this.MovementType = new MovementModality(MovementType.MOVEMENT_TYPE_WALK, 0, 0);
    }
}

addPropertyToClass(MapPath, "MapPath", "getPathWalker");