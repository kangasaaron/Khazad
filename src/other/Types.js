import { Byte, Enum, Int, Long, Short } from "../other.js";

export class DuckError extends Error {
    constructor(obj, message = "") {
        super("Duck error: " + message);
        this.obj = obj;
    }
}

export class DuckTestError extends DuckError {
    constructor(func) {
        let message = `${func} is supposed to return true`;
        super(message);
    }
}
export class DuckMatchError extends DuckError {
    constructor(item, func) {
        let message = `${item} is supposed to match ${func}`;
        super(message);
    }
}

export class DuckFunctionError extends DuckError {
    constructor(obj, functionNames = "") {
        if (is(allowedTypes.array, functionNames))
            functionNames = functionNames.join(', ');
        let message = `obj cannot do all of ${functionNames}`;
        super(message);
    }
}

export class DuckMemberError extends DuckError {
    constructor(obj, memberNames = "") {
        let plural = false;
        if (is(allowedTypes.array, memberNames)) {
            memberNames = memberNames.join(', ');
            plural = true;
        }
        let message = `obj does not have ${plural ? "all of " : ""}${memberNames}`;
        super(obj, message);
    }
}

export class DuckTypeError extends TypeError {
    constructor(things, types = "") {
        let pluralThings = true,
            pluralTypes = true,
            thingArray = [],
            typeArray = [],
            thingDesc = "",
            typeDesc = "",
            message = "";
        if (!is(allowedTypes.array, things)) {
            thingArray = [things];
        } else {
            thingArray = things;
        }
        thingDesc = thingArray.join(", ");
        if (!is(allowedTypes.array, types)) {
            typeArray = [types];
        } else {
            typeArray = types;
        }
        typeDesc = typeArray.join(', ');

        message = `${thingDesc} ${pluralThings ? "are" : "is"} not${pluralTypes && pluralThings ? " all": ""} ${typeDesc}`;
        super(message);
    }
}

export class DuckInheritanceError extends DuckError {
    constructor(Super, Klass) {
        let message = `${Klass} does not inherit from ${Super}`;
        super(message);
    }
}

export class DuckExtensionError extends DuckError {
    constructor(Super, Klass) {
        let message = `${Klass} does not extend ${Super}`;
        super(message);
    }
}

export class DuckImplementationError extends DuckError {
    constructor(Super, Klass) {
        let message = `${Klass} does not implement ${Super}`;
        super(message);
    }
}



let allowedTypes = [];

function addType(type) {
    allowedTypes.push(type);
    allowedTypes[type] = type;
}
addType("function");
addType("undefined");
addType("boolean");
addType("number");
addType("bigint");
addType("string");
addType("symbol");
addType("object");
addType("date");
addType("regexp");
addType("nonEmptyArray");
addType("emptyArray");
addType("array");
addType("map");
addType("set");
addType("finiteInteger");
addType("finiteNumber");
addType("error");


Object.freeze(allowedTypes);
export { allowedTypes };

function can(obj, functionName) {
    return has(obj, functionName) && is(allowedTypes.function, obj[functionName]);
}

function canAll(obj, ...functionNames) {
    return functionNames.every(functionName => can(obj, functionName));
}

function must(obj, functionName) {
    if (!can(obj, functionName))
        throw new DuckFunctionError(obj, functionName);
    return true;
}

function mustAll(obj, ...functionNames) {
    return functionNames.every(functionName => must(obj, functionName));
}

function has(obj, memberName) {
    return memberName in obj;
}

function hasAll(obj, ...memberNames) {
    return memberNames.every(membername => has(obj, membername));
}

function mustHave(obj, ...memberNames) {
    if (has(obj, memberNames))
        return true;
    throw new DuckMemberError(obj, memberNames);
}

function mustHaveAll(obj, ...memberNames) {
    if (hasAll(obj, ...memberNames))
        return true;
    throw new DuckMemberError(obj, memberNames);
}

function isAll(type, ...things) {
    return things.every(thing => is(type, thing));
}

const are = isAll;

function is(type, thing) {
    if (typeof thing === "undefined")
        return type === "undefined";
    if (typeof type == "function") {
        if (typeof thing == "function") {
            return type.isExtendedBy(thing);
        }

        if (thing instanceof type) return true;
        if (isImplementedBy(type, thing)) return true;
        return false;
    }
    if (!allowedTypes.includes(type))
        throw new DuckError("'is' called with bad type");
    if (thing instanceof Byte ||
        thing instanceof Short ||
        thing instanceof Int ||
        thing instanceof Long ||
        (
            thing instanceof Enum && (
                type == allowedTypes.number ||
                type == allowedTypes.bigint ||
                type == allowedTypes.finiteInteger ||
                type == allowedTypes.finiteNumber
            )
        )
    )
        thing = thing.valueOf();
    switch (type) {
        case allowedTypes.function:
            return (typeof thing) == "function";
        case allowedTypes.undefined:
            return (typeof thing) == "undefined";
        case allowedTypes.boolean:
            return (typeof thing) == "boolean";
        case allowedTypes.number:
            return (typeof thing) == "number";
        case allowedTypes.bigint:
            return (typeof thing) == "bigint";
        case allowedTypes.string:
            return (typeof thing) == "string";
        case allowedTypes.symbol:
            return (typeof thing) == "symbol";
        case allowedTypes.object:
            return (typeof thing) == "object";
        case allowedTypes.date:
            return (typeof thing) == "object" && thing instanceof Date;
        case allowedTypes.regexp:
            return (typeof thing) == "object" && thing instanceof RegExp;
        case allowedTypes.nonEmptyArray:
            return Array.isArray(thing) && thing.length > 0;
        case allowedTypes.emptyArray:
            return Array.isArray(thing) && thing.length === 0;
        case allowedTypes.array:
            return Array.isArray(thing);
        case allowedTypes.map:
            return (typeof thing) == "object" && thing instanceof Map;
        case allowedTypes.set:
            return (typeof thing) == "object" && thing instanceof Set;
        case allowedTypes.finiteInteger:
            return Number.isInteger(thing);
        case allowedTypes.finiteNumber:
            return Number.isFinite(thing);
        case allowedTypes.error:
            return (typeof thing) == "object" && thing instanceof Error;
    }
}

