import { Serializable, Types } from "../../other.js";
import {
    Heuristic,
    Manhattan,
    Chebyshev,
    Euclidean,
    Diagonal,
    Octile,
    StraightLine,
    Dijkstra
} from "../../PathFinding.js";
import { ChunkCoordinate, MapCoordinate } from "../../Map/Coordinates.js";


QUnit.module("Pathfinding/Heuristic test", function() {
    let HeuristicClass = Heuristic();
    let a = new HeuristicClass();
    QUnit.test("test that abstract methods exist", function(assert) {
        assert.equal(Heuristic.isInterface, true);
        assert.equal(HeuristicClass.isInterface, true);
        Types.testCanAll(assert, a, "estimate");

        assert.ok("Mixins" in HeuristicClass);
        assert.ok("Heuristic" in HeuristicClass.Mixins);
    });
    QUnit.test("test that abstract methods throw", function(assert) {
        assert.throws(function() {
            a.estimate();
        }, ReferenceError);
    });
});

QUnit.module("Pathfinding/Manhattan", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Manhattan));
        assert.ok(Types.isImplementedBy(Heuristic, Manhattan));
        assert.equal(Manhattan.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new Manhattan();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 96);
    });
});

QUnit.module("Pathfinding/Chebyshev", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Heuristic, Chebyshev));
        assert.ok(Types.isImplementedBy(Serializable, Chebyshev));
        assert.equal(Chebyshev.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new Chebyshev();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 32);
    });

});


QUnit.module("Pathfinding/Euclidean", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Heuristic, Euclidean));
        assert.ok(Types.isImplementedBy(Serializable, Euclidean));
        assert.equal(Euclidean.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new Euclidean();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 45.254833995939045);
    });

});


QUnit.module("Pathfinding/Diagonal", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Heuristic, Diagonal));
        assert.ok(Types.isImplementedBy(Serializable, Diagonal));
        assert.equal(Diagonal.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new Diagonal();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 109.25483399593904);
    });

});


QUnit.module("Pathfinding/Octile", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Heuristic, Octile));
        assert.ok(Types.isImplementedBy(Serializable, Octile));
        assert.equal(Octile.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new Octile();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 109.25483399593904);
    });

});


QUnit.module("Pathfinding/StraightLine", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Heuristic, StraightLine));
        assert.ok(Types.isImplementedBy(Serializable, StraightLine));
        assert.equal(StraightLine.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new StraightLine();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 0);
    });

});


QUnit.module("Pathfinding/Dijkstra", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Heuristic, Dijkstra));
        assert.ok(Types.isImplementedBy(Serializable, Dijkstra));
        assert.equal(Dijkstra.serialVersionUID, 1);
    })

    QUnit.test("estimate", function(assert) {
        let m = new Dijkstra();
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0)),
            end = new MapCoordinate(new ChunkCoordinate(1, 1, 1));

        let result = m.estimate(start, end);

        assert.equal(result, 0);
    });

});