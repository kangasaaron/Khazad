import {
    Deque
} from "../other.js";
/**
 *
 * @author Impaler
 */
// insertFront
// isEmpty
// clear
// size
// removeLast
// removeFirst

export class LinkedListDeque{
    _storage = [];
    constructor(){
        this._storage = [];
    }
    insertFront(item){
        this._storage.unshift(item);
    }
    isEmpty(){
        return this._storage.length === 0;
    }
    clear(){
        this._storage = [];
    }
    size(){
        return this._storage.length;
    }
    removeLast(){
        return this._storage.pop();
    }
    removeFirst(){
        return this._storage.shift();
    }
}

// class ReverseIterator{
//     _array = null;
//     _index = 0;
//     constructor(array){
//         this._array = array;
//         this._index = index.length;
//     }
//     next(){
//         this._index--;
//         return {
//             done: this._index < 0,
//             value: this._array[this._index]
//         };
//     }
// }


// export class LinkedListDeque extends Deque(Array) {
//     // from iterable
//     iterator() {
//         return super[Symbol.iterator]();
//     }
//     // from collection
//     add(item) {
//         super.push(item);
//     }
//     addAll(...items) {
//         super.push(...items);
//     }
//     clear() {
//         super.splice(0, this.length);
//     }
//     contains(item) {
//         return super.includes(item);
//     }
//     containsAll(...items) {
//         return items.every(item => super.includes(item));
//     }
//     equals(that) {
//         if (super.length !== that.length) return false;
//         return super.every(function (item, index) {
//             return that[index] == item;
//         });
//     }
//     isEmpty() {
//         return super.length === 0;
//     }
//     remove(item) {
//         if (item)
//             return this.removeFirstOccurance(item);
//         return this.removeFirst();
//     }
//     removeAll(that){
//         let changed = false;
//         that.map(function(item){
//             let i = super.indexOf(item)
//             if(i > -1){
//                 changed = true;
//                 super.splice(i,1);
//             }
//         });
//         return changed;
//     }
//     retainAll(that){
//         let toRemove = this.reduce(function(toRemove,item,i){
//             if(!that.includes(item)) 
//                 toRemove.push(i);
//             return toRemove;            
//         },[]);
//         toRemove.map(index => super.splice(index,1));
//     }
//     size() {
//         return super.length;
//     }
//     toArray(){
//         return Array.from(this);
//     }
    
//     // from queue
//     element() {
//         return super[0];
//     }
//     offer(item){
//         super.push(item);
//     }
//     peek(){
//         return this.isEmpty() ? null : super[0];
//     }
//     poll() {
//         return this.isEmpty() ? null : super.shift();
//     }

//     // from deque
//     addFirst(item){
//         super.unshift(item);
//     }
//     addLast(item){
//         super.push(item);
//     }
//     descendingIterator(){
//         return new ReverseIterator(this);
//     }
//     getFirst(){
//         return this.element();
//     }
//     getLast(){
//         return super[super.length-1];
//     }
//     offerFirst(item){
//         this.addFirst(item);
//     }
//     offerLast(item){
//         this.addLast(item);
//     }
//     peekFirst(){
//         return this.element();
//     }
//     peekLast(){
//         return this.getLast();
//     }
//     pollFirst() {
//         return this.poll();
//     }
//     pollLast() {
//         return super.pop();
//     }
//     pop(){
//         return super.shift();
//     }
//     push(item){
//         return super.unshift(item);
//     }
//     removeFirst() {
//         if (this.isEmpty())
//             throw new ReferenceError("Cannot remove the first item of an empty Deque");
//         return this.pollFirst();
//     }
//     removeFirstOccurance(item){
//         let i = super.indexOf(item);
//         if(i > -1)
//             this.splice(i,1);
//         return (i > -1);
//     }
//     removeLast() {
//         if (this.isEmpty())
//             throw new ReferenceError("Cannot remove the first item of an empty Deque");
//         return this.pollLast();
//     }
//     removeLastOccurance(item){
//         let i = super.lastIndexOf(item);
//         if(i > -1)
//             this.splice(i,1);
//         return (i > -1);
//     }
// }

// LinkedListDeque.Node = class Node {
//     Data = null;
//     next = null;
//     prior = null;
// }