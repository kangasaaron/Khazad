import { Serializable, Types } from "../../other.js";
import { GameMap } from "../../Map.js";

QUnit.module("Map/GameMap tests", function() {

    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, GameMap));
        assert.equal(GameMap.serialVersionUID, 1);


    });

    QUnit.test.todo("constructor", function(assert) {

    });
});