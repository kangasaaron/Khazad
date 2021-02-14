import { Direction, MapCoordinate } from "../../Map.js";
import { AStarNode } from "../../PathFinding.js";

QUnit.module("PathFinding/AStarNode test", function() {
    QUnit.test("constructor test", function(assert) {
        let a = new AStarNode();
        assert.ok(a instanceof AStarNode);
        assert.ok(a.LocationCoordinates.equals(new MapCoordinate()));
        assert.equal(a.TotalCost, 0);
        assert.equal(a.PathLengthFromStart, 0);
        assert.equal(a.MinimumCostToGoal, 0);
        assert.equal(a.TieBreakerValue, 0);
        assert.ok(a.Parent === null);
        assert.equal(a.ParentDirection, Direction.DIRECTION_NONE);
    });

    QUnit.test("set test", function(assert) {
        let a = new AStarNode();
        let m = new MapCoordinate();
        let p = new AStarNode();
        let d = Direction.DIRECTION_NORTH;
        a.set(m, p, d, 1.5, 2.5, 3.5);

        assert.equal(a.Parent, p);
        assert.equal(a.ParentDirection, d);
        assert.equal(a.LocationCoordinates, m);
        assert.equal(a.PathLengthFromStart, 1.5);
        assert.equal(a.MinimumCostToGoal, 2.5);
        assert.equal(a.TieBreakerValue, 3.5);
        assert.equal(a.TotalCost, 4.0);
    });

    QUnit.test("compareTo test", function(assert) {
        let firstNode = new AStarNode();
        let secondNode = new AStarNode();

        firstNode.TotalCost = 0.5;
        secondNode.TotalCost = 0.5;
        assert.equal(firstNode.compareTo(secondNode), 1, "exactly the same");

        firstNode.TotalCost = 1.0
        assert.equal(firstNode.compareTo(secondNode), 1, "firstNode TotalCost bigger");

        secondNode.TotalCost = 2.0
        assert.equal(firstNode.compareTo(secondNode), -1, "secondNode TotalCost bigger");

        firstNode.TotalCost = 0.5;
        secondNode.TotalCost = 0.5;
        secondNode.TieBreakerValue = 0.1;
        assert.equal(firstNode.compareTo(secondNode), -1, "TotalCosts same, secondNode TiebrakerValue bigger");

        secondNode.TieBreakerValue = 0.2;
        assert.equal(firstNode.compareTo(secondNode), -1, "TotalCosts same, firstNode TiebrakerValue bigger");
    });

    QUnit.test("equals test", function(assert) {
        let firstNode = new AStarNode();
        let secondNode = new AStarNode();

        assert.ok(firstNode !== secondNode);
        assert.ok(firstNode.equals(firstNode));
        assert.ok(firstNode.equals(secondNode));

        secondNode.LocationCoordinates.Block.Data = 2;
        assert.ok(!(firstNode.equals(secondNode)));
    });
});