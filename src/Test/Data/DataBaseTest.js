import { DataBase } from "../../Data.js";
import { Serializable, Types } from "../../other.js";

QUnit.module("Data/DataBase class test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, DataBase));
    });

    QUnit.test("constructor", function(assert) {
        let a = new DataBase();
        assert.ok(a !== undefined && a !== null);
    });
    QUnit.test("Name", function(assert) {
        let a = new DataBase();
        assert.ok(a.Name === null);
    });
    QUnit.test("Abstract functions", function(assert) {
        let a = new DataBase();
        assert.ok(a.readObject !== null && a.readObject !== undefined);
        assert.ok(a.postProcessing !== null && a.postProcessing !== undefined);
        assert.throws(function() {
            a.readObject();
        }, ReferenceError);
        assert.throws(function() {
            a.postProcessing();
        }, ReferenceError);
    });
    QUnit.test("loadData", function(assert) {
        let a = new DataBase();
        assert.throws(function() {
            a.loadData();
        }, TypeError);
        assert.throws(function() {
            a.loadData({});
        }, TypeError);

    });
});