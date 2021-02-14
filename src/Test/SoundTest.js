import { Sound } from "../Sound.js";
import { Music } from "../Sound/Music.js";

QUnit.module('Sound package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Sound.Music, Music);
    });
});