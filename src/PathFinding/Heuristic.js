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

import { Serializable, createNewInterface } from "../other.js";

/**
 * A collection of common and fast distance Heuristics, a Heuristic is a quick
 * guess as to the distance between two MapCoordinates.
 *
 * @author Impaler
 */
// export const Heuristic = function Heuristic(Base = Object) {
//     let Heuristic = class Heuristic extends Serializable(AbstractClass(Base)) {
//         estimate() {
//             this.abstractFunction("Heuristic", "estimate");
//         }
//     };
//     Heuristic.Mixins = Heuristic.Mixins || {};
//     Heuristic.Mixins.Heuristic = Heuristic;
//     Heuristic.isInterface = true;
//     return Heuristic;
// }
// Heuristic.isInterface = true;
export const Heuristic = createNewInterface("Heuristic", "estimate");


export class Manhattan extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {
        return Math.abs(StartCoord.getX() - GoalCoord.getX()) + Math.abs(StartCoord.getY() - GoalCoord.getY()) + Math.abs(StartCoord.getZ() - GoalCoord.getZ());
    }
}

export class Chebyshev extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {
        let max = 0;
        let cost;

        cost = Math.abs(StartCoord.getX() - GoalCoord.getX());
        if (cost > max)
            max = cost;

        cost = Math.abs(StartCoord.getY() - GoalCoord.getY());
        if (cost > max)
            max = cost;

        cost = Math.abs(StartCoord.getZ() - GoalCoord.getZ());
        if (cost > max)
            max = cost;

        return max;
    }
}

export class Euclidean extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {
        let cost = StartCoord.getX() - GoalCoord.getX();
        let sum = cost * cost;

        cost = StartCoord.getY() - GoalCoord.getY();
        sum += cost * cost;

        // Use Z as well?  cuberoot?

        return Math.sqrt(sum);
    }
}

const SquareRootTwo = Math.sqrt(2);

export class Diagonal extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {
        let DiagonalsX = Math.abs(StartCoord.getX() - GoalCoord.getX());
        let DiagonalsY = Math.abs(StartCoord.getY() - GoalCoord.getY());
        let ZDifference = Math.abs(StartCoord.getZ() - GoalCoord.getZ());

        if (DiagonalsX < DiagonalsY) {
            return (SquareRootTwo * DiagonalsX) + (DiagonalsY - DiagonalsX) + (ZDifference * 2);
        } else {
            return (SquareRootTwo * DiagonalsY) + (DiagonalsX - DiagonalsY) + (ZDifference * 2);
        }
    }
}

const DiagonalFactor = Math.sqrt(2) - 1;
export class Octile extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {
        let DiagonalsX = Math.abs(StartCoord.getX() - GoalCoord.getX());
        let DiagonalsY = Math.abs(StartCoord.getY() - GoalCoord.getY());
        let ZDifference = Math.abs(StartCoord.getZ() - GoalCoord.getZ());

        let estimate = Math.max(DiagonalsX, DiagonalsY) + (DiagonalFactor * Math.min(DiagonalsX, DiagonalsY)) + (ZDifference * 2);
        return estimate;
    }
}

export class StraightLine extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {

        //float dx1 = current.x - goal.x
        //float dy1 = current.y - goal.y

        //float dx2 = start.x - goal.x
        //float dy2 = start.y - goal.y

        //float cross = abs(dx1*dy2 - dx2*dy1)
        //float heuristic += cross * 0.001

        return 0;
    }
}

export class Dijkstra extends Heuristic(Serializable()) {
    estimate(StartCoord, GoalCoord) {
        return 0;
    }
}