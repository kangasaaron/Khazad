#include <Map.h>


//#include <TextureManager.h>
#include <DataManager.h>
//#include <Gui.h>
//#include <Extractor.h>
#include <Renderer.h>

#include <Cell.h>
//#include <Random.h>
//#include <Building.h>
//#include <Tree.h>
//#include <Game.h>

//#include <map>

Map::Map()
{
    Initialized = false;

    MapSizeX = 0;
    MapSizeY = 0;
    MapSizeZ = 0;

    CellSizeX = 0;
    CellSizeY = 0;
    CellSizeZ = 0;

    CellCount = 0;
    FaceCount = 0;

    InitedCellCount = 0;

    //TreeMan = NULL;
}

Map::~Map()
{
    if(MapLoaded)
    {
        ReleaseMap();
    }
}

bool Map::Init()
{
    Initialized = true;
    MapLoaded = false;

    return true;
}

bool Map::Generate(Geology* RegionGeology)
{
    CellSizeX = 3;
    CellSizeY = 3;

    MapSizeX = CellSizeX * CELLEDGESIZE;
    MapSizeY = CellSizeY * CELLEDGESIZE;
    //MapSizeZ = CellSizeZ;

    // Create and add Cells with shape and material data
    for (uint16_t X = 0; X < CellSizeX; X++)
    {
        for (uint16_t Y = 0; Y < CellSizeX; Y++)
        {
            int Z = 0; //get From Geology

            CellCoordinates TargetCellCoordinates = CellCoordinates(X, Y, Z);
            Cell* NewCell = new Cell();
            NewCell->setPosition(TargetCellCoordinates);

            addCell(NewCell, TargetCellCoordinates);
            NewCell->LoadCellData(MapGeology);
        }
    }

    // Initialize Faces for the cells
    for(std::map<uint64_t, Cell*>::iterator CellIterator = Cells.begin() ; CellIterator != Cells.end(); ++CellIterator )
    {
        CellIterator->second->Init();
    }

    return true;
}

uint64_t Map::GenerateCellKey(CellCoordinates KeyCoords) const
{
    uint64_t Key = KeyCoords.X;
    Key <<= 16;
    Key += KeyCoords.Y;
    Key <<= 16;
    Key += KeyCoords.Z;

    return Key;
}

Cell* Map::getCell(CellCoordinates TestCoords) const
{
    uint64_t Key = GenerateCellKey(TestCoords);

    if (Cells.find(Key) == Cells.end())
    {
        return NULL;
    }
    else
    {
        return Cells.find(Key)->second;
    }
}

bool Map::addCell(Cell* NewCell, CellCoordinates TargetCoordinates)
{
    if (getCell(TargetCoordinates) == NULL)
    {
        uint64_t Key = GenerateCellKey(TargetCoordinates);
        Cells[Key] = NewCell;
        return true;
    }
    return false;  // A Cell already exists at that spot
}

std::map<uint64_t, Cell*>* Map::getCellMap()
{
    return &Cells;
}

Cell* Map::getCubeOwner(MapCoordinates Coordinates) const
{
    if ((Coordinates.X > MapSizeX) || (Coordinates.Y > MapSizeY) || (Coordinates.Z > MapSizeZ)) //TODO better more flexible limit check
    {
        return NULL;
    }

    CellCoordinates TargetCellCoordinates = CellCoordinates(Coordinates);

    return getCell(TargetCellCoordinates);
}

bool Map::isCubeInited(MapCoordinates Coordinates) const
{
    return getCubeOwner(Coordinates) != NULL;
}

void Map::setCellNeedsReDraw(CellCoordinates Coordinates, bool NewValue)
{
    Cell* TargetCell = getCell(Coordinates);

    if (TargetCell != NULL)
    {
        TargetCell->setNeedsRedraw(NewValue);
    }
}

bool Map::Load(string filename)
{
    return false;
}

void Map::Save(string filename)
{
    return;
}

