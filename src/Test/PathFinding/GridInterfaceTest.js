import { Types } from "../../other.js";
import { GridInterface } from "../../PathFinding.js";

QUnit.module("Pathfinding/GridInterface test", function() {
    let GridInterfaceClass = GridInterface();
    let a = new GridInterfaceClass();
    QUnit.test("test that abstract methods exist", function(assert) {
        assert.equal(GridInterface.isInterface, true);
        assert.equal(GridInterfaceClass.isInterface, true);
        Types.testCanAll(assert, a, "getEdgeCost",
            "getDirectionEdgeSet",
            "getModality",
            "getConnectivityZone",
            "isPathPossible",
            "dirtyMapCoordinate",
            "contains",
            "getPassableCoordinates");

        assert.ok("Mixins" in GridInterfaceClass);
        assert.ok("GridInterface" in GridInterfaceClass.Mixins)
    });
    QUnit.test("test that abstract methods throw", function(assert) {
        assert.throws(function() {
            a.getEdgeCost();
        }, ReferenceError);
        assert.throws(function() {
            a.getDirectionEdgeSet();
        }, ReferenceError);
        assert.throws(function() {
            a.getModality();
        }, ReferenceError);
        assert.throws(function() {
            a.getConnectivityZone();
        }, ReferenceError);
        assert.throws(function() {
            a.isPathPossible();
        }, ReferenceError);
        assert.throws(function() {
            a.dirtyMapCoordinate();
        }, ReferenceError);
        assert.throws(function() {
            a.contains();
        }, ReferenceError);
        assert.throws(function() {
            a.getPassableCoordinates();
        }, ReferenceError);
    });
});