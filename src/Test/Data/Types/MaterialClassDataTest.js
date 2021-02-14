import { Serializable, Types, ShortArray } from "../../../other.js";
import { MaterialClassData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/MaterialClassData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, MaterialClassData));
        assert.ok(Object.getPrototypeOf(MaterialClassData) === DataBase);
        assert.equal(MaterialClassData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let a = new MaterialClassData();
        assert.equal(a.DefaultMaterialLabel, "");
        assert.equal(a.DefaultMaterialID, 0);
        assert.ok(Array.isArray(a.SurfaceTypeLabels));
        assert.equal(a.SurfaceTypeLabels.length, 0);
        assert.ok(Array.isArray(a.SurfaceTextureLabels));
        assert.equal(a.SurfaceTextureLabels.length, 0);
        assert.ok(a.SurfaceTypeIDs instanceof ShortArray);
        assert.equal(a.SurfaceTypeIDs.length, 0);
        assert.ok(a.SurfaceTextureIDs instanceof ShortArray);
        assert.equal(a.SurfaceTextureIDs.length, 0);
    });

    QUnit.test.todo("postProcessing", function(assert) {

    });

    QUnit.test.todo("getTexture", function(assert) {

    });

    QUnit.test("loadData", function(assert) {
        let a = new MaterialClassData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<MaterialClasses xmlns="https://github.com/ImpalerWrG/Khazad">
    <MaterialClass>
        <Name Label="MATERIALCLASS_LEATHER"/>
        <DefaultMaterial label="MATERIAL_UNINITIALIZED"/>
        <DefaultSurfaceTextures>
            <SurfaceTexture SurfaceTypelabel="SURFACETYPE_CONSTRUCTED_WALL" Texturelabel="TEXTURE_MATT"/>
            <SurfaceTexture SurfaceTypelabel="SURFACETYPE_CONSTRUCTED_FLOOR" Texturelabel="TEXTURE_MATT"/>
        </DefaultSurfaceTextures>
    </MaterialClass>
</MaterialClasses>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(MaterialClassData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, true);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "MATERIALCLASS_LEATHER");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.DefaultMaterialLabel, "MATERIAL_UNINITIALIZED");
        assert.equal(a.SurfaceTypeLabels.length, 2);
        assert.equal(a.SurfaceTypeLabels[0], "SURFACETYPE_CONSTRUCTED_WALL");
        assert.equal(a.SurfaceTypeLabels[1], "SURFACETYPE_CONSTRUCTED_FLOOR");
        assert.equal(a.SurfaceTypeIDs.length, 2);
        assert.equal(a.SurfaceTextureLabels[0], "TEXTURE_MATT");
        assert.equal(a.SurfaceTextureLabels[1], "TEXTURE_MATT");
        assert.equal(a.SurfaceTextureIDs.length, 2);
    });
});