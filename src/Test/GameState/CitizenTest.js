import { Citizen, Pawn } from "../../GameState.js";
import { Serializable, Types } from "../../other.js";

QUnit.module("GameState/Citizen tests", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(Citizen.serialVersionUID, 1)
        assert.ok(Types.isImplementedBy(Serializable, Citizen));
        // assert.ok(Types.inheritsFrom(Pawn, Citizen)); // TODO waiting on Pawn
    });

    QUnit.test.todo("constructor", function(assert) {
        let c = new Citizen();
    });

    QUnit.test.todo("findTask", function(assert) { // Waiting on Task

    });

    QUnit.test.todo("generateName", function(assert) { 
       
    });
});