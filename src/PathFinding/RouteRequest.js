import { MapCoordinate, Zone } from "../Map.js";
import { Serializable } from "../other.js";

/**
 * Encapsulation of all the data needed for all types of routes that might be
 * needed, basicly a struct with all public members
 *
 * @author Impaler
 */
export class RouteRequest extends Serializable() {
    constructor() {
        super();
        this.Start = new MapCoordinate();
        this.Goal = new MapCoordinate();
        this.GoalZone = new Zone();
    }
}