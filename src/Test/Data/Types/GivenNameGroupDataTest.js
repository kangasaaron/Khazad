import { Serializable, Types } from "../../../other.js";
import { GivenNameGroupData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/GivenNameGroupData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, GivenNameGroupData));
        assert.ok(Object.getPrototypeOf(GivenNameGroupData) === DataBase);
        assert.equal(GivenNameGroupData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let a = new GivenNameGroupData();
        assert.equal(a.group, "");
        assert.equal(a.gender, "");
        assert.ok(Array.isArray(a.prefixes));
        assert.equal(a.prefixes.length, 0);
        assert.ok(Array.isArray(a.suffixes));
        assert.equal(a.suffixes.length, 0);
    });

    QUnit.test("postProcessing", function(assert) {
        let a = new GivenNameGroupData();
        assert.equal(a.postProcessing(), true);
    });

    QUnit.test("getters", function(assert) {
        let a = new GivenNameGroupData();
        let mygroup = Symbol("group");
        a.group = mygroup;
        let mygender = Symbol("gender");
        a.gender = mygender;
        let myprefixes = Symbol("prefixes");
        a.prefixes = myprefixes;
        let mysuffixes = Symbol("suffixes");
        a.suffixes = mysuffixes;

        assert.equal(a.getGroup(), mygroup);
        assert.equal(a.getGender(), mygender);
        assert.equal(a.getPrefixes(), myprefixes);
        assert.equal(a.getSuffixes(), mysuffixes);
    });

    QUnit.test("loadData", function(assert) {
        let a = new GivenNameGroupData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Names xmlns="https://github.com/ImpalerWrG/Khazad">	
    <GivenNameGroup>
        <Name Label="GIVEN_NAMEGROUP_TOLKEINESQUE"/>
        <GivenNamePrefixes  gender="GENDER_MALE">
            <GivenNamePrefix text="N" translation=""/>
            <GivenNamePrefix text="D" translation=""/>
        </GivenNamePrefixes>
		<GivenNameSuffixes gender="GENDER_MALE">
            <GivenNameSuffix text="ori" translation=""/>
            <GivenNameSuffix text="oin" translation=""/>
			<GivenNameSuffix text="ili" translation=""/>
        </GivenNameSuffixes>
    </GivenNameGroup>
</Names>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(GivenNameGroupData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, false);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "GIVEN_NAMEGROUP_TOLKEINESQUE_GENDER_MALE");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.getGroup(), "GIVEN_NAMEGROUP_TOLKEINESQUE")
        assert.equal(a.getGender(), "GENDER_MALE");
        let p = a.getPrefixes();
        assert.ok(Array.isArray(p));
        assert.equal(p.length, 2);
        assert.equal(p[0], "N");
        assert.equal(p[1], "D");

        let s = a.getSuffixes();
        assert.ok(Array.isArray(s));
        assert.equal(s.length, 3)
        assert.equal(s[0], "ori");
        assert.equal(s[1], "oin");
        assert.equal(s[2], "ili");

    });
});