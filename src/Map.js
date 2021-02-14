import { BlockShape } from "./Map/BlockShape.js";
import { Chunk } from "./Map/Chunk.js"; 
import { Coordinates } from "./Map/Coordinates.js";
import { Face } from "./Map/Face.js"; 
import { FaceShape } from "./Map/FaceShape.js";
import { GameMap } from "./Map/GameMap.js";
import { Sector } from "./Map/Sector.js"; 
import { TileBuilder } from "./Map/TileBuilder.js"; 
import { Zone } from "./Map/Zone.js"; 

export const Map = {
    BlockShape,
    Chunk, 
    Coordinates,
    Axis: Coordinates.Axis,
    BlockCoordinate: Coordinates.BlockCoordinate,
    ChunkCoordinate: Coordinates.ChunkCoordinate,
    Direction: Coordinates.Direction,
    FaceCoordinate: Coordinates.FaceCoordinate,
    MapCoordinate: Coordinates.MapCoordinate,
    RegionCoordinate: Coordinates.RegionCoordinate,
    SectorCoordinate: Coordinates.SectorCoordinate,
    Face, 
    FaceShape,
    GameMap,
    Sector, 
    TileBuilder, 
    Zone 
};
const Axis = Coordinates.Axis;
const BlockCoordinate = Coordinates.BlockCoordinate;
const ChunkCoordinate = Coordinates.ChunkCoordinate;
const Direction = Coordinates.Direction;
const FaceCoordinate = Coordinates.FaceCoordinate;
const MapCoordinate = Coordinates.MapCoordinate;
const RegionCoordinate = Coordinates.RegionCoordinate;
const SectorCoordinate = Coordinates.SectorCoordinate;
export { BlockShape };
export { Chunk }; 
export { Coordinates };
export { Axis };
export { BlockCoordinate };
export { ChunkCoordinate };
export { Direction };
export { FaceCoordinate };
export { MapCoordinate };
export { RegionCoordinate };
export { SectorCoordinate };
export { Face }; 
export { FaceShape };
export { GameMap };
export { Sector }; 
export { TileBuilder }; 
export { Zone }; 