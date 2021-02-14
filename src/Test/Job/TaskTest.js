QUnit.module("Job/Task tests", function() {
    QUnit.test.todo("statics", function(assert) {

    });
});

QUnit.module("Job/TaskType tests", function() {
    QUnit.test(function(assert) {
        assert.ok(Task.TaskType instanceof Enum);
    });
});