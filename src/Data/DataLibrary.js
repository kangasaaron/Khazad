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
import { Serializable } from "../other/Serializable.js";

class DataLibrary {
    constructor(Class, Parent) {
        this.Entries = [];
        if (Class === undefined || Class === null)
            throw new TypeError("DataLibrary constructor parameter 1 cannot be null or undefined");
        if (Parent === undefined || Parent === null)
            throw new TypeError("DataLibrary constructor parameter 2 cannot be null or undefined");
        this.DataClass = Class;
        this.Data = Parent;
    }

    postProcessDataClass() {
        for (let Entry of this.Entries) {
            Entry.postProcessing();
        }
    }

    loadElement(XMLEntry) {
        try {
            let NewEntry = new this.DataClass();
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
            this.Data.addLabel(Name, this.Entries.length);
        this.Entries.push(NewEntry);
        return this.Entries.length - 1;
    }

    getEntries() { // TODO turn into setter
        return this.Entries;
    }
}
Serializable.becomeImplementedBy(DataLibrary);
DataLibrary.serialVersionUID = 1;

export { DataLibrary };