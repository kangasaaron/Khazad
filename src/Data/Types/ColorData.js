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

import { Short } from "../../other.js";
import { DataBase } from "../DataBase.js";

/**
 *
 * @author Impaler
 */
export class ColorData extends DataBase {
    constructor() {
        super();
        this.Red = new Short(0);
        this.Green = new Short(0);
        this.Blue = new Short(0);
    }
    postProcessing() {
        return true;
    }
    loadData(ColorEntry, Library) {
        let Name = ColorEntry.getElementsByTagName("Name")[0];
        Library.indexEntry(Name.getAttribute("Label"), this);

        let Channels = ColorEntry.getElementsByTagName("Channels")[0];
        if (Channels != null) {
            this.Red = new Short(Number.parseInt(Channels.getAttribute("Red"), 10));
            this.Green = new Short(Number.parseInt(Channels.getAttribute("Green"), 10));
            this.Blue = new Short(Number.parseInt(Channels.getAttribute("Blue"), 10));
            return true;
        }
        return false;
    }
}