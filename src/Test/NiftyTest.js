import { Nifty } from "../Nifty.js";
import { ChooseCitizenControlController } from "../Nifty/ChooseCitizenControlController.js"; 
import { CitizenWindowController } from "../Nifty/CitizenWindowController.js";
import { ErrorPopupController } from "../Nifty/ErrorPopupController.js"; 
import { GameScreenController } from "../Nifty/GameScreenController.js";
import { GUI } from "../Nifty/GUI.js";
import { KeyBoardMapping } from "../Nifty/KeyBoardMapping.js"; 
import { LoadGameScreenController } from "../Nifty/LoadGameScreenController.js"; 
import { MenuPopupController } from "../Nifty/MenuPopupController.js"; 
import { PopulationPopupController } from "../Nifty/PopulationPopupController.js"; 
import { SetupScreenController } from "../Nifty/SetupScreenController.js"; 
import { ShellScreenController } from "../Nifty/ShellScreenController.js"; 
import { TutorialPopupController } from "../Nifty/TutorialPopupController.js"; 
import { Updatable } from "../Nifty/Updatable.js"; 

QUnit.module('Nifty package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Nifty.ChooseCitizenControlController, ChooseCitizenControlController); 
        assert.equal(Nifty.CitizenWindowController, CitizenWindowController);
        assert.equal(Nifty.ErrorPopupController, ErrorPopupController); 
        assert.equal(Nifty.GameScreenController, GameScreenController);
        assert.equal(Nifty.GUI, GUI);
        assert.equal(Nifty.KeyBoardMapping, KeyBoardMapping); 
        assert.equal(Nifty.LoadGameScreenController, LoadGameScreenController);
        assert.equal(Nifty.MenuPopupController, MenuPopupController);
        assert.equal(Nifty.PopulationPopupController, PopulationPopupController);
        assert.equal(Nifty.SetupScreenController, SetupScreenController);
        assert.equal(Nifty.ShellScreenController, ShellScreenController);
        assert.equal(Nifty.TutorialPopupController, TutorialPopupController);
        assert.equal(Nifty.Updatable, Updatable);
    });
});