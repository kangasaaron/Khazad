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
import { Types } from "../other/Types.js";
import { MapCoordinate } from "../Map/Coordinates.js";

/**
 * Base class for any object that has a location on the map and is potentially
 * visible to the player.
 *
 * Implementations: Pawn
 *
 * @author Impaler
 */

export class Actor extends Serializable(Temporal) {
    ID = 0;
    // The location for gameplay logic purposes
    LocationCoordinates = null;
    // Used by Rendering
    Dirty = true;
    Hidden = false;
    Visible = false;

    constructor(id, SpawnLocation) {
        Types.mustBe('finiteNumber', id);
        Types.mustBe(MapCoordinate, SpawnLocation);
        super();
        this.ID = id;
        this.LocationCoordinates = SpawnLocation;
    }
    setLocation(NewPosition) { // TODO change to setter
        Types.mustBe(MapCoordinate, NewPosition);
        this.LocationCoordinates = NewPosition;
        this.Dirty = true;
    }
    getLocation() { // TODO change to getter
        return this.LocationCoordinates;
    }
    setVisible(NewValue) { // TODO change to setter
        Types.mustBe('boolean', NewValue);
        if (this.Visible !== NewValue) {
            this.Visible = NewValue;
            //ActorNode. (NewValue);
            this.Dirty = true;
        }
    }
    isDirty() { // TODO change to getter
        return this.Dirty;
    }
    readObject(ois) {
        Types.must(ois, "defaultReadObject");
        // default deserialization
        ois.defaultReadObject();
        // fix transients
        this.Dirty = true;
    }
}