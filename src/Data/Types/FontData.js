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
export class FontData extends DataBase {
    constructor() {
        super();
        this.FilePath = "";
        this.Size = 0;
    }
    postProcessing() {
        return true;
    }
    loadData(FontEntry, Library) {
        let Name = FontEntry.getElementsByTagName("Name")[0];
        Library.indexEntry(Name.getAttribute("Label"), this);

        let FileElement = FontEntry.getElementsByTagName("File")[0];
        this.FilePath = FileElement.getAttribute("Path");

        let SizeElement = FontEntry.getElementsByTagName("Size")[0];
        this.Size = Number.parseInt(SizeElement.getAttribute("Int"));

        return true;
    }
}