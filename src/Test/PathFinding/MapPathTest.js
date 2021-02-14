import { MapPath, MovementModality } from "../../PathFinding.js";
import { Serializable, Types } from "../../other.js";
import { MapCoordinate } from "../../Map/Coordinates.js";

QUnit.module("PathFinding/MapPath tests", function() {
    QUnit.test("static stuff", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, MapPath));
        assert.equal(MapPath.serialVersionUID, 1);
    });
    QUnit.test("constructor stuff", function(assert) {
        let a = new MapPath();

        assert.ok(a instanceof MapPath);
        assert.equal(a.Length, 0);
        assert.equal(a.StepCount, 0);
        // assert.ok(a.MovementType.equals(new MovementModality())); // TODO
        assert.ok(a.StartCoordinates.equals(new MapCoordinate()));
        assert.ok(a.GoalCoordinates.equals(new MapCoordinate()));

        assert.ok(Types.can(a, "getPathWalker"));
    });
});