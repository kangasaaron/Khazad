import { Coordinates } from "../../Map/Coordinates.js";
import { Axis } from "../../Map/Coordinates/Axis.js";
import { BlockCoordinate } from "../../Map/Coordinates/BlockCoordinate.js";
import { ChunkCoordinate } from "../../Map/Coordinates/ChunkCoordinate.js";
import { Direction } from "../../Map/Coordinates/Direction.js";
import { FaceCoordinate } from "../../Map/Coordinates/FaceCoordinate.js";
import { MapCoordinate } from "../../Map/Coordinates/MapCoordinate.js";
import { RegionCoordinate } from "../../Map/Coordinates/RegionCoordinate.js";
import { SectorCoordinate } from "../../Map/Coordinates/SectorCoordinate.js";

QUnit.module('Coordinates package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Coordinates.Axis, Axis);
        assert.equal(Coordinates.BlockCoordinate, BlockCoordinate);
        assert.equal(Coordinates.ChunkCoordinate, ChunkCoordinate);
        assert.equal(Coordinates.Direction, Direction);
        assert.equal(Coordinates.FaceCoordinate, FaceCoordinate);
        assert.equal(Coordinates.MapCoordinate, MapCoordinate);
        assert.equal(Coordinates.RegionCoordinate, RegionCoordinate);
        assert.equal(Coordinates.SectorCoordinate, SectorCoordinate);
    });
});