import { Comparable, Types } from "../../other.js";

QUnit.module("other/Comparable test", function() {
    let ComparableClass = Comparable();
    let a = new ComparableClass();
    QUnit.test("test that abstract methods exist", function(assert) {
        assert.equal(Comparable.isInterface, true);
        assert.equal(ComparableClass.isInterface, true);
        Types.testCanAll(assert, a, "compareTo");

        assert.ok("Mixins" in ComparableClass);
        assert.ok("Comparable" in ComparableClass.Mixins);
    });
    QUnit.test("test that abstract methods throw", function(assert) {
        assert.throws(function() {
            a.compareTo();
        }, ReferenceError);
    });
});