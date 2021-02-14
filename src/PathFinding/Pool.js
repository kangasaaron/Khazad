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

import { Serializable } from "../other/Serializable.js";

/**
 * Container class for storage of generic Nodes that are used in PathFinding
 *
 * @author Impaler
 */
export class Pool extends Serializable() {
    _ObjectPool = [];
    _ObjectFactory = null;
    _InUse = false;
    _ObjectCount = 0;
    constructor() {
        super();
    }
    set Factory(NewValue) {
        this._InUse = true;
        //Wipe();
        // TODO change ObjectPool if T class is different
        this._ObjectFactory = NewValue;
    }
    get InUse() {
        return !(!(this._InUse)); // coerce to boolean
    }
    set InUse(NewValue) {
        this._InUse = !(!(NewValue)); // coerce to boolean
    }
    wipe() {
        this._ObjectCount = 0;
        this._ObjectPool = [];
    }
    provide() {
        if (this._ObjectCount == this._ObjectPool.length) {
            let NewObject = this._ObjectFactory.provide();
            this._ObjectPool.push(NewObject);
            this._ObjectCount++;
            return NewObject;
        }
        return this._ObjectPool[this._ObjectCount++];
    }
    release() {
        this._InUse = false;
        this._ObjectCount = 0;

        if (this._ObjectPool.length > 3000)
            this._ObjectPool = this._ObjectPool.slice(0, 3000);

        this._ObjectFactory = null;
    }
}