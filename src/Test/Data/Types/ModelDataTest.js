import { Serializable, Types } from "../../../other.js";
import { ModelData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/ModelData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, ModelData));
        assert.ok(Object.getPrototypeOf(ModelData) === DataBase);
        assert.equal(ModelData.serialVersionUID, 1);
    });

    QUnit.test("postProcessing", function(assert) {
        let a = new ModelData();
        assert.equal(a.postProcessing(), true);
    });
    QUnit.test("constructor", function(assert) {
        let a = new ModelData();
        assert.equal(a.FilePath, "");
        assert.equal(a.Scale, 1);
    });
    QUnit.test("loadData", function(assert) {
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <Models xmlns="https://github.com/ImpalerWrG/Khazad">
            <Model>
                <Name Label="MODEL_BOULDER"/>
                <File Path="Models/stones/stone04.obj"/>
                <Scale value="1.1"/>
            </Model>
        </Models>`;
        const sandbox = sinon.createSandbox();
        let domParser = new DOMParser();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(ModelData, new DataManager());
        sandbox.stub(dataLibrary, "indexEntry");

        let a = new ModelData();
        a.loadData(attributeEntry, dataLibrary);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "MODEL_BOULDER");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.FilePath, "Models/stones/stone04.obj", "FilePath");
        assert.equal(a.Scale, 1.1, "Scale");

        sandbox.restore();
    });
});