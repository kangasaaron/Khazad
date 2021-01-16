import { Serializable } from "../../other/Serializable.js";

QUnit.module("Serializable test", function() {
    let a = new Serializable();
    QUnit.test("test that abstract methods exist", function(assert) {
        assert.ok(a.writeObject !== null && a.writeObject !== undefined);
        assert.ok(a.readObject !== null && a.readObject !== undefined);
        assert.ok(a.readObjectNoData !== null && a.readObjectNoData !== undefined);

        assert.ok(typeof a.writeObject == "function");
        assert.ok(typeof a.readObject == "function");
        assert.ok(typeof a.readObjectNoData == "function");

        assert.ok(Serializable.serialVersionUID !== null && Serializable.serialVersionUID !== undefined);
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