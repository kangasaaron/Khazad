import { Terrain } from "../Terrain.js";
import { Geology } from "../Terrain/Geology.js";
import { Noise } from "../Terrain/Noise.js";

QUnit.module('Terrain package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Terrain.Geology, Geology);
        assert.equal(Terrain.Noise, Noise);
    });
});