import { DataBase } from "../../Data/DataBase.js";

QUnit.module("Data/DataBase class test", function() {
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
        assert.ok(a.loadData !== null && a.loadData !== undefined);
        assert.throws(function() {
            a.readObject();
        }, ReferenceError);
        assert.throws(function() {
            a.postProcessing();
        }, ReferenceError);
        assert.throws(function() {
            a.loadData();
        }, ReferenceError);
    });
});