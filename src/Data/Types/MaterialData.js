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

import { Short, Int } from "../../other.js";
import { ShortArray } from "../../other/Integers.js";
import { DataBase } from "../DataBase.js";

/**
 *
 * @author Impaler
 */
export class MaterialData extends DataBase {
    constructor() {
        super();
        // Colors used to define this Material
        this.PrimaryColorlabel = "";
        this.SecondaryColorlabel = "";
        this.BorderColorlabel = "";
        this.PrimaryColorID = new Short(0);
        this.SecondaryColorID = new Short(0);
        this.BorderColorID = new Short(0);
        // Class that this Material belongs too
        this.MaterialClasslabel = "";
        this.MaterialClassID = new Short(0);
        // Surface Texturing of this Material
        this.SurfaceTypeLabels = [];
        this.SurfaceTextureLabels = [];
        this.SurfaceTypeIDs = [];
        this.SurfaceTextureIDs = [];
        // Other data
        this.PlantGrowthFactor = new Int(0);
        this.ColorMode = "";
    }
    loadData(Element, Library) {
        super.loadData(Element, Library);
        let MaterialClassElement = Element.getElementsByTagName("MaterialClass");
        if (MaterialClassElement && MaterialClassElement.length > 0)
            this.MaterialClasslabel = MaterialClassElement[0].getAttribute("label");
        let PrimaryColorElement = Element.getElementsByTagName("PrimaryColor");
        if (PrimaryColorElement && PrimaryColorElement.length > 0)
            this.PrimaryColorlabel = PrimaryColorElement[0].getAttribute("label");
        let SecondaryColorElement = Element.getElementsByTagName("SecondaryColor");
        if (SecondaryColorElement && SecondaryColorElement.length > 0)
            this.SecondaryColorlabel = SecondaryColorElement[0].getAttribute("label");
        let BorderColorElement = Element.getElementsByTagName("BorderColor");
        if (BorderColorElement && BorderColorElement.length > 0)
            this.BorderColorlabel = BorderColorElement[0].getAttribute("label");
        let ColorModeElement = Element.getElementsByTagName("ColorMode");
        if (ColorModeElement && ColorModeElement.length > 0)
            this.ColorMode = ColorModeElement[0].getAttribute("mode");

        let SurfaceTexturesElement = Element.getElementsByTagName("SurfaceTextures")[0];
        let SurfaceTextures = SurfaceTexturesElement.getElementsByTagName("SurfaceTexture");
        this.SurfaceTextureIDs = new ShortArray(SurfaceTextures.length);
        this.SurfaceTypeIDs = new ShortArray(SurfaceTextures.length);
        this.SurfaceTextureLabels = new Array(SurfaceTextures.length);
        this.SurfaceTypeLabels = new Array(SurfaceTextures.length);
        for (let i = 0; i < SurfaceTextures.length; i++) {
            this.SurfaceTextureLabels[i] = SurfaceTextures[i].getAttribute("Texturelabel");
            this.SurfaceTypeLabels[i] = SurfaceTextures[i].getAttribute("SurfaceTypelabel");
        }
    }
}