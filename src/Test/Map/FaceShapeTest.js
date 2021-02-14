import { BlockShape, Direction, FaceShape } from "../../Map.js";
import { Serializable, Short, Types } from "../../other.js";

QUnit.module("Map/FaceShape tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, FaceShape));
        assert.equal(FaceShape.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let fs = new FaceShape();
        assert.equal(fs.SourceBlockData, BlockShape.EMPTY_CUBE_DATA);
        assert.equal(fs.AdjacentBlockData, BlockShape.EMPTY_CUBE_DATA);
        assert.equal(fs.FaceDirection, Direction.DIRECTION_DESTINATION);

        let shape1 = new BlockShape(new Short(3)),
            shape2 = new BlockShape(new Short(7));

        fs = new FaceShape(
            shape1,
            shape2,
            Direction.DIRECTION_NORTH
        );

        assert.equal(fs.SourceBlockData, 3);
        assert.equal(fs.AdjacentBlockData, 7);
        assert.equal(fs.FaceDirection, Direction.DIRECTION_NORTH);
    });

    QUnit.test("equal/notequal", function(assert) {
        let a = new FaceShape(),
            b = new FaceShape();
        assert.ok(a.equals(a));
        assert.ok(a.equals(b));

        let c = new FaceShape(new BlockShape(new Short(10)));
        assert.ok(a.notequal(c));
    });

    QUnit.test("getters", function(assert) {
        let f = new FaceShape();
        let d = f.getFaceDirection();
        assert.equal(d, Direction.DIRECTION_DESTINATION);
        assert.ok((f.getSourceBlockShape()).equals(new BlockShape(new Short(0))));
        assert.ok((f.getAdjacentBlockShape()).equals(new BlockShape(new Short(0))));
    });
});