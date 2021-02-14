import { ChunkCoordinate, Direction, MapCoordinate } from "../../Map.js";
import { BlockCoordinate } from "../../Map/Coordinates.js";
import { Types, Serializable, Short } from "../../other.js";
import { PathWalker, VectorPath, VectorPathWalker } from "../../PathFinding.js";

QUnit.module("PathFinding/VectorPathWalker tests", function() {


    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, VectorPathWalker));
        assert.ok(Types.isImplementedBy(PathWalker, VectorPathWalker));
    });

    QUnit.test("constructor", function(assert) {
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let goal = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let directions = [
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_DOWN,
            Direction.DIRECTION_DOWN
        ];
        let path = new VectorPath(1, directions, start, goal);
        let walker = new VectorPathWalker();

        assert.equal(walker.StepCoordinates, null);
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter, 0);
        assert.equal(walker.currentStep, 0);
        assert.equal(walker.TargetPath, null);

        walker = new VectorPathWalker(path);

        assert.equal(walker.StepCoordinates, start);
        assert.equal(walker.MagnitudeCountDown, 2);
        assert.equal(walker.LegCounter, 0);
        assert.equal(walker.currentStep, 0);
        assert.equal(walker.TargetPath, path);

    });

    QUnit.test("nextCoordinate", function(assert) {
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let goal = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let directions = [
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_DOWN,
            Direction.DIRECTION_DOWN
        ];
        let path = new VectorPath(1, directions, start, goal);
        let walker = new VectorPathWalker(path);

        let result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "1st nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 1);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(0, -1, 0), new BlockCoordinate(0, 992))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "2nd nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 2);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(0, -1, 0), new BlockCoordinate(0, 960))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "3rd nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(1).valueOf());
        assert.equal(walker.currentStep, 3);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(0, -1, 0), new BlockCoordinate(0, 961))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "4th nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(1).valueOf());
        assert.equal(walker.currentStep, 4);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(0, -1, 0), new BlockCoordinate(0, 962))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "5th nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(2).valueOf());
        assert.equal(walker.currentStep, 5);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(-1, -1, 0), new BlockCoordinate(0, 32706))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "6th nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(2).valueOf());
        assert.equal(walker.currentStep, 6);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(-1, -1, 0), new BlockCoordinate(0, 31682))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "7th nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(3).valueOf());
        assert.equal(walker.currentStep, 7);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(-1, -1, 0), new BlockCoordinate(0, 31681))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "8th nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(3).valueOf());
        assert.equal(walker.currentStep, 8);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(-1, -1, 0), new BlockCoordinate(0, 31680))));

        result = walker.nextCoordinate();

        assert.equal(walker.StepCoordinates, start, "9th nextCoordinate");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(3).valueOf());
        assert.equal(walker.currentStep, 8);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(goal));
    });

    QUnit.test("nextDirection", function(assert) {
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let goal = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let directions = [
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_DOWN,
            Direction.DIRECTION_DOWN
        ];
        let path = new VectorPath(1, directions, start, goal);
        let walker = new VectorPathWalker(path);

        let result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "1st nextDirection");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 1);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_SOUTH));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "2nd nextDirection");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 2);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_SOUTH));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "3rd nextDirection");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(1).valueOf());
        assert.equal(walker.currentStep, 3);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_UP));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "4th nextDirection");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(1).valueOf());
        assert.equal(walker.currentStep, 4);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_UP));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "5th nextDirection");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(2).valueOf());
        assert.equal(walker.currentStep, 5);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_WEST));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "6th nextDirection");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(2).valueOf());
        assert.equal(walker.currentStep, 6);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_WEST));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "7th nextDirection");
        assert.equal(walker.MagnitudeCountDown, 1);
        assert.equal(walker.LegCounter.valueOf(), new Short(3).valueOf());
        assert.equal(walker.currentStep, 7);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_DOWN));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "8th nextDirection");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(3).valueOf());
        assert.equal(walker.currentStep, 8);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_DOWN));

        result = walker.nextDirection();

        assert.equal(walker.StepCoordinates, start, "9th nextDirection");
        assert.equal(walker.MagnitudeCountDown, 0);
        assert.equal(walker.LegCounter.valueOf(), new Short(3).valueOf());
        assert.equal(walker.currentStep, 8);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_DESTINATION));

    });
    QUnit.test("peekCoordinate", function(assert) {
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let goal = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let directions = [
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_DOWN,
            Direction.DIRECTION_DOWN
        ];
        let path = new VectorPath(1, directions, start, goal);

        let walker = new VectorPathWalker(path);

        let result = walker.peekCoordinate();

        assert.equal(walker.StepCoordinates, start, "1st peekCoordinate");
        assert.equal(walker.MagnitudeCountDown, 2);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 0);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(0, -1, 0), new BlockCoordinate(0, 992))));

        result = walker.peekCoordinate();

        assert.equal(walker.StepCoordinates, start, "1st peekCoordinate");
        assert.equal(walker.MagnitudeCountDown, 2);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 0);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(new MapCoordinate(new ChunkCoordinate(0, -1, 0), new BlockCoordinate(0, 960))));
    });
    QUnit.test("peekDirection", function(assert) {
        let start = new MapCoordinate(new ChunkCoordinate(0, 0, 0));
        let goal = new MapCoordinate(new ChunkCoordinate(1, 1, 1));
        let directions = [
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_SOUTH,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_UP,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_WEST,
            Direction.DIRECTION_DOWN,
            Direction.DIRECTION_DOWN
        ];
        let path = new VectorPath(1, directions, start, goal);
        let walker = new VectorPathWalker(path);

        let result = walker.peekDirection();

        assert.equal(walker.StepCoordinates, start, "1st peekDirection");
        assert.equal(walker.MagnitudeCountDown, 2);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 0);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_SOUTH));

        result = walker.peekDirection();

        assert.equal(walker.StepCoordinates, start, "2nd peekDirection");
        assert.equal(walker.MagnitudeCountDown, 2);
        assert.equal(walker.LegCounter.valueOf(), new Short(0).valueOf());
        assert.equal(walker.currentStep, 0);
        assert.equal(walker.TargetPath, path);
        assert.ok(result.equals(Direction.DIRECTION_SOUTH));
    });
});