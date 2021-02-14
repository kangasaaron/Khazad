import { Serializable, Types } from "../../other.js";

QUnit.module("other/Serializable test", function() {
    let serializableClass = Serializable();
    let a = new serializableClass();
    QUnit.test("test that abstract methods exist", function(assert) {
        assert.equal(Serializable.isInterface, true);
        assert.equal(serializableClass.isInterface, true);
        Types.testCanAll(assert, a, "writeObject", "readObject", "readObjectNoData");

        assert.ok(serializableClass.serialVersionUID !== null && serializableClass.serialVersionUID !== undefined);
        assert.ok("Mixins" in serializableClass);
        assert.ok("Serializable" in serializableClass.Mixins);
    });
    QUnit.test("test that abstract methods throw", function(assert) {
        assert.throws(function() {
            a.writeObject();
        }, ReferenceError);
        assert.throws(function() {
            a.readObject();
        }, ReferenceError);
        assert.throws(function() {
            a.readObjectNoData();
        }, ReferenceError);
    });
});