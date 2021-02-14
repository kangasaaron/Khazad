import { Interface } from "../Interface.js";
import { VolumeSelection } from "../Interface/VolumeSelection.js"; 
import { GameCamera } from "../Interface/GameCamera.js"; 
import { GameCameraState } from "../Interface/GameCameraState.js"; 
import { TerrainSlicer } from "../Interface/TerrainSlicer.js"; 

QUnit.module('Interface package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Interface.VolumeSelection, VolumeSelection);
        assert.equal(Interface.GameCamera, GameCamera); 
        assert.equal(Interface.GameCameraState, GameCameraState); 
        assert.equal(Interface.TerrainSlicer, TerrainSlicer); 
    });
});