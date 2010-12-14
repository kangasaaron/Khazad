/* Copyright 2010 Kenneth Ferland

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


#ifndef MAP__HEADER
#define MAP__HEADER

#include <stdafx.h>

#include <Coordinates.h>
#include <Renderer.h>


class Cell;
class Geology;
class Face;
class Zone;


class Map
{

public:

    Map();

	~Map();
	bool Init();

    bool isInitialized()        { return Initialized; }
    bool isMapLoaded()          { return MapLoaded; }

	Cell* getCell(CellCoordinates) const;
	Cell* getCubeOwner(MapCoordinates) const;

    std::map<uint64_t, Cell*>* getCellMap();
    bool insertCell(Cell* NewCell, CellCoordinates TargetCoordinates);
    bool initializeMapAtCoordinates(MapCoordinates NewCoords);

    bool isCubeInited(MapCoordinates) const;
    void setCellNeedsReDraw(CellCoordinates, bool NewValue);

    bool isCubeSloped(MapCoordinates Coordinates) const;

    void setCubeShape(MapCoordinates Coordinates, TileShape NewShape);
    TileShape getCubeShape(MapCoordinates Coordinates) const;

    void setCubeMaterial(MapCoordinates Coordinates, int16_t MaterialID);
    inline int16_t getCubeMaterial(MapCoordinates Coordinates) const;

    void setCubeSurfaceType(MapCoordinates Coordinates, int16_t SurfaceID);
    inline int16_t getCubeSurfaceType(MapCoordinates Coordinates) const;

    Face* getFace(MapCoordinates Coordinates, Direction DirectionType) const;
    bool hasFace(MapCoordinates Coordinates, Direction DirectionType) const;

    bool removeFace(MapCoordinates Coordinates, Direction DirectionType);
    Face* addFace(MapCoordinates Coordinates, Direction DirectionType);

    void setFaceMaterial(MapCoordinates Coordinates, Direction DirectionType, int16_t MaterialID);
    inline int16_t getFaceMaterial(MapCoordinates Coordinates, Direction DirectionType) const;

    void setFaceSurfaceType(MapCoordinates Coordinates, Direction DirectionType, int16_t SurfaceID);
    inline int16_t getFaceSurfaceType(MapCoordinates Coordinates, Direction DirectionType) const;
    void setBothFaceSurfaceTypes(MapCoordinates Coordinates, Direction DirectionType, int16_t SurfaceID);


    bool isCubeHidden(MapCoordinates Coordinates) const;
    void setCubeHidden(MapCoordinates Coordinates, bool NewValue);

    bool isCubeSubTerranean(MapCoordinates Coordinates) const;
    void setCubeSubTerranean(MapCoordinates Coordinates, bool NewValue);

    bool isCubeSkyView(MapCoordinates Coordinates) const;
    void setCubeSkyView(MapCoordinates Coordinates, bool NewValue);

    bool isCubeSunLit(MapCoordinates Coordinates) const;
    void setCubeSunLit(MapCoordinates Coordinates, bool NewValue);

    bool isCubeSolid(MapCoordinates Coordinates) const;
    void setCubeSolid(MapCoordinates Coordinates, bool NewValue);


    bool Load(std::string filename);
    void Save(std::string filename);

    void ReleaseMap();

    void DigChannel(MapCoordinates Coordinates);
    void DigSlope(MapCoordinates Coordinates);
    void Dig(MapCoordinates Coordinates);
    void Fill(MapCoordinates Coordinates, int16_t MaterialID);

    uint32_t getCellCount() const             { return Cells.size(); }
    uint32_t getFaceCount() const             { return FaceCount; }


    MapCoordinates getRayIntersection(Ogre::Ray MouseRay) const;
    //MapCoordinates getMapCenter() const;

    Zone* getZone() const;
    void addZone(Zone* NewZone);
    void setActiveZone(Zone* ActivatedZone);
    Zone* getActiveZone()                          { return ActiveZone; }
    void DeactivateZone()                          { ActiveZone = NULL; }

    Zone* getZoneAt(MapCoordinates TestCoordinates);

protected:

    bool Initialized;
    bool MapLoaded;

    std::map<uint64_t, Cell*> Cells;

    uint32_t HighestCell;
    uint32_t LowestCell;

    std::vector<Zone*> Zones;

    Zone* ActiveZone;

    uint32_t FaceCount;
};

#endif // MAP__HEADER
