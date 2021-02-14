import { Serializable, Types } from "../../../other.js";
import { ColorData, DataBase, DataLibrary, DataManager } from "../../../Data.js";
import "../../sinon-9.2.4.js";

QUnit.module("Data/Types/ColorData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, ColorData));
        assert.ok(Object.getPrototypeOf(ColorData) === DataBase);
        assert.equal(ColorData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let c = new ColorData();
        assert.equal(c.Red, 0);
        assert.equal(c.Green, 0);
        assert.equal(c.Blue, 0);
    });

    QUnit.test("postProcessing", function(assert) {
        let c = new ColorData();
        assert.equal(c.postProcessing(), true);
    });

    QUnit.test("loadData", function(assert) {
        let a = new ColorData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Colors xmlns="https://github.com/ImpalerWrG/Khazad">	
    <Color>
        <Name Label="COLOR_OLIVE"/>
        <Channels Red="95" Green="124" Blue="16"/>
    </Color>
</Colors>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(ColorData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, true);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "COLOR_OLIVE");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.Red, 95);
        assert.equal(a.Green, 124);
        assert.equal(a.Blue, 16);
    });
});