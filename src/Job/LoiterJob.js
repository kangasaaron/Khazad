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
 *
 * @author Impaler
 */
import { __extends } from "../other/Shims.js";

var Job;

// import Game.Pawn;
// import java.io.Serializable;
(function(Job_1) {
    var LoiterJob = /** @class */ (function(_super) {
        __extends(LoiterJob, _super);

        function LoiterJob() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoiterJob.prototype.needsWorkers = function() {
            return false;
        };
        LoiterJob.prototype.nextTask = function(IdleCitizen) {
            return new Task(this, Task.TaskType.TASK_LOITER, null);
        };
        LoiterJob.prototype.evaluatePawn = function(IdleCitizen) {
            return 0;
        };
        LoiterJob.serialVersionUID = 1;
        return LoiterJob;
    })(Job_1.Job);
    Job_1.LoiterJob = LoiterJob;
    LoiterJob["__class"] = "Job.LoiterJob";
    LoiterJob["__interfaces"] = ["java.io.Serializable"];
})(Job || (Job = {}));