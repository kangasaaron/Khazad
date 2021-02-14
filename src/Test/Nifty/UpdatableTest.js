import { Updatable } from "../../Nifty/Updatable.js";
import { Types } from "../../other.js";

QUnit.module("Nifty/Updatable test", function() {
    let UpdatableClass = Updatable();
    let a = new UpdatableClass();
    QUnit.test("test that abstract methods exist", function(assert) {
        assert.equal(Updatable.isInterface, true);
        assert.equal(UpdatableClass.isInterface, true);
        Types.testCanAll(assert, a, "update");

        assert.ok("Mixins" in UpdatableClass);
        assert.ok("Updatable" in UpdatableClass.Mixins)
    });
    QUnit.test("test that abstract methods throw", function(assert) {
        assert.throws(function() {
            a.update();
        }, ReferenceError);
    });
});