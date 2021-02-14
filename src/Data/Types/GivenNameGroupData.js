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
 * @author  Dallas
 */
export class GivenNameGroupData extends DataBase {
    _group = "";
    _gender = "";
    _prefixes = [];
    _suffixes = [];
    postProcessing() {
        return true;
    }
    get group() {
        return this._group;
    }
    get gender() {
        return this._gender;
    }
    get prefixes() {
        return this._prefixes;
    }
    get suffixes() {
        return this._suffixes;
    }
    loadData(GivenNameEntry, Library) {
        let Name = GivenNameEntry.getElementsByTagName("Name")[0];
        this._group = Name.getAttribute("Label");

        let elementPrefixes = GivenNameEntry.getElementsByTagName("GivenNamePrefixes")[0];
        this._gender = elementPrefixes.getAttribute("gender");
        let elementPrefixesChildren = elementPrefixes.children;
        this._prefixes = new Array(elementPrefixesChildren.length);
        for (let i = 0; i < elementPrefixesChildren.length; i++) {
            this._prefixes[i] = elementPrefixesChildren[i].getAttribute("text");
        }
        let elementSuffixes = GivenNameEntry.getElementsByTagName("GivenNameSuffixes")[0];
        let elementSuffixesChildren = elementSuffixes.children;
        this._suffixes = new Array(elementSuffixesChildren.length);
        for (let i = 0; i < elementSuffixesChildren.length; i++) {
            this._suffixes[i] = elementSuffixesChildren[i].getAttribute("text");
        }
        Library.indexEntry(this.group + "_" + this.gender, this);
        return false;
    }
}