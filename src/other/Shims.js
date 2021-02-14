export class Enum extends Number {
    constructor(value, name) {
        super(value);
        Object.defineProperty(this, 'name', {
            "writable": false,
            "configurable": false,
            "enumerable": true,
            "value": name
        });
    }

    get description() {
        return this.enumName + "." + this.name;
    }
    get ordinal() {
        return this.valueOf();
    }

    [Symbol.toPrimitive](hint) {
        if (hint === "number")
            return this.valueOf();
        else if (hint == "string")
            return super.toString(10);
        return this.valueOf();
    }
}

export const defineEnumOpen = function defineEnumOpen(def, ...values) {
    let newEnum;
    if (def.klass) {
        newEnum = def.klass;
    } else {
        newEnum = class extends Enum {};
    }
    Object.defineProperty(newEnum, 'name', {
        "writable": false,
        "configurable": false,
        "enumerable": false,
        "value": def.name
    });

    Object.defineProperty(newEnum.prototype, 'enumName', {
        "configurable": false,
        "enumerable": false,
        "get": function() {
            return def.name;
        }
    });
    let vals = [],
        nextValue = 0,
        otherArgs = [];

    for (let v of values) {
        let name, value, enumValue;
        if (typeof v === "object") {
            name = Object.getOwnPropertyNames(v)[0];
            value = v[name];
            nextValue = value;
            otherArgs = "args" in v ? v.args : [];
        } else {
            name = v;
            value = nextValue;
            otherArgs = [];
        }
        nextValue++;
        enumValue = new newEnum(value, name, ...otherArgs);
        Object.defineProperty(newEnum, name, {
            "writeable": false,
            "configurable": false,
            "enumerable": true,
            "value": enumValue
        });
        vals.push(enumValue);
        vals[name] = enumValue;
        Object.freeze(enumValue);
    }
    Object.defineProperty(newEnum, 'values', {
        "writeable": false,
        "configurable": false,
        "enumerable": false,
        "value": vals
    });

    return newEnum;
}

export const defineEnum = function defineEnum(...args) {
    let name = args.shift();
    let newEnum = defineEnumOpen({
            name
        },
        ...args);
    Object.freeze(newEnum);
    return newEnum;
};

export const aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this, (new mixin));
            });
        }
    }
    let copyProps = (target, source) => {
        // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if (!prop.match(/^(?:constructor|prototype|argument|caller|name|bind|call|apply|toString|length)$/))
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })
    }
    mixins.forEach((mixin) => {
        // outside constuctor() to allow aggregaction(a,b,c).staticfunction() to be called, etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
}

export const addStaticAbstractFunction = function addStaticAbstractFunction(klass, functionName) {
    addAbstractFunctionToObject(klass, functionName);
};

export const addAbstractFunction = function addAbstractFunction(klass, functionName) {
    addAbstractFunctionToObject(klass.prototype, functionName);
};

const addAbstractFunctionToObject = function addAbstractFunctionToObject(klass, functionName) {
    if (functionName in klass) return;
    Object.defineProperty(klass, functionName, {
        writable: true,
        enumerable: false,
        configurable: true,
        value: (() => {
            throw new ReferenceError(`abstract function ${klass.name}.${functionName} called`);
        })
    })
}