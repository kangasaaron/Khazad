import { DataLibrary, DataBase, DataManager } from "../../Data.js";
import { Serializable, Types } from "../../other.js";

class FakeDataBase extends DataBase {}

QUnit.module("Data/DataLibrary test", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable, DataLibrary));
    });

    QUnit.test("constructor test", function(assert) {
        assert.throws(function() {
            let dl = new DataLibrary();
        });
        assert.throws(function() {
            let dl = new DataLibrary(new FakeDataBase());
        });
        let p1 = FakeDataBase,
            p2 = new DataManager();
        let dl = new DataLibrary(p1, p2);
        assert.ok(dl instanceof DataLibrary);
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

        let dl = new DataLibrary(FakeDataBase, new DataManager()),
            e1 = new entry(),
            e2 = new entry();
        dl.Entries.push(e1);
        dl.Entries.push(e2);

        dl.postProcessDataClass();

        assert.equal(e1._postprocessing_calls, 1);
        assert.equal(e2._postprocessing_calls, 1);
    });

    QUnit.test("getEntries test", function(assert) {
        let dl = new DataLibrary(FakeDataBase, new DataManager());
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
        let dl = new DataLibrary(FakeDataBase, new DataManager()),
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
        class DataClass extends FakeDataBase {
            constructor(...args) {
                super();
                _constructor_calls.push(args);
            }
            loadData() {
                throw new ReferenceError('throws ReferenceError');
            }
        }
        let dl = new DataLibrary(DataClass, new DataManager()),
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