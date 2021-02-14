import { Actor, Pawn } from "../../GameState.js";
import { MapCoordinate } from "../../Map.js";
import { Serializable, Types } from "../../other.js";

QUnit.module("GameState/Pawn tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Pawn));
        assert.equal(Object.getPrototypeOf(Pawn), Actor);
    });

    QUnit.test.todo("constructor", function(assert) {
        let spawnLocation = new MapCoordinate();

        assert.throws(function() {
            let a = new Pawn();
        });
        assert.throws(function() {
            let a = new Pawn(1);
        });
        assert.throws(function() {
            let a = new Pawn(1, 2);
        });
        assert.throws(function() {
            let a = new Pawn(1, 2, 3);
        });
        let pawn = new Pawn(4, 5, 6, spawnLocation);

        assert.equal(pawn.CreatureTypeID, 4)
        assert.equal(pawn.ID, 5)
        assert.equal(pawn.AttributeDice.Seed, 6)
        assert.equal(pawn.getLocation(), spawnLocation);
        assert.equal(pawn.Moving, false);

    });

    QUnit.test.todo("setters/getters", function(assert) {

    });

    QUnit.test.todo("findTask", function(assert) {

    });

    QUnit.test.todo("updatePosition", function(assert) {

    });

    QUnit.test.todo("attemptMove", function(assert) {

    });

    QUnit.test.todo("wake", function(assert) {

    });
});