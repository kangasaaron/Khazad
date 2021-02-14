import {
    DataLibrary,
    DataManager,
    XMLManager,
    ColorData,
    TextureData,
    TextureGridData,
    TextureSheetData,
    AnimationTypeData,
    AnimationGroupData,
    ModelData,
    FontData,
    MaterialData,
    MaterialClassData,
    SurfaceTypeData,
    TreeData,
    FurnitureData,
    CreatureSizeData,
    BasicAttributeData,
    MusicData,
    CreatureData,
    GivenNameGroupData
} from "../../Data.js";
import "../sinon-9.2.4.js";

QUnit.module("Data/DataManager tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok("getDataManager" in DataManager)
        assert.equal(DataManager.INVALID_INDEX, -1);
        assert.ok("instance" in DataManager);
        assert.ok(DataManager.GlobalLabelMap instanceof Map);
        assert.ok(DataManager.GlobalDataTypeMap instanceof Map);

    });

    QUnit.test("constructor", function(assert) {
        let dataManager = DataManager.getDataManager();
        assert.equal(DataManager.instance, dataManager);

        assert.ok(dataManager.XML instanceof XMLManager);

        assert.ok(dataManager.Colors instanceof DataLibrary);
        assert.equal(dataManager.Colors._Data, dataManager);
        assert.equal(dataManager.Colors._DataClass, ColorData);
        assert.ok(dataManager.Textures instanceof DataLibrary);
        assert.equal(dataManager.Textures._Data, dataManager);
        assert.equal(dataManager.Textures._DataClass, TextureData);
        assert.ok(dataManager.TextureGrids instanceof DataLibrary);
        assert.equal(dataManager.TextureGrids._Data, dataManager);
        assert.equal(dataManager.TextureGrids._DataClass, TextureGridData);
        assert.ok(dataManager.TextureSheets instanceof DataLibrary);
        assert.equal(dataManager.TextureSheets._Data, dataManager);
        assert.equal(dataManager.TextureSheets._DataClass, TextureSheetData);
        assert.ok(dataManager.AnimationTypes instanceof DataLibrary);
        assert.equal(dataManager.AnimationTypes._Data, dataManager);
        assert.equal(dataManager.AnimationTypes._DataClass, AnimationTypeData);
        assert.ok(dataManager.AnimationGroups instanceof DataLibrary);
        assert.equal(dataManager.AnimationGroups._Data, dataManager);
        assert.equal(dataManager.AnimationGroups._DataClass, AnimationGroupData);
        assert.ok(dataManager.Models instanceof DataLibrary);
        assert.equal(dataManager.Models._Data, dataManager);
        assert.equal(dataManager.Models._DataClass, ModelData);
        assert.ok(dataManager.Fonts instanceof DataLibrary);
        assert.equal(dataManager.Fonts._Data, dataManager);
        assert.equal(dataManager.Fonts._DataClass, FontData);
        assert.ok(dataManager.Materials instanceof DataLibrary);
        assert.equal(dataManager.Materials._Data, dataManager);
        assert.equal(dataManager.Materials._DataClass, MaterialData);
        assert.ok(dataManager.MaterialClasses instanceof DataLibrary);
        assert.equal(dataManager.MaterialClasses._Data, dataManager);
        assert.equal(dataManager.MaterialClasses._DataClass, MaterialClassData);
        assert.ok(dataManager.SurfaceTypes instanceof DataLibrary);
        assert.equal(dataManager.SurfaceTypes._Data, dataManager);
        assert.equal(dataManager.SurfaceTypes._DataClass, SurfaceTypeData);
        assert.ok(dataManager.Trees instanceof DataLibrary);
        assert.equal(dataManager.Trees._Data, dataManager);
        assert.equal(dataManager.Trees._DataClass, TreeData);
        assert.ok(dataManager.Furnitures instanceof DataLibrary);
        assert.equal(dataManager.Furnitures._Data, dataManager);
        assert.equal(dataManager.Furnitures._DataClass, FurnitureData);
        assert.ok(dataManager.CreatureSizes instanceof DataLibrary);
        assert.equal(dataManager.CreatureSizes._Data, dataManager);
        assert.equal(dataManager.CreatureSizes._DataClass, CreatureSizeData);
        assert.ok(dataManager.BasicAttributes instanceof DataLibrary);
        assert.equal(dataManager.BasicAttributes._Data, dataManager);
        assert.equal(dataManager.BasicAttributes._DataClass, BasicAttributeData);
        assert.ok(dataManager.Musics instanceof DataLibrary);
        assert.equal(dataManager.Musics._Data, dataManager);
        assert.equal(dataManager.Musics._DataClass, MusicData);
        assert.ok(dataManager.Creatures instanceof DataLibrary);
        assert.equal(dataManager.Creatures._Data, dataManager);
        assert.equal(dataManager.Creatures._DataClass, CreatureData);
        assert.ok(dataManager.GivenNameGroups instanceof DataLibrary);
        assert.equal(dataManager.GivenNameGroups._Data, dataManager);
        assert.equal(dataManager.GivenNameGroups._DataClass, GivenNameGroupData);
    });

    QUnit.test("addDataToDataTypeMap", function(assert) {

        DataManager.instance = null;

        let dataManager = DataManager.getDataManager();

        dataManager.addDataToDataTypeMap();

        assert.equal(DataManager.GlobalDataTypeMap.get("Color"), dataManager.Colors);
        assert.equal(DataManager.GlobalDataTypeMap.get("Texture"), dataManager.Textures);
        assert.equal(DataManager.GlobalDataTypeMap.get("TextureGrid"), dataManager.TextureGrids);
        assert.equal(DataManager.GlobalDataTypeMap.get("TextureSheet"), dataManager.TextureSheets);
        assert.equal(DataManager.GlobalDataTypeMap.get("AnimationType"), dataManager.AnimationTypes);
        assert.equal(DataManager.GlobalDataTypeMap.get("AnimationGroup"), dataManager.AnimationGroups);
        assert.equal(DataManager.GlobalDataTypeMap.get("Model"), dataManager.Models);
        assert.equal(DataManager.GlobalDataTypeMap.get("Font"), dataManager.Fonts);
        assert.equal(DataManager.GlobalDataTypeMap.get("Material"), dataManager.Materials);
        assert.equal(DataManager.GlobalDataTypeMap.get("MaterialClass"), dataManager.MaterialClasses);
        assert.equal(DataManager.GlobalDataTypeMap.get("SurfaceType"), dataManager.SurfaceTypes);
        assert.equal(DataManager.GlobalDataTypeMap.get("Tree"), dataManager.Trees);
        assert.equal(DataManager.GlobalDataTypeMap.get("Furniture"), dataManager.Furnitures);
        assert.equal(DataManager.GlobalDataTypeMap.get("CreatureSize"), dataManager.CreatureSizes);
        assert.equal(DataManager.GlobalDataTypeMap.get("BasicAttribute"), dataManager.BasicAttributes);
        assert.equal(DataManager.GlobalDataTypeMap.get("Music"), dataManager.Musics);
        assert.equal(DataManager.GlobalDataTypeMap.get("Creature"), dataManager.Creatures);
        assert.equal(DataManager.GlobalDataTypeMap.get("GivenNameGroup"), dataManager.GivenNameGroups);

        assert.equal(DataManager.GlobalDataTypeMap.size, 18);
    });

    QUnit.test("initialize", function(assert) {
        let dataManager = DataManager.getDataManager();

        const sandbox = sinon.createSandbox();
        sandbox.stub(dataManager, "addDataToDataTypeMap").callsFake(() => true);
        sandbox.stub(dataManager, "loadMasterFile").callsFake(() => true);

        dataManager.initialize();

        assert.equal(dataManager.addDataToDataTypeMap.callCount, 1);
        assert.equal(dataManager.loadMasterFile.callCount, 1);
        sandbox.restore();
    });
    QUnit.test("loadMasterFile", function(assert) {
        const sandbox = sinon.createSandbox();

        DataManager.instance = null;
        let dataManager = DataManager.getDataManager();

        let fakePromise = new Promise(function(resolve) { resolve() });

        sandbox.stub(dataManager.XML, "loadFile").callsFake(function() {
            return fakePromise;
        });
        sandbox.spy(fakePromise, "then");
        sandbox.stub(dataManager, "loadDataFiles").callsFake(() => true);

        dataManager.loadMasterFile();

        // calls XML.loadFile for the master list file
        assert.equal(dataManager.XML.loadFile.callCount, 1);
        // returns a promise
        assert.equal(fakePromise.then.callCount, 1);
        // when promise is fullfilled, it calls loadDataFiles
        let fakePromiseCall = fakePromise.then.getCall(0);
        assert.equal(fakePromiseCall.args[0].name, "bound loadDataFiles")

        sandbox.restore();
    });
    QUnit.test("loadDataFiles", function(assert) {
        const sandbox = sinon.createSandbox();

        DataManager.instance = null;
        let dataManager = DataManager.getDataManager();

        let exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<Files xmlns="https://github.com/ImpalerWrG/Khazad">
    <File Path="XML/Colors.xml"/>
    <File Path="XML/Trees.xml"/>
</Files>`;
        let domParser = new DOMParser();
        let xmlFile = domParser.parseFromString(exampleXML, "text/xml");

        let promises = [
                new Promise(function(resolve) { resolve() }),
                new Promise(function(resolve) { resolve() }),
                new Promise(function(resolve) { resolve() })
            ],
            index = -1;
        sandbox.stub(dataManager, "loadDataFile").callsFake(function() {
            index++;
            return promises[index];
        });
        sandbox.stub(Promise, "all").callsFake(function() { return promises[2]; });
        sandbox.spy(promises[2], "then");

        //loadDataFiles passed raw xmlDocument
        let a = dataManager.loadDataFiles(xmlFile);
        // should call loadDataFile once for each <File></File> entry in the xml document
        assert.equal(dataManager.loadDataFile.callCount, 2);
        assert.equal(dataManager.loadDataFile.getCall(0).args[0], "XML/Colors.xml");
        assert.equal(dataManager.loadDataFile.getCall(1).args[0], "XML/Trees.xml");
        assert.equal(Promise.all.callCount, 1);

        assert.equal(Promise.all.getCall(0).args[0][0], promises[0]);
        assert.equal(Promise.all.getCall(0).args[0][1], promises[1]);

        assert.equal(promises[2].then.callCount, 1);
        assert.equal(promises[2].then.getCall(0).args[0].name, "bound postProcessing");

        // which returns a promise. Put all those promises into a promise.all
        // when they all are fulfilled,  then call postProcessing

        sandbox.restore();
    });
    QUnit.test("loadDataFile", function(assert) {
        const sandbox = sinon.createSandbox();


        DataManager.instance = null;
        let dataManager = DataManager.getDataManager();

        let fakeFilePath = "this is my file path";
        let promise = new Promise(function(resolve) { resolve() });
        sandbox.spy(promise, "then");
        sandbox.stub(dataManager.XML, "loadFile").callsFake(() => promise);

        dataManager.loadDataFile(fakeFilePath);

        // calls XML.loadFile
        assert.equal(dataManager.XML.loadFile.callCount, 1);
        assert.equal(dataManager.XML.loadFile.getCall(0).args[0], fakeFilePath);
        // which returns a promise
        assert.equal(promise.then.callCount, 1);
        assert.equal(promise.then.getCall(0).args[0].name, "bound parseDataFile");
        // when promise is fullfiled, it calls parseDataFile

        sandbox.restore();
    });
    QUnit.test.todo("parseDataFile", function(assert) {
        // calls getDataTypeGroup, passing in the type
        // the return value from that then gets loadElement called on it
        // this happens for each child element -- they can be of different types, and they will call different data libraries
    });
    QUnit.test.todo("postProcessing", function(assert) {
        // calls postProcessDataClass on every DataLibrary in the GlobalDataTypeMap files
    });
    QUnit.test.todo("getLabelIndex", function(assert) {
        // function takes a string input
        // if input is null, or regexmatches "NONE" or is empty string
        // then return INVALID_INDEX
        // otherwise try to find Label as a key in the GlobalLabelMap
        // and if it's not empty, return that, as a Short
        // otherwise print an error to the console about it
        // and return INVALID_INDEX
    });
    QUnit.test.todo("getDataTypeGroup", function(assert) {

    });
    QUnit.test.todo("addLabel", function(assert) {
        //playground
        let a = {
            insideVar: 10,
            changeInsideVar(newValue) {
                this.insideVar = newValue;
            }
        };
        console.log(Object.getOwnPropertyDescriptor(a, "insideVar"));
        console.log(Object.isExtensible(a));
        Object.seal(a);
        console.log(Object.getOwnPropertyDescriptor(a, "insideVar"));
        console.log(Object.isExtensible(a));
        a.newVar = "hey"
        Object.freeze(a);
        console.log(Object.getOwnPropertyDescriptor(a, "insideVar"));
        console.log(Object.isExtensible(a));


    });

    QUnit.test.todo("getColorData", function(assert) {

    });
    QUnit.test.todo("getNumColors", function(assert) {

    });
    QUnit.test.todo("getColorDataLibrary", function(assert) {

    });
    QUnit.test.todo("getTextureData", function(assert) {

    });
    QUnit.test.todo("getNumTextures", function(assert) {

    });
    QUnit.test.todo("getTextureDataLibrary", function(assert) {

    });
    QUnit.test.todo("getTextureGridData", function(assert) {

    });
    QUnit.test.todo("getNumTextureGrids", function(assert) {

    });
    QUnit.test.todo("getTextureGridDataLibrary", function(assert) {

    });
    QUnit.test.todo("getTextureSheetData", function(assert) {

    });
    QUnit.test.todo("getNumTextureSheets", function(assert) {

    });
    QUnit.test.todo("getTextureSheetDataLibrary", function(assert) {

    });
    QUnit.test.todo("getAnimationTypeData", function(assert) {

    });
    QUnit.test.todo("getNumAnimationTypes", function(assert) {

    });
    QUnit.test.todo("getAnimationTypesDataLibrary", function(assert) {

    });
    QUnit.test.todo("getAnimationGroupData", function(assert) {

    });
    QUnit.test.todo("getNumAnimationGroups", function(assert) {

    });
    QUnit.test.todo("getAnimationGroupsDataLibrary", function(assert) {

    });
    QUnit.test.todo("getModelData", function(assert) {

    });
    QUnit.test.todo("getNumModels", function(assert) {

    });
    QUnit.test.todo("getModelDataLibrary", function(assert) {

    });
    QUnit.test.todo("getFontData", function(assert) {

    });
    QUnit.test.todo("getNumFonts", function(assert) {

    });
    QUnit.test.todo("getFontDataLibrary", function(assert) {

    });
    QUnit.test.todo("getMaterialData", function(assert) {

    });
    QUnit.test.todo("getNumMaterials", function(assert) {

    });
    QUnit.test.todo("getMaterialDataLibrary", function(assert) {

    });
    QUnit.test.todo("getMaterialClassData", function(assert) {

    });
    QUnit.test.todo("getNumMaterialClasses", function(assert) {

    });
    QUnit.test.todo("getMaterialClassDataLibrary", function(assert) {

    });
    QUnit.test.todo("getSurfaceTypeData", function(assert) {

    });
    QUnit.test.todo("getNumSurfaceTypes", function(assert) {

    });
    QUnit.test.todo("getSurfaceTypeDataLibrary", function(assert) {

    });
    QUnit.test.todo("getTreeData", function(assert) {

    });
    QUnit.test.todo("getNumTrees", function(assert) {

    });
    QUnit.test.todo("getTreeDataLibrary", function(assert) {

    });
    QUnit.test.todo("getFurnitureData", function(assert) {

    });
    QUnit.test.todo("getNumFurnitures", function(assert) {

    });
    QUnit.test.todo("getFurnitureDataLibrary", function(assert) {

    });
    QUnit.test.todo("getCreatureSizeData", function(assert) {

    });
    QUnit.test.todo("getNumCreatureSizes", function(assert) {

    });
    QUnit.test.todo("getCreatureSizeDataLibrary", function(assert) {

    });
    QUnit.test.todo("getBaseAttributeData", function(assert) {

    });
    QUnit.test.todo("getNumBaseAttributes", function(assert) {

    });
    QUnit.test.todo("getBaseAttributeDataLibrary", function(assert) {

    });
    QUnit.test.todo("getMusicData", function(assert) {

    });
    QUnit.test.todo("getNumMusics", function(assert) {

    });
    QUnit.test.todo("getMusicDataLibrary", function(assert) {

    });
    QUnit.test.todo("getCreatureData", function(assert) {

    });
    QUnit.test.todo("getNumCreatures", function(assert) {

    });
    QUnit.test.todo("getCreatureDataLibrary", function(assert) {

    });
    QUnit.test.todo("getGivenNameGroupData", function(assert) {

    });
    QUnit.test.todo("getNumGivenNameGroups", function(assert) {

    });
    QUnit.test.todo("getGivenNameGroupDataLibrary", function(assert) {

    });

});