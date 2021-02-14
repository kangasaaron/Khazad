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

import { ChunkCoordinate, MapCoordinate, Direction } from "../Map.js";
import { Short } from "../other.js";
import { Serializable } from "../other/Serializable.js";
import { PathWalker } from "./PathWalker.js";

/**
 * Basic PathWalker for a VectorPath, it utilizes a simple double nested loop
 * to read out each 'leg' of the VectorPath.
 *
 * @author Impaler
 */
export class VectorPathWalker extends PathWalker(Serializable()) {
    StepCoordinates = null;
    MagnitudeCountDown = 0;
    LegCounter = new Short(0);
    CurrentStep = 0;
    TargetPath = null;
    constructor(SourcePath) {
        super();
        if (SourcePath) {
            this.TargetPath = SourcePath;
            this.reset();
        }
    }
    reset() {
        if (this.TargetPath) {
            if (this.TargetPath.Magnitudes.length > 0) {
                this.MagnitudeCountDown = this.TargetPath.Magnitudes[0]; // Prime the counter with the first legs magnitude
            } else {
                this.MagnitudeCountDown = 0;
            }
            this.StepCoordinates = this.TargetPath.StartCoordinates;
        }
        this.LegCounter = new Short(0);
        this.CurrentStep = 0;
    }
    nextCoordinate() {
        if (this.CurrentStep < this.TargetPath.StepCount) {
            if (this.MagnitudeCountDown == 0) {
                this.LegCounter = new Short(this.LegCounter + 1);
                this.MagnitudeCountDown = this.TargetPath.Magnitudes[this.LegCounter];
            }

            this.CurrentStep++;
            this.MagnitudeCountDown--;

            this.StepCoordinates.translate(this.TargetPath.Directions[this.LegCounter]);

            return this.StepCoordinates;
        }
        return this.TargetPath.GoalCoordinates; // Keep returning the Goal if we've reached the end of the path
    }
    nextDirection() {
        if (this.CurrentStep < this.TargetPath.StepCount) {
            if (this.MagnitudeCountDown == 0) {
                this.LegCounter++;
                this.MagnitudeCountDown = this.TargetPath.Magnitudes[this.LegCounter];
            }

            this.CurrentStep++;
            this.MagnitudeCountDown--;

            return this.TargetPath.Directions[this.LegCounter];
        }
        return Direction.DIRECTION_DESTINATION;
    }
    peekCoordinate() {
        if (this.CurrentStep < this.TargetPath.StepCount) {
            let dir;
            if (this.MagnitudeCountDown == 0) {
                dir = this.TargetPath.Directions[this.LegCounter + 1];
            } else {
                dir = this.TargetPath.Directions[this.LegCounter];
            }

            this.StepCoordinates.translate(dir);
            return this.StepCoordinates;
        }
        return this.TargetPath.GoalCoordinates; // Keep returning the Goal if we've reached the end of the path
    }
    peekDirection() {
        if (this.CurrentStep < this.TargetPath.StepCount) {
            if (this.MagnitudeCountDown == 0) {
                return this.TargetPath.Directions[this.LegCounter + 1];
            } else {
                return this.TargetPath.Directions[this.LegCounter];
            }
        }
        return Direction.DIRECTION_DESTINATION;
    }
    get currentStep() {
        return this.CurrentStep;
    }
    equals(that) {
        if (this === that)
            return true;
        else if (this.TargetPath === that.TargetPath) {
            return this.currentStep === that.currentStep;
        }
        return false;
    }
}