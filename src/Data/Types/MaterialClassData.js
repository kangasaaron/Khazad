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

import { ShortArray } from "../../other.js";
import { DataBase } from "../DataBase.js";

/**
 *
 * @author Impaler
 */
export class MaterialClassData extends DataBase {
    constructor() {
        super();
        this.DefaultMaterialLabel = "";
        this.DefaultMaterialID = 0;
        this.SurfaceTypeLabels = [];
        this.SurfaceTextureLabels = [];
        this.SurfaceTypeIDs = new ShortArray();
        this.SurfaceTextureIDs = new ShortArray();
    }
    loadData(MaterialClassEntry, Library) {
        let Name = MaterialClassEntry.getElementsByTagName("Name")[0];
        Library.indexEntry(Name.getAttribute("Label"), this);

        let DefaultMaterial = MaterialClassEntry.getElementsByTagName("DefaultMaterial")[0];
        if (DefaultMaterial) {
            this.DefaultMaterialLabel = DefaultMaterial.getAttribute("label");
        }

        let SurfaceTexturesElement = MaterialClassEntry.getElementsByTagName("DefaultSurfaceTextures")[0];
        if (SurfaceTexturesElement) {
            let SurfaceTextures = SurfaceTexturesElement.children;

            this.SurfaceTypeLabels = new Array(SurfaceTextures.length);
            this.SurfaceTypeIDs = new ShortArray(SurfaceTextures.length);
            this.SurfaceTextureLabels = new Array(SurfaceTextures.length);
            this.SurfaceTextureIDs = new ShortArray(SurfaceTextures.length);

            for (let i = 0; i < SurfaceTextures.length; i++) {
                let SurfaceTextureEntry = SurfaceTextures[i];
                this.SurfaceTextureLabels[i] = SurfaceTextureEntry.getAttribute("Texturelabel");
                this.SurfaceTypeLabels[i] = SurfaceTextureEntry.getAttribute("SurfaceTypelabel");
            }
        }
        return true;
    }

}