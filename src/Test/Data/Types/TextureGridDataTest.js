import { Serializable, Types } from "../../../other.js";
import { TextureGridData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/TextureGridData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, TextureGridData));
        assert.ok(Object.getPrototypeOf(TextureGridData) === DataBase);
        assert.equal(TextureGridData.serialVersionUID, 1);
    });

    QUnit.test.todo("constructor", function(assert) {

    });
    QUnit.test.todo("postProcessing", function(assert) {

    });
    QUnit.test.todo("loadData", function(assert) {

    });
    QUnit.test.todo("other stuff", function(assert) {

    });
});