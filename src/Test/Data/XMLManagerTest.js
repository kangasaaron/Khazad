import { XMLManager } from "../../Data.js";
import { Serializable, Types } from "../../other.js";
import "../../other/d3.v6.min.js";
import "../sinon-9.2.4.js";

QUnit.module("Data/XMLManager test", function() {
    QUnit.test("statics test", function(assert) {
        assert.equal(XMLManager.serialVersionUID, 1);
        assert.ok(Types.isImplementedBy(Serializable, XMLManager));
    });

    QUnit.test("loadFile test", function(assert) {
        const sandbox = sinon.createSandbox();

        let x = new XMLManager();
        assert.throws(function() {
            x.loadFile();
        }, "File '' not found.");

        let stub = sandbox.stub(d3, 'xml').callsFake(function(path) {
            throw new Error("some d3 error");
        });

        assert.throws(function() { // test that the error is passed on
            x.loadFile('abc');
        });

        stub.restore();

        stub = sandbox.stub(d3, 'xml').callsFake(function(path) {
            return new Promise(a => {});
        });

        assert.ok(x.loadFile('blah') instanceof Promise); // assert that a promise is returned, and no error is thrown 

        stub.restore();
        sandbox.restore();

        // let done = assert.async(1);
        // x.loadFile("assets/XML/Colors.xml")
        //     .then(function(data) {
        //         assert.ok(data);
        //         done();
        //     })
    });
});