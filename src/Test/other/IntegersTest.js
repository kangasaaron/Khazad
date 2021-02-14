import { Byte, Short, Int, Long } from "../../other.js";

QUnit.module("other/Integers Byte test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(Number.isNaN(Byte.NaN), Number.isNaN(Number.NaN));
        assert.equal(Byte.isNaN(Byte.NaN), Byte.isNaN(Number.NaN));
        assert.equal(Byte.MIN_VALUE, -128);
        assert.equal(Byte.MAX_VALUE, 127);
        assert.equal(Byte.MIN_SAFE_INTEGER, -128);
        assert.equal(Byte.MAX_SAFE_INTEGER, 127);
        assert.equal(Byte.EPSILON, 1);
        assert.ok(!Byte.isSafeInteger(200));
        assert.ok(!Byte.isSafeInteger(-200));
        assert.ok(Byte.isSafeInteger(0));
    });

    QUnit.test("byte constructor test", function(assert) {
        let b = new Byte();
        assert.equal(b, 0);
        b = new Byte('123');
        assert.equal(b, 123, '123');
        b = new Byte('12.3');
        assert.equal(b, 12, '12.3');
        b = new Byte('12.000');
        assert.equal(b, 12, '12.000');
        b = new Byte('');
        assert.equal(b, 0, '');
        b = new Byte('0x11');
        assert.equal(b, 17, '0x11');
        b = new Byte('0b11');
        assert.equal(b, 3, '0b11');
        b = new Byte('0o11');
        assert.equal(b, 9, '0o11');
        b = new Byte('foo');
        assert.ok(Byte.isNaN(b), 'foo');
        b = new Byte('100a');
        assert.ok(Byte.isNaN(b), '100a');
        b = new Byte('-Infinity');
        assert.equal(b, -Infinity, '-Infinity');

        b = new Byte(128);
        assert.equal(b, -128, '128');
        b = new Byte(130);
        assert.equal(b, -126, '130');

        let c = new Byte(120),
            d = new Byte(10);
        assert.equal(new Byte(c + d), -126, 'c+d');
    });
});

QUnit.module("other/Integers Short test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(Number.isNaN(Short.NaN), Number.isNaN(Number.NaN));
        assert.equal(Short.isNaN(Short.NaN), Short.isNaN(Number.NaN));
        assert.equal(Short.MIN_VALUE, -32768);
        assert.equal(Short.MAX_VALUE, 32767);
        assert.equal(Short.MIN_SAFE_INTEGER, -32768);
        assert.equal(Short.MAX_SAFE_INTEGER, 32767);
        assert.equal(Short.EPSILON, 1);
        assert.ok(!Short.isSafeInteger(200000));
        assert.ok(!Short.isSafeInteger(-200000));
        assert.ok(Short.isSafeInteger(0));
    });

    QUnit.test("Short constructor test", function(assert) {
        let b = new Short();
        assert.equal(b, 0);
        b = new Short('123');
        assert.equal(b, 123, '123');
        b = new Short('12.3');
        assert.equal(b, 12, '12.3');
        b = new Short('12.000');
        assert.equal(b, 12, '12.000');
        b = new Short('');
        assert.equal(b, 0, '');
        b = new Short('0x11');
        assert.equal(b, 17, '0x11');
        b = new Short('0b11');
        assert.equal(b, 3, '0b11');
        b = new Short('0o11');
        assert.equal(b, 9, '0o11');
        b = new Short('foo');
        assert.ok(Short.isNaN(b), 'foo');
        b = new Short('100a');
        assert.ok(Short.isNaN(b), '100a');
        b = new Short('-Infinity');
        assert.equal(b, -Infinity, '-Infinity');

        b = new Short(128);
        assert.equal(b, 128, '128');
        b = new Short(130);
        assert.equal(b, 130, '130');

        b = new Short(32768);
        assert.equal(b, -32768, '32768');
        b = new Short(32770);
        assert.equal(b, -32766, '32770');

        let c = new Short(120),
            d = new Short(10);
        assert.equal(new Short(c + d), 130, 'c+d');
    });
});


