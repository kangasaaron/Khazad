import {
    createNewSubInterface
} from "./interface.js";
import {
    Collection
} from "./Collection.js";

export const Queue = createNewSubInterface(Collection, "Queue", "element", "offer", "peek", "poll");