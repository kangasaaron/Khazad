import { Pawn } from "../../GameState.js";
import { Job, Task, JobType, JobClass } from "../../Jobs.js";
import { MapCoordinate } from "../../Map/Coordinates.js";
import { Serializable, Enum, Types } from "../../other.js";
import "../sinon-9.2.4.js";

QUnit.module("Job/Job test", function() {
    QUnit.test("statics test", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Job));
        assert.equal(Job.serialVersionUID, 1);

        assert.ok(JobType.JOB_IDLE instanceof Enum);
        assert.ok(JobType.JOB_DIG instanceof Enum);
        assert.ok(JobType.JOB_HAUL instanceof Enum);
        assert.ok(JobType.JOB_WANDER instanceof Enum);

        assert.ok(JobType.JOB_IDLE instanceof JobType);
        assert.ok(JobType.JOB_DIG instanceof JobType);
        assert.ok(JobType.JOB_HAUL instanceof JobType);
        assert.ok(JobType.JOB_WANDER instanceof JobType);

        assert.ok(JobClass.JOB_REAL instanceof Enum);
        assert.ok(JobClass.JOB_BREAK instanceof Enum);
        assert.ok(JobClass.JOB_IDLE instanceof Enum);

        assert.ok(JobClass.JOB_REAL instanceof JobClass);
        assert.ok(JobClass.JOB_BREAK instanceof JobClass);
        assert.ok(JobClass.JOB_IDLE instanceof JobClass);

        Types.testCanAll(assert, Job.prototype, "needsWorkers", "nextTask", "evaluatePawn");

    });

    QUnit.test("constructor test", function(assert) {
        let a = new Job();
        assert.ok(a !== null && a !== undefined);
        assert.ok(a instanceof Job);
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
        assert.throws(function() {
            j.addPawn();
        });

        let j = new Job();

        const sandbox = sinon.createSandbox();
        sandbox.stub(j, "nextTask").callsFake(() => new Task());

        let alreadyInThere = new Pawn(1, 1, 1, new MapCoordinate());
        j.Workers.push(alreadyInThere);
        let result = j.addPawn(alreadyInThere);
        assert.equal(result, false);

        let j2 = new Job();
        sandbox.stub(j2, "nextTask").callsFake(() => null);
        let newOne = new Pawn(2, 3, 4, new MapCoordinate());

        sandbox.spy(newOne, "setTask");

        result = j2.addPawn(newOne);
        assert.equal(j2.nextTask.callCount, 1);
        assert.equal(j2.nextTask.getCall(0).args[0], newOne);

        assert.equal(result, false);


        let job = new Job();
        let returnValue = Symbol('newTask');
        sandbox.stub(job, "nextTask").callsFake(() => returnValue);

        let newPawn = new Pawn(5, 6, 7, new MapCoordinate());

        sandbox.spy(newPawn, "setTask");


        result = job.addPawn(newPawn);
        assert.equal(result, true);
        assert.equal(job.Workers[0], newPawn);
        assert.equal(newPawn.PrimaryJob, job);
        assert.equal(newPawn.setTask.callCount, 1);
        assert.equal(newPawn.setTask.getCall(0).args[0], returnValue);

        // if (NewPawn.PrimaryJob != null)
        //                  NewPawn.PrimaryJob.releaseCitizen(NewPawn);

        //              Workers.add(NewPawn);
        //              NewPawn.PrimaryJob = this;
        //              NewPawn.setTask(newTask);

        let otherJob = new Job();
        sandbox.spy(otherJob, "releaseCitizen");

        let pawn = new Pawn(9, 8, 7, new MapCoordinate());
        pawn.PrimaryJob = otherJob;
        sandbox.spy(pawn, "setTask");

        job = new Job();
        sandbox.stub(job, "nextTask").callsFake(() => returnValue);

        result = job.addPawn(pawn);
        assert.equal(otherJob.releaseCitizen.callCount, 1);
        assert.equal(otherJob.releaseCitizen.getCall(0).args[0], pawn);
        assert.equal(result, true);
        assert.equal(job.Workers[0], pawn);
        assert.equal(pawn.PrimaryJob, job);
        assert.equal(pawn.setTask.callCount, 1);
        assert.equal(pawn.setTask.getCall(0).args[0], returnValue);

    });
});