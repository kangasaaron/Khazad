import { Types, Serializable } from "../../other.js";
import { MapCoordinate } from "../../Map.js";
import { CoordinatePathWalker, PathWalker, CoordinatePath } from "../../PathFinding.js";

QUnit.module("PathFinding/CoordinatePathWalker tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, CoordinatePathWalker));
        assert.ok(Types.isImplementedBy(PathWalker, CoordinatePathWalker));
    });

    QUnit.test("constructor", function(assert) {
        let s = new MapCoordinate();
        let g = new MapCoordinate();
        let p = new CoordinatePath(10, [s, 0, g]);
        let c = new CoordinatePathWalker(p);

        assert.equal(c.TargetPath, p);
        assert.equal(c.CurrentStep, 0);
    });

    QUnit.test("reset", function(assert) {
        let s = new MapCoordinate();
        let g = new MapCoordinate();
        let p = new CoordinatePath(10, [s, 0, g]);
        let c = new CoordinatePathWalker(p);

        assert.equal(c.CurrentStep, 0);
        c.CurrentStep = 200;
        assert.equal(c.CurrentStep, 200);

        c.reset();
        assert.equal(c.CurrentStep, 0);
    })
});