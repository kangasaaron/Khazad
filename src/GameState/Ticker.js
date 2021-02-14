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
 * Simple callable that pumps the game simulation for a specified number of
 * simulated time ticks, used by game to put most simulation logic into a secondary
 * thread from the JME rendering thread. A queue of temporal objects is used to
 * sort which objects are to be woken and updated on each tick, each object is
 * then reinserted under it's next desired wakeup tick.
 *
 * @author Impaler
 */
export class Ticker {}
//TODO waiting on Game
//TODo waiting on JobManager