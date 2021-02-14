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

import { DataBase } from "../DataBase.js";

/**
 *
 * @author Impaler
 */
export class ModelData extends DataBase {
    postProcessing() {
        return true;
    }
    constructor() {
        super();
        this.FilePath = "";
        this.Scale = 1.0;
    }
    loadData(Element, Library) {
        super.loadData(Element, Library);

        let FileElement = Element.getElementsByTagName("File")[0];
        this.FilePath = FileElement.getAttribute("Path");

        let ScaleElements = Element.getElementsByTagName("Scale");
        if (ScaleElements && ScaleElements.length && ScaleElements[0])
            this.Scale = Number(ScaleElements[0].getAttribute("value"));
    }
}