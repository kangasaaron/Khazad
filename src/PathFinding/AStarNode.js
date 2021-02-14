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

import { Direction, MapCoordinate } from "../Map.js";
import { Serializable, Comparable } from "../other.js";
import { Types } from "../other/Types.js";

/**
 * A simple Node used by the AStar pathing class, it holds data placed in it
 * durring the Node expansion method, the primary data points are the parent node
 * (used to reconstruct the final path), the cumulative edge cost of the parent
 * chain and the minimum distance to reach the goal.
 *
 * @author Impaler
 */

export class AStarNode extends Comparable(Serializable()) {
    // Cumulative distance used to judge Path
    TotalCost = 0.0;
    // Where this node is 
    LocationCoordinates = new MapCoordinate();
    // Recorded Path data used to judge this node
    PathLengthFromStart = 0.0;
    MinimumCostToGoal = 0.0;
    TieBreakerValue = 0.0;
    // Data about our Parent
    Parent = null;
    ParentDirection = Direction.DIRECTION_NONE;

    constructor() {
        super();
    }
    set(TargetCoordinates, ParentNode, SourceDirection, DistanceFromStart, MinimumCost, TieBreaker) {
        this.Parent = ParentNode;
        this.ParentDirection = SourceDirection;
        this.LocationCoordinates = TargetCoordinates;
        this.PathLengthFromStart = DistanceFromStart;
        this.MinimumCostToGoal = MinimumCost;
        this.TieBreakerValue = TieBreaker;
        this.TotalCost = this.PathLengthFromStart + this.MinimumCostToGoal;
    }
    compareTo(TargetNode) {
        Types.mustHave(TargetNode, "TotalCost");
        Types.mustBe("finiteNumber", TargetNode.TotalCost);
        if (this.TotalCost < TargetNode.TotalCost) {
            return -1;
        } else if (this.TotalCost === TargetNode.TotalCost) {
            Types.mustHave(TargetNode, "TieBreakerValue");
            Types.mustBe("finiteNumber", TargetNode.TieBreakerValue);
            if (this.TieBreakerValue < TargetNode.TieBreakerValue) {
                return -1;
            } else {
                return 1;
            }
        }
        return 1;
    }
    equals(other) {
        Types.mustHave(other, "LocationCoordinates");
        return this.LocationCoordinates.equals(other.LocationCoordinates);
    }
    getCoordinates() { // TODO turn into getter
        return this.LocationCoordinates;
    }
}