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
 along with Khazad.	If not, see <http://www.gnu.org/licenses/> */



/**
 * Navigator acts as the interface between Pawns (moving things) and the Pathfinding
 * Engine, the Pawn needs to set the MovementBehavior that it wishes to conduct
 * and then query for the next Direction to move in. When pathing to a destination
 * is selected and a destination set, the Navigator will call the Pathfinding
 * Engine to find the path and will then instantiate a PathWalker which will be
 * querried for Directions to provide to the Pawn.
 *
 * @author Impaler
 */
export class Navigator {}

//TODO waiting on PathManager