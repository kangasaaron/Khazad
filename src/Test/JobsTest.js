import { Jobs } from "../Jobs.js";
import { ExcavateJob } from "../Jobs/ExcavateJob.js";
import { Job, JobType, JobClass } from "../Jobs/Job.js";
import { JobManager } from "../Jobs/JobManager.js";
import { LoiterJob } from "../Jobs/LoiterJob.js";
import { Task, TaskType } from "../Jobs/Task.js";
import { WanderJob } from "../Jobs/WanderJob.js";

QUnit.module('Job package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Jobs.ExcavateJob, ExcavateJob);
        assert.equal(Jobs.Job, Job);
        assert.equal(Jobs.JobType, JobType);
        assert.equal(Jobs.JobClass, JobClass);
        assert.equal(Jobs.JobManager, JobManager);
        assert.equal(Jobs.LoiterJob, LoiterJob);
        assert.equal(Jobs.Task, Task);
        assert.equal(Jobs.TaskType, TaskType);
        assert.equal(Jobs.WanderJob, WanderJob);
    });
});