Face* Map::getFace(MapCoordinates Coordinates, Direction DirectionType) const
{
    MapCoordinates TargetMapCoordinates = Coordinates;
    Direction TargetFace = DirectionType;

    if (isDirectionPositive(DirectionType)) // East, South and Top Directions get translated to adjacent Cells avoiding a bounce back call
    {
        // Do something for edge of Map cases??
        TargetMapCoordinates.TranslateMapCoordinates(DirectionType);
        TargetFace = OppositeDirection(TargetFace);
    }

    CellCoordinates TargetCellCoordinates = CellCoordinates(TargetMapCoordinates);
    Cell* TargetCell = getCell(TargetCellCoordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->getFace(CubeCoordinates(TargetMapCoordinates), TargetFace);
    }
    return NULL;
}

bool Map::hasFace(MapCoordinates Coordinates, Direction DirectionType) const
{
    MapCoordinates TargetMapCoordinates = Coordinates;
    Direction TargetFace = DirectionType;

    if (isDirectionPositive(DirectionType)) // East, South and Top Directions get translated to adjacent Cells avoiding a bounce back call
    {
        // Do something for edge of Map cases??
        TargetMapCoordinates.TranslateMapCoordinates(DirectionType);
        TargetFace = OppositeDirection(TargetFace);
    }

    CellCoordinates TargetCellCoordinates = CellCoordinates(TargetMapCoordinates);
    Cell* TargetCell = getCell(TargetCellCoordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->hasFace(CubeCoordinates(TargetMapCoordinates), TargetFace);
    }
    return false;
}

bool Map::removeFace(MapCoordinates Coordinates, Direction DirectionType)
{
    MapCoordinates TargetMapCoordinates = Coordinates;
    Direction TargetFace = DirectionType;

    if (isDirectionPositive(DirectionType)) // East, South and Top Directions get translated to adjacent Cells avoiding a bounce back call
    {
        // Do something for edge of Map cases??
        TargetMapCoordinates.TranslateMapCoordinates(DirectionType);
        TargetFace = OppositeDirection(TargetFace);
    }

    CellCoordinates TargetCellCoordinates = CellCoordinates(TargetMapCoordinates);
    Cell* TargetCell = getCell(TargetCellCoordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->removeFace(CubeCoordinates(TargetMapCoordinates), TargetFace);
    }

    return false;
}

Face* Map::addFace(MapCoordinates Coordinates, Direction DirectionType)
{
    MapCoordinates TargetMapCoordinates = Coordinates;
    Direction TargetFace = DirectionType;

    if (isDirectionPositive(DirectionType)) // East, South and Top Directions get translated to adjacent Cells avoiding a bounce back call
    {
        // Do something for edge of Map cases??
        TargetMapCoordinates.TranslateMapCoordinates(DirectionType);
        TargetFace = OppositeDirection(TargetFace);
    }

    CellCoordinates TargetCellCoordinates = CellCoordinates(TargetMapCoordinates);
    Cell* TargetCell = getCell(TargetCellCoordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->addFace(CubeCoordinates(TargetMapCoordinates), TargetFace);
    }

    return false;
}

bool Map::isCubeSloped(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        return TargetCell->isCubeSloped(CubeCoordinates(Coordinates));
    }
    return false;
}

void Map::setCubeShape(MapCoordinates Coordinates, int16_t TileShape)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if (TargetCell != NULL)
    {
        TargetCell->setCubeShape(CubeCoordinates(Coordinates), TileShape);
    }
}

int16_t Map::getCubeShape(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->getCubeShape(CubeCoordinates(Coordinates));
    }
    return -1;
}

void Map::setCubeMaterial(MapCoordinates Coordinates, int16_t MaterialID)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if (TargetCell != NULL)
    {
        TargetCell->setCubeMaterial(CubeCoordinates(Coordinates), MaterialID);
    }
}

inline int16_t Map::getCubeMaterial(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->getCubeMaterial(CubeCoordinates(Coordinates));
    }
    return -1;
}

void Map::setCubeSurfaceType(MapCoordinates Coordinates, int16_t SurfaceID)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if (TargetCell != NULL)
    {
        TargetCell->setCubeSurface(CubeCoordinates(Coordinates), SurfaceID);
    }
}

inline int16_t Map::getCubeSurfaceType(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if (TargetCell != NULL)
    {
        return TargetCell->getCubeSurface(CubeCoordinates(Coordinates));
    }
    return -1;
}

