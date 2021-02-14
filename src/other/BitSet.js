import { Types } from "./Types.js";



export class BitSet {
    constructor(length = 0) {
        this._storage = new Array(length).fill(false);
    }
    nextSetBit(fromIndex = 0) {
        for (let i = fromIndex; i < this._storage.length; i++) {
            if (this.get(i))
                return i;
        }
        return -1;
    }
    nextClearBit(fromIndex = 0) {
        for (let i = fromIndex; i < this._storage.length; i++) {
            if (!this.get(i))
                return i;
        }
        return -1;
    }
    previousSetBit(fromIndex = this._storage.length - 1) {
        for (let i = fromIndex; i >= 0; i--) {
            if (this.get(i))
                return i;
        }
        return -1;
    }
    previousClearBit(fromIndex = this._storage.length - 1) {
        for (let i = fromIndex; i >= 0; i--) {
            if (!this.get(i))
                return i;
        }
        return -1;
    }

    toString() {
        let result = [];
        for (let i = 0; i < this._storage; i++) {
            if (this.get(i))
                result.push(i);
        }
        return `{${result.join(",")}}`
    }
    clone() {
        let result = new BitSet(this.size);
        result.or(this);
        return result;
    }
    equals(that) {
        Types.mustBe(BitSet, that);
        let end = Math.max(this.size, that.size);
        for (let i = 0; i < end; i++) {
            if (this.get(i) !== that.get(i))
                return false;
        }
        return true;
    }
    size() {
        return this._storage.length;
    }
    and(that) {
        Types.mustBe(BitSet, that);
        for (let i = 0; i < this._storage.length; i++) {
            if (!(this.get(i) && that.get(i)))
                this.clear(i);
        }
    }
    andNot(that) {
        Types.mustBe(BitSet, that);
        for (let i = 0; i < this._storage.length; i++) {
            if (that.get(i))
                this.clear(i);
        }
    }
    xor(that) {
        Types.mustBe(BitSet, that);
        for (let i = 0; i < this._storage.length; i++) {
            if ((this.get(i) && !(that.get(i))) || !(this.get(i) && that.get(i)))
                this.set(i);
            else
                this.clear(i);
        }
    }
    or(that) {
        Types.mustBe(BitSet, that);
        for (let i = 0; i < this._storage.length; i++) {
            if (this.get(i) || that.get(i))
                this.set(i);
            else
                this.clear(i);
        }
    }
    intersects(that) {
        Types.mustBe(BitSet, that);
        for (let i = 0; i < this._storage.length; i++) {
            if (this.get(i) && that.get(i))
                return true;
        }
        return false;
    }
    cardinality() {
        return this._storage.reduce(function(count, val) {
            if (val)
                count++;
            return count;
        }, 0);
    }
    isEmpty() {
        return this.cardinality() === 0;
    }
    flip(...args) {
        let startIndex = 0,
            endIndex = 0;
        if (args.length === 0) throw new TypeError("BitSet.flip needs a parameter");
        else if (args.length === 1) {
            Types.mustBe('finiteInteger', args[0]);
            startIndex = args[0];
            endIndex = args[0];
        } else {
            Types.mustBeAll('finiteInteger', args[0], args[1]);
            startIndex = args[0];
            endIndex = args[1];
        }
        for (let i = startIndex; i <= endIndex; i++) {
            let value = this.get(i);
            this.set(i, !(value));
        }
    }
    set(...args) { // index OR index,value OR index,index OR index,index,value
        let startIndex = 0,
            endIndex = 0,
            value = true;
        if (args.length === 0) throw new TypeError("BitSet.set needs a parameter");
        else if (args.length === 1) {
            Types.mustBe('finiteInteger', args[0]);
            startIndex = args[0];
            endIndex = args[0];
        } else if (args.length === 2) {
            if (Types.is('boolean', args[1])) {
                Types.mustBe('finiteInteger', args[0]);
                startIndex = args[0];
                endIndex = args[0];
                value = args[1];
            } else {
                Types.mustBeAll('finiteInteger', args[0], args[1]);
                startIndex = args[0];
                endIndex = args[1];
            }
        } else {
            Types.mustBeAll('finiteInteger', args[0], args[1]);
            Types.mustBe('boolean', args[2]);
            startIndex = args[0];
            endIndex = args[1];
            value = args[2];
        }
        if (value) value = true; // make it a boolean
        else value = false;
        for (let i = startIndex; i <= endIndex; i++) {
            this._storage[i] = value;
        }
    }
    get(...args) {
        Types.mustBe('finiteInteger', args[0]);
        let startIndex = args[0];
        let endIndex = startIndex;
        if (Types.is('finiteInteger', args[1]))
            endIndex = args[1];
        else {
            return this._storage[startIndex];
        }
        let result = new BitSet();
        for (let i = startIndex; i <= endIndex; i++) {
            result.push(!(!this._storage[i]) || false);
        }
        return result;
    }
    clear(...args) {
        if (args.length == 0) {
            this.set(0, this._storage.length - 1, false);
        } else if (args.length == 1) {
            Types.mustBe('finiteInteger', args[0]);
            this.set(args[0], args[0], false);
        } else {
            Types.mustBeAll('finiteInteger', args[0], args[1]);
            this.set(args[0], args[1], false);
        }
    }
}