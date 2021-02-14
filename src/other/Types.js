export class DuckError extends Error {
    constructor(obj, message = "") {
        super("Duck error: " + message);
        this.obj = obj;
    }
}

export class DuckFunctionError extends DuckError {
    constructor(obj, functionNames = "") {
        if (is(functionNames, 'array'))
            functionNames = functionNames.join(', ');
        let message = `obj cannot do all of ${functionNames}`;
        super(message);
    }
}

export class DuckMemberError extends DuckError {
    constructor(obj, memberNames = "") {
        if (is(memberNames, 'array'))
            memberNames = memberNames.join(', ');
        let message = `obj does not have all of ${memberNames}`;
        super(obj, message);
    }
}

export class DuckTypeError extends TypeError {
    constructor(things, types = "") {
        if (is(things, 'array'))
            things = things.join(', ');
        if (is(types, 'array'))
            types = types.join(', ');
        let message = `${things} are not all ${types}`;
        super(message);
    }
}

function can(obj, functionName) {
    return has(obj, functionName) && is("function", obj[functionName]);
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
    if (has(obj, memberNames))
        return true;
    throw new DuckMemberError(obj, memberNames);
}

function isAll(type, ...things) {
    return things.every(thing => is(type, thing));
}

const are = isAll;

function is(type, thing) {
    if (typeof type == "function") {
        return thing instanceof type;
    }
    switch (type) {
        case "function":
        case "undefined":
        case "boolean":
        case "number":
        case "bigint":
        case "string":
        case "symbol":
        case "object":
            return (typeof thing) == type;
        case "date":
            return is('object', thing) && thing instanceof Date;
        case "regexp":
            return is('object', thing) && thing instanceof RegExp;
        case "nonEmptyArray":
            return !is('emptyArray', thing);
        case "emptyArray":
            return is('array', thing) && thing.length === 0;
        case "array":
            return is('object', thing) && Array.isArray(thing);
        case "map":
            return is('object', thing) && thing instanceof Map;
        case "set":
            return is('object', thing) && thing instanceof Set;
        case "finiteNumber":
            return is('number', thing) && Number.isFinite(thing);
        case "error":
            return is('object', thing) && thing instanceof Error;
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

export const Types = {
    can,
    canAll,
    must,
    mustAll,
    has,
    hasAll,
    mustHave,
    is,
    are,
    mustBe,
    mustBeAll
};