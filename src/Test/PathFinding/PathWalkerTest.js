import { PathWalker } from "../../PathFinding.js";
import { Types } from "../../other.js";

QUnit.module("Pathfinding/PathWalker test", function() {
    QUnit.test("statics", function(assert) {
        let example = PathWalker(Object);
        Types.testCanAll(assert, example.prototype, "nextCoordinate", "nextDirection", "peekCoordinate", "peekDirection", "reset");
        Types.testHas(assert, example.prototype, "currentStep");
    });
});