function mustBe(type, thing) {
    if (is(type, thing))
        return true;
    throw new DuckTypeError(thing, type);
}

function mustBeAll(type, ...things) {
    if (are(type, ...things))
        return true;
    throw new DuckTypeError(things, type);
}

function isExtendedBy(superClass, klass) {
    if (!superClass) return false;
    if (!klass) return false;
    let prototype = Object.getPrototypeOf(klass);
    while (prototype) {
        if (prototype == superClass)
            return true;
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
}

function descriptorKind(descriptor) {
    if (typeof descriptor !== "object")
        return null;
    if ("value" in descriptor)
        return typeof descriptor.value;
    if ("get" in descriptor) {
        if ("set" in descriptor) {
            return "getter/setter";
        }
        return "getter";
    } else if ("set" in descriptor) {
        return "setter";
    }
    return null;
}

function isImplementedBy(iface, klass) {
    if ("Mixins" in klass)
        return iface.isInterface && typeof iface == "function" && "Mixins" in klass && "name" in iface && iface.name in klass.Mixins;
    else if ("Mixins" in klass.constructor)
        return iface.isInterface && typeof iface == "function" && "Mixins" in klass.constructor && "name" in iface && iface.name in klass.constructor.Mixins;
    return false;
}

function inheritsFrom(superClassOrInterface, klass) {
    return isExtendedBy(superClassOrInterface, klass) || isImplementedBy(superClassOrInterface, klass);
}

function mustInheritFrom(Super, Klass) {
    if (inheritsFrom(Super, Klass))
        return true;
    throw new DuckInheritanceError(Super, Klass);
}

function mustBeExtendedBy(Super, Klass) {
    if (isExtendedBy(Super, Klass))
        return true;
    throw new DuckExtensionError(Super, Klass);
}

function mustBeImplementedBy(Super, Klass) {
    if (isImplementedBy(Super, Klass))
        return true;
    throw new DuckImplementationError(Super, Klass);
}

function mustMatch(func, item) {
    if (func(item))
        return true;
    throw new DuckMatchError(item, func);
}

function mustAllMatch(func, ...items) {
    items.forEach(item => mustMatch(func, item));
    return true;
}

function mustBeOK(func) {
    if (func())
        return true;
    throw new DuckTestError(func);
}

function testCan(assert, obj, functionName) {
    let result = testHas(assert, obj, functionName);
    if (!result) return false;
    result = testIs(assert, 'function', obj[functionName]);
    return result;
}

function testCanAll(assert, obj, ...functionNames) {
    return functionNames.every(function(functionName) {
        return testCan(assert, obj, functionName);
    });
}

function testHas(assert, obj, memberName) {
    let result = has(obj, memberName);
    assert.ok(result, `${obj} should have ${memberName}`);
    return result;
}

function testHasAll(assert, obj, ...membernames) {
    membernames.every(function(memberName) {
        return testHas(assert, obj, memberName);
    });
}

function testIs(assert, type, thing) {
    let result = is(type, thing);
    assert.ok(result, `${thing} should be ${type}`);
    return result;
}

function testAre(assert, ...args) {
    let obj = args.shift();
    args.every(function(arg) {
        return testIs(assert, obj, arg);
    });
}


export const Types = {
    can,
    canAll,
    must,
    mustAll,
    has,
    hasAll,
    mustHave,
    mustHaveAll,
    is,
    are,
    mustBe,
    mustBeAll,
    inheritsFrom,
    isExtendedBy,
    isImplementedBy,
    mustInheritFrom,
    mustBeExtendedBy,
    mustBeImplementedBy,
    mustMatch,
    mustAllMatch,
    mustBeOK,
    testCan,
    testCanAll,
    testHas,
    testHasAll,
    testIs,
    testAre,
    "function": allowedTypes.function,
    "undefined": allowedTypes.undefined,
    "boolean": allowedTypes.boolean,
    "number": allowedTypes.number,
    "bigint": allowedTypes.bigint,
    "string": allowedTypes.string,
    "symbol": allowedTypes.symbol,
    "object": allowedTypes.object,
    "date": allowedTypes.date,
    "regexp": allowedTypes.regexp,
    "nonEmptyArray": allowedTypes.nonEmptyArray,
    "emptyArray": allowedTypes.emptyArray,
    "array": allowedTypes.array,
    "map": allowedTypes.map,
    "set": allowedTypes.set,
    "finiteInteger": allowedTypes.finiteInteger,
    "finiteNumber": allowedTypes.finiteNumber,
    "error": allowedTypes.error,
};