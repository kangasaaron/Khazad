import { VolumeSelection } from "../../Interface.js";
import { MapCoordinate } from "../../Map.js";

QUnit.module("Interface/VolumeSelection tests", function() {
    QUnit.test("constructor & setSize test", function(assert) {
        let a = new VolumeSelection();
        assert.equal(a.Dirty, true);
        assert.ok(a.OriginLocation.equals(new MapCoordinate()));
        assert.ok(a.TerminalLocation.equals(new MapCoordinate()));

        let origin = new MapCoordinate();
        origin.set(1, 2, 3);
        let terminal = new MapCoordinate();
        terminal.set(3, 2, 1);
        a.setSize(origin, terminal);

        assert.equal(a.OriginLocation.getX(), 1);
        assert.equal(a.OriginLocation.getY(), 2);
        assert.equal(a.OriginLocation.getZ(), 1);
        assert.equal(a.TerminalLocation.getX(), 3);
        assert.equal(a.TerminalLocation.getY(), 2);
        assert.equal(a.TerminalLocation.getZ(), 3);


        origin = new MapCoordinate();
        origin.set(2, 2, 2);
        terminal = new MapCoordinate();
        terminal.set(1, 1, 1);
        a = new VolumeSelection(origin, terminal);

        assert.equal(a.OriginLocation.getX(), 1);
        assert.equal(a.OriginLocation.getY(), 1);
        assert.equal(a.OriginLocation.getZ(), 1);
        assert.equal(a.TerminalLocation.getX(), 2);
        assert.equal(a.TerminalLocation.getY(), 2);
        assert.equal(a.TerminalLocation.getZ(), 2);
    });
});