import { Serializable, Types } from "../../../other.js";
import { MusicData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/MusicData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, MusicData));
        assert.ok(Object.getPrototypeOf(MusicData) === DataBase);
        assert.equal(MusicData.serialVersionUID, 1);
    });


    QUnit.test("postProcessing", function(assert) {
        let a = new MusicData();
        assert.equal(a.postProcessing(), true);
    });
    QUnit.test("constructor", function(assert) {
        let a = new MusicData();
        assert.equal(a.FilePath, "");
    });
    QUnit.test("loadData", function(assert) {
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <Musics xmlns="https://github.com/ImpalerWrG/Khazad">
            <Music>
                <Name Label="MUSIC_THE_FALL_OF_ARCANA"/>
                <File Path="Sounds/Music/The Fall of Arcana.ogg"/>
            </Music>
        </Musics>`;
        const sandbox = sinon.createSandbox();
        let domParser = new DOMParser();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(MusicData, new DataManager());
        sandbox.stub(dataLibrary, "indexEntry");

        let a = new MusicData();
        a.loadData(attributeEntry, dataLibrary);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "MUSIC_THE_FALL_OF_ARCANA");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.FilePath, "Sounds/Music/The Fall of Arcana.ogg", "FilePath");

        sandbox.restore();
    });
});