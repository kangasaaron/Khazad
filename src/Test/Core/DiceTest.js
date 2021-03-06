import { Dice } from "../../Core.js";
import { Long, Serializable, Types } from "../../other.js";

QUnit.module("Core/Dice class test", function() {
    let d = new Dice();
    d.seed = 0;

    QUnit.test('test statics', function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, Dice));
    });

    QUnit.test("test constructor", function(assert) {
        assert.equal(typeof d._Generator, 'function');
        assert.equal(d._uses, 0);
    });

    QUnit.test("test rollInt", function(assert) {
        let result = d.rollInt(100, 200);
        assert.ok(result >= 100 && result <= 200, result);
        result = d.rollInt(-10, 10);
        assert.ok(result >= -10 && result <= 10, result);
    });

    QUnit.test("test rollFloat", function(assert) {
        let result = d.rollFloat(1, 2);
        assert.ok(result >= 1 && result < 2, result);
        result = d.rollFloat(-30, 20);
        assert.ok(result >= -30 && result < 20, result);
    });

    QUnit.test("test roll", function(assert) {
        let result = d.roll(1, 2);
        assert.ok(result === 1 || result === 2, result);
        result = d.roll(1.00001, 2.00001);
        assert.ok(result >= 1.00001 && result < 2.00001, result)
    });

    QUnit.test("nulls", function(assert) {
        let result = d.roll(null, null);
        assert.ok(result == 0);
    });

    QUnit.test("seed", function(assert) {
        let generator = d._Generator;
        d.seed = new Long(2000);
        assert.ok(generator !== d._Generator);
    });
});