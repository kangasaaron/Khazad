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

/**
 *
 * @author Impaler
 */
import { Serializable } from "../other.js";
import { Types } from "../other/Types.js";
import { DataBase } from "./DataBase.js";
import { DataManager } from "./DataManager.js";

export class DataLibrary extends Serializable() {
    _Entries = [];
    _DataClass;
    _Data;
    constructor(Class, Parent) {
        super();
        Types.mustBeExtendedBy(DataBase, Class);
        Types.mustBe(DataManager, Parent);
        this._DataClass = Class;
        this._Data = Parent;
    }

    postProcessDataClass() {
        for (let Entry of this._Entries) {
            Entry.postProcessing();
        }
    }

    loadElement(XMLEntry) {
        try {
            let NewEntry = new this._DataClass();
            NewEntry.loadData(XMLEntry, this);
        } catch (ex) {
            if (ex instanceof TypeError) {
                console.error(ex.message);
            } else if (ex instanceof ReferenceError) {
                console.error(ex.message);
            } else {
                throw ex;
            }
        }
    }

    indexEntry(Name, NewEntry) {
        if (Name !== null)
            this._Data.addLabel(Name, this._Entries.length);
        this._Entries.push(NewEntry);
        return this._Entries.length - 1;
    }

    get entries() {
        return this._Entries;
    }
}