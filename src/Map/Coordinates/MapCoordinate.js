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

import { Serializable } from "../../other.js";
import { Types } from "../../other/Types.js";
import { Axis } from "./Axis.js";
import { BlockCoordinate } from "./BlockCoordinate.js";
import { ChunkCoordinate } from "./ChunkCoordinate.js";
import { Direction } from "./Direction.js";
import { RegionCoordinate } from "./RegionCoordinate.js";
import { SectorCoordinate } from "./SectorCoordinate.js";

/**
 * Consolidated all other coordinates under one object allowing full resolution
 * of any point in the game world and proper translation across all boundries
 * 
 * @author Impaler
 */
export class MapCoordinate extends Serializable() {
    constructor( /*ChunkCoordinate or nothing*/ Cell, /*BlockCoordinate or nothing*/ Cube) {
        super();
        this.Region = new RegionCoordinate();
        this.Sector = new SectorCoordinate();
        if (Cell) {
            if (Cell instanceof ChunkCoordinate)
                this.Chunk = Cell.clone();
            else
                throw new TypeError("MapCoordinate constructor paramter 'Cell' should be a ChunkCoordinate")
        } else {
            this.Chunk = new ChunkCoordinate();
        }
        if (Cube) {
            if (Cube instanceof BlockCoordinate)
                this.Block = Cube.clone();
            else
                throw new TypeError("MapCoordinate constructor paramter 'Cube' should be a BlockCoordinate")
        } else {
            this.Block = new BlockCoordinate();
        }
    }
    setChunkCoordinate(Cell) { // TODO turn into setter
        Types.mustBe(ChunkCoordinate, Cell);
        this.Chunk.copy(Cell);
    }
    setBlockCoordinate(Cube) { // TODO turn into setter
        Types.mustBe(BlockCoordinate, Cube);
        this.Block.copy(Cube);
    }
    set(x, y, z) {
        Types.mustBeAll('finiteInteger', x, y, z);
        this.Chunk.X = parseInt(x / BlockCoordinate.CHUNK_EDGE_SIZE);
        if (x < 0) {
            this.Chunk.X--;
            x += (BlockCoordinate.CHUNK_EDGE_SIZE * this.Chunk.X);
        }
        this.Block.set(Axis.AXIS_X, x % BlockCoordinate.CHUNK_EDGE_SIZE);

        this.Chunk.Y = parseInt(y / BlockCoordinate.CHUNK_EDGE_SIZE);
        if (y < 0) {
            this.Chunk.Y--;
            y += (BlockCoordinate.CHUNK_EDGE_SIZE * this.Chunk.Y);
        }
        this.Block.set(Axis.AXIS_Y, y % BlockCoordinate.CHUNK_EDGE_SIZE);

        this.Chunk.Z = parseInt(z / BlockCoordinate.CHUNK_EDGE_SIZE);
        if (z < 0) {
            this.Chunk.Z--;
            z += (BlockCoordinate.CHUNK_EDGE_SIZE * this.Chunk.Z);
        }
        this.Block.set(Axis.AXIS_Z, z % BlockCoordinate.CHUNK_EDGE_SIZE);
    }

    getX() { // TODO turn into getter
        return (this.Chunk.X * BlockCoordinate.CHUNK_EDGE_SIZE) + this.Block.getX();
    }

    getY() { // TODO turn into getter
        return (this.Chunk.Y * BlockCoordinate.CHUNK_EDGE_SIZE) + this.Block.getY();
    }

    getZ() { // TODO turn into getter
        return (this.Chunk.Z * BlockCoordinate.CHUNK_EDGE_SIZE) + this.Block.getZ();
    }

    translate(DirectionType) {
        Types.mustBe(Direction, DirectionType);
        return this.translateCube(DirectionType, 1);
    }
    translateCube(DirectionType, Quantity) {
        Types.mustBe(Direction, DirectionType);
        Types.mustBe('finiteInteger', Quantity);

        let Xtranslation = DirectionType.getValueonAxis(Axis.AXIS_X) * Quantity;
        let Ytranslation = DirectionType.getValueonAxis(Axis.AXIS_Y) * Quantity;
        let Ztranslation = DirectionType.getValueonAxis(Axis.AXIS_Z) * Quantity;

        let RawX = this.Block.getX() + Xtranslation;
        let RawY = this.Block.getY() + Ytranslation;
        let RawZ = this.Block.getZ() + Ztranslation;

        let CelltranslateX = parseInt(RawX / BlockCoordinate.CHUNK_EDGE_SIZE);
        let CelltranslateY = parseInt(RawY / BlockCoordinate.CHUNK_EDGE_SIZE);
        let CelltranslateZ = parseInt(RawZ / BlockCoordinate.CHUNK_EDGE_SIZE);

        if (RawX < 0) {
            //RawX += CubeCoordinate.CELLEDGESIZE;
            CelltranslateX += -1;
        }
        if (RawY < 0) {
            //RawY += CubeCoordinate.CELLEDGESIZE;
            CelltranslateY += -1;
        }
        if (RawZ < 0) {
            //RawZ += CubeCoordinate.CELLEDGESIZE;
            CelltranslateZ += -1;
        }

        this.Chunk.X += CelltranslateX;
        this.Chunk.Y += CelltranslateY;
        this.Chunk.Z += CelltranslateZ;

        let CubeX = parseInt(RawX % BlockCoordinate.CHUNK_EDGE_SIZE);
        let CubeY = parseInt(RawY % BlockCoordinate.CHUNK_EDGE_SIZE);
        let CubeZ = parseInt(RawZ % BlockCoordinate.CHUNK_EDGE_SIZE);

        this.Block.set(CubeX, CubeY, CubeZ);
    }

    equals(Arg) {
        if (Arg === this)
            return true;
        if (!Arg)
            return false;
        if (!Types.hasAll(Arg, "Chunk", "Block") || !Types.hasAll(Arg.Block, "Data", "DetailLevel"))
            return false;
        return (this.Chunk.equals(Arg.Chunk) && this.Block.Data == Arg.Block.Data && this.Block.DetailLevel.equals(Arg.Block.DetailLevel));
    }

    clone() {
        let newCoords = new MapCoordinate();
        newCoords.copy(this);
        return newCoords;
    }

    copy(CopyCoordinates) {
        Types.mustHaveAll(CopyCoordinates, "Chunk", "Block", "Sector", "Region");
        this.Chunk.copy(CopyCoordinates.Chunk);
        this.Block.copy(CopyCoordinates.Block);
        this.Sector.copy(CopyCoordinates.Sector);
        this.Region.copy(CopyCoordinates.Region);
    }
    hashCode() { // TODO turn into getter
        let hash = 3;
        hash += 17 * this.Chunk.X;
        hash += 37 * this.Chunk.Y;
        hash += 5 * this.Block.Data;
        return hash;
    }
    getVector() {
        return new THREE.Vector3(this.getX(), this.getY(), this.getZ());
    }
}