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
    constructor() {
        super();
        this.Suncolor = new THREE.Color(0xffffff);
        this.Sun = new THREE.DirectionalLight(this.Suncolor.clone().multiplyScalar(0.6));
        this.SunVec = new THREE.Vector3();
        this.Rotation = new THREE.Quaternion();
        this.Rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.25 * Math.PI / 180)
    }

    wake(CurrentTick) {
        if (CurrentTick >= this.WakeTick) {
            // Day Rotation
            this.SunVec = this.Rotation.multiply(new THREE.Quaternion(this.SunVec.x, this.SunVec.y, this.SunVec.z, 1));
            this.updateSun();

            this.WakeTick = CurrentTick + Temporal.TICKS_PER_MINUTE;
        }
        return this.WakeTick;
    }

    updateSun() {
        this.Sun.target = this.SunVec.clone();
        let Z = this.SunVec.z;
        if (Z > 0) {
            this.Sun.color = this.Suncolor.clone().multiplyScalar(0.6);
        } else {
            this.Sun.color = this.Suncolor.clone().multiplyScalar((0.6) * (Z * -1));
        }
    }

    attachSun(TerrainNode) {
        this.SunVec.set(0, 0, -1);
        this.SunVec.normalize();
        this.Sun.target = this.SunVec.clone();

        TerrainNode.addLight(this.Sun);
    }

    // this method is used by serialization
    readObject(ois) {
        // default deserialization
        ois.defaultReadObject();
        // fix transients
        this.Sun = new THREE.DirectionalLight(this.Suncolor.clone().multiplyScalar(0.6));
        this.updateSun();
    }
}