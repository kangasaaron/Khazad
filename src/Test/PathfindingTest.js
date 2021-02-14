import { PathFinding } from "../PathFinding.js";
import { AStar } from "../PathFinding/AStar.js";
import { AStarNode } from "../PathFinding/AStarNode.js";
import { CoordinatePath } from "../PathFinding/CoordinatePath.js"
import { CoordinatePathWalker } from "../PathFinding/CoordinatePathWalker.js"
import { GridInterface } from "../PathFinding/GridInterface.js"
import {
    Heuristic,
    Manhattan,
    Chebyshev,
    Euclidean,
    Diagonal,
    Octile,
    StraightLine,
    Dijkstra
} from "../PathFinding/Heuristic.js"
import { KhazadGrid } from "../PathFinding/KhazadGrid.js"
import { LinkedListDeque } from "../PathFinding/LinkedListDeque.js"
import { MapPath } from "../PathFinding/MapPath.js"
import { MovementModality, MovementType } from "../PathFinding/MovementModality.js"
import { Navigator } from "../PathFinding/Navigator.js"
import { PathAlgorithm } from "../PathFinding/PathAlgorithm.js"
import { PathManager } from "../PathFinding/PathManager.js"
import { PathTester } from "../PathFinding/PathTester.js"
import { PathWalker } from "../PathFinding/PathWalker.js"
import { Pool } from "../PathFinding/Pool.js"
import { RouteRequest } from "../PathFinding/RouteRequest.js"
import { VectorPath } from "../PathFinding/VectorPath.js"
import { VectorPathWalker } from "../PathFinding/VectorPathWalker.js"

QUnit.module('Data package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(PathFinding.AStar, AStar);
        assert.equal(PathFinding.AStarNode, AStarNode);
        assert.equal(PathFinding.CoordinatePath, CoordinatePath);
        assert.equal(PathFinding.CoordinatePathWalker, CoordinatePathWalker);
        assert.equal(PathFinding.GridInterface, GridInterface);
        assert.equal(PathFinding.Heuristic, Heuristic);
        assert.equal(PathFinding.Manhattan, Manhattan);
        assert.equal(PathFinding.Chebyshev, Chebyshev);
        assert.equal(PathFinding.Euclidean, Euclidean);
        assert.equal(PathFinding.Diagonal, Diagonal);
        assert.equal(PathFinding.Octile, Octile);
        assert.equal(PathFinding.StraightLine, StraightLine);
        assert.equal(PathFinding.Dijkstra, Dijkstra);
        assert.equal(PathFinding.KhazadGrid, KhazadGrid);
        assert.equal(PathFinding.LinkedListDeque, LinkedListDeque);
        assert.equal(PathFinding.MapPath, MapPath);
        assert.equal(PathFinding.MovementModality, MovementModality);
        assert.equal(PathFinding.MovementType, MovementType);
        assert.equal(PathFinding.Navigator, Navigator);
        assert.equal(PathFinding.PathAlgorithm, PathAlgorithm);
        assert.equal(PathFinding.PathManager, PathManager);
        assert.equal(PathFinding.PathTester, PathTester);
        assert.equal(PathFinding.PathWalker, PathWalker);
        assert.equal(PathFinding.Pool, Pool);
        assert.equal(PathFinding.RouteRequest, RouteRequest);
        assert.equal(PathFinding.VectorPath, VectorPath);
        assert.equal(PathFinding.VectorPathWalker, VectorPathWalker);
    });
});