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

import { Actor } from "./Actor.js";
import { Types } from "../other/Types.js";

/**
 * A moving creature, derived from Actor but with the addition of a Navigator object
 * linking it to the Pathfinding engine and a set of RPG style attributes.
 *
 * @author Impaler
 */
export class Pawn extends Actor {
    constructor(CreatureTypeID, id, Seed, SpawnLocation) {
            Types.mustBe('finiteNumber', CreatureTypeID);
            Types.mustBe('finiteNumber', Seed);
            super(id, SpawnLocation);

            this.CreatureTypeID = CreatureTypeID;
        } // Lots of TODO's: waiting on DataManager (specifically BasicAttributeData, CreatureData, and CreatureSizeData)
        // TODO waiting on Navigator
        // TODO waiting on PathManager
        // TODO waiting on Task
    setTask() {}
}