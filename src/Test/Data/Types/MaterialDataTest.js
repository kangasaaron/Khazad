import { Serializable, Types } from "../../../other.js";
import { MaterialData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/MaterialData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, MaterialData));
        assert.ok(Object.getPrototypeOf(MaterialData) === DataBase);
        assert.equal(MaterialData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let a = new MaterialData();
        assert.equal(a.ColorMode, "");
        assert.equal(a.PrimaryColorlabel, "");
        assert.equal(a.SecondaryColorlabel, "");
        assert.equal(a.BorderColorlabel, "");
        assert.equal(a.MaterialClasslabel, "");

        assert.equal(a.PrimaryColorID, 0);
        assert.equal(a.SecondaryColorID, 0);
        assert.equal(a.BorderColorID, 0);
        assert.equal(a.MaterialClassID, 0);
        assert.equal(a.PlantGrowthFactor, 0);

        assert.ok(Types.is("emptyArray", a.SurfaceTypeLabels));
        assert.ok(Types.is("emptyArray", a.SurfaceTextureLabels));
        assert.ok(Types.is("emptyArray", a.SurfaceTypeIDs));
        assert.ok(Types.is("emptyArray", a.SurfaceTextureIDs));
    });
    QUnit.test.todo("postProcessing", function(assert) {

    });
    QUnit.test("loadData", function(assert) {
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Materials xmlns="https://github.com/ImpalerWrG/Khazad">
    <Material>
    <Name Label="MATERIAL_BRIGHT_GRASS"/>
    <MaterialClass label="MATERIALCLASS_VEGATATION"/>
    <PrimaryColor label="GRASS_BRIGHT"/>
    <SecondaryColor label="GRASS_DARK"/>
    <BorderColor label="COLOR_DARK_GREEN"/>
    <ColorMode mode="overlay"/>
    <SurfaceTextures>
        <SurfaceTexture SurfaceTypelabel="SURFACETYPE_ROUGH_WALL" Texturelabel="TEXTURE_GRASS_5"/>
        <SurfaceTexture SurfaceTypelabel="SURFACETYPE_ROUGH_FLOOR_1" Texturelabel="TEXTURE_GRASS_5"/>
        <SurfaceTexture SurfaceTypelabel="SURFACETYPE_ROUGH_FLOOR_2" Texturelabel="TEXTURE_GRASS_2"/>
        <SurfaceTexture SurfaceTypelabel="SURFACETYPE_ROUGH_FLOOR_3" Texturelabel="TEXTURE_GRASS_3"/>
        <SurfaceTexture SurfaceTypelabel="SURFACETYPE_ROUGH_FLOOR_4" Texturelabel="TEXTURE_GRASS_4"/>
    </SurfaceTextures>
    </Material>
</Materials>`;
        const sandbox = sinon.createSandbox();
        let domParser = new DOMParser();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(MaterialData, new DataManager());
        sandbox.stub(dataLibrary, "indexEntry");

        let a = new MaterialData();
        a.loadData(attributeEntry, dataLibrary);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "MATERIAL_BRIGHT_GRASS");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.MaterialClasslabel, "MATERIALCLASS_VEGATATION", "MaterialClasslabel");
        assert.equal(a.PrimaryColorlabel, "GRASS_BRIGHT", "PrimaryColorlabel");
        assert.equal(a.SecondaryColorlabel, "GRASS_DARK", "SecondaryColorlabel");
        assert.equal(a.BorderColorlabel, "COLOR_DARK_GREEN", "BorderColorlabel");
        assert.equal(a.ColorMode, "overlay", "ColorMode");
        assert.equal(a.SurfaceTextureIDs.length, 5);
        assert.equal(a.SurfaceTypeIDs.length, 5);
        assert.equal(a.SurfaceTextureLabels.length, 5);
        assert.equal(a.SurfaceTextureLabels[0], "TEXTURE_GRASS_5");
        assert.equal(a.SurfaceTextureLabels[1], "TEXTURE_GRASS_5");
        assert.equal(a.SurfaceTextureLabels[2], "TEXTURE_GRASS_2");
        assert.equal(a.SurfaceTextureLabels[3], "TEXTURE_GRASS_3");
        assert.equal(a.SurfaceTextureLabels[4], "TEXTURE_GRASS_4");
        assert.equal(a.SurfaceTypeLabels.length, 5);
        assert.equal(a.SurfaceTypeLabels[0], "SURFACETYPE_ROUGH_WALL");
        assert.equal(a.SurfaceTypeLabels[1], "SURFACETYPE_ROUGH_FLOOR_1");
        assert.equal(a.SurfaceTypeLabels[2], "SURFACETYPE_ROUGH_FLOOR_2");
        assert.equal(a.SurfaceTypeLabels[3], "SURFACETYPE_ROUGH_FLOOR_3");
        assert.equal(a.SurfaceTypeLabels[4], "SURFACETYPE_ROUGH_FLOOR_4");

        sandbox.restore();
    });
    QUnit.test.todo("getTexture", function(assert) {

    });
});