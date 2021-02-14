/* Copyright 2010 Kenneth 'Impaler' Ferland

 This file is part of Khazad.

 Khazad is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Khazad is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Khazad.  If not, see <http://www.gnu.org/licenses/> */

import {
    XMLManager,
    DataLibrary,
    ColorData,
    TextureData,
    TextureGridData,
    TextureSheetData,
    AnimationTypeData,
    AnimationGroupData,
    ModelData,
    FontData,
    MaterialData,
    MaterialClassData,
    SurfaceTypeData,
    TreeData,
    FurnitureData,
    CreatureSizeData,
    BasicAttributeData,
    MusicData,
    CreatureData,
    GivenNameGroupData
} from "../Data.js";


/**
 *
 * @author Impaler
 */
export class DataManager {
    static INVALID_INDEX = -1;
    static GlobalLabelMap = new Map();
    static GlobalDataTypeMap = new Map();
    static instance = null;
    static getDataManager() {
        if (!this.instance)
            this.instance = new DataManager();
        return this.instance;
    }
    XML = new XMLManager();
    Colors = new DataLibrary(ColorData, this);
    Textures = new DataLibrary(TextureData, this);
    TextureGrids = new DataLibrary(TextureGridData, this);
    TextureSheets = new DataLibrary(TextureSheetData, this);
    AnimationTypes = new DataLibrary(AnimationTypeData, this);
    AnimationGroups = new DataLibrary(AnimationGroupData, this);
    Models = new DataLibrary(ModelData, this);
    Fonts = new DataLibrary(FontData, this);
    Materials = new DataLibrary(MaterialData, this);
    MaterialClasses = new DataLibrary(MaterialClassData, this);
    SurfaceTypes = new DataLibrary(SurfaceTypeData, this);
    Trees = new DataLibrary(TreeData, this);
    Furnitures = new DataLibrary(FurnitureData, this);
    CreatureSizes = new DataLibrary(CreatureSizeData, this);
    BasicAttributes = new DataLibrary(BasicAttributeData, this);
    Musics = new DataLibrary(MusicData, this);
    Creatures = new DataLibrary(CreatureData, this);
    GivenNameGroups = new DataLibrary(GivenNameGroupData, this);
    addDataToDataTypeMap() {
        DataManager.GlobalDataTypeMap.set("Color", this.Colors);
        DataManager.GlobalDataTypeMap.set("Texture", this.Textures);
        DataManager.GlobalDataTypeMap.set("TextureGrid", this.TextureGrids);
        DataManager.GlobalDataTypeMap.set("TextureSheet", this.TextureSheets);
        DataManager.GlobalDataTypeMap.set("AnimationType", this.AnimationTypes);
        DataManager.GlobalDataTypeMap.set("AnimationGroup", this.AnimationGroups);
        DataManager.GlobalDataTypeMap.set("Model", this.Models);
        DataManager.GlobalDataTypeMap.set("Font", this.Fonts);
        DataManager.GlobalDataTypeMap.set("Material", this.Materials);
        DataManager.GlobalDataTypeMap.set("MaterialClass", this.MaterialClasses);
        DataManager.GlobalDataTypeMap.set("SurfaceType", this.SurfaceTypes);
        DataManager.GlobalDataTypeMap.set("Tree", this.Trees);
        DataManager.GlobalDataTypeMap.set("Furniture", this.Furnitures);
        DataManager.GlobalDataTypeMap.set("CreatureSize", this.CreatureSizes);
        DataManager.GlobalDataTypeMap.set("BasicAttribute", this.BasicAttributes);
        DataManager.GlobalDataTypeMap.set("Music", this.Musics);
        DataManager.GlobalDataTypeMap.set("Creature", this.Creatures);
        DataManager.GlobalDataTypeMap.set("GivenNameGroup", this.GivenNameGroups);
    }
    initialize() {
        this.addDataToDataTypeMap();
        this.loadMasterFile();
    }
    loadMasterFile() {
        this.XML.loadFile("XML/MasterFileList.xml").then(this.loadDataFiles.bind(this));
    }
    loadDataFiles(xmlDocument) {
        let filesElement = xmlDocument.getElementsByTagName('Files')[0];
        let fileElements = Array.from(filesElement.getElementsByTagName('File'));
        let me = this;
        return Promise.all(fileElements.map(function(fileElement) {
            return me.loadDataFile(fileElement.getAttribute("Path"));
        })).then(me.postProcessing.bind(me));
    }

    loadDataFile(path) {
        return this.XML.loadFile(path).then(this.parseDataFile.bind(this));
    }

    parseDataFile() {}
    postProcessing() {}
}