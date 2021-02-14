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

import { Serializable } from "../other.js";
import {} from "../other/Serializable.js";
import { Types } from "../other/Types.js";

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

export class Temporal extends Serializable() {
    constructor() {
        super();
        // The future time for wake to be called
        this.ID = 0;
        this.WakeTick = 1;
    }
    compareTo(Target) {
        if (!Types.has(Target, "WakeTick"))
            return 1;

        if (this.WakeTick < Target.WakeTick) {
            return -1;
        } else if (this.WakeTick == Target.WakeTick) {
            return 0;
        } else {
            return 1;
        }
    }
    getID() {
        return this.ID;
    }
    Retire() {
        //GAME->getTemporal()->RetireTemporal(this);
    }
    ResetWakeTick(NewWakeTick) {
        // notify Temporal Manager?
        Types.mustBe("number", NewWakeTick);
        this.WakeTick = NewWakeTick;
    }
    wake() {
        this.abstractFunction("Temporal", "wake");
    }
}

Temporal.TICKS_PER_SECOND = 12;
Temporal.TICKS_PER_MINUTE = 720;
Temporal.TICKS_PER_HOUR = 43200;
Temporal.TICKS_PER_DAY = 1036800;
Temporal.TICKS_PER_WEEK = 7257600;
Temporal.TICKS_PER_MONTH = 29030400;
Temporal.TICKS_PER_YEAR = 348364800;