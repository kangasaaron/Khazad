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

import { Serializable } from "../other.js";
import { Types } from "../other/Types.js";
import { Citizen } from "./Citizen.js";

class JobManager {
    addCitizen() {}
} // TODO this is a hack; waiting on JobManager

/**
 * Object representing the players settlement, holds all Citizens, history and
 * work tasks (in the form of the JobManager) being ordered by the player.
 *
 * @author Impaler
 */

export class Settlement extends Serializable() {
    Citizens = [];
    JobSystem = null;

    constructor() {
        super();
        // Settlment data, wealth, honor, diplomatic status etc
        this.JobSystem = new JobManager();
    }
    get jobManager() {
        return this.JobSystem;
    }
    addCitizen(NewCitizen) {
        Types.mustBe(Citizen, NewCitizen);
        this.Citizens.push(NewCitizen);
        this.JobSystem.addCitizen(NewCitizen);
    }
}