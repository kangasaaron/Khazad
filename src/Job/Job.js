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

import { Byte } from "../other/Integers.js";
import { Serializable } from "../other/Serializable.js";
import { addAbstractFunction, defineEnum } from "../other/Shims.js";


/**
 *
 * @author Impaler
 */
export class Job {
    constructor() {
        this.Workers = [];
        this.Type = null;
        this.Class = null;
        this.Paused = false;
        this.Priority = new Byte(0);
        this.Name = "";
        this.WorkersOnBrek = 0;
        this.Manager = null;
    }
    newTask(parent, newType, location) {
        // return new Task(parent, newType, location);// TODO
    }

    addPawn(NewPawn) {
        if (NewPawn === null || NewPawn === undefined) {
            throw new TypeError("Job.addPawn expects a valid pawn as a parameter");
        }
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

    //      public void releaseCitizen(Pawn OldCitizen) { //TODO
    //          if (OldCitizen.PrimaryJob == this)
    //              OldCitizen.PrimaryJob = null;
    //          if (Workers.contains(OldCitizen)) {
    //              Workers.remove(OldCitizen);
    //              OldCitizen.PrimaryJob = null;
    //              //OldCitizen.CurrentTask = null;
    //          }
    //      }

    //      public void setOnBreak(Pawn OnBreakPawn) {//TODO
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
}

addAbstractFunction(Job, "needsWorkers");
addAbstractFunction(Job, "nextTask");
addAbstractFunction(Job, "evaluatePawn");

Job.serialVersionUID = 1;
Job.JobType = defineEnum("JobType",
    "JOB_IDLE",
    "JOB_DIG",
    "JOB_HAUL",
    "JOB_WANDER"
);
Job.JobClass = defineEnum("JobClass",
    "JOB_REAL",
    "JOB_BREAK",
    "JOB_IDLE"
);

Serializable.becomeImplementedBy(Job);