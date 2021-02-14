import { Comparable, Serializable } from "../other.js";

/**
 *
 * @author Dallas
 */
export class SaveGameHeader extends Comparable(Serializable()) {
    version = "";
    kingdomName = "";
    timeString = "";
    fileName = "";
    lastPlayed = new Date();

    constructor() {
        super();
    }
    toString() {
        return this.kingdomName;
    }
    compareTo(that) {
        return this.lastPlayed.valueOf() - that.lastPlayed.valueOf();
    }
}