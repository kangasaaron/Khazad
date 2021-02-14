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


import { VectorPathWalker } from "./VectorPathWalker.js";
import { MapPath } from "./MapPath.js";

/**
 * A more efficiently compressed Path implementation, parrellel Lists or
 * Directions and Magnitudes divide the path into segments, which is closer to
 * the kind of Path typically generated.
 *
 * @author Impaler
 */
export class VectorPath extends MapPath {
    Directions = [];
    Magnitudes = [];
    constructor(PathLength, RawDirections, StartCoords, GoalCoords) {
        super();
        this.StartCoordinates = StartCoords;
        this.GoalCoordinates = GoalCoords;

        this.StepCount = RawDirections.length;
        // Compress the raw directions into legs
        if (RawDirections.length > 0) {
            let MagnitudeCounter = 1;
            let CurrentDirection = RawDirections[0];

            for (let i = 1; i < RawDirections.length; i++) {
                if (MagnitudeCounter == 255 || RawDirections[i] !== CurrentDirection) {
                    this.Directions.push(CurrentDirection);
                    this.Magnitudes.push(MagnitudeCounter);

                    CurrentDirection = RawDirections[i];
                    MagnitudeCounter = 1;
                } else {
                    MagnitudeCounter++;
                }
            }
            this.Directions.push(CurrentDirection);
            this.Magnitudes.push(MagnitudeCounter);
        }
    }

    getPathWalker() {
        return new VectorPathWalker(this);
    }
}