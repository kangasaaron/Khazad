import { Citizen } from "../../GameState.js";
import { Serializable, Types } from "../../other.js";

QUnit.module("GameState/Citizen tests", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(Citizen.serialVersionUID, 1)
        assert.ok(Types.isImplementedBy(Serializable, Citizen));
    });

    QUnit.test.todo("constructor", function(assert) {
        let c = new Citizen();
    });

    QUnit.test.todo("findTask", function(assert) {

    });

    QUnit.test.todo("generateName", function(assert) {

    });
});