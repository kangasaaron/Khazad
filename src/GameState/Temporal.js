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

import { Serializable, Types, Comparable } from "../other.js";
/**
 * Base class for all objects that respond to time, all implementations need to
 * return the future time tick that they wish to recive a future wake call on as
 * the return value of wake. This can be done by simply adding the desired sleep
 * time to the current tick argument of Wake.
 *
 * Implementations: Actor, Weather
 *
 * @author Impaler
 */

export class Temporal extends Comparable(Serializable()) {
    _ID = 0;
    // The future time for wake to be called
    _WakeTick = 1;

    compareTo(Target) {
        if (!"WakeTick" in Target)
            return 1;
        if(!Number.isFinite(Number(Target.WakeTick)))
            return 1;

        if (this.WakeTick < Target.WakeTick) {
            return -1;
        } else if (this.WakeTick > Target.WakeTick) {
            return 1;
        } 
        return 0;
    }
    get WakeTick(){
        return this._WakeTick;
    }
    get ID() {
        return this._ID;
    }
    Retire() {
        //GAME->getTemporal()->RetireTemporal(this);
    }
    set WakeTick(NewWakeTick) {
        // notify Temporal Manager?
        // Types.mustBe("number", NewWakeTick);
        let sanitized = Number(NewWakeTick);
        if(Number.isFinite(sanitized))
            this._WakeTick = sanitized;
    }
    wake() {
        throw new ReferenceError(`abstract function Temporal.prototype.wake called`);
    }
}

Object.defineProperties(Temporal,{
    "TICKS_PER_SECOND":{ value: 12,enumerable:true,writable:false,configurable:false},
    "TICKS_PER_MINUTE":{ value: 720,enumerable:true,writable:false,configurable:false},
    "TICKS_PER_HOUR":{ value: 43200,enumerable:true,writable:false,configurable:false},
    "TICKS_PER_DAY":{ value: 1036800,enumerable:true,writable:false,configurable:false},
    "TICKS_PER_WEEK":{ value: 7257600,enumerable:true,writable:false,configurable:false},
    "TICKS_PER_MONTH":{ value: 29030400,enumerable:true,writable:false,configurable:false},
    "TICKS_PER_YEAR":{ value: 348364800,enumerable:true,writable:false,configurable:false}
});
