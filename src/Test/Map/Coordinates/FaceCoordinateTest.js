import { BlockCoordinate, Direction, FaceCoordinate } from "../../../Map.js";
import { Byte } from "../../../other.js";

QUnit.module("Map/Coordinates/FaceCoordinate test", function() {
    QUnit.test("constructor test", function(assert) {
        let f = new FaceCoordinate();
        assert.ok(f instanceof FaceCoordinate);
        assert.ok(f instanceof BlockCoordinate);
        assert.ok(f.FaceDirection == Direction.DIRECTION_DESTINATION);
        assert.equal(f.Data, 0);
        assert.ok(f.DetailLevel.equals(new Byte(0)));

        f.set(10, Direction.DIRECTION_DOWN);
        let b = new FaceCoordinate(f);
        assert.ok(b instanceof FaceCoordinate);
        assert.ok(b.FaceDirection == (f.FaceDirection));
        assert.equal(b.Data, f.Data);
        assert.ok(b.DetailLevel.equals(f.DetailLevel));

        let c = new FaceCoordinate(new BlockCoordinate(0, 10), Direction.DIRECTION_NORTH);
        assert.ok(c instanceof FaceCoordinate);
        assert.ok(c.FaceDirection == (Direction.DIRECTION_NORTH));
        assert.equal(c.Data, 10);
        assert.ok(c.DetailLevel.equals(new Byte(0)));
    });

    QUnit.test('set tests', function(assert) {
        let b = new FaceCoordinate(new BlockCoordinate(10, 10), Direction.DIRECTION_DOWN),
            c = new FaceCoordinate(new BlockCoordinate(0, 5), Direction.DIRECTION_EAST);

        b.set(c);
        assert.equal(b.FaceDirection, c.FaceDirection);
        assert.equal(b.getX(), c.getX());
        assert.equal(b.getY(), c.getY());
        assert.equal(b.getZ(), c.getZ());

        b.set(1, 2, 3, Direction.DIRECTION_DOWN_SOUTHEAST);
        assert.equal(b.FaceDirection, Direction.DIRECTION_DOWN_SOUTHEAST);
        assert.equal(b.getX(), 1);
        assert.equal(b.getY(), 2);
        assert.equal(b.getZ(), 3);

        b.set(20, Direction.DIRECTION_NORTHWEST);
        assert.equal(b.FaceDirection, Direction.DIRECTION_NORTHWEST);
        assert.equal(b.getBlockIndex(), 20);
    });

    QUnit.test('getCoordinates', function(assert) {
        let b = new FaceCoordinate();
        let a = Math.floor(Math.random() * 127 * 127);
        b.Data = a;

        assert.equal(b.getCoordinates(), a);
    });

    QUnit.test('getFaceDirection', function(assert) {
        let b = new FaceCoordinate(),
            a = Symbol('Face Direction');
        b.FaceDirection = a;

        assert.equal(b.getFaceDirection(), a);
    });

    QUnit.test('equals', function(assert) {
        let a = new FaceCoordinate(new BlockCoordinate(0, 340), Direction.DIRECTION_UP_NORTHWEST);
        let b = new FaceCoordinate(new BlockCoordinate(0, 340), Direction.DIRECTION_UP_NORTHWEST);
        let c = new FaceCoordinate(new BlockCoordinate(0, 340), Direction.DIRECTION_UP_NORTHEAST);

        assert.ok(a !== b);
        assert.ok(a === a);
        assert.ok(a.equals(b));
        assert.ok(a.equals(a));
        assert.ok(!(a.equals(c)));
        assert.ok(!(a.equals(undefined)));
        assert.ok(!(a.equals(null)));
        assert.ok(!(a.equals(Object)));
    });

    QUnit.test('hashCode', function(assert) {
        let a = new FaceCoordinate(new BlockCoordinate(0, 100), Direction.DIRECTION_SOUTHEAST);
        assert.equal(a.hashCode(), 102480)

    });
});