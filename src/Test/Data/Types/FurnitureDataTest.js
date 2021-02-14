import { Serializable, Types } from "../../../other.js";
import { FurnitureData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/FurnitureData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, FurnitureData));
        assert.ok(Object.getPrototypeOf(FurnitureData) === DataBase);
        assert.equal(FurnitureData.serialVersionUID, 1);
    });

    QUnit.test("stub functions", function(assert) {
        let a = new FurnitureData();
        assert.ok(a.loadData());
        assert.ok(a.postProcessing());
    });
});