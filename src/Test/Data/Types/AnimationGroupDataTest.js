import { Serializable, Types } from "../../../other.js";
import { AnimationGroupData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/AnimationGroupData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, AnimationGroupData));
        assert.ok(Object.getPrototypeOf(AnimationGroupData) === DataBase);
        assert.equal(AnimationGroupData.serialVersionUID, 1);
    });

    QUnit.test("stub functions", function(assert) {
        let a = new AnimationGroupData();
        assert.ok(a.loadData());
        assert.ok(a.postProcessing());
    });
});