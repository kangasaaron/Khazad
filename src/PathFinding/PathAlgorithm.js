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

import { Heuristic } from "./Heuristic.js";
import { MovementModality } from "./MovementModality.js";
import { MapCoordinate } from "../Map.js";
import { Serializable, Types, addPropertiesToClass } from "../other.js";


/**
 * Abstract base for all PathFinding Algorithms, all Algorithms need a Grid
 * to work upon, Heristics, Start/Goal points to operate upon.
 *
 * Implementations: AStar
 *
 * @author Impaler
 */
export class PathAlgorithm extends Serializable() {
    GraphReads = 0;
    ExpandedNodes = 0;
    SearchGraph = null;
    Modality = null;
    StartCoordinates = null;
    GoalCoordinates = null;
    MainHeuristic = null;
    TieBreakerHeuristic = null;
    FinalPath = null;
    get graphReads() { // TODO change into real getter
        return this.GraphReads;
    }
    get expandedNodes() { // TODO change into real getter
        return this.ExpandedNodes;
    }
    setEndPoints( /*MapCoordinate*/ StartCoords, /*MapCoordinate*/ GoalCoords) {
        Types.mustBeAll(MapCoordinate, StartCoords, GoalCoords);
        this.StartCoordinates = StartCoords;
        this.GoalCoordinates = GoalCoords;
        this.GraphReads = this.ExpandedNodes = 0;
        this.FinalPath = null;
    }

    setHeuristics( /*Heuristic*/ PrimaryHeuristic, /*Heuristic*/ SecondaryHeuristic) {
        Types.mustBeAll(Heuristic, PrimaryHeuristic, SecondaryHeuristic);
        this.MainHeuristic = PrimaryHeuristic;
        this.TieBreakerHeuristic = SecondaryHeuristic;
    }

    setModality( /*MovementModality*/ MovementType) {
        Types.mustBe(MovementModality, MovementType)
        this.Modality = MovementType;
    }
}

addPropertiesToClass(PathAlgorithm, "PathAlgorithm", "searchPath", "findPath", "provide");