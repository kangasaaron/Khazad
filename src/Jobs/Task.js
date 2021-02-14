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


import { defineEnum, Serializable } from "../other.js";

/**
 * Smallest possible unit of work or activity by a Pawn, Jobs are broken down
 * into a series of individual tasks that can be assigned to Citizens or invaders
 *
 * @author Impaler
 */
export class Task extends Serializable() {}

export const TaskType = defineEnum("TaskType",
    "TASK_IDLE",
    "TASK_TRAPPED",
    "TASK_SLEEP",
    "TASK_PICK_UP",
    "TASK_HAUL",
    "TASK_GOTO",
    "TASK_DROP_OFF",
    "TASK_DIG",
    "TASK_LOITER"
);


//TODO waiting on Pawn, Navigator, ExcavateJob