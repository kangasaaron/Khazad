import { Citizen, Settlement } from "../../GameState.js";
import { Serializable, Types } from "../../other.js";
import "../sinon-9.2.4.js";

QUnit.module("GameState/Settlement tests", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(Settlement.serialVersionUID, 1)
        assert.ok(Types.isImplementedBy(Serializable, Settlement))
    });

    QUnit.test("constructor", function(assert) {
        let s = new Settlement();
        assert.ok(Array.isArray(s.Citizens) && s.Citizens.length == 0);
        assert.ok(s.JobSystem !== null && s.JobSystem !== undefined);

        assert.ok(s.getJobManager(), s.JobSystem);
    });

    QUnit.test("addCitizen", function(assert) {
        let s = new Settlement();
        // mock out the jobmanager
        const sandbox = sinon.createSandbox();
        sandbox.spy(s.JobSystem, "addCitizen");

        assert.equal(s.Citizens.length, 0);
        let citizen = new Citizen();
        s.addCitizen(citizen);
        assert.equal(s.Citizens[0], citizen);
        assert.ok(s.JobSystem.addCitizen.calledOnce);
        assert.ok(citizen, s.JobSystem.addCitizen.getCall(0).args[0])

        sandbox.restore();
    });
});