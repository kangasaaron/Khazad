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

import { Byte, Serializable, defineEnum } from "../other.js";
import { Types } from "../other/Types.js";
import { Task } from "./Task.js";
import { Pawn } from "../GameState.js";

/**
 *
 * @author Impaler
 */

export class Job extends Serializable() {
    Workers = [];
    Type = null;
    Class = null;
    Paused = false;
    Priority = new Byte(0);
    Name = "";
    WorkersOnBreak = 0;
    Manager = null;

    newTask(parent, newType, location) {
        Types.mustBe(Job, parent);
        Types.mustBe(Task.TaskType, newType);
        Types.mustBe(MapCoordinate, location);
        return new Task(parent, newType, location);
    }

    addPawn(NewPawn) {
        Types.mustBe(Pawn, NewPawn);
        if (this.Workers.includes(NewPawn))
            return false;
        let newTask = this.nextTask(NewPawn);
        if (newTask) {
            if (NewPawn.PrimaryJob)
                NewPawn.PrimaryJob.releaseCitizen(NewPawn);
            this.Workers.push(NewPawn);
            NewPawn.PrimaryJob = this;
            NewPawn.setTask(newTask);
            return true;

        }
        return false;
    }
    releaseCitizen() {}

    //      public void releaseCitizen(Pawn OldCitizen) { //TODO Waiting on Pawn
    //          if (OldCitizen.PrimaryJob == this)
    //              OldCitizen.PrimaryJob = null;
    //          if (Workers.contains(OldCitizen)) {
    //              Workers.remove(OldCitizen);
    //              OldCitizen.PrimaryJob = null;
    //              //OldCitizen.CurrentTask = null;
    //          }
    //      }

    //      public void setOnBreak(Pawn OnBreakPawn) {//TODO Waiting on Pawn
    //          OnBreakPawn.onBreak = true;
    //          WorkersOnBrek++;
    //      }

    //      public abstract boolean needsWorkers();

    //      public abstract Task nextTask(Pawn IdleCitizen);

    //      public abstract float evaluatePawn(Pawn IdleCitizen);

    //      public String getName() {
    //          return Name;
    //      }
    //  }
    needsWorkers() {
        this.abstractFunction("Job", "needsWorkers");
    }
    nextTask() {
        this.abstractFunction("Job", "nextTask");
    }
    evaluatePawn() {
        this.abstractFunction("Job", "evaluatePawn");
    }
}

export const JobType = defineEnum("JobType",
    "JOB_IDLE",
    "JOB_DIG",
    "JOB_HAUL",
    "JOB_WANDER" // temporary testing
);
export const JobClass = defineEnum("JobClass",
    "JOB_REAL", // Jobs ordered by the player that compete for workers
    "JOB_BREAK", // Short Jobs to fill worker needs
    "JOB_IDLE" // Jobs originating from the workers themselves
);