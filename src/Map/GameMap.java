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

package Map;

import Map.Coordinates.*;
import Core.Dice;
import Core.Main;
import Data.DataManager;
import Game.Game;
import PathFinding.PathManager;

import java.util.concurrent.ConcurrentHashMap;
import java.util.ArrayList;
import java.util.Collection;

import Interface.VolumeSelection;
import java.io.Serializable;

import org.javatuples.Pair;

/**
 * Master Class for holding the playing Map, holds primaraly Chunk in HashMap
 * structure and pipes changes to the Chunk/Faces to abstract them away from the
 * rest of the code base
 *
 * @author Impaler
 */
public class GameMap implements Serializable {

	private static final long serialVersionUID = 1;
	boolean Initialized;
	boolean MapLoaded;
	// Storage of Chunks
	ConcurrentHashMap<ChunkCoordinate, Chunk> Chunks;
	ConcurrentHashMap<ChunkCoordinate, Chunk> WeatherChunks;
	ConcurrentHashMap<ChunkCoordinate, Chunk> BasementChunks;

	int HighestChunk;
	int LowestChunk;
	int WestestChunk;
	int EastestChunk;
	int NorthestChunk;
	int SouthestChunk;

	ChunkCoordinate TestingCooords = new ChunkCoordinate();
	BlockShape TargetBlockShape, AboveBlockShape, BelowBlockShape, AdjacentBlockShape;

	int Seed;
	Dice ExcavateDice = new Dice();
	ArrayList<Zone> Zones;

	public GameMap() {
		Initialized = false;
		MapLoaded = false;
		HighestChunk = -100000000;
		LowestChunk = 10000000;
		WestestChunk = 10000000;
		EastestChunk = -100000000;
		NorthestChunk = -100000000;
		SouthestChunk = 10000000;

		ExcavateDice.seed(Seed);
		Zones = new ArrayList<Zone>();
		Chunks = new ConcurrentHashMap<ChunkCoordinate, Chunk>();
		WeatherChunks = new ConcurrentHashMap<ChunkCoordinate, Chunk>();
		BasementChunks = new ConcurrentHashMap<ChunkCoordinate, Chunk>();

		TargetBlockShape = new BlockShape(); 
		AboveBlockShape = new BlockShape(); 
		BelowBlockShape = new BlockShape();
		AdjacentBlockShape = new BlockShape();
	}

	public static GameMap getMap() {
		Game game = Main.app.getStateManager().getState(Game.class);
		return game.getMap();
	}

	public void initialize(int MasterSeed) {
		Seed = MasterSeed;
		ExcavateDice.seed(Seed);
	}

	public Chunk getChunk(ChunkCoordinate TestCoords) {
		return Chunks.get(TestCoords);
	}

	public boolean insertChunk(Chunk NewChunk) {
		ChunkCoordinate TargetCoordinates = NewChunk.getChunkCoordinates();
		if (getChunk(TargetCoordinates) == null) {
			Chunks.put(TargetCoordinates, NewChunk);

			ChunkCoordinate AboveCoords = TargetCoordinates.clone();
			AboveCoords.Z++;
			Chunk AboveChunk = Chunks.get(AboveCoords);

			ChunkCoordinate BelowCoords = TargetCoordinates.clone();
			BelowCoords.Z--;
			Chunk BelowChunk = Chunks.get(BelowCoords);

			if (TargetCoordinates.Z > HighestChunk)
				HighestChunk = TargetCoordinates.Z;

			if (AboveChunk == null) {
				WeatherChunks.put(TargetCoordinates, NewChunk);
				//NewChunk.WeatherChunk = true;
				if (BelowChunk != null) {
					WeatherChunks.remove(BelowCoords);
					//BelowChunk.WeatherChunk = false;
				}
			}

			if (TargetCoordinates.Z < LowestChunk)
				LowestChunk = TargetCoordinates.Z;

			if (TargetCoordinates.X > EastestChunk)
				EastestChunk = TargetCoordinates.X;
			if (TargetCoordinates.X < WestestChunk)
				WestestChunk = TargetCoordinates.X;
			if (TargetCoordinates.Y < SouthestChunk)
				SouthestChunk = TargetCoordinates.Y;
			if (TargetCoordinates.Y > NorthestChunk)
				NorthestChunk = TargetCoordinates.Y;

			if (BelowChunk == null) {
				BasementChunks.put(TargetCoordinates, NewChunk);
				//NewChunk.BasementChunk = true;
				if (AboveChunk != null) {
					BasementChunks.remove(AboveCoords);
					//AboveChunk.BasementChunk = false;
				}
			}

			return true;
		}
		return false;  // A Chunk already exists at that spot
	}

