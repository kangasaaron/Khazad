import { Job } from "../../Job/Job.js";
import { Serializable } from "../../other/Serializable.js";
import { Enum } from "../../other/Shims.js";
import { Mock } from "../MockClass.js";

QUnit.module("Job/Job test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(Job.serialVersionUID, 1);

        assert.ok(Job.JobType.JOB_IDLE instanceof Enum);
        assert.ok(Job.JobType.JOB_DIG instanceof Enum);
        assert.ok(Job.JobType.JOB_HAUL instanceof Enum);
        assert.ok(Job.JobType.JOB_WANDER instanceof Enum);

        assert.ok(Job.JobType.JOB_IDLE instanceof Job.JobType);
        assert.ok(Job.JobType.JOB_DIG instanceof Job.JobType);
        assert.ok(Job.JobType.JOB_HAUL instanceof Job.JobType);
        assert.ok(Job.JobType.JOB_WANDER instanceof Job.JobType);

        assert.ok(Job.JobClass.JOB_REAL instanceof Enum);
        assert.ok(Job.JobClass.JOB_BREAK instanceof Enum);
        assert.ok(Job.JobClass.JOB_IDLE instanceof Enum);

        assert.ok(Job.JobClass.JOB_REAL instanceof Job.JobClass);
        assert.ok(Job.JobClass.JOB_BREAK instanceof Job.JobClass);
        assert.ok(Job.JobClass.JOB_IDLE instanceof Job.JobClass);

        assert.ok(Job.prototype.needsWorkers !== undefined);
        assert.ok(Job.prototype.nextTask !== undefined);
        assert.ok(Job.prototype.evaluatePawn !== undefined);

        assert.ok(Serializable.isImplementedByClass(Job));
    });

    QUnit.test("constructor test", function(assert) {
        let a = new Job();
        assert.ok(a !== null && a !== undefined);
        assert.ok(a instanceof Job);
        assert.ok(Serializable.isImplementedBy(a));
        assert.ok(Array.isArray(a.Workers));
        assert.equal(a.Workers.length, 0);
        assert.equal(a.Type, null);
        assert.equal(a.Class, null);
        assert.equal(a.Paused, false);
        assert.ok(a.Priority.equals(0));
        assert.equal(a.Name, "");
        assert.equal(a.WorkersOnBrek, 0);
        assert.equal(a.Manager, null);
    });

    QUnit.test("addPawn test", function(assert) {
        let MockJob = Mock(Job);
        MockJob.__override__("nextTask");
        let j = new MockJob();
        assert.throws(function() {
            j.addPawn();
        });

        let alreadyInThere = {};
        j.Workers.push(alreadyInThere);
        let result = j.addPawn(alreadyInThere);
        assert.equal(result, false);

        assert.ok(!j.__calls__);

        let newOne = {};
        result = j.addPawn(newOne);
        assert.ok(j.__calls__.nextTask.length == 1);
        assert.equal(j.__calls__.nextTask[0].args[0], newOne);

        assert.equal(result, false);

        let _setTaskCalls = [];

        let returnValue = Symbol('newTask');

        MockJob.__override__("nextTask", false, returnValue);

        let job = new MockJob();
        let newPawn = {
            setTask: function setTask(newTask) {
                _setTaskCalls.push(newTask);
            }
        };

        result = job.addPawn(newPawn);
        assert.equal(result, true);
        assert.equal(job.Workers[0], newPawn);
        assert.equal(newPawn.PrimaryJob, job);
        assert.equal(_setTaskCalls.length, 1);
        assert.equal(_setTaskCalls[0], returnValue);

        // if (NewPawn.PrimaryJob != null)
        //                  NewPawn.PrimaryJob.releaseCitizen(NewPawn);

        //              Workers.add(NewPawn);
        //              NewPawn.PrimaryJob = this;
        //              NewPawn.setTask(newTask);

        _setTaskCalls = [];
        let _releaseCitizenCalls = [];
        job = new MockJob();

        newPawn = {
            PrimaryJob: {
                releaseCitizen: function(newPawn) {
                    _releaseCitizenCalls.push(newPawn);
                }
            },
            setTask: function setTask(newTask) {
                _setTaskCalls.push(newTask);
            }
        };

        result = job.addPawn(newPawn);
        assert.equal(_releaseCitizenCalls.length, 1);
        assert.equal(_releaseCitizenCalls[0], newPawn);
        assert.equal(result, true);
        assert.equal(job.Workers[0], newPawn);
        assert.equal(newPawn.PrimaryJob, job);
        assert.equal(_setTaskCalls.length, 1);
        assert.equal(_setTaskCalls[0], returnValue);

    });
});