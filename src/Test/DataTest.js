import { Data } from "../Data.js";
import { DataBase } from "../Data/DataBase.js";
import { DataLibrary } from "../Data/DataLibrary.js";
import { Types } from "../Data/Types.js";
import { DataManager } from "../Data/DataManager.js"; 
import { XMLManager } from "../Data/XMLManager.js";

import { AnimationGroupData } from "../Data/Types/AnimationGroupData.js";
import { AnimationTypeData } from "../Data/Types/AnimationTypeData.js";
import { BasicAttributeData } from "../Data/Types/BasicAttributeData.js";
import { ColorData } from "../Data/Types/ColorData.js";
import { CreatureData } from "../Data/Types/CreatureData.js";
import { CreatureSizeData } from "../Data/Types/CreatureSizeData.js";
import { FontData } from "../Data/Types/FontData.js";
import { FurnitureData } from "../Data/Types/FurnitureData.js";
import { GivenNameGroupData } from "../Data/Types/GivenNameGroupData.js";
import { MaterialClassData } from "../Data/Types/MaterialClassData.js";
import { MaterialData } from "../Data/Types/MaterialData.js";
import { ModelData } from "../Data/Types/ModelData.js";
import { MusicData } from "../Data/Types/MusicData.js";
import { SurfaceTypeData } from "../Data/Types/SurfaceTypeData.js";
import { TextureData } from "../Data/Types/TextureData.js";
import { TextureGridData } from "../Data/Types/TextureGridData.js";
import { TextureSheetData } from "../Data/Types/TextureSheetData.js";
import { TreeData } from "../Data/Types/TreeData.js";



QUnit.module('Data package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Data.DataBase, DataBase);
        assert.equal(Data.DataLibrary, DataLibrary);
        assert.equal(Data.Types, Types);
        assert.equal(Data.DataManager, DataManager); 
        assert.equal(Data.XMLManager, XMLManager);
        assert.equal(Data.AnimationGroupData, AnimationGroupData);
        assert.equal(Data.AnimationTypeData, AnimationTypeData);
        assert.equal(Data.BasicAttributeData, BasicAttributeData);
        assert.equal(Data.ColorData, ColorData);
        assert.equal(Data.CreatureData, CreatureData);
        assert.equal(Data.CreatureSizeData, CreatureSizeData);
        assert.equal(Data.FontData, FontData);
        assert.equal(Data.FurnitureData, FurnitureData);
        assert.equal(Data.GivenNameGroupData, GivenNameGroupData);
        assert.equal(Data.MaterialClassData, MaterialClassData);
        assert.equal(Data.MaterialData, MaterialData);
        assert.equal(Data.ModelData, ModelData);
        assert.equal(Data.MusicData, MusicData);
        assert.equal(Data.SurfaceTypeData, SurfaceTypeData);
        assert.equal(Data.TextureData, TextureData);
        assert.equal(Data.TextureGridData, TextureGridData);
        assert.equal(Data.TextureSheetData, TextureSheetData);
        assert.equal(Data.TreeData, TreeData);
    });
});