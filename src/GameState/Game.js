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
 * Game holds all the objects (Map, Settlment, Weather etc) which together make
 * up the simulation and is were saving and loading of game files is initiate
 * before being piped to the particular sub-objects. Game is also responsible
 * for the simulation logic loop which is called by update each frame, a Ticker
 * instance is created and submitted to the thread pool to keep the core JME
 * thread fully devoted to rendering.
 *
 * @author Impaler
 */
export class Game {}
//TODO waiting on Geology
//TODO waiting on GameMap
//TODO waiting on Ticker
//TODO waiting on GameScreenController
//TODO waiting on Pawn
//TODO waiting on Citizen
//TODO waiting on ExcavateJob

// TODO lots of api stuff. jmonkey AbstractAppState