void Map::setFaceMaterial(MapCoordinates Coordinates, Direction DirectionType, int16_t MaterialID)
{
    Face* TargetFace = getFace(Coordinates, DirectionType);

    if (TargetFace != NULL)
    {
        TargetFace->MaterialTypeID = MaterialID;

        // TODO Set needs draw on Cell??
    }
}

inline int16_t Map::getFaceMaterial(MapCoordinates Coordinates, Direction DirectionType) const
{
    Face* TargetFace = getFace(Coordinates, DirectionType);

    if (TargetFace != NULL)
    {
        return TargetFace->MaterialTypeID;
    }
    return -1;
}

void Map::setFaceSurfaceType(MapCoordinates Coordinates, Direction DirectionType, int16_t SurfaceID)
{
    Face* TargetFace = getFace(Coordinates, DirectionType);

    if (TargetFace != NULL)
    {
        if (isDirectionPositive(DirectionType))
        {
            TargetFace->NegativeAxisSurfaceTypeID = SurfaceID;
        }
        else
        {
            TargetFace->PositiveAxisSurfaceTypeID = SurfaceID;
        }
        // TODO Set needs draw on Cell??
    }
}

void Map::setBothFaceSurfaceTypes(MapCoordinates Coordinates, Direction DirectionType, int16_t SurfaceID)
{
    Face* TargetFace = getFace(Coordinates, DirectionType);

    if (TargetFace != NULL)
    {
        TargetFace->NegativeAxisSurfaceTypeID = SurfaceID;
        TargetFace->PositiveAxisSurfaceTypeID = SurfaceID;
        // TODO Set needs draw on Cell??
    }
}

inline int16_t Map::getFaceSurfaceType(MapCoordinates Coordinates, Direction DirectionType) const
{
    Face* TargetFace = getFace(Coordinates, DirectionType);

    if (TargetFace != NULL)
    {
        if (isDirectionPositive(DirectionType))
        {
            return TargetFace->NegativeAxisSurfaceTypeID;
        }
        else
        {
            return TargetFace->PositiveAxisSurfaceTypeID;
        }
    }
    return -1;
}

bool Map::isCubeHidden(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        return TargetCell->isCubeHidden(CubeCoordinates(Coordinates));
    }
    return false;
}

void Map::setCubeHidden(MapCoordinates Coordinates, bool NewValue)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        TargetCell->setCubeHidden(CubeCoordinates(Coordinates), NewValue);
    }
}

bool Map::isCubeSubTerranean(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        return TargetCell->isCubeSubTerranean(CubeCoordinates(Coordinates));
    }
    return false;
}

void Map::setCubeSubTerranean(MapCoordinates Coordinates, bool NewValue)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        TargetCell->setCubeSubTerranean(CubeCoordinates(Coordinates), NewValue);
    }
}

bool Map::isCubeSkyView(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        return TargetCell->isCubeSkyView(CubeCoordinates(Coordinates));
    }
    return false;
}

void Map::setCubeSkyView(MapCoordinates Coordinates, bool NewValue)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        TargetCell->setCubeSkyView(CubeCoordinates(Coordinates), NewValue);
    }
}

bool Map::isCubeSunLit(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        return TargetCell->isCubeSunLit(CubeCoordinates(Coordinates));
    }
    return false;
}

void Map::setCubeSunLit(MapCoordinates Coordinates, bool NewValue)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        TargetCell->setCubeSunLit(CubeCoordinates(Coordinates), NewValue);
    }
}

bool Map::isCubeSolid(MapCoordinates Coordinates) const
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        return TargetCell->isCubeSolid(CubeCoordinates(Coordinates));
    }
    return false;
}

void Map::setCubeSolid(MapCoordinates Coordinates, bool NewValue)
{
    Cell* TargetCell = getCubeOwner(Coordinates);

    if(TargetCell != NULL)
    {
        TargetCell->setCubeSolid(CubeCoordinates(Coordinates), NewValue);
    }
}

void Map::DigChannel(MapCoordinates Coordinates)
{
    Dig(Coordinates);
    setCubeShape(Coordinates, DATA->getLabelIndex("TILESHAPE_EMPTY"));

    // reveal tiles around
    for(Direction DirectionType = COMPASS_DIRECTIONS_START; DirectionType < NUM_COMPASS_DIRECTIONS; ++DirectionType)
    {
        setCubeHidden(MapCoordinates(Coordinates, DirectionType), false);
    }

    Dig(MapCoordinates(Coordinates, DIRECTION_DOWN));

    removeFace(Coordinates, DIRECTION_DOWN);
}

