import { Job } from "../../Job/Job.js";
import { LoiterJob } from "../../Job/LoiterJob.js";
import { Serializable } from "../../other/Serializable.js";
import { Mock } from "../MockClass.js";

QUnit.module("Job/LoiterJob test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(LoiterJob.serialVersionUID, 1);
        assert.ok(Serializable.isImplementedByClass(LoiterJob));
    });

    QUnit.test("constructor test", function(assert) {
        let a = new LoiterJob();
        assert.ok(Serializable.isImplementedBy(a));
        assert.ok(a instanceof Job);
        assert.ok(a instanceof LoiterJob);

    });
    QUnit.test("needsWorkers test", function(assert) {
        let a = new LoiterJob();
        assert.equal(a.needsWorkers(), false);
    });
    QUnit.test("evaluatePawn test", function(assert) {
        let a = new LoiterJob();
        assert.equal(a.evaluatePawn(), 0);
    });
    QUnit.test("nextTask test", function(assert) {
        let newTaskResult = Symbol('New Task');
        let MockLoiterJob = Mock(LoiterJob);
        MockLoiterJob.__override__("newTask", false, newTaskResult);
        let a = new MockLoiterJob();
        let n = a.nextTask({});

        assert.equal(n, newTaskResult);
        assert.equal(a.__calls__.newTask.length, 1);
        assert.equal(a.__calls__.newTask[0].args[0], a);
        assert.equal(a.__calls__.newTask[0].args[1], "Task.TaskType.TASK_LOITER");
        assert.equal(a.__calls__.newTask[0].args[2], null);
    });
    // nextTask(IdleCitizen) {
    //     return new Task(this, Task.TaskType.TASK_LOITER, null);
    // }
});