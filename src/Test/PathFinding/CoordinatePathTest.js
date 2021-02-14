import { MapCoordinate } from "../../Map/Coordinates.js";
import { Serializable, Types } from "../../other.js";
import { CoordinatePath, CoordinatePathWalker, MapPath, MovementModality, MovementType } from "../../PathFinding.js";

QUnit.module("PathFinding/CoordinatePath tests", function() {
    QUnit.test("statics", function(assert) {
        assert.equal(CoordinatePath.serialVersionUID, 1);
        assert.ok(Types.isImplementedBy(Serializable, CoordinatePath));
        assert.ok(Types.isExtendedBy(MapPath, CoordinatePath));
    });

    QUnit.test("constructor", function(assert) {
        let s = new MapCoordinate();
        let g = new MapCoordinate();
        let p = new CoordinatePath(10, [s, 0, g]);
        assert.ok(p instanceof CoordinatePath);
        assert.ok(p instanceof MapPath);
        assert.equal(p.Length, 10);
        assert.equal(p.StepCount, 2);
        assert.ok(p.MovementType.equals(new MovementModality(MovementType.MOVEMENT_TYPE_WALK, 0, 0)));
        assert.equal(p.StartCoordinates, s);
        assert.equal(p.GoalCoordinates, g);

        assert.ok(Types.is("array", p.PathCourse));
        assert.equal(p.PathCourse[0], s);
        assert.equal(p.PathCourse[2], g);

        assert.throws(function() {
            let cp = new CoordinatePath();
        });
        assert.throws(function() {
            let cp = new CoordinatePath(0);
        });
    });

    QUnit.test("getPathWalker", function(assert) {
        let s = new MapCoordinate();
        let g = new MapCoordinate();
        let p = new CoordinatePath(10, [s, 0, g]);
        let w = p.getPathWalker();
        assert.ok(w.equals(new CoordinatePathWalker(p)));
    });
});