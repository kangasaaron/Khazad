import { Serializable, Types } from "../../other.js";
import { RouteRequest } from "../../PathFinding.js";
import { Zone, MapCoordinate } from "../../Map.js";

QUnit.module("PathFinding/RouteRequest tests", function() {
    QUnit.test("static stuff", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, RouteRequest));
        assert.equal(RouteRequest.serialVersionUID, 1);
    });
    QUnit.test("constructor stuff", function(assert) {
        let a = new RouteRequest();

        assert.ok(a instanceof RouteRequest);
        assert.ok(a.Start.equals(new MapCoordinate()));
        assert.ok(a.Goal.equals(new MapCoordinate()));
        assert.ok(a.GoalZone.equals(new Zone()));
    });
});