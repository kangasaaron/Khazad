import { Comparable, Serializable } from "../other.js";

/**
 *
 * @author Dallas
 */
export class SaveGameHeader extends Comparable(Serializable()) {
    constructor() {
        super();
        this.version = "";
        this.kingdomName = "";
        this.timeString = "";
        this.fileName = "";
        this.lastPlayed = new Date();
    }
    toString() {
        return this.kingdomName;
    }
    compareTo(that) {
        return this.lastPlayed.valueOf() - that.lastPlayed.valueOf();
    }
}