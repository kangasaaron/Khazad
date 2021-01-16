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
class DataLibrary extends Serializable {
    constructor(Class, Parent) {
        this.Entries = [];
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
            let NewEntry = DataClass.newInstance();
            NewEntry.loadData(XMLEntry, this);
        } catch (ex) {
            if (ex instanceof InstantiationException) {
                console.error(ex.getMessage());
            } else if (ex instanceof IllegalAccessException) {
                console.error(ex.getMessage());
            }
        }
    }

    indexEntry(Name, NewEntry) {
        if (Name !== null)
            Data.addLabel(Name, this.Entries.length);
        Entries.push(NewEntry);
        return this.Entries.length - 1;
    }

    getEntries() {
        return this.Entries;
    }
}
DataLibrary.serialVersionUID = 1;

export { DataLibrary };