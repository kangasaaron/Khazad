import { GameState } from "../GameState.js";
import { Actor } from "../GameState/Actor.js";
import { Citizen } from "../GameState/Citizen.js";
import { Game as GameClass } from "../GameState/Game.js"; 
import { Gender } from "../GameState/Gender.js";
import { Pawn } from "../GameState/Pawn.js"; 
import { SaveGameHeader } from "../GameState/SaveGameHeader.js"; 
import { Settlement } from "../GameState/Settlement.js";
import { Temporal } from "../GameState/Temporal.js";
import { Ticker } from "../GameState/Ticker.js"; 
import { Weather } from "../GameState/Weather.js"; 

QUnit.module('GameState package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(GameState.Actor, Actor);
        assert.equal(GameState.Citizen, Citizen);
        assert.equal(GameState.Game, GameClass); 
        assert.equal(GameState.Gender, Gender);
        assert.equal(GameState.Pawn, Pawn); 
        assert.equal(GameState.SaveGameHeader, SaveGameHeader); 
        assert.equal(GameState.Settlement, Settlement);
        assert.equal(GameState.Temporal, Temporal);
        assert.equal(GameState.Ticker, Ticker); 
        assert.equal(GameState.Weather, Weather); 
    });
});