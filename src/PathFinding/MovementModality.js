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
import { defineEnum } from "../other.js";
import { Types } from "../other/Types.js";

export const MovementType = defineEnum(
    "MovementType",
    "MOVEMENT_TYPE_WALK",
    "MOVEMENT_TYPE_WHEEL",
    "MOVEMENT_TYPE_CLIMB",
    "MOVEMENT_TYPE_SWIM",
    "MOVEMENT_TYPE_FLY"
);

/**
 * Encompases all the unique properties of a Pawns mode of movement that
 * may be relevent for pathfinding. MovementType specifies the kind of surface
 * or material a Pawn can move through such as Air, water etc. Size reflects
 * the sides of the cubic volume it must have open, a size 2 creature needs a 2x2x2
 * volume to move through. Speed determines relative edge weights. A modality
 * can have different sizes for different modes, such as size 2 when flying and
 * size 1 when walking.
 *
 * @author Impaler
 */
export class MovementModality extends Serializable() {
    MovementTypeCapable = [];
    MovementTypeSize = [];
    MovementTypeSpeed = [];
    constructor(MoveType, Speed, Size) {
        Types.mustBe(MovementType, MoveType);
        Types.mustBe('finiteNumber', Speed);
        Types.mustBe('finiteInteger', Size);
        super();
        this.MovementTypeCapable = new Array(MovementType.values.length).fill(false);
        this.MovementTypeSize = new Array(MovementType.values.length).fill(0);
        this.MovementTypeSpeed = new Array(MovementType.values.length).fill(0);
        this.MovementTypeCapable[MoveType.ordinal] = true;
        this.MovementTypeSize[MoveType.ordinal] = Size;
        this.MovementTypeSpeed[MoveType.ordinal] = Speed;
    }
    equals(that) {
        if (that === null || that === undefined)
            return false;
        if (this === that)
            return true;
        if (!(that instanceof MovementModality))
            return false;

        for (let Type of MovementType.values) {
            if (that.MovementTypeCapable[Type.ordinal] != this.MovementTypeCapable[Type.ordinal]) {
                return false;
            }
        }

        for (let Type of MovementType.values) {
            if (that.MovementTypeSize[Type.ordinal] != this.MovementTypeSize[Type.ordinal]) {
                return false;
            }
        }

        return true;
    }

    setModalitySpeed(Type, Speed) {
        Types.mustBe(MovementType, Type);
        Types.mustBe('finiteNumber', Speed);
        this.MovementTypeSpeed[Type.ordinal] = Speed;
    }

    setModalitySize(Type, Size) {
        Types.mustBe(MovementType, Type);
        Types.mustBe('finiteNumber', Size); // we don't need to
        this.MovementTypeSize[Type.ordinal] = Math.round(Size);
    }

    hashCode() {
        let hash = 3;

        //hash += 17 * MovementTypeCapable.hashCode();
        //hash += 37 * MovementTypeSize.hashCode();
        //hash += 5 * MovementTypeSpeed.hashCode();
        return hash;
    }

}