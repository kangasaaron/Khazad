import { Task, TaskType } from "../../Jobs.js";
import { Enum, Serializable, Types } from "../../other.js";

QUnit.module("Job/Task tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(TaskType !== null);
        assert.ok(Types.isImplementedBy(Serializable, Task));
    });

    QUnit.test.todo("constructor", function(assert) {

    });
});

QUnit.module("Job/Task TaskType tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(TaskType.TASK_IDLE instanceof Enum);
        assert.equal(TaskType.TASK_IDLE, 0);
        assert.equal(TaskType.TASK_IDLE.name, "TASK_IDLE");
        assert.equal(TaskType.TASK_IDLE.description, "TaskType.TASK_IDLE");

        assert.ok(TaskType.TASK_TRAPPED instanceof Enum);
        assert.equal(TaskType.TASK_TRAPPED, 1);
        assert.equal(TaskType.TASK_TRAPPED.name, "TASK_TRAPPED");
        assert.equal(TaskType.TASK_TRAPPED.description, "TaskType.TASK_TRAPPED");

        assert.ok(TaskType.TASK_SLEEP instanceof Enum);
        assert.equal(TaskType.TASK_SLEEP, 2);
        assert.equal(TaskType.TASK_SLEEP.name, "TASK_SLEEP");
        assert.equal(TaskType.TASK_SLEEP.description, "TaskType.TASK_SLEEP");

        assert.ok(TaskType.TASK_PICK_UP instanceof Enum);
        assert.equal(TaskType.TASK_PICK_UP, 3);
        assert.equal(TaskType.TASK_PICK_UP.name, "TASK_PICK_UP");
        assert.equal(TaskType.TASK_PICK_UP.description, "TaskType.TASK_PICK_UP");

        assert.ok(TaskType.TASK_HAUL instanceof Enum);
        assert.equal(TaskType.TASK_HAUL, 4);
        assert.equal(TaskType.TASK_HAUL.name, "TASK_HAUL");
        assert.equal(TaskType.TASK_HAUL.description, "TaskType.TASK_HAUL");

        assert.ok(TaskType.TASK_GOTO instanceof Enum);
        assert.equal(TaskType.TASK_GOTO, 5);
        assert.equal(TaskType.TASK_GOTO.name, "TASK_GOTO");
        assert.equal(TaskType.TASK_GOTO.description, "TaskType.TASK_GOTO");

        assert.ok(TaskType.TASK_DROP_OFF instanceof Enum);
        assert.equal(TaskType.TASK_DROP_OFF, 6);
        assert.equal(TaskType.TASK_DROP_OFF.name, "TASK_DROP_OFF");
        assert.equal(TaskType.TASK_DROP_OFF.description, "TaskType.TASK_DROP_OFF");

        assert.ok(TaskType.TASK_DIG instanceof Enum);
        assert.equal(TaskType.TASK_DIG, 7);
        assert.equal(TaskType.TASK_DIG.name, "TASK_DIG");
        assert.equal(TaskType.TASK_DIG.description, "TaskType.TASK_DIG");

        assert.ok(TaskType.TASK_LOITER instanceof Enum);
        assert.equal(TaskType.TASK_LOITER, 8);
        assert.equal(TaskType.TASK_LOITER.name, "TASK_LOITER");
        assert.equal(TaskType.TASK_LOITER.description, "TaskType.TASK_LOITER");

    });
});