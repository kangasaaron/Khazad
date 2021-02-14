// export let AbstractClass = function AbstractClass(Base = Object) {
//     let AbstractClass = class AbstractClass extends Base {
//         abstractFunction(klass, func) {
//             throw new ReferenceError(`abstract function ${klass}.${func} called`);
//         }
//     };
//     AbstractClass.Mixins = AbstractClass.Mixins || {};
//     AbstractClass.Mixins.AbstractClass = AbstractClass;
//     AbstractClass.isInterface = true;
//     return AbstractClass;
// };
// AbstractClass.isInterface = true;

export const AbstractClass = createNewInterface("AbstractClass");


function abstractFunctionBody(name, type, func) {
    return function() {
        throw new ReferenceError(`${type} ${name}.${func} called`);
    }
}

class descriptorBuilder {
    constructor(klass, klassName, property) {
        this.klass = klass;
        this.klassName = klassName;
        if (typeof property === "object")
            this.property = property;
        else
            this.property = { name: property };
    }
    get enumerable() {
        return this.property.enumerable || true;
    }
    get configurable() {
        return this.property.configurable || true;
    }
    getDescriptor() {
        return {
            enumerable: this.enumerable,
            configurable: this.configurable
        }
    }
    get object() {
        if (this.isStatic)
            return this.klass;
        return this.klass.prototype;
    }
    get className() {
        return this.klassName;
    }
    get propertyName() {
        return this.property.name;
    }
    addProperty() {
        Object.defineProperty(
            this.object,
            this.propertyName,
            this.getDescriptor()
        );
    }
    get isStatic() {
        return this.property.isStatic || false;
    }
}

class varBuilder extends descriptorBuilder {
    get value() {
        return this.property.value || null;
    }
    get writable() {
        return this.property.writable || false;
    }
    getDescriptor() {
        let result = super.getDescriptor();
        result.value = this.value;
        result.writable = this.writable;
        return result;
    }
}

class functionBuilder extends varBuilder {
    get type() {
        return (this.isStatic ? "static " : "") + "abstract function";
    }
    get value() {
        if (this.property.functionBody)
            return this.property.functionBody;
        return abstractFunctionBody(this.className, this.type, this.propertyName);
    }
}

class accessorbuilder extends descriptorBuilder {
    getDescriptor() {
        let result = super.getDescriptor();
        if (this.getter)
            result.get = this.getter;
        if (this.setter)
            result.set = this.setter;
        return result;
    }
    get getter() {
        if (this.property.getter)
            return this.property.getter();
        if (this.kind === "getter" || this.kind === "getter/setter")
            return abstractFunctionBody(this.className, `${this.isStatic ? "static " : ""} abstract getter`, this.propertyName);
        return null;
    }
    get setter() {
        if (this.property.setter)
            return this.property.setter();
        if (this.kind === "setter" || this.kind === "getter/setter")
            return abstractFunctionBody(this.className, `${this.isStatic ? "static " : ""} abstract setter`, this.propertyName);
        return null;
    }
}

function getKind(property) {
    if (typeof property === "string")
        return functionBuilder;
    if (property.kind === "getter" || property.kind === "setter" || property.kind === "getter/setter")
        return accessorbuilder;
    if (property.functionBody)
        return functionBuilder;
    return varBuilder;
}

export function addPropertyToClass(klass, name, property) {
    let builder = new(getKind(property))(klass, name, property);
    builder.addProperty();
}

export function addPropertiesToClass(klass, name, ...properties) {
    for (let property of properties)
        addPropertyToClass(klass, name, property);
}


export function createNewInterface(name, ...members) {
    let interfaceMaker = function(Base = Object) {
        let klass = class extends Base {};

        Object.defineProperty(klass, 'name', { writable: true, configurable: false, enumerable: false, value: name });
        Object.defineProperty(klass.prototype, 'name', { writable: true, configurable: false, enumerable: false, value: name });
        Object.defineProperty(klass.prototype.constructor, 'name', { writable: true, configurable: false, enumerable: false, value: name });
        klass.Mixins = klass.Mixins || {};
        klass.Mixins[name] = klass;
        klass.isInterface = true;
        addPropertiesToClass(klass, name, ...members);

        return klass;
    }
    Object.defineProperty(interfaceMaker, 'name', { writable: true, configurable: false, enumerable: false, value: name });
    interfaceMaker.isInterface = true;

    return interfaceMaker;
}