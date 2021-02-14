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
 * The primary implementation of Grid for Khazad pathfinding, it uses a GridChunk
 * class the spacially corresponds to the MapChunk class for interchangability of
 * Coordinates, but the GridChunk holds a single large BitSet of ~7000 bits that
 * corresponds to every Coordinates possible edge to neibhors. Also it records
 * a connectivity zone for each coordinate.
 *
 * The Grid class then stores a HashMap of these GridChunks, again mirroring the
 * structure used in GameMap, as well as a double HashMap and List which are
 * built in a single read pass on the Game Map, this allows for a constant time
 * connection query but is not dynamic.
 *
 * @author Impaler
 */
export class KhazadGrid {}

//TODO waiting on Chunk, Sector