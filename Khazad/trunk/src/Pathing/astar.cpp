#include <vector>
#include <algorithm>
#include <memory>
#include <unordered_set>

#include <astar.h>
#include <Path.h>


/*

typedef std::shared_ptr<AStarEntry> AStarEntryPtr;

FullPath AStar::doFindPath (const MapCoordinates &StartCoordinates, const MapCoordinates &GoalCoordinates)
{
    entryGreaterThan egt(GoalCoordinates, MainHeuristic);
    std::vector<AStarEntryPtr> fringe;
    std::unordered_set<MapCoordinates, MapCoordinates::hash> visited;

    std::make_heap(fringe.begin(), fringe.end(),egt);

    fringe.push_back(AStarEntryPtr(new AStarEntry(StartCoordinates, 0)));
    std::push_heap(fringe.begin(),fringe.end(),egt);

    while (!fringe.empty())
    {
        //Get the min-weight element off the fringe.
        std::pop_heap(fringe.begin(),fringe.end(), egt);
        AStarEntryPtr e = fringe.back();
        fringe.pop_back();
        count++;

        if (visited.find(e->v_) != visited.end())
            continue;

        // if it's the destination, congratuations, we win a prize!
        if (e->v_ == GoalCoordinates)
        {
            e->path_.push_back(GoalCoordinates);
            return FullPath(e->cost_,e->path_);
        }

        // mark it visited if not already visited
        visited.insert(e->v_);

        // relax neighbours
        GridGraph::iterator end = SearchGraph->end(e->v_);
        for (GridGraph::iterator nit = SearchGraph->begin(e->v_); nit != end; ++nit)
        {
            point neigh = *nit;

            // try to find ey in the visited set
            if (visited.find(neigh) != visited.end())
                continue;

            cost_t cost = SearchGraph->edgeCost(e->v_,neigh);
            if (cost < 0)
                continue; //Not valid edge

            AStarEntryPtr eneigh(new AStarEntry(neigh, *e, e->cost_ + cost, (*TieBreakerHeuristic)(neigh,GoalCoordinates)));

#if 0
            typedef std::vector<AStarEntryPtr>::iterator eiterator;
            // try to find neigh in the fringe
            eiterator it = std::find(fringe.begin(), fringe.end(), eneigh);
            if (it != fringe.end())
            {
                // it's here, we just haven't gotten there yet; decrease_key if applicable
                if (eneigh->cost_ < (*it)->cost_)
                {
                    //printf("decreasing node cost (%2d,%2d,%2d)\n",neigh[0],neigh[1],neigh[2]);
                    fringe.erase(it);
                    fringe.push_back(eneigh);
                    std::make_heap(fringe.begin(),fringe.end(),egt);
                }
                continue;
            }
#endif
            // ey was found neither in the fringe nor in visited; add it to the fringe
            fringe.push_back(eneigh);
            std::push_heap(fringe.begin(),fringe.end(),egt);
        } // end loop over neighbours
    } // end loop over fringe
    return FullPath(-1, std::vector<point>());
}

class scopedAddBorderNode
{
public:
    scopedAddBorderNode(zone *z, const point &p, const Heuristic *h) : z_(z), zoneModified(false)
    {
        zbn_ = z->get(p);
        if (zbn_ == NULL)
        {
//          fprintf(stderr,"adding bordernode: (%2d,%2d,%2d)\n",p[0],p[1],p[2]);
            zbn_ = z->addBorderNode(p,h);
            zoneModified = true;
        }
//        else
//          fprintf(stderr,"Using bordernode: (%2d,%2d,%2d)\n",p[0],p[1],p[2]);
    }

    ~scopedAddBorderNode()
    {
        if (zoneModified)
            z_->removeBorderNode(zbn_);
#ifdef ZONE_DEBUG
        z_->checkValid();
#endif
    }

private:
    zone* z_;
    zoneBorderNode* zbn_;
    bool zoneModified;
};

typedef std::shared_ptr<AStarZoneEntry> AStarZoneEntryPtr;

FullPath HierarchicalAStar::doFindPath (const MapCoordinates &StartCoordinates, const MapCoordinates &GoalCoordinates)
{
    zone *zoneS = zm_->findContainingZone(StartCoordinates);
    zone *zoneT = zm_->findContainingZone(GoalCoordinates);

    if ((zoneS == NULL) || (zoneT == NULL))
        return FullPath(-1,std::vector<point>());

    //add source and dest to zone
    scopedAddBorderNode sbs(zoneS, StartCoordinates, MainHeuristic), sbt(zoneT, GoalCoordinates, MainHeuristic);

    zoneBorderNode* bs = zoneS->get(StartCoordinates);
    zoneBorderNode* bt = zoneT->get(GoalCoordinates);

    entryGreaterThan egt(GoalCoordinates, MainHeuristic);
    std::vector<AStarZoneEntryPtr> fringe;
    std::unordered_set<point,point::hash> visited;

    std::make_heap(fringe.begin(), fringe.end(),egt);

    adjacentNode ans = adjacentNode(bs,0);
    ans.cache_.push_back(StartCoordinates);
    ans.cache_.push_back(StartCoordinates);

    fringe.push_back(AStarZoneEntryPtr(new AStarZoneEntry(&ans,0)));
    std::push_heap(fringe.begin(),fringe.end(),egt);

    while (!fringe.empty())
    {
        // Get the min-weight element off the fringe.
        std::pop_heap(fringe.begin(),fringe.end(),egt);
        AStarZoneEntryPtr e = fringe.back();
        fringe.pop_back();

        if ((visited.find(*e->node_) != visited.end()) || (!SearchGraph->contains(*e->node_)))
            continue;

        if (!e->cached())
        {
            //cachemiss++;
            //no cached path. (current cost is only an estimate)

            FullPath cpath(-1,std::vector<MapCoordinates>());
            //find the path, cache it
            ZonedGridGraph zgg(SearchGraph,zm_->findContainingZone(e->getPoint()));
            if (zm_->down() == NULL)
            {
                AStar lastar(&zgg,MainHeuristic,TieBreakerHeuristic);
                cpath = lastar.doFindPath(e->path_.back(),e->getPoint());
                count += lastar.getCount();
            }
            else
            {
                HierarchicalAStar dastar(&zgg,zm_->down(),MainHeuristic,TieBreakerHeuristic);
                cpath = dastar.doFindPath(e->path_.back(),e->getPoint());
                count += dastar.getCount();
                //cachemiss += dastar.cachemiss;
            }

            e->node_->cache_ = cpath.PathCourse; //update the cache!
            e->node_->cost_ = cpath.Length;

            //point p = e->getPoint();
            point q = e->path_.back();
            printf("Examine: (%2d,%2d,%2d)->(%2d,%2d,%2d) - %d:%d\n",q[0],q[1],q[2],p[0],p[1],p[2],e->path_.size()+cpath.second.size()-1,e->cost_+cpath.first);
            std::vector<point>::iterator it = e->path_.begin();
            it++;
            for (; it != e->path_.end(); it++)
              printf("(%2d,%2d,%2d)->",(*it)[0],(*it)[1],(*it)[2]);
            for (it = cpath.second.begin(); it != cpath.second.end(); it++)
              printf("(%2d,%2d,%2d)->",(*it)[0],(*it)[1],(*it)[2]);
            printf(": %d\n",e->cost_+cpath.first);

            //if disconnected, ignore it
            if (cpath.Length >= 0)
            {
                //now let's try again with the real cost
                fringe.push_back(e);
                std::push_heap(fringe.begin(),fringe.end(),egt);
            }
            continue;
        }

        count++;

        // if it's the destination, congratuations, we win a prize!
        if (e->getPoint() == GoalCoordinates)
        {
            e->path_.insert(e->path_.end(), ++e->node_->cache_.begin(),e->node_->cache_.end());
            return FullPath(e->value(GoalCoordinates,*MainHeuristic),e->path_);
        }

        // mark it visited if not already visited
        visited.insert(e->getPoint());
        assert(*e->node_ == *e->node_->node_);

        e->node_->node_->checkValid();
        // relax neighbours
        for (zoneBorderNode::iterator nit = e->node_->node_->begin(); nit != e->node_->node_->end(); ++nit)
        {
            adjacentNode *neigh = *nit;

            //printf("%d: (%2d,%2d,%2d)->(%2d,%2d,%2d) ~ %d=? ",e->node_->cost_,(*e->node_)[0],(*e->node_)[1],(*e->node_)[2],(*neigh)[0],(*neigh)[1],(*neigh)[2],neigh->cost_);

            // try to find ey in the visited set
            if (visited.find(*neigh) != visited.end())
            {
                //printf("No -- visited\n");
                continue;
            }

            if (neigh->cost_ < 0)
            {
                //printf("No -- not an edge\n");
                continue; //Not valid edge
            }

            assert(neigh != e->node_);

            AStarZoneEntryPtr eneigh (new AStarZoneEntry(neigh, *e, (*TieBreakerHeuristic)(*neigh,GoalCoordinates)));

#if 0
            typedef std::vector<AStarZoneEntryPtr>::iterator eiterator;
            // try to find neigh in the fringe
            eiterator it = std::find(fringe.begin(), fringe.end(), eneigh);
            if (it != fringe.end())
            {
                // it's here, we just haven't gotten there yet; decrease_key if applicable
                //if both cached or shortest one cached, choose shortest
                if ((eneigh->value(t,*MainHeuristic) < (*it)->value(t,*MainHeuristic)) && (eneigh->cached()))
                {
                    //printf("Zdecreasing node cost (%2d,%2d,%2d)\n",(*neigh)[0],(*neigh)[1],(*neigh)[2]);
                    fringe.erase(it);
                    fringe.push_back(eneigh);
                    std::make_heap(fringe.begin(),fringe.end(),egt);
                }
                else
                {
                    //else we have to keep both =(
                    //printf("Not yet\n");
                    fringe.push_back(eneigh);
                    std::push_heap(fringe.begin(), fringe.end(), egt);
                }
                continue;
            }
#endif

            //printf("Ok\n");
            // ey was found neither in the fringe nor in visited; add it to the fringe

            fringe.push_back(eneigh);
            std::push_heap(fringe.begin(),fringe.end(),egt);
        } // end loop over neighbours
    } // end loop over fringe
    return FullPath(-1,std::vector<point>());
}
*/