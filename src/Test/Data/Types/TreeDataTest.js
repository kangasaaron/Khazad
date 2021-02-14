import { Serializable, Types } from "../../../other.js";
import { TreeData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/TreeData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, TreeData));
        assert.ok(Object.getPrototypeOf(TreeData) === DataBase);
        assert.equal(TreeData.serialVersionUID, 1);
    });
    QUnit.test("stub functions", function(assert) {
        let a = new TreeData();
        assert.ok(a.loadData());
        assert.ok(a.postProcessing());
    });
});