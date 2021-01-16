import { Utils } from "../../Core/Utils.js";

QUnit.module("Core/Utils.padLeadingZero test", function() {
    QUnit.test("test zero to 9", function(assert) {

        assert.equal(Utils.padLeadingZero(0), "00");
        assert.equal(Utils.padLeadingZero(1), "01");
        assert.equal(Utils.padLeadingZero(2), "02");
        assert.equal(Utils.padLeadingZero(3), "03");
        assert.equal(Utils.padLeadingZero(4), "04");
        assert.equal(Utils.padLeadingZero(5), "05");
        assert.equal(Utils.padLeadingZero(6), "06");
        assert.equal(Utils.padLeadingZero(7), "07");
        assert.equal(Utils.padLeadingZero(8), "08");
        assert.equal(Utils.padLeadingZero(9), "09");
    });

    QUnit.test("test 10 and others above ten", function(assert) {
        assert.equal(Utils.padLeadingZero(10), "10");
        assert.equal(Utils.padLeadingZero(20), "20");
        assert.equal(Utils.padLeadingZero(99), "99");
        assert.equal(Utils.padLeadingZero(100), "100");
        assert.equal(Utils.padLeadingZero(1000), "1000");
        assert.equal(Utils.padLeadingZero(33333), "33333");
    });
    QUnit.test("test negative", function(assert) {
        assert.equal(Utils.padLeadingZero(-1), "-01");
        assert.equal(Utils.padLeadingZero(-9), "-09");
        assert.equal(Utils.padLeadingZero(-99), "-99");
        assert.equal(Utils.padLeadingZero(-100), "-100");
        assert.equal(Utils.padLeadingZero(-1000), "-1000");
        assert.equal(Utils.padLeadingZero(-33333), "-33333");
    });
});

QUnit.module("Utils.upperCasefirst", function() {
    QUnit.test("test all", function(assert) {
        assert.equal(Utils.upperCaseFirst("THIS is some sandwich"), "THIS is some sandwich");
        assert.equal(Utils.upperCaseFirst("this is some sandwich"), "This is some sandwich");
        assert.equal(Utils.upperCaseFirst("tHIS is some sandwich"), "THIS is some sandwich");
        assert.equal(Utils.upperCaseFirst("tHiS is some sandwich"), "THiS is some sandwich");
    });
})
