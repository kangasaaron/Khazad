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

import { ByteArray, Byte } from "../../other.js";
import { DataBase } from "../DataBase.js";

/**
 *
 * @author Impaler
 */
export class CreatureSizeData extends DataBase {
    constructor() {
        super();
        this.ModifierValues = new ByteArray();
        this.AttributeLabels = [];
        this.AttributeModifierValues = new ByteArray();
    }
    loadData(CreatureSizeEntry, Library) {
        let Name = CreatureSizeEntry.getElementsByTagName("Name")[0];
        Library.indexEntry(Name.getAttribute("Label"), this);

        let ModifiersElement = CreatureSizeEntry.getElementsByTagName("BasicAttributeModifiers")[0];
        if (ModifiersElement != null) {
            let AttributeModifiers = ModifiersElement.children;
            this.AttributeLabels = new Array(AttributeModifiers.length);
            this.ModifierValues = new ByteArray(AttributeModifiers.length);

            for (let i = 0; i < AttributeModifiers.length; i++) {
                let AttributeModifierEntry = AttributeModifiers[i];
                this.AttributeLabels[i] = AttributeModifierEntry.getAttribute("label");
                this.ModifierValues[i] = new Byte(Number.parseInt(AttributeModifierEntry.getAttribute("Modifier")));
            }
        }

        return false;
    }
}