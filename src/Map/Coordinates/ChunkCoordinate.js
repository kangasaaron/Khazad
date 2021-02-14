export class ChunkCoordinate {
    constructor(X = 0, Y = 0, Z = 0) {
        if (!Number.isFinite(X)) throw new TypeError("ChunkCoordinate constructor parameter X is not a number");
        if (!Number.isFinite(Y)) throw new TypeError("ChunkCoordinate constructor parameter X is not a number");
        if (!Number.isFinite(Z)) throw new TypeError("ChunkCoordinate constructor parameter X is not a number");
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    copy(ArgumentCoordinate) {
        if (!("X" in ArgumentCoordinate))
            throw new TypeError("ChunkCoordinate.copy argument needs an X");
        if (!("Y" in ArgumentCoordinate))
            throw new TypeError("ChunkCoordinate.copy argument needs an Y");
        if (!("Z" in ArgumentCoordinate))
            throw new TypeError("ChunkCoordinate.copy argument needs an Z");
        this.X = ArgumentCoordinate.X;
        this.Y = ArgumentCoordinate.Y;
        this.Z = ArgumentCoordinate.Z;
    }
    clone() {
        let result = new ChunkCoordinate();
        result.copy(this);
        return result;
    }
    equals(ArgumentCoordinate) {
        if (!("X" in ArgumentCoordinate))
            return false;
        if (!("Y" in ArgumentCoordinate))
            return false;
        if (!("Z" in ArgumentCoordinate))
            return false;
        return this.X == ArgumentCoordinate.X &&
            this.Y == ArgumentCoordinate.Y &&
            this.Z == ArgumentCoordinate.Z;
    }
    hashCode() { // TODO turn into getter
        let Key = 0;

        Key += this.X;
        Key <<= 12;
        Key += this.Y;
        Key <<= 12;
        Key += this.Z;

        return Key;
    }
    toString() {
        return `X ${this.X} Y ${this.Y} Z ${this.Z}`;
    }
}