	public Chunk initializeChunk(ChunkCoordinate Coords) {
		Chunk TargetChunk = getChunk(Coords);
		if (TargetChunk == null) {
			TargetChunk = new Chunk();
			TargetChunk.setChunkCoordinates(Coords);
			insertChunk(TargetChunk);
			return TargetChunk;
		}
		return TargetChunk;  // A Chunk already exists at that spot		
	}

	public int getHighestBlock() {
		return (HighestChunk + 1) * BlockCoordinate.CHUNK_EDGE_SIZE;
	}

	public int getLowestBlock() {
		return LowestChunk * BlockCoordinate.CHUNK_EDGE_SIZE;
	}

	public int getHighestChunk() {
		return HighestChunk;
	}

	public int getLowestChunk() {
		return LowestChunk;
	}

	public MapCoordinate getMapCenter() {
		int X = (EastestChunk - WestestChunk) / 2;
		int Y = (NorthestChunk - SouthestChunk) / 2;

		return new MapCoordinate(new ChunkCoordinate(X, Y, 0), new BlockCoordinate());
	}

	public boolean isBlockInitialized(MapCoordinate Coordinates) {
		return Chunks.containsKey(Coordinates.Chunk);
	}

	public MapCoordinate getFacingCoordinates(ChunkCoordinate chunkcoords, FaceCoordinate facecoords) {
		MapCoordinate ModifiedCoordinates = new MapCoordinate(chunkcoords, facecoords);
		ModifiedCoordinates.translate(facecoords.getFaceDirection());
		return ModifiedCoordinates;
	}

	public Face getFace(MapCoordinate TargetMapCoordinates, Direction DirectionType) {
		Chunk TargetChunk = Chunks.get(TargetMapCoordinates.Chunk);
		return TargetChunk != null ? TargetChunk.getFace(new FaceCoordinate(TargetMapCoordinates.Block.getBlockIndex(), DirectionType), 0) : null;
	}

	public boolean hasFace(MapCoordinate TargetMapCoordinates, Direction DirectionType) {
		Chunk TargetChunk = Chunks.get(TargetMapCoordinates.Chunk);
		return TargetChunk != null ? TargetChunk.hasFace(new FaceCoordinate(TargetMapCoordinates.Block.getBlockIndex(), DirectionType), 0) : false;
	}

	public boolean removeFace(MapCoordinate TargetMapCoordinates, Direction DirectionType) {
		Chunk TargetChunk = Chunks.get(TargetMapCoordinates.Chunk);
		return TargetChunk != null ? TargetChunk.removeFace(new FaceCoordinate(TargetMapCoordinates.Block.getBlockIndex(), DirectionType), 0) : false;
	}

	public Face addFace(MapCoordinate TargetMapCoordinates, Direction DirectionType, int LevelofDetail) {
		Chunk TargetChunk = getChunk(TargetMapCoordinates.Chunk);
		if (TargetChunk == null)
			TargetChunk = initializeChunk(TargetMapCoordinates.Chunk);

		return TargetChunk.addFace(new FaceCoordinate(TargetMapCoordinates.Block, DirectionType, (byte) LevelofDetail));
	}

	public void setBlockShape(MapCoordinate TargetMapCoordinates, BlockShape NewShape) {
		Chunk TargetChunk = getChunk(TargetMapCoordinates.Chunk);

		if (TargetChunk != null) {
			TargetChunk.setBlockShape(TargetMapCoordinates.Block.getBlockIndex(), NewShape);
			MapCoordinate[] Coordinates = {TargetMapCoordinates};
			PathManager.getSingleton().editMapAbstractions(Coordinates);
		}
	}

