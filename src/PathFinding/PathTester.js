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

import { defineEnum } from "../other.js";

/**
 * A data agragating class used to statisticly sample the speed and efficency
 * of Pathfinding algorithms.
 *
 * @author Impaler
 */
export const ProfileResultCode = defineEnum("ProfileResultCode",
    "PATH_CODE_NO_DATA",
    "PATH_CODE_SUCCESS",
    "PATH_CODE_FAILUTE_UNITIALIZED",
    "PATH_CODE_FAILURE_INVALID_LOCATION",
    "PATH_CODE_FAILURE_NO_CONNECTION",
    "PATH_CODE_FAILURE_UNKNOWN"
);

export class PathTester {}

//TODO waiting on not much at all...