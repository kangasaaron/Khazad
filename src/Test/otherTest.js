import { other } from "../other.js";
import { createNewInterface, addPropertyToClass, addPropertiesToClass } from "../other/interface.js";
import { Serializable } from "../other/Serializable.js";
import { Comparable } from "../other/Comparable.js";
import { Types } from "../other/Types.js";
import { Integers, Byte, Short, Int, Long, ByteArray, ShortArray, IntArray, LongArray } from "../other/Integers.js";
import {
    Enum,
    defineEnumOpen,
    defineEnum
} from "../other/Enums.js";

QUnit.module('other package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(other.Serializable, Serializable);
        assert.equal(other.createNewInterface, createNewInterface);
        assert.equal(other.addPropertyToClass, addPropertyToClass);
        assert.equal(other.addPropertiesToClass, addPropertiesToClass);
        assert.equal(other.Comparable, Comparable);
        assert.equal(other.Types, Types);
        assert.equal(other.Integers, Integers);
        assert.equal(other.Byte, Byte);
        assert.equal(other.Short, Short);
        assert.equal(other.Int, Int);
        assert.equal(other.Long, Long);
        assert.equal(other.ByteArray, ByteArray);
        assert.equal(other.ShortArray, ShortArray);
        assert.equal(other.IntArray, IntArray);
        assert.equal(other.LongArray, LongArray);
        assert.equal(other.Enum, Enum);
        assert.equal(other.defineEnumOpen, defineEnumOpen);
        assert.equal(other.defineEnum, defineEnum);
    });
});