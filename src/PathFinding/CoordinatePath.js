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

import { MapPath } from "../PathFinding/MapPath.js";

/**
 * A simple path representation in the form of a list of MapCoordinates, the
 * simplest and least compressed form of path representation. Intended only
 * for temporary usage, any path intended for caching should be compressed.
 *
 * @author Impaler
 */
export class CoordinatePath extends MapPath {
    constructor(PathLength, Course) {
        super();
        this.Length = PathLength;
        this.PathCourse = Course.slice();
        this.StepCount = this.PathCourse.length - 1;
        this.StartCoordinates = this.PathCourse[0];
        this.GoalCoordinates = this.PathCourse[this.PathCourse.length - 1];
    }
}
//TODO not waiting on anything