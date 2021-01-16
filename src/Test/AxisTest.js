import { Axis } from "../../../Map/Coordinates/Axis.js";

QUnit.module("Map/Coordinates/Axis Enum test", function() {
    QUnit.test("Axis enum is correct", function(assert) {
        assert.equal(Axis.AXIS_Z, 0);
        assert.equal(Axis.AXIS_Z.description, 'Axis.AXIS_Z');
        assert.equal(Axis.AXIS_Y, 1);
        assert.equal(Axis.AXIS_Y.description, 'Axis.AXIS_Y');
        assert.equal(Axis.AXIS_X, 2);
        assert.equal(Axis.AXIS_X.description, 'Axis.AXIS_X');
    });
});