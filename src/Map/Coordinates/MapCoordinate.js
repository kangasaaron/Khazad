import { Serializable } from "../../other/Serializable.js";
import { Axis } from "./Axis.js";
import { BlockCoordinate } from "./BlockCoordinate.js";
import { ChunkCoordinate } from "./ChunkCoordinate.js";
import { RegionCoordinate } from "./RegionCoordinate.js";
import { SectorCoordinate } from "./SectorCoordinate.js";

export class MapCoordinate {
    constructor(Cell, Cube) {
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
        if (!Cell) {
            throw new TypeError("MapCoordinate setChunkCoordinate should have a parameter 'Cell'");
        }
        if (!(Cell instanceof ChunkCoordinate)) {
            throw new TypeError("MapCoordinate setChunkCoordinate parameter 'Cell' should be a ChunkCoordinate");
        }
        this.Chunk.copy(Cell);
    }
    setBlockCoordinate(Cube) { // TODO turn into setter
        if (!Cube) {
            throw new TypeError("MapCoordinate setBlockCoordinate should have a parameter 'Cube'");
        }
        if (!(Cube instanceof BlockCoordinate)) {
            throw new TypeError("MapCoordinate setBlockCoordinate parameter 'Cube' should be a BlockCoordinate");
        }
        this.Block.copy(Cube);
    }
    set(x, y, z) {
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
        return this.translateCube(DirectionType, 1);
    }
    translateCube(DirectionType, Quantity) {
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
        if (!(Arg instanceof MapCoordinate))
            return false;
        return (this.Chunk.equals(Arg.Chunk) && this.Block.Data == Arg.Block.Data && this.Block.DetailLevel.equals(Arg.Block.DetailLevel));
    }

    clone() {
        let newCoords = new MapCoordinate();
        newCoords.copy(this);
        return newCoords;
    }

    copy(CopyCoordinates) {
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
}

Serializable.becomeImplementedBy(MapCoordinate);