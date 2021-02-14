import { Core } from "../Core.js";
import { Clock } from "../Core/Clock.js";
import { Dice } from "../Core/Dice.js";
import { Utils } from "../Core/Utils.js";
import { Main } from "../Core/Main.js"; 

QUnit.module('Core package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Core.Clock, Clock);
        assert.equal(Core.Dice, Dice);
        assert.equal(Core.Utils, Utils);
        assert.equal(Core.Main, Main); 
    });
});