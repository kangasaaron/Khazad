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
import { Types } from "../other/Types.js";
import { BitSet } from "../other/BitSet.js";
import { VolumeSelection } from "../Interface.js";
import { BlockCoordinate } from "./Coordinates/BlockCoordinate.js";
import { MapCoordinate } from "./Coordinates/MapCoordinate.js";

/**
 * Basic description of a volume in the game Map, high efficiency storage by bitset
 * mapped to ChunkCoordinates to give fast query, zones have no trouble overlapping
 *
 * @author Impaler
 */
export class Zone extends Serializable() {
    constructor(Volumes = [], ID = 0) {
        super();
        Types.mustBe("array", Volumes);
        if (Volumes.length)
            Types.mustBeAll(VolumeSelection, ...Volumes);
        Types.mustBe("finiteInteger", ID);

        this.ZoneMap = new Map();
        for (let Selection of Volumes) {
            this.addSelection(Selection);
        }
        this.ID = ID;
        this.Dirty = true;
        // Object.freeze(this);
    }
    addSelection(Selection) {
        let Origin = Selection.OriginLocation;
        let Terminal = Selection.TerminalLocation;
        let TargetCoords = new MapCoordinate();

        for (let x = Origin.getX(), xend = Terminal.getX(); x < xend; x++) {
            for (let y = Origin.getY(), yend = Terminal.getY(); y < yend; y++) {
                for (let z = Origin.getZ(), zend = Terminal.getZ(); z < zend; z++) {
                    TargetCoords.set(x, y, z);

                    let Target = this.ZoneMap.get(TargetCoords.Chunk.hashCode());
                    if (Target) {
                        Target.set(TargetCoords.Block.getBlockIndex(), true);
                    } else {
                        let Bits = new BitSet(BlockCoordinate.BLOCKS_PER_CHUNK);
                        Bits.set(TargetCoords.Block.getBlockIndex(), true);
                        this.ZoneMap.set(TargetCoords.Chunk.hashCode(), Bits);
                    }
                }
            }
        }
        this.Dirty = true;
    }
    getZoneMap() { // TODO change into real getter
        return this.ZoneMap;
    }
    getID() { //TODO change into real getter
        return this.ID;
    }
    readObject(ois) {
        // default deserialization
        ois.defaultReadObject();
        // fix transients
        this.Dirty = true;
    }
    equals(that) {
        if (this === that)
            return true;
        if (!(this instanceof Zone))
            return false;
        if (this.ID !== that.ID)
            return false;
        if (this.ZoneMap.size !== that.ZoneMap.size)
            return false;
        for (let key of this.ZoneMap.keys()) {
            if (!that.has(key))
                return false;
            if (!this.key.equals(that.key))
                return false;
        }
        return true;
    }
    isCoordinateInZone(TestCoordinates) {
        let Target = this.ZoneMap.get(TestCoordinates.Chunk.hashCode());
        if (Target) {
            return (Target.get(TestCoordinates.Block.getBlockIndex()));
        } else {
            return false;
        }
    }
    addMapCoordinate(AdditionCoords) {
        let Target = this.ZoneMap.get(AdditionCoords.Chunk.hashCode());
        if (!Target) {
            Target = new BitSet(BlockCoordinate.BLOCKS_PER_CHUNK);
        }
        Target.set(AdditionCoords.Block.getBlockIndex(), true);
        this.ZoneMap.set(AdditionCoords.Chunk.hashCode(), Target);
        this.Dirty = true;
    }

    removeMapCoordinate(RemovalCoords) {
        let Target = this.ZoneMap.get(RemovalCoords.Chunk.hashCode());
        if (Target) {
            Target.clear(RemovalCoords.Block.getBlockIndex());
            this.Dirty = true;
        }
    }

}