import {
    createNewSubInterface
} from "./interface.js";
import {
    Queue
} from "./Queue.js";

export const Deque = createNewSubInterface(Queue, "Deque",
    "addFirst",
    "addLast",
    "descendingIterator",
    "getFirst",
    "getLast",
    "offerFirst",
    "offerLast",
    "peekFirst",
    "peekLast",
    "pollFirst",
    "pollLast",
    "pop",
    "push",
    "removeFirst",
    "removeFirstOccurance",
    "removeLast",
    "removeLastOccurance"
);