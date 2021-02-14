import { Serializable, ByteArray, Types } from "../../../other.js";
import { CreatureSizeData, DataBase, DataLibrary, DataManager } from "../../../Data.js";

QUnit.module("Data/Types/CreatureSizeData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, CreatureSizeData));
        assert.ok(Object.getPrototypeOf(CreatureSizeData) === DataBase);
        assert.equal(CreatureSizeData.serialVersionUID, 1);
    });

    QUnit.test.todo("postProcessing", function(assert) {

    });

    QUnit.test("constructor", function(assert) {
        let a = new CreatureSizeData();
        assert.ok(a.ModifierValues instanceof ByteArray);
        assert.equal(a.ModifierValues.length, 0);
        assert.ok(Array.isArray(a.AttributeLabels));
        assert.equal(a.AttributeLabels.length, 0);
        assert.ok(a.AttributeModifierValues instanceof ByteArray);
        assert.equal(a.AttributeModifierValues.length, 0);
    });

    QUnit.test("loadData", function(assert) {
        let a = new CreatureSizeData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <CreatureSizes xmlns="https://github.com/ImpalerWrG/Khazad">
<CreatureSize>
<Name Label="CREATURE_SIZE_COLLOSAL"/>
<BasicAttributeModifiers>
    <AttributeModifier label="BASIC_ATTRIBUTE_STRENGTH" Modifier="6"/>
    <AttributeModifier label="BASIC_ATTRIBUTE_DEXTERITY" Modifier="-1"/>
    <AttributeModifier label="BASIC_ATTRIBUTE_FLEXIBILITY" Modifier="-1"/>
    <AttributeModifier label="BASIC_ATTRIBUTE_ENDURANCE" Modifier="5"/>
    <AttributeModifier label="BASIC_ATTRIBUTE_VITALITY" Modifier="6"/>
    <AttributeModifier label="BASIC_ATTRIBUTE_REFLEXES" Modifier="-1"/>
    <AttributeModifier label="BASIC_ATTRIBUTE_SPEED" Modifier="5"/>
</BasicAttributeModifiers>
</CreatureSize>
</CreatureSizes>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(CreatureSizeData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)
        assert.equal(result, false);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "CREATURE_SIZE_COLLOSAL");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.AttributeLabels.length, 7);
        assert.equal(a.ModifierValues.length, 7);
        assert.equal(a.AttributeLabels[0], "BASIC_ATTRIBUTE_STRENGTH");
        assert.equal(a.AttributeLabels[1], "BASIC_ATTRIBUTE_DEXTERITY");
        assert.equal(a.AttributeLabels[2], "BASIC_ATTRIBUTE_FLEXIBILITY");
        assert.equal(a.AttributeLabels[3], "BASIC_ATTRIBUTE_ENDURANCE");
        assert.equal(a.AttributeLabels[4], "BASIC_ATTRIBUTE_VITALITY");
        assert.equal(a.AttributeLabels[5], "BASIC_ATTRIBUTE_REFLEXES");
        assert.equal(a.AttributeLabels[6], "BASIC_ATTRIBUTE_SPEED");

        assert.equal(a.ModifierValues[0], 6);
        assert.equal(a.ModifierValues[1], -1);
        assert.equal(a.ModifierValues[2], -1);
        assert.equal(a.ModifierValues[3], 5);
        assert.equal(a.ModifierValues[4], 6);
        assert.equal(a.ModifierValues[5], -1);
        assert.equal(a.ModifierValues[6], 5);
    });
});