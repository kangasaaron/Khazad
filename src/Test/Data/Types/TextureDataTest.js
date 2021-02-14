import { Serializable, Types } from "../../../other.js";
import { TextureData, DataBase } from "../../../Data.js";

QUnit.module("Data/Types/TextureData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, TextureData));
        assert.ok(Object.getPrototypeOf(TextureData) === DataBase);
        assert.equal(TextureData.serialVersionUID, 1);
    });


    QUnit.test.todo("constructor", function(assert) {
        let a = new TextureData();
        assert.ok(a.FilePath, "");
    });
    QUnit.test.todo("postProcessing", function(assert) {

    });
    QUnit.test.todo("loadData", function(assert) {

    });
});