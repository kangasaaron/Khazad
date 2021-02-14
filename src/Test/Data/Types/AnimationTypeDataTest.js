import { Serializable, Types } from "../../../other.js";
import { AnimationTypeData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/AnimationTypeData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, AnimationTypeData));
        assert.ok(Object.getPrototypeOf(AnimationTypeData) === DataBase);
        assert.equal(AnimationTypeData.serialVersionUID, 1);
    });

    QUnit.test("stub functions", function(assert) {
        let a = new AnimationTypeData();
        assert.ok(a.loadData());
        assert.ok(a.postProcessing());
    });
});