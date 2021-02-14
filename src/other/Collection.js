import {
    createNewSubInterface
} from "./interface.js";
import {
    Iterable
} from "./Iterable.js";

export const Collection = createNewSubInterface(Iterable, "Collection",
    "add",
    "addAll",
    "clear",
    "contains",
    "containsAll",
    "equals",
    "hashCode",
    "isEmpty",
    "remove",
    "removeAll",
    "retainAll",
    "size",
    "toArray"
);