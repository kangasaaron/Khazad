import { Byte } from "../../other/Integers.js";
import { BlockCoordinate } from "./BlockCoordinate.js";
import { Direction } from "./Direction.js";

export class FaceCoordinate extends BlockCoordinate {
    constructor(...args) {
        if (args.length == 0) {
            super(0);
            this.FaceDirection = new Byte(Direction.DIRECTION_DESTINATION);
        } else if (args.length == 1) {
            super(args[0]);
            this.FaceDirection = new Byte(args[0].FaceDirection);
        } else if (args.length == 2) {
            super(args[0]);
            this.FaceDirection = new Byte(args[1]);
        }
    }
    set(...args) { // TODO turn into setter(s)
        if (args.length == 1) {
            this.setByFaceCoordinate(args[0]);
        } else if (args.length == 2) {
            this.setByIntDirection(args[0], args[1]);
        } else if (args.length == 4) {
            this.setByIntIntIntDirection(args[0], args[1], args[2], args[3]);
        }
    }
    setByFaceCoordinate(ArgumentCoordinates) {
        super.copy(ArgumentCoordinates);
        this.FaceDirection = new Byte(ArgumentCoordinates.FaceDirection);
    }
    setByIntDirection(CubeIndex, DirectionComponent) {
        super.set(CubeIndex);
        this.FaceDirection = new Byte(DirectionComponent);
    }
    setByIntIntIntDirection(NewX, NewY, NewZ, DirectionComponent) {
        super.set(NewX, NewY, NewZ);
        this.FaceDirection = new Byte(DirectionComponent);
    }
    getCoordinates() { // TODO turn into getter
        return this.getBlockIndex();
    }
    getFaceDirection() { // TODO turn into getter
        return this.FaceDirection;
    }
    equals(ArgumentCoordinates) {
        if (!ArgumentCoordinates) return false;
        if (ArgumentCoordinates === this)
            return true;
        if (!('DetailLevel' in ArgumentCoordinates))
            return false;
        if (!('Data' in ArgumentCoordinates))
            return false;
        if (!('FaceDirection' in ArgumentCoordinates))
            return false;
        return this.FaceDirection.equals(ArgumentCoordinates.FaceDirection) && this.Data === ArgumentCoordinates.Data && this.DetailLevel.equals(ArgumentCoordinates.DetailLevel);
    }
    hashCode() { // TODO turn into getter
        let Key = this.Data;
        Key <<= 10;
        Key += this.FaceDirection;

        return Key;
    }
}