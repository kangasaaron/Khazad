import { Serializable, Types } from "../../../other.js";
import { FontData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/FontData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, FontData));
        assert.ok(Object.getPrototypeOf(FontData) === DataBase);
        assert.equal(FontData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let f = new FontData();
        assert.equal(f.FilePath, "");
        assert.equal(f.Size, 0);
    });
    QUnit.test("postProcessing", function(assert) {
        let f = new FontData();
        assert.equal(f.postProcessing(), true);
    });
    QUnit.test("loadData", function(assert) {
        let a = new FontData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Fonts xmlns="https://github.com/ImpalerWrG/Khazad">	
    <Font>
        <Name Label="FONT_MINIM"/>
        <File Path="Assets/Fonts/minim.ttf"/>
        <Size Int="25"/>
    </Font>
</Fonts>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(FontData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, true);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "FONT_MINIM");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.FilePath, "Assets/Fonts/minim.ttf")
        assert.equal(a.Size, 25)

    });
});