import { Serializable, Types } from "../../../other.js";
import { BasicAttributeData, DataBase, DataLibrary, DataManager } from "../../../Data.js";
import "../../sinon-9.2.4.js";
QUnit.module("Data/Types/BasicAttributeData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, BasicAttributeData));
        assert.ok(Object.getPrototypeOf(BasicAttributeData) === DataBase);
        assert.equal(BasicAttributeData.serialVersionUID, 1);
    });
    QUnit.test("postProcessing", function(assert) {
        let a = new BasicAttributeData();
        assert.ok(a.postProcessing());
    });

    QUnit.test("loadData", function(assert) {
        let a = new BasicAttributeData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<BasicAttributes xmlns="https://github.com/ImpalerWrG/Khazad">
    <BasicAttribute>
        <Name Label="BASIC_ATTRIBUTE_STRENGTH"/>
        <Type label="ATTRIBUTE_TYPE_PHYSICAL"/>
    </BasicAttribute>
</BasicAttributes>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(BasicAttributeData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, false);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "BASIC_ATTRIBUTE_STRENGTH");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);
    });


});