function roundTowardZero(value) {
    let v = Number(value);
    if (Number.isNaN(v))
        return v;
    if (!Number.isFinite(v))
        return v;
    if (Number.isInteger(v))
        return v;
    if (v < 0)
        return Math.ceil(v);
    else if (v > 0)
        return Math.floor(v);
}

function toByte(value) {
    let v = roundTowardZero(value);
    if (Number.isNaN(v))
        return v;
    if (!Number.isFinite(v))
        return v;
    let converter = new Int8Array(1);
    converter[0] = v;
    return converter[0];
}

function toShort(value) {
    let v = roundTowardZero(value);
    if (Number.isNaN(v))
        return v;
    if (!Number.isFinite(v))
        return v;
    let converter = new Int16Array(1);
    converter[0] = v;
    return converter[0];
}

function toInt(value) {
    let v = roundTowardZero(value);
    if (Number.isNaN(v))
        return v;
    if (!Number.isFinite(v))
        return v;
    let converter = new Int32Array(1);
    converter[0] = v;
    return converter[0];
}


function toLong(value) {
    let v = Number(value);
    if (Number.isNaN(v))
        return v;
    if (!Number.isFinite(v))
        return v;
    if (!Number.isInteger(v))
        v = Math.round(v)
    return v;
}

class Integer extends Number {
    [Symbol.toPrimitive](hint) {
        if (hint === "number")
            return Math.round(this.valueOf());
        else if (hint == "string")
            return Math.round(this.valueOf()).toString(10);
        return Math.round(this.valueOf());
    }
    static isSafeInteger(value) {
        return value >= this.MIN_SAFE_INTEGER && value <= this.MAX_SAFE_INTEGER;
    }
    static isNaN(value) {
        return Number.isNaN(value.valueOf());
    }
    strictequals(that) {
        return this.prototype == that.prototype && this.valueOf() == that.valueOf();
    }
    equals(that) {
        return this.valueOf() == that.valueOf();
    }
    notequal(that) {
        return !this.equals(that);
    }
    strictnotequal(that) {
        return (this.prototype != that.prototype) || this.valueOf() != that.valueOf();
    }
    lessthan(that) {
        return this.valueOf() < that.valueOf();
    }
    lessthanorequalto(that) {
        return this.lessthan(that) || this.equals(that);
    }
    greaterthan(that) {
        return this.valueOf() < that.valueOf();
    }
    greaterthanorequalto(that) {
        return this.greaterthan(that) || this.equals(that);
    }
    minus(that) {
        return this.valueOf() - that.valueOf();
    }
    plus(that) {
        return this.valueOf() + that.valueOf();
    }
    times(that) {
        return this.valueOf() * that.valueOf();
    }
    dividedBy(that) {
        return Math.round(this.valueOf() / that.valueOf());
    }
}
Integer.prototype["==="] = Integer.prototype.strictequals;
Integer.prototype["=="] = Integer.prototype.equals;
Integer.prototype["!="] = Integer.prototype.notequal;
Integer.prototype["!=="] = Integer.prototype.strictnotequal;
Integer.prototype["<"] = Integer.prototype.lessthan;
Integer.prototype["<="] = Integer.prototype.lessthanorequalto;
Integer.prototype[">"] = Integer.prototype.greaterthan;
Integer.prototype[">="] = Integer.prototype.greaterthanorequalto;
Integer.prototype["-"] = Integer.prototype.minus;
Integer.prototype["+"] = Integer.prototype.plus;
Integer.prototype["*"] = Integer.prototype.times;
Integer.prototype["/"] = Integer.prototype.dividedBy;

Object.defineProperty(Integer, "EPSILON", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 1
});

export class Byte extends Integer {
    constructor(value = 0) {
        super(toByte(value));
    }
}
Object.defineProperty(Byte, "MAX_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 127
});
Object.defineProperty(Byte, "MIN_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": -128
});
Object.defineProperty(Byte, "MAX_SAFE_INTEGER", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 127
});
Object.defineProperty(Byte, "MIN_SAFE_INTEGER", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": -128
});


export class Short extends Integer {
    constructor(value = 0) {
        super(toShort(value));
    }
}
Object.defineProperty(Short, "MAX_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 32767
});
Object.defineProperty(Short, "MIN_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": -32768
});
Object.defineProperty(Short, "MAX_SAFE_INTEGER", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 32767
});
Object.defineProperty(Short, "MIN_SAFE_INTEGER", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": -32768
});

export class Int extends Integer {
    constructor(value = 0) {
        super(toInt(value));
    }
}
Object.defineProperty(Int, "MAX_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 2147483647
});
Object.defineProperty(Int, "MIN_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": -2147483648
});
Object.defineProperty(Int, "MAX_SAFE_INTEGER", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": 2147483647
});
Object.defineProperty(Int, "MIN_SAFE_INTEGER", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": -2147483648
});

export class Long extends Integer {
    constructor(value = 0) {
        super(toLong(value));
    }
}
Object.defineProperty(Long, "MAX_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": Number.MAX_SAFE_INTEGER
});
Object.defineProperty(Long, "MIN_VALUE", {
    "writable": false,
    "configurable": false,
    "enumerable": false,
    "value": Number.MIN_SAFE_INTEGER
});
export const ByteArray = Int8Array;
export const ShortArray = Int16Array;
export const IntArray = Int32Array;
export const LongArray = Array;

export const Integers = {
    Byte,
    Short,
    Int,
    Long
};