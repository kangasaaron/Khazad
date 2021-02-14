import { DataLibrary } from "../../Data/DataLibrary.js";
import { Serializable } from "../../other/Serializable.js";

QUnit.module("Data/DataLibrary test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Serializable.isImplementedByClass(DataLibrary));
    });

    QUnit.test("constructor test", function(assert) {
        assert.throws(function() {
            let dl = new DataLibrary();
        });
        assert.throws(function() {
            let dl = new DataLibrary("hey");
        });
        let p1 = Symbol('Parameter 1'),
            p2 = Symbol('Parameter 2');
        let dl = new DataLibrary(p1, p2);
        assert.ok(dl instanceof DataLibrary);
        assert.ok(Serializable.isImplementedBy(dl));
        assert.ok(dl !== undefined);
        assert.equal(dl.DataClass, p1);
        assert.equal(dl.Data, p2);
    });

    QUnit.test("postprocessing test", function(assert) {
        class entry {
            constructor() {
                this._postprocessing_calls = 0;
            }
            postProcessing() {
                this._postprocessing_calls++;
            }
        }

        let dl = new DataLibrary("hey", "you"),
            e1 = new entry(),
            e2 = new entry();
        dl.Entries.push(e1);
        dl.Entries.push(e2);

        dl.postProcessDataClass();

        assert.equal(e1._postprocessing_calls, 1);
        assert.equal(e2._postprocessing_calls, 1);
    });

    QUnit.test("getEntries test", function(assert) {
        let dl = new DataLibrary(0, 0);
        let h = Symbol("hello");
        dl.Entries = h;
        assert.equal(dl.getEntries(), h);
    });

    QUnit.test("indexEntry test", function(assert) {
        class Data {
            constructor() {
                this._addLabel = [];
            }
            addLabel(Name, NewEntry) {
                this._addLabel.push({ Name, NewEntry });
            }
        }
        let dl = new DataLibrary(0, 0),
            param = Symbol("IndexEntry"),
            dat = new Data();
        dl.Data = dat;
        assert.equal(dl.Entries.length, 0);
        let ret = dl.indexEntry("name", param);
        assert.equal(ret, 0);
        assert.equal(dl.Entries.length, 1);
        assert.equal(dl.Entries[0], param);
        assert.equal(dat._addLabel.length, 1);
        assert.equal(dat._addLabel[0].Name, "name");
        assert.equal(dat._addLabel[0].NewEntry, 0);
    });

    QUnit.test("loadElement test", function(assert) {
        let _loadData_calls = [];
        let _constructor_calls = [];
        class DataClass {
            constructor(...args) {
                _constructor_calls.push(args);
            }
            loadData() {
                throw new ReferenceError('throws ReferenceError');
            }
        }
        let dl = new DataLibrary(DataClass, "hey"),
            xmlEntry = Symbol('XMLEntry');

        dl.loadElement(xmlEntry);
        assert.ok(true, 'got here, loadElement did not throw anything');

        DataClass.prototype.loadData = function loadData() {
            throw new TypeError('throws TypeError');
        }
        dl.loadElement(xmlEntry);
        assert.ok(true, 'got here, loadElement did not throw anything');

        DataClass.prototype.loadData = function loadData() {
            throw new Error('throws Error');
        }

        assert.throws(function() {
            dl.loadElement(xmlEntry);
        });
        DataClass.prototype.loadData = function loadData(...args) {
            _loadData_calls.push(args);
        }

        _loadData_calls = [];
        _constructor_calls = [];

        dl.loadElement(xmlEntry);
        assert.equal(_loadData_calls.length, 1);
        assert.equal(_loadData_calls[0][0], xmlEntry);
        assert.equal(_loadData_calls[0][1], dl);
    });
});