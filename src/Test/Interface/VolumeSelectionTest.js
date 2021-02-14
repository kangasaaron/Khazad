import { VolumeSelection } from "../../Interface.js";
import { MapCoordinate } from "../../Map.js";

QUnit.module("Interface/VolumeSelection tests", function() {
    QUnit.test("constructor & setSize test", function(assert) {
        let a = new VolumeSelection();
        assert.equal(a._Dirty, true);
        assert.ok(a._OriginLocation.equals(new MapCoordinate()));
        assert.ok(a._TerminalLocation.equals(new MapCoordinate()));

        let origin = new MapCoordinate();
        origin.set(1, 2, 3);
        let terminal = new MapCoordinate();
        terminal.set(3, 2, 1);
        a.setSize(origin, terminal);

        assert.equal(a._OriginLocation.getX(), 1);
        assert.equal(a._OriginLocation.getY(), 2);
        assert.equal(a._OriginLocation.getZ(), 1);
        assert.equal(a._TerminalLocation.getX(), 3);
        assert.equal(a._TerminalLocation.getY(), 2);
        assert.equal(a._TerminalLocation.getZ(), 3);


        origin = new MapCoordinate();
        origin.set(2, 2, 2);
        terminal = new MapCoordinate();
        terminal.set(1, 1, 1);
        a = new VolumeSelection(origin, terminal);

        assert.equal(a._OriginLocation.getX(), 1);
        assert.equal(a._OriginLocation.getY(), 1);
        assert.equal(a._OriginLocation.getZ(), 1);
        assert.equal(a._TerminalLocation.getX(), 2);
        assert.equal(a._TerminalLocation.getY(), 2);
        assert.equal(a._TerminalLocation.getZ(), 2);
    });
});