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

import { Temporal } from "./Temporal.js";
import { Serializable } from "../other.js";

/**
 * Holds the state of and simulates the weather and Climate of the Games local
 * map area. Updates once per minute, currently controls the direction sunlight
 *
 * @author Impaler
 */
export class Weather extends Serializable(Temporal) {

    _Suncolor = new THREE.Color(0xffffff);
    _Sun = new THREE.DirectionalLight(this._Suncolor.clone().multiplyScalar(0.6));
    _SunVec = new THREE.Vector3();
    _Rotation = new THREE.Quaternion();

    constructor() {
        super();
        this._Rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.25 * Math.PI / 180);
    }

    wake(CurrentTick) {
        if (CurrentTick >= this.WakeTick) {
            // Day Rotation
            this._SunVec = this._Rotation.multiply(new THREE.Quaternion(this._SunVec.x, this._SunVec.y, this._SunVec.z, 1));
            this._updateSun();

            this.WakeTick = CurrentTick + Temporal.TICKS_PER_MINUTE;
        }
        return this.WakeTick;
    }

    attachSun(TerrainNode) {
        this._SunVec.set(0, 0, -1);
        this._SunVec.normalize();
        this._Sun.target = this._SunVec.clone();

        TerrainNode.addLight(this._Sun);
    }


    _updateSun() {
        this._Sun.target = this._SunVec.clone();
        let Z = this._SunVec.z;
        if (Z > 0) {
            this._Sun.color = this._Suncolor.clone().multiplyScalar(0.6);
        } else {
            this._Sun.color = this._Suncolor.clone().multiplyScalar((0.6) * (Z * -1));
        }
    }
    // this method is used by serialization
    readObject(ois) {
        // default deserialization
        ois.defaultReadObject();
        // fix transients
        this._Sun = new THREE.DirectionalLight(this._Suncolor.clone().multiplyScalar(0.6));
        this._updateSun();
    }
}