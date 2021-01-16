import { Gender } from "../../Game/Gender.js";

QUnit.module("Gender Enum Test", function() {
    QUnit.test("Gender enum is correct", function(assert) {
        assert.equal(Gender.GENDER_FEMALE, 0);
        assert.equal(Gender.GENDER_FEMALE.description, 'Gender.GENDER_FEMALE');
        assert.equal(Gender.GENDER_MALE, 1);
        assert.equal(Gender.GENDER_MALE.description, 'Gender.GENDER_MALE');
    });
});