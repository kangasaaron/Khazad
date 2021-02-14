import { Serializable, Types } from "../../../other.js";
import { TextureSheetData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/TextureSheetData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, TextureSheetData));
        assert.ok(Object.getPrototypeOf(TextureSheetData) === DataBase);
        assert.equal(TextureSheetData.serialVersionUID, 1);
    });

    QUnit.test.todo("constructor", function(assert) {

    });
    QUnit.test.todo("postProcessing", function(assert) {

    });
    QUnit.test.todo("loadData", function(assert) {

    });
});