	public void getBlockShape(MapCoordinate Coordinates, BlockShape writeBlock) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);

		if (TargetChunk != null) {
			TargetChunk.getBlockShape(Coordinates.Block.getBlockIndex(), 0, writeBlock);
		} else {
			writeBlock.setData(BlockShape.BELOW_CUBE_HEIGHT);
		}
	}

	public void setBlockMaterial(MapCoordinate Coordinates, short MaterialID) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);

		if (TargetChunk != null) {
			TargetChunk.setBlockMaterial(Coordinates.Block.getBlockIndex(), MaterialID);
		}
	}

	public short getBlockMaterial(MapCoordinate Coordinates) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		return TargetChunk != null ? TargetChunk.getBlockMaterial(Coordinates.Block.getBlockIndex()) : DataManager.INVALID_INDEX;
	}

	public void setFaceMaterial(MapCoordinate TargetMapCoordinates, Direction DirectionType, short MaterialID) {
		Chunk TargetChunk = getChunk(TargetMapCoordinates.Chunk);
		if (TargetChunk != null) {
			TargetChunk.setFaceMaterialType(new FaceCoordinate(TargetMapCoordinates.Block.getBlockIndex(), DirectionType), MaterialID);
		}
	}

	public short getFaceMaterial(MapCoordinate TargetMapCoordinates, Direction DirectionType) {
		Face TargetFace = getFace(TargetMapCoordinates, DirectionType);
		return TargetFace != null ? TargetFace.getFaceMaterialType() : DataManager.INVALID_INDEX;
	}

	public void setFaceSurfaceType(MapCoordinate TargetMapCoordinates, Direction DirectionType, short SurfaceID) {
		Chunk TargetChunk = getChunk(TargetMapCoordinates.Chunk);
		if (TargetChunk != null) {
			TargetChunk.setFaceSurfaceType(new FaceCoordinate(TargetMapCoordinates.Block.getBlockIndex(), DirectionType), SurfaceID);
		}
	}

	public short getFaceSurfaceType(MapCoordinate TargetMapCoordinates, Direction DirectionType) {
		Face TargetFace = getFace(TargetMapCoordinates, DirectionType);
		return TargetFace != null ? TargetFace.getFaceSurfaceType() : DataManager.INVALID_INDEX;
	}

	public boolean isBlockHidden(MapCoordinate Coordinates) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		return TargetChunk != null ? TargetChunk.isBlockHidden(Coordinates.Block.getBlockIndex()) : true;
	}

	public void setBlockHidden(MapCoordinate Coordinates, boolean NewValue) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		if (TargetChunk != null)
			TargetChunk.setBlockHidden(Coordinates.Block.getBlockIndex(), NewValue);
	}

	public void generateFirstLight() {
		for (Chunk WeatherChunk : WeatherChunks.values()) {
			ChunkCoordinate TargetCoords = WeatherChunk.getChunkCoordinates();
			Chunk TopChunk = Chunks.get(TargetCoords);
			TargetCoords.Z--;
			Chunk BottomChunk = Chunks.get(TargetCoords);

			boolean LightRemains = false;

			for (int i = 0; i < BlockCoordinate.BLOCKS_PER_CHUNK; i++) {
				TopChunk.setBlockSunLit((short) i, true);
			}

			do {
				for (BlockCoordinate Index = new BlockCoordinate(); !Index.end(); Index.next()) {
					TopChunk.getBlockShape(Index.getBlockIndex(), 0, TargetBlockShape);
					if (TopChunk.isBlockSunLit(Index.getBlockIndex()) && !TargetBlockShape.hasFace(Direction.DIRECTION_NONE)) {
						BottomChunk.setBlockSunLit(Index.getBlockIndex(), true);
						LightRemains = true;
					}
				}

				TopChunk = BottomChunk;
				TargetCoords.Z--;
				BottomChunk = Chunks.get(TargetCoords);
			} while (BottomChunk != null && LightRemains);
		}
	}

	public boolean isBlockSubTerranean(MapCoordinate Coordinates) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		return TargetChunk != null ? TargetChunk.isBlockSubTerranean(Coordinates.Block.getBlockIndex()) : false;
	}

	public void setBlockSubTerranean(MapCoordinate Coordinates, boolean NewValue) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		if (TargetChunk != null)
			TargetChunk.setBlockSubTerranean(Coordinates.Block.getBlockIndex(), NewValue);
	}

	public boolean isBlockSkyView(MapCoordinate Coordinates) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		return TargetChunk != null ? TargetChunk.isBlockSkyView(Coordinates.Block.getBlockIndex()) : false;
	}

	public void setBlockSkyView(MapCoordinate Coordinates, boolean NewValue) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		if (TargetChunk != null)
			TargetChunk.setBlockSkyView(Coordinates.Block.getBlockIndex(), NewValue);
	}

	public boolean isBlockSunLit(MapCoordinate Coordinates) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		return TargetChunk != null ? TargetChunk.isBlockSunLit(Coordinates.Block.getBlockIndex()) : false;
	}

	public void setBlockSunLit(MapCoordinate Coordinates, boolean NewValue) {
		Chunk TargetChunk = Chunks.get(Coordinates.Chunk);
		if (TargetChunk != null)
			TargetChunk.setBlockSunLit(Coordinates.Block.getBlockIndex(), NewValue);
	}

	public void excavateBlock(MapCoordinate Coordinates, BlockShape GoalShape) {
		int Corner = ExcavateDice.roll(0, Direction.CARDINAL_DIRECTIONS.length - 1);
		getBlockShape(Coordinates, TargetBlockShape);
		BlockShape IntermediateShape;

		switch (Corner) {
			case 0:
				if (GoalShape.getNorthEastCorner() < TargetBlockShape.getNorthEastCorner()) {
					IntermediateShape = TargetBlockShape.clone();
					IntermediateShape.setNorthEastCorner((byte) (TargetBlockShape.getNorthEastCorner() - 1));
					updateBlockShape(Coordinates, IntermediateShape);
					break;
				}
			case 1:
				if (GoalShape.getSouthEastCorner() < TargetBlockShape.getSouthEastCorner()) {
					IntermediateShape = TargetBlockShape.clone();
					IntermediateShape.setSouthEastCorner((byte) (TargetBlockShape.getSouthEastCorner() - 1));
					updateBlockShape(Coordinates, IntermediateShape);
					break;
				}
			case 2:
				if (GoalShape.getNorthWestCorner() < TargetBlockShape.getNorthWestCorner()) {
					IntermediateShape = TargetBlockShape.clone();
					IntermediateShape.setNorthWestCorner((byte) (TargetBlockShape.getNorthWestCorner() - 1));
					updateBlockShape(Coordinates, IntermediateShape);
					break;
				}
			case 3:
				if (GoalShape.getSouthWestCorner() < TargetBlockShape.getSouthWestCorner()) {
					IntermediateShape = TargetBlockShape.clone();
					IntermediateShape.setSouthWestCorner((byte) (TargetBlockShape.getSouthWestCorner() - 1));
					updateBlockShape(Coordinates, IntermediateShape);
					break;
				}
			default:
			//UpdateBlockShape(Coordinates, GoalShape);				
		}
		// Always set material to native cube if were excavating
		Face SloppedFace = getFace(Coordinates, Direction.DIRECTION_NONE);
		if (SloppedFace != null)
			SloppedFace.setFaceMaterialType(getBlockMaterial(Coordinates));
	}

	public void updateBlockShape(MapCoordinate Coordinates, BlockShape NewShape) {
		if (isBlockInitialized(Coordinates)) {
			getBlockShape(Coordinates, TargetBlockShape);
			if (!TargetBlockShape.equals(NewShape)) {

				// check bottoms
				MapCoordinate belowBlock = Coordinates.clone();
				belowBlock.translate(Direction.DIRECTION_DOWN);
				if (!isBlockInitialized(belowBlock)) {
					initializeChunk(belowBlock.Chunk);
				}
				getBlockShape(belowBlock, BelowBlockShape);

				if (BelowBlockShape.getNorthEastCorner() < BlockShape.CUBE_TOP_HEIGHT)
					NewShape.setNorthEastCorner(BlockShape.BELOW_CUBE_HEIGHT);

				if (BelowBlockShape.getNorthWestCorner() < BlockShape.CUBE_TOP_HEIGHT)
					NewShape.setNorthWestCorner(BlockShape.BELOW_CUBE_HEIGHT);

				if (BelowBlockShape.getSouthEastCorner() < BlockShape.CUBE_TOP_HEIGHT)
					NewShape.setSouthEastCorner(BlockShape.BELOW_CUBE_HEIGHT);

				if (BelowBlockShape.getSouthWestCorner() < BlockShape.CUBE_TOP_HEIGHT)
					NewShape.setSouthWestCorner(BlockShape.BELOW_CUBE_HEIGHT);


				setBlockShape(Coordinates, NewShape);
				if (NewShape.isEmpty()) {
					setBlockMaterial(Coordinates, DataManager.INVALID_INDEX);
				}

				for (Direction DirectionType : Direction.AXIAL_DIRECTIONS) {
					updateFace(Coordinates, DirectionType);
					MapCoordinate AdjacentCoords = Coordinates.clone();
					AdjacentCoords.translate(DirectionType);
					updateFace(AdjacentCoords, DirectionType.invert());
				}
				updateFace(Coordinates, Direction.DIRECTION_NONE);
				setBlockHidden(Coordinates, false);

				// check and push changes above
				MapCoordinate aboveBlock = Coordinates.clone();
				aboveBlock.translate(Direction.DIRECTION_UP);
				if (isBlockInitialized(aboveBlock)) {
					getBlockShape(aboveBlock, AboveBlockShape);
					BlockShape NewAboveShape = AboveBlockShape.clone();

					if (NewShape.getNorthEastCorner() < BlockShape.CUBE_TOP_HEIGHT) {
						if (AboveBlockShape.getNorthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getNorthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getSouthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
							NewAboveShape.setNorthEastCorner(BlockShape.BELOW_CUBE_HEIGHT);
					}

					if (NewShape.getSouthWestCorner() < BlockShape.CUBE_TOP_HEIGHT) {
						if (AboveBlockShape.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getNorthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getSouthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
							NewAboveShape.setSouthWestCorner(BlockShape.BELOW_CUBE_HEIGHT);
					}

					if (NewShape.getNorthWestCorner() < BlockShape.CUBE_TOP_HEIGHT) {
						if (AboveBlockShape.getNorthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getNorthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
							NewAboveShape.setNorthWestCorner(BlockShape.BELOW_CUBE_HEIGHT);
					}

					if (NewShape.getSouthEastCorner() < BlockShape.CUBE_TOP_HEIGHT) {
						if (AboveBlockShape.getNorthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getSouthEastCorner() == BlockShape.CUBE_BOTTOM_HEIGHT && AboveBlockShape.getSouthWestCorner() == BlockShape.CUBE_BOTTOM_HEIGHT)
							NewAboveShape.setSouthEastCorner(BlockShape.BELOW_CUBE_HEIGHT);
					}

					if (!AboveBlockShape.equals(NewAboveShape))
						setBlockShape(aboveBlock, NewAboveShape);
					if (NewAboveShape.isEmpty()) {
						setBlockMaterial(aboveBlock, DataManager.INVALID_INDEX);
					}

					for (Direction DirectionType : Direction.AXIAL_DIRECTIONS) {
						updateFace(aboveBlock, DirectionType);
					}
					updateFace(aboveBlock, Direction.DIRECTION_NONE);
					setBlockHidden(aboveBlock, false);
				}
			}

			// reveal tiles around
			//for(Direction DirectionType = COMPASS_DIRECTIONS_START; DirectionType < NUM_COMPASS_DIRECTIONS; ++DirectionType)
			//{
			//    setBlockHidden(MapCoordinates(Coordinates, DirectionType), false);
			//}
		}
	}

	public void updateFace(MapCoordinate TargetCoordinates, Direction DirectionType) {
		DataManager Data = DataManager.getDataManager();
		final short RoughWallID = Data.getLabelIndex("SURFACETYPE_ROUGH_WALL");
		final short RoughFloorID = Data.getLabelIndex("SURFACETYPE_ROUGH_FLOOR_1");

		MapCoordinate ModifiedCoordinates = TargetCoordinates.clone();
		ModifiedCoordinates.translate(DirectionType);

		if (!isBlockInitialized(ModifiedCoordinates)) {
			// Init it
			return;
		}

		getBlockShape(TargetCoordinates, TargetBlockShape);
		getBlockShape(ModifiedCoordinates, AdjacentBlockShape);
		Face TargetFace = getFace(TargetCoordinates, DirectionType);

		switch (DirectionType) {

			case DIRECTION_NONE:
				if (!TargetBlockShape.isEmpty() && !TargetBlockShape.isSolid()) {
					FaceShape NewShape = new FaceShape(TargetBlockShape, null, Direction.DIRECTION_NONE);
					if (TargetFace == null) {
						TargetFace = addFace(TargetCoordinates, Direction.DIRECTION_NONE, 0);
						TargetFace.setFaceShapeType(NewShape);
						TargetFace.setFaceSurfaceType(RoughFloorID);
						TargetFace.setFaceMaterialType(getBlockMaterial(TargetCoordinates));
						// Dirty Chunk if edge case
					} else {
						if (!TargetFace.getFaceShapeType().equals(NewShape)) {
							TargetFace.setFaceShapeType(NewShape);
							TargetFace.setFaceSurfaceType(RoughFloorID);
							TargetFace.setFaceMaterialType(getBlockMaterial(TargetCoordinates));
						}
					}
				} else {
					removeFace(TargetCoordinates, DirectionType);
				}
				break;

			case DIRECTION_DOWN:
				if (TargetBlockShape.hasFloor()) {
					FaceShape NewShape = new FaceShape(TargetBlockShape, AdjacentBlockShape, DirectionType);
					if (TargetFace == null) {
						TargetFace = addFace(TargetCoordinates, DirectionType, 0);
						TargetFace.setFaceMaterialType(getBlockMaterial(ModifiedCoordinates));
						TargetFace.setFaceSurfaceType(RoughFloorID);
						TargetFace.setFaceShapeType(NewShape);
					} else {
						if (!TargetFace.getFaceShapeType().equals(NewShape)) {
							TargetFace.setFaceMaterialType(getBlockMaterial(ModifiedCoordinates));
							TargetFace.setFaceSurfaceType(RoughFloorID);
							TargetFace.setFaceShapeType(NewShape);
						}
					}
				} else {
					removeFace(TargetCoordinates, DirectionType);
				}
				break;

			case DIRECTION_UP:
				if (AdjacentBlockShape.hasFloor()) {
					FaceShape NewShape = new FaceShape(TargetBlockShape, AdjacentBlockShape, DirectionType);
					if (TargetFace == null) {
						TargetFace = addFace(TargetCoordinates, DirectionType, 0);
						TargetFace.setFaceMaterialType(getBlockMaterial(TargetCoordinates));
						TargetFace.setFaceSurfaceType(RoughFloorID);
						TargetFace.setFaceShapeType(NewShape);
					} else {
						if (!TargetFace.getFaceShapeType().equals(NewShape)) {
							TargetFace.setFaceMaterialType(getBlockMaterial(TargetCoordinates));
							TargetFace.setFaceSurfaceType(RoughFloorID);
							TargetFace.setFaceShapeType(NewShape);
						}
					}
				} else {
					removeFace(TargetCoordinates, DirectionType);
				}
				break;

			case DIRECTION_EAST:
			case DIRECTION_WEST:
			case DIRECTION_NORTH:
			case DIRECTION_SOUTH:
				if (TargetBlockShape.hasFace(DirectionType)) {
					FaceShape NewShape = new FaceShape(TargetBlockShape, AdjacentBlockShape, DirectionType);
					if (TargetFace == null) {
						TargetFace = addFace(TargetCoordinates, DirectionType, 0);
						TargetFace.setFaceMaterialType(getBlockMaterial(TargetCoordinates));
						TargetFace.setFaceShapeType(NewShape);
						TargetFace.setFaceSurfaceType(RoughWallID);
					} else {
						if (!TargetFace.getFaceShapeType().equals(NewShape)) {
							TargetFace.setFaceMaterialType(getBlockMaterial(TargetCoordinates));
							TargetFace.setFaceShapeType(NewShape);
							TargetFace.setFaceSurfaceType(RoughWallID);
						}
					}
				} else {
					removeFace(TargetCoordinates, DirectionType);
				}
				break;

			default:
				break;
		}
	}

	public void releaseMap() {
		MapLoaded = false;

		Chunks.clear();
		Zones.clear();
	}

	public Zone createZone(ArrayList<VolumeSelection> Volumes) {
		Zone NewZone = new Zone(Volumes, Zones.size());
		Zones.add(NewZone);
		return NewZone;
	}

	public ArrayList<Zone> getZonesAt(MapCoordinate TestCoordinates) {
		ArrayList<Zone> Collection = new ArrayList<Zone>();
		for (Zone Z : Zones) {
			if (Z.isCoordinateInZone(TestCoordinates))
				Collection.add(Z);
		}
		return Collection;
	}

	public ArrayList<Zone> getZones() {
		return Zones;
	}

	public Collection<Chunk> getChunkCollection() {
		return Chunks.values();
	}
}