void Map::DigSlope(MapCoordinates Coordinates)
{
    static int16_t RampID = DATA->getLabelIndex("TILESHAPE_RAMP");

    Dig(Coordinates);

    // reveal tiles around
    for(Direction DirectionType = COMPASS_DIRECTIONS_START; DirectionType < NUM_COMPASS_DIRECTIONS; ++DirectionType)
    {
        setCubeHidden(MapCoordinates(Coordinates, DirectionType), false);
    }

    DigChannel(MapCoordinates(Coordinates, DIRECTION_UP));
    setCubeShape(Coordinates, RampID);

    setCubeMaterial(Coordinates, getFaceMaterial(Coordinates, DIRECTION_DOWN));
    setCubeSurfaceType(Coordinates, getFaceSurfaceType(Coordinates, DIRECTION_DOWN));
}

void Map::Dig(MapCoordinates Coordinates)
{
    static int16_t FloorID = DATA->getLabelIndex("TILESHAPE_FLOOR");
    static int16_t RoughWallID = DATA->getLabelIndex("SURFACETYPE_ROUGH_WALL");
    static int16_t RoughFloorID = DATA->getLabelIndex("SURFACETYPE_ROUGH_FLOOR_1");

    if (isCubeInited(Coordinates))
    {
        if(isCubeSolid(Coordinates) || isCubeSloped(Coordinates))
        {
            for(Direction DirectionType = AXIAL_DIRECTIONS_START; DirectionType < NUM_AXIAL_DIRECTIONS; ++DirectionType)
            {
                MapCoordinates ModifiedCoordinates = Coordinates;
                ModifiedCoordinates.TranslateMapCoordinates(DirectionType);

                if (DirectionType == DIRECTION_DOWN)
                {
                    if (isCubeSolid(ModifiedCoordinates))
                    {
                        Face* TargetFace = getFace(Coordinates, DirectionType);
                        if (TargetFace == NULL)
                        {
                            TargetFace = addFace(Coordinates, DIRECTION_DOWN);
                        }

                        TargetFace->MaterialTypeID = getCubeMaterial(ModifiedCoordinates);
                        TargetFace->NegativeAxisSurfaceTypeID = RoughFloorID;
                        TargetFace->PositiveAxisSurfaceTypeID = RoughFloorID;
                    }
                    else
                    {
                        removeFace(Coordinates, DirectionType);
                    }
                }
                else
                {
                    if (isCubeSolid(ModifiedCoordinates))
                    {
                        Face* TargetFace = getFace(Coordinates, DirectionType);
                        if (TargetFace == NULL)
                        {
                            TargetFace = addFace(Coordinates, DirectionType);
                        }

                        TargetFace->MaterialTypeID = getCubeMaterial(ModifiedCoordinates);
                        TargetFace->NegativeAxisSurfaceTypeID = getCubeSurfaceType(ModifiedCoordinates);
                        TargetFace->PositiveAxisSurfaceTypeID = getCubeSurfaceType(ModifiedCoordinates);
                    }
                    else
                    {
                        removeFace(Coordinates, DirectionType);
                    }
                }
            }

            setCubeHidden(Coordinates, false);
            setCubeShape(Coordinates, FloorID);

            setCubeMaterial(Coordinates, -1);
        }

        // reveal tiles around
        for(Direction DirectionType = COMPASS_DIRECTIONS_START; DirectionType < NUM_COMPASS_DIRECTIONS; ++DirectionType)
        {
            setCubeHidden(MapCoordinates(Coordinates, DirectionType), false);
        }
    }
}

MapCoordinates Map::getMapCenter() const
{
    MapCoordinates CenterPoint;

    CenterPoint.X = getMapSizeX() / 2;
    CenterPoint.Y = getMapSizeY() / 2;
    CenterPoint.Z = getMapSizeZ();

    return CenterPoint;
}

void Map::ReleaseMap()
{
    MapLoaded = false;

    Cells.clear();
}