QUnit.module("other/Integers Int test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(Number.isNaN(Int.NaN), Number.isNaN(Number.NaN));
        assert.equal(Int.isNaN(Int.NaN), Int.isNaN(Number.NaN));
        assert.equal(Int.MIN_VALUE, -2147483648);
        assert.equal(Int.MAX_VALUE, 2147483647);
        assert.equal(Int.MIN_SAFE_INTEGER, -2147483648);
        assert.equal(Int.MAX_SAFE_INTEGER, 2147483647);
        assert.equal(Int.EPSILON, 1);
        assert.ok(!Int.isSafeInteger(2147483648));
        assert.ok(!Int.isSafeInteger(-2147483649));
        assert.ok(Int.isSafeInteger(0));
    });

    QUnit.test("Int constructor test", function(assert) {
        let b = new Int();
        assert.equal(b, 0);
        b = new Int('123');
        assert.equal(b, 123, '123');
        b = new Int('12.3');
        assert.equal(b, 12, '12.3');
        b = new Int('12.000');
        assert.equal(b, 12, '12.000');
        b = new Int('');
        assert.equal(b, 0, '');
        b = new Int('0x11');
        assert.equal(b, 17, '0x11');
        b = new Int('0b11');
        assert.equal(b, 3, '0b11');
        b = new Int('0o11');
        assert.equal(b, 9, '0o11');
        b = new Int('foo');
        assert.ok(Int.isNaN(b), 'foo');
        b = new Int('100a');
        assert.ok(Int.isNaN(b), '100a');
        b = new Int('-Infinity');
        assert.equal(b, -Infinity, '-Infinity');

        b = new Int(128);
        assert.equal(b, 128, '128');
        b = new Int(130);
        assert.equal(b, 130, '130');

        b = new Int(32768);
        assert.equal(b, 32768, '32768');
        b = new Int(32770);
        assert.equal(b, 32770, '32770');

        b = new Int(2147483648);
        assert.equal(b, -2147483648, '2147483648');
        b = new Int(2147483650);
        assert.equal(b, -2147483646, '2147483650');


        let c = new Int(120),
            d = new Int(10);
        assert.equal(new Int(c + d), 130, 'c+d');
    });
});


QUnit.module("other/Integers Long test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(Number.isNaN(Long.NaN), Number.isNaN(Number.NaN));
        assert.equal(Long.isNaN(Long.NaN), Long.isNaN(Number.NaN));
        assert.equal(Long.MIN_VALUE, Number.MIN_SAFE_INTEGER);
        assert.equal(Long.MAX_VALUE, Number.MAX_SAFE_INTEGER);
        assert.equal(Long.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
        assert.equal(Long.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        assert.equal(Long.EPSILON, 1);
        assert.ok(!Long.isSafeInteger(Long.MAX_SAFE_INTEGER + 1));
        assert.ok(!Long.isSafeInteger(Long.MIN_SAFE_INTEGER - 1));
        assert.ok(Long.isSafeInteger(0));
    });

    QUnit.test("Long constructor test", function(assert) {
        let b = new Long();
        assert.equal(b, 0);
        b = new Long('123');
        assert.equal(b, 123, '123');
        b = new Long('12.3');
        assert.equal(b, 12, '12.3');
        b = new Long('12.000');
        assert.equal(b, 12, '12.000');
        b = new Long('');
        assert.equal(b, 0, '');
        b = new Long('0x11');
        assert.equal(b, 17, '0x11');
        b = new Long('0b11');
        assert.equal(b, 3, '0b11');
        b = new Long('0o11');
        assert.equal(b, 9, '0o11');
        b = new Long('foo');
        assert.ok(Long.isNaN(b), 'foo');
        b = new Long('100a');
        assert.ok(Long.isNaN(b), '100a');
        b = new Long('-Infinity');
        assert.equal(b, -Infinity, '-Infinity');

        b = new Long(128);
        assert.equal(b, 128, '128');
        b = new Long(130);
        assert.equal(b, 130, '130');

        b = new Long(32768);
        assert.equal(b, 32768, '32768');
        b = new Long(32770);
        assert.equal(b, 32770, '32770');

        b = new Long(2147483648);
        assert.equal(b, 2147483648, '2147483648');
        b = new Long(2147483650);
        assert.equal(b, 2147483650, '2147483650');


        let c = new Long(120),
            d = new Long(10);
        assert.equal(new Long(c + d), 130, 'c+d');
    });
});