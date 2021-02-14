import { Serializable, Types } from "../../other.js";
import { PathAlgorithm, Manhattan, MovementModality, MovementType } from "../../PathFinding.js";
import { MapCoordinate, ChunkCoordinate } from "../../Map.js";

QUnit.module("PathFinding/PathAlgorithm tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, PathAlgorithm));
        assert.equal(PathAlgorithm.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let a = new PathAlgorithm();

        assert.ok(Types.can(a, "searchPath"));
        assert.ok(Types.can(a, "findPath"));
        assert.ok(Types.can(a, "provide"));

        assert.equal(a.GraphReads, 0);
        assert.equal(a.ExpandedNodes, 0);
        assert.equal(a.SearchGraph, null);
        assert.equal(a.Modality, null);
        assert.equal(a.StartCoordinates, null);
        assert.equal(a.GoalCoordinates, null);
        assert.equal(a.MainHeuristic, null);
        assert.equal(a.TieBreakerHeuristic, null);
        assert.equal(a.FinalPath, null);

        let S = new MapCoordinate(new ChunkCoordinate(10, 10, 10));
        let G = new MapCoordinate(new ChunkCoordinate(11, 11, 11));
        a.FinalPath = undefined;
        a.GraphReads = 1;
        a.ExpandedNodes = 2;

        assert.equal(a.getGraphReads(), 1);
        assert.equal(a.getExpandedNodes(), 2);

        a.setEndPoints(S, G);

        assert.equal(a.StartCoordinates, S);
        assert.equal(a.GoalCoordinates, G);
        assert.equal(a.GraphReads, 0);
        assert.equal(a.ExpandedNodes, 0);
        assert.equal(a.FinalPath, null);

        let primary = new Manhattan(),
            secondary = new Manhattan();

        a.setHeuristics(primary, secondary);

        assert.equal(a.MainHeuristic, primary);
        assert.equal(a.TieBreakerHeuristic, secondary);

        let m = new MovementModality(MovementType.MOVEMENT_TYPE_WALK, 1, 1);
        a.setModality(m);
        assert.equal(a.Modality, m);
    });

});