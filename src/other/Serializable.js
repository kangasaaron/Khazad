import { addAbstractFunction } from './Shims.js';
import { Types } from './Types.js';

export class Interface {
    static isImplementedByClass(klass) {
        return this.isImplementedBy(klass.prototype);
    }
    static isImplementedBy(klass) {
        return Types.can(klass, ...this.functionNames)
    }
    static set abstractFunctions(names) {
        this.functionNames = [];
        for (let name of names) {
            addAbstractFunction(this, name);
            this.functionNames.push(name);
        }
    }
    static becomeImplementedBy(klass) {
        for (let name of this.functionNames) {
            if (!(name in klass)) {
                addAbstractFunction(klass, name);
            }
        }
    }
}

export class Serializable extends Interface {}

Serializable.abstractFunctions = ['writeObject', 'readObject', 'readObjectNoData'];

Object.defineProperty(Serializable, 'serialVersionUID', {
    "configurable": false,
    "writable": true,
    "value": 0
});