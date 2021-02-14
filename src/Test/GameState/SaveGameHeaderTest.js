import { SaveGameHeader } from "../../GameState.js";
import { Comparable, Serializable, Types } from "../../other.js";

QUnit.module("GameState/SaveGameHeader tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, SaveGameHeader));
        assert.ok(Types.isImplementedBy(Comparable, SaveGameHeader));
        assert.equal(SaveGameHeader.serialVersionUID, 1);
    });

    QUnit.test("constructor test", function(assert) {
        let a = new SaveGameHeader();
        let n = new Date();
        assert.equal(a.version, "");
        assert.equal(a.kingdomName, "");
        assert.equal(a.timeString, "");
        assert.equal(a.lastPlayed.getYear(), n.getYear());
        assert.equal(a.lastPlayed.getMonth(), n.getMonth());
        assert.equal(a.lastPlayed.getDay(), n.getDay());
        assert.equal(a.fileName, "");
    });

    QUnit.test("toString", function(assert) {
        let a = new SaveGameHeader();
        a.kingdomName = "blah";
        assert.equal(a.toString(), "blah");
    });
    QUnit.test("compareTo", function(assert) {
        let a = new SaveGameHeader();
        a.lastPlayed = new Date(2020, 1, 1);
        let n = new SaveGameHeader();
        assert.ok(a.compareTo(n) < 0);
        assert.ok(n.compareTo(a) > 0);
        assert.ok(n.compareTo(n) == 0);
    });
});