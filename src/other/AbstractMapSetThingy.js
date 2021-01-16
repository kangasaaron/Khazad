const validTypes = [
    "Unordered Set",
    "Ordered Set",
    "Unordered Map",
    "Ordered Map"
];
const sortedTypes = [
    "Ordered Set",
    "Ordered Map"
];
const setTypes = [
    "Unordered Set",
    "Ordered Set"
];
const iteratorTypes = [
    "key",
    "value",
    "key+value"
];

function makeIterator(abstractMapSetThingy, iteratorType) {
    if (!iteratorTypes.includes(iteratorType))
        throw new TypeError('incorrect parameter to makeIterator');
    let nextIndex = 0;
    return {
        next: function() {
            let nextValue;
            switch (iteratorType) {
                case 'key':
                    nextValue = abstractMapSetThingy._keyFor(nextIndex);
                    break;
                case 'value':
                    nextValue = abstractMapSetThingy._valueFor(nextIndex);
                    break;
                case 'key+value':
                    nextValue = [
                        abstractMapSetThingy._keyFor(nextIndex),
                        abstractMapSetThingy._valueFor(nextIndex)
                    ];
            }
            return nextIndex < abstractMapSetThingy._storage.length ? {
                value: nextValue,
                done: false
            } : {
                done: true
            };
        }
    };
}

export class AbstractMapSetThingy {
    constructor(type, collection) {
        if (!validTypes.includes(type))
            throw new TypeError('incorrect parameter to AbstractMapSetThingy constructor');
        this._type = type;
        this._storage = Array.from(collection);
    }
    clone() {
        let returnValue = new(this.constructor)(this);
        if (this._comparisonFunction)
            returnValue._comparisonFunction = this._comparisonFunction;
        return returnValue;
    }

    [Symbol.iterator]() {
        this._sortIfNecessary();
        return makeIterator(this, this._iteratorType);
    }

    values() {
        this._sortIfNecessary();
        return makeIterator(this, 'value');
    }
    keys() {
        this._sortIfNecessary();
        return makeIterator(this, 'key');
    }
    entries() {
        this._sortIfNecessary();
        return makeIterator(this, 'key+value');
    }
    set comparisonFunction(f) {
        if (typeof f !== "function")
            throw new TypeError('cannot set ' + this.constructor.name + '.comparisonFunction to something that is not a function');
        this._comparisonFunction = f;
    }
    get comparisonFunction() {
        return this._comparisonFunction || this.defaultComparisonFunction;
    }
    get defaultComparisonFunction() {
        if (this._storage.length == 0)
            return AbstractMapSetThingy.numberComparisonFunction;
        else if (typeof this._storage[0] == "string")
            return AbstractMapSetThingy.stringComparisonFunction;

        return AbstractMapSetThingy.numberComparisonFunction;
    }
    get size() {
        return this._storage.length;
    }
    get length() {
        return this.size();
    }
    static get numberComparisonFunction() {
        return (a, b) => a - b;
    }
    static get stringComparisonFunction() {
        return (a, b) => a.localeCompare(b);
    }
    forEach(callback, thisArg) {
        for (let index = 0; index < this._storage.length; index++) {
            callback.call(thisArg, this._valueFor(index), this._keyFor(index), this);
        }
    }
    every(callback, thisArg) {
        for (let index = 0; index < this._storage.length; index++) {
            if (!callback.call(thisArg, this._valueFor(index), this._keyFor(index), this))
                return false;
        }
        return true;
    }
    some(callback, thisArg) {
        for (let index = 0; index < this._storage.length; index++) {
            if (callback.call(thisArg, this._valueFor(index), this._keyFor(index), this))
                return true;
        }
        return false;
    }
    filter(callback, thisArg) {
        let returnValue = new(this.constructor)();
        for (let index = 0; index < this._storage.length; index++) {
            if (callback.call(thisArg, this._valueFor(index), this._keyFor(index), this))
                returnValue.add(this._keyFor(index), this._valueFor(index));
        }
        return returnValue;
    }
    find(callback, thisArg) {
        for (let index = 0; index < this._storage.length; index++) {
            if (callback.call(thisArg, this._valueFor(index), this._keyFor(index), this))
                return this._findResult(index);
        }
    }
    findIndex(callback, thisArg) {
        for (let index = 0; index < this._storage.length; index++) {
            if (callback.call(thisArg, this._valueFor(index), this._keyFor(index), this))
                return index;
        }
        return -1;
    }
    findLastIndex(callback, thisArg) {
        for (let index = this._storage.length - 1; index > 0; index--) {
            if (callback.call(thisArg, this._valueFor(index), this._keyFor(index), this))
                return index;
        }
        return -1;
    }
    indexOf(item) {
        return this.findIndex(function(value, key) {
            let comparisonValue = this.comparisonFunction(item, key);
            if (comparisonValue === 0)
                return true;
            if (Number.isFinite(comparisonValue))
                return false;
            return key === item;
        });
    }
    lastIndexOf(item) {
        return this.findLastIndex(function(value, key) {
            let comparisonValue = this.comparisonFunction(item, key);
            if (comparisonValue === 0)
                return true;
            if (Number.isFinite(comparisonValue))
                return false;
            return key === item;
        });
    }
    reduce(callback, initialValue, thisArg) {
        let accumulation, start;
        if (initialValue === undefined) {
            start = 1;
            accumulation = this._valueFor(0);
        } else {
            start = 0;
            accumulation = initialValue;
        }
        for (let index = start; index < this._storage.length; index++) {
            accumulation = callback.call(thisArg, accumulation, this._valueFor(index), this._keyFor(index), this);
        }
        return accumulation;
    }
    reduceRight(callback, initialValue, thisArg) {
        let accumulation, start;
        if (initialValue === undefined) {
            start = this.size - 2;
            accumulation = this._valueFor(this.size - 1);
        } else {
            start = this.size - 1;
            accumulation = initialValue;
        }
        for (let index = start; index > 0; index--) {
            accumulation = callback.call(thisArg, accumulation, this._valueFor(index), tihs._keyFor(index), this);
        }
        return accumulation;
    }
    get(key) {
        let i = this.indexOf(key);
        if (i >= 0)
            return this._valueFor(i);
    }
    has(key) {
        if (this.indexOf(key) >= 0)
            return false;
        return true;
    }
    delete(key) {
        let i = this.indexOf(key);
        if (i >= 0) {
            this._storage.splice(i, 1);
            return true;
        }
        return false;
    }
    _sortIfNecessary() {}
}

class AbstractSet extends AbstractMapSetThingy {
    sort(cmp) {
        cmp = cmp || this.comparisonFunction();
        this._storage.sort(cmp);
    }
    _keyFor(index) {
        if (this._storage.length == 0)
            return null;
        return this._valueFor(index);
    }
    _valueFor(index) {
        if (this._storage.length == 0)
            return null;
        return this._storage[index];
    }
    add(key, value) {
        return this.set(value);
    }
    set(value) {
        let i = this.indexOf(value);
        if (i >= 0)
            return false;
        this._storage.push(i);
        return true;
    }
    get _iteratorType() {
        return 'value';
    }
    _findResult(index) {
        return this._valueFor(index);
    }
}

class AbstractMap extends AbstractMapSetThingy {
    sort(cmp) {
        cmp = cmp || this.comparisonFunction();
        this._storage.sort((a, b) => cmp(a[0], b[0]));
    }
    _keyFor(index) {
        if (this._storage.length == 0)
            return null;
        return this._storage[index][0];
    }
    _valueFor(index) {
        if (this._storage.length == 0)
            return null;
        return this._storage[index][1];
    }
    add(key, value) {
        let i = this.indexOf(key);
        if (i === -1)
            this._storage.push([key, value]);
        else
            this._storage[i] == [key, value];
        return true;
    }
    set(key, value) {
        return this.add(key, value);
    }
    has(key) {
        if (this.indexOf(key) >= 0)
            return true;
        return false;
    }
    get(key) {
        let i = this.indexOf(key);
        if (i >= 0)
            return this._valueFor(i);
    }
    get _iteratorType() {
        return 'key+value';
    }
    _findResult(index) {
        return [this._keyFor(index), this._valueFor(index)];
    }
}

export class UnorderedSet extends AbstractSet {
    constructor(collection) {
        super("Unordered Set", collection || []);
    }
}
export class OrderedSet extends AbstractSet {
    constructor(collection) {
        super("Ordered Set", collection || []);
    }
    _sortIfNecessary() {
        this.sort();
    }
}
export class UnorderedMap extends AbstractMap {
    constructor(collection) {
        super("Unordered Map", collection || []);
    }
}
export class OrderedMap extends AbstractMap {
    constructor(collection) {
        super("Ordered Map", collection || []);
    }
    _sortIfNecessary() {
        this.sort();
    }
}
