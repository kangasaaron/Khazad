import { Serializable, Types } from "../../../other.js";
import { SurfaceTypeData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/SurfaceTypeData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, SurfaceTypeData));
        assert.ok(Object.getPrototypeOf(SurfaceTypeData) === DataBase);
        assert.equal(SurfaceTypeData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let a = new SurfaceTypeData();
        assert.equal(a.TextureLabel, "");
        assert.equal(a.TextureID, 0);
    });
    QUnit.test.todo("postProcessing", function(assert) {

    });
    QUnit.test("loadData", function(assert) {
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <SurfaceTypes xmlns="https://github.com/ImpalerWrG/Khazad">
            <SurfaceType>
                <Name Label="SURFACETYPE_SMOOTH_WALL"/>
                <TextureUsed label="TEXTURE_SMOOTH"/>
            </SurfaceType>
        </SurfaceTypes>`;
        const sandbox = sinon.createSandbox();
        let domParser = new DOMParser();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(SurfaceTypeData, new DataManager());
        sandbox.stub(dataLibrary, "indexEntry");

        let a = new SurfaceTypeData();
        a.loadData(attributeEntry, dataLibrary);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "SURFACETYPE_SMOOTH_WALL");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.TextureLabel, "TEXTURE_SMOOTH");

        sandbox.restore();
    });
});