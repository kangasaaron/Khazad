import { ChunkCoordinate, MapCoordinate, Direction } from "../../Map.js";
import { Serializable, Types } from "../../other.js";
import { MapPath, VectorPath, VectorPathWalker } from "../../PathFinding.js";

QUnit.module("PathFinding/VectorPath tests", function() {
    QUnit.test("statics test", function(assert) {
        assert.ok(Types.isExtendedBy(MapPath, VectorPath));
        assert.ok(Types.isImplementedBy(Serializable, VectorPath));
    });

    QUnit.test("constructor test", function(assert) {
        let RawDirections = [];
        let StartCoords = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let GoalCoords = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let a = new VectorPath(1000, RawDirections, StartCoords, GoalCoords);
        assert.ok(a.StartCoordinates.equals(StartCoords));
        assert.ok(a.GoalCoordinates.equals(GoalCoords));
        assert.equal(a.Length, 0);
        assert.equal(a.StepCount, 0);
        assert.ok(Array.isArray(a.Directions) && a.Directions.length == 0);
        assert.ok(Array.isArray(a.Magnitudes) && a.Magnitudes.length == 0);


        RawDirections.push(Direction.DIRECTION_NORTH);
        RawDirections.push(Direction.DIRECTION_NORTH);
        RawDirections.push(Direction.DIRECTION_UP);
        RawDirections.push(Direction.DIRECTION_WEST);
        RawDirections.push(Direction.DIRECTION_DOWN);
        RawDirections.push(Direction.DIRECTION_DOWN);
        RawDirections.push(Direction.DIRECTION_EAST);
        RawDirections.push(Direction.DIRECTION_SOUTH);

        let v = new VectorPath(100, RawDirections, StartCoords, GoalCoords);
        assert.ok(v.StartCoordinates.equals(StartCoords));
        assert.ok(v.GoalCoordinates.equals(GoalCoords));
        assert.equal(v.Length, 0);
        assert.equal(v.StepCount, 8);
        assert.ok(Array.isArray(v.Directions));
        assert.equal(v.Directions.length, 6);
        assert.equal(v.Directions[0], Direction.DIRECTION_NORTH);
        assert.equal(v.Directions[1], Direction.DIRECTION_UP);
        assert.equal(v.Directions[2], Direction.DIRECTION_WEST);
        assert.equal(v.Directions[3], Direction.DIRECTION_DOWN);
        assert.equal(v.Directions[4], Direction.DIRECTION_EAST);
        assert.equal(v.Directions[5], Direction.DIRECTION_SOUTH);
        assert.ok(Array.isArray(v.Magnitudes));
        assert.equal(v.Magnitudes.length, 6);
        assert.equal(v.Magnitudes[0], 2);
        assert.equal(v.Magnitudes[1], 1);
        assert.equal(v.Magnitudes[2], 1);
        assert.equal(v.Magnitudes[3], 2);
        assert.equal(v.Magnitudes[4], 1);
        assert.equal(v.Magnitudes[5], 1);
    });

    QUnit.test("getPathWalker", function(assert) {
        let RawDirections = [];
        let StartCoords = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let GoalCoords = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let a = new VectorPath(1, RawDirections, StartCoords, GoalCoords);

        let p = a.getPathWalker();

        assert.ok(p.equals(new VectorPathWalker(a)));
    })
});