import { addAbstractFunction } from './Shims.js';
export class Serializable {}

addAbstractFunction(Serializable, 'writeObject');
addAbstractFunction(Serializable, 'readObject');
addAbstractFunction(Serializable, 'readObjectNoData');

Object.defineProperty(Serializable, 'serialVersionUID', {
    "configurable": false,
    "writable": true,
    "value": 0
});
