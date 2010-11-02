#ifndef GAME__HEADER
#define GAME__HEADER

#include <stdafx.h>

#include <Singleton.h>

class Actor;
class Pawn;
class Tree;
class Map;

class MapCoordinates;

class Game
{
DECLARE_SINGLETON_CLASS(Game)

public:

	~Game();
	bool Init();
	bool Run();


    void changeTickRate(int32_t RateChange);
    void setTickRate(uint32_t NewRate);

    uint32_t getTickCount()      { return TickCounter; }
    uint32_t getTickRate()       { return TickRate; }

    void togglePause()              { Pause = !Pause; }
    void setPause(bool NewState)    { Pause = NewState; }

    Map* getMap()               { return MainMap; }

protected:

    uint32_t TickCounter;  // Simulation time units
    uint32_t TickRate;     // Simulation Rate;
    bool Pause;

    Map* MainMap;
};

#define GAME (Game::GetInstance())

#endif // GAME__HEADER
