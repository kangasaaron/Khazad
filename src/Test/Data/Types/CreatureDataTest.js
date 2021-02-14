import { Serializable, Types } from "../../../other.js";
import { CreatureData, DataBase, DataLibrary, DataManager } from "../../../Data.js";
import { ByteArray } from "../../../other/Integers.js";

QUnit.module("Data/Types/CreatureData test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, CreatureData));
        assert.ok(Object.getPrototypeOf(CreatureData) === DataBase);
        assert.equal(CreatureData.serialVersionUID, 1);
    });

    QUnit.test("constructor", function(assert) {
        let a = new CreatureData();
        assert.equal(a.CreatureSizeLabel, "");
        assert.equal(a.SizeID, 0);
        assert.ok(a.ModifierValues instanceof ByteArray);
        assert.equal(a.ModifierValues.length, 0);
        assert.ok(Array.isArray(a.AttributeLabels));
        assert.equal(a.AttributeLabels.length, 0);
        assert.ok(a.AttributeModifierValues instanceof ByteArray);
        assert.equal(a.AttributeModifierValues.length, 0);
    });

    QUnit.test.todo("postProcessing", function(assert) {

    });

    QUnit.test("loadData complex", function(assert) {
        let a = new CreatureData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Creatures xmlns="https://github.com/ImpalerWrG/Khazad">
    <Creature>
        <Name Label="CREATURE_DWARF"/>
        <CreatureSize label="CREATURE_SIZE_MEDIUM"/>
        <LifeSpan value="250"/>
        <BasicAttributeModifiers>
            <AttributeModifier label="BASIC_ATTRIBUTE_STRENGTH" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_DEXTERITY" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_FLEXIBILITY" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_ENDURANCE" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_VITALITY" Modifier="2"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_REFLEXES" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_SPEED" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_LOGIC" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_PERCEPTION" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_CHARISMA" Modifier="-2"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_MEMORY" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_JUDGMENT" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_WILLPOWER" Modifier="0"/>
            <AttributeModifier label="BASIC_ATTRIBUTE_INTUITION" Modifier="0"/>
        </BasicAttributeModifiers>
        <MovementModality>
            <MovementType label="MOVEMENT_TYPE_WALK" MovementSpeedModifier="1"/>
            <MovementType label="MOVEMENT_TYPE_CLIMB" MovementSpeedModifier="1"/>
        </MovementModality>
    </Creature>
</Creatures>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(CreatureData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, false);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "CREATURE_DWARF");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.CreatureSizeLabel, "CREATURE_SIZE_MEDIUM");
        assert.equal(a.AttributeLabels.length, 14);
        assert.equal(a.ModifierValues.length, 14);
        assert.equal(a.AttributeLabels[0], "BASIC_ATTRIBUTE_STRENGTH");
        assert.equal(a.AttributeLabels[1], "BASIC_ATTRIBUTE_DEXTERITY");
        assert.equal(a.AttributeLabels[2], "BASIC_ATTRIBUTE_FLEXIBILITY");
        assert.equal(a.AttributeLabels[3], "BASIC_ATTRIBUTE_ENDURANCE");
        assert.equal(a.AttributeLabels[4], "BASIC_ATTRIBUTE_VITALITY");
        assert.equal(a.AttributeLabels[5], "BASIC_ATTRIBUTE_REFLEXES");
        assert.equal(a.AttributeLabels[6], "BASIC_ATTRIBUTE_SPEED");
        assert.equal(a.AttributeLabels[7], "BASIC_ATTRIBUTE_LOGIC");
        assert.equal(a.AttributeLabels[8], "BASIC_ATTRIBUTE_PERCEPTION");
        assert.equal(a.AttributeLabels[9], "BASIC_ATTRIBUTE_CHARISMA");
        assert.equal(a.AttributeLabels[10], "BASIC_ATTRIBUTE_MEMORY");
        assert.equal(a.AttributeLabels[11], "BASIC_ATTRIBUTE_JUDGMENT");
        assert.equal(a.AttributeLabels[12], "BASIC_ATTRIBUTE_WILLPOWER");
        assert.equal(a.AttributeLabels[13], "BASIC_ATTRIBUTE_INTUITION");

        assert.equal(a.ModifierValues[0], 0);
        assert.equal(a.ModifierValues[1], 0);
        assert.equal(a.ModifierValues[2], 0);
        assert.equal(a.ModifierValues[3], 0);
        assert.equal(a.ModifierValues[4], 2);
        assert.equal(a.ModifierValues[5], 0);
        assert.equal(a.ModifierValues[6], 0);
        assert.equal(a.ModifierValues[7], 0);
        assert.equal(a.ModifierValues[8], 0);
        assert.equal(a.ModifierValues[9], -2);
        assert.equal(a.ModifierValues[10], 0);
        assert.equal(a.ModifierValues[11], 0);
        assert.equal(a.ModifierValues[12], 0);
        assert.equal(a.ModifierValues[13], 0);
    });

    QUnit.test("loadData simple", function(assert) {
        let a = new CreatureData();
        let domParser = new DOMParser();
        let XMLsample = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Creatures xmlns="https://github.com/ImpalerWrG/Khazad">        
	<Creature>
        <Name Label="CREATURE_GOBLIN"/>
        <CreatureSize label="CREATURE_SIZE_SMALL"/>
    </Creature>
</Creatures>`;
        const sandbox = sinon.createSandbox();
        let xmlDocument = domParser.parseFromString(XMLsample, "text/xml");
        let attributeEntry = xmlDocument.children[0].children[0];
        let dataLibrary = new DataLibrary(CreatureData, new DataManager());

        sandbox.stub(dataLibrary, "indexEntry");
        let result = a.loadData(attributeEntry, dataLibrary)

        assert.equal(result, false);

        assert.equal(dataLibrary.indexEntry.callCount, 1);
        assert.equal(dataLibrary.indexEntry.getCall(0).args[0], "CREATURE_GOBLIN");
        assert.equal(dataLibrary.indexEntry.getCall(0).args[1], a);

        assert.equal(a.CreatureSizeLabel, "CREATURE_SIZE_SMALL");
        assert.equal(a.AttributeLabels.length, 0);
        assert.equal(a.ModifierValues.length, 0);
    });
});