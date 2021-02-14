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



/**
 * A simple uni-direction A* implementation, it utilizes it's own Node type
 * AStarNode which is optimized for this search methodology. The data structures
 * are highly optimized, PriorityQueue for Fringe and HashSet for visited Nodes
 *
 * Pathing can be done for a limited number of nodes, or with a zero argument
 * searching will continue until their is either a complete path or the
 * Fringe Queue is exhausted which indicates that no path is possible. As all
 * attempts to path should have been proceeded by a connectivity check an
 * exhaustion is probably indicative of a flaw in connectivity checking.
 *
 * @author Impaler
 */
export class AStar {}

// TODO waiting on PathAlgorithm, Pool, VectorPath