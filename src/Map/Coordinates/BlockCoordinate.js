import { Byte, Short, Serializable } from "../../other.js";
import { Types } from "../../other/Types.js";
import { Axis } from "./Axis.js";
import { Direction } from "./Direction.js";
/**
 *
 * @author Impaler
 */
export class BlockCoordinate extends Serializable() {
    constructor(...args) {
        super();
        this._data = 0; // Index bitpacking   0 YYYYY XXXXX ZZZZZ
        this.DetailLevel = new Byte(0);
        // this.Data = 0;
        this.Size = 0;
        this.Max = 0;
        this.Mask = 0;
        this.Shift = 0;
        if (args.length == 1) {
            if (Types.is('finiteNumber', args[0])) {
                this.DetailLevel = new Byte(args[0]);
                this.setDetailLevel(this.DetailLevel);
            } else if (Types.is(BlockCoordinate, args[0])) {
                this.Data = args[0].Data;
                this.DetailLevel = new Byte(args[0].DetailLevel);
                this.setDetailLevel(this.DetailLevel);
            }
        } else if (args.length == 2) {
            Types.mustBeAll('finiteNumber', args[0], args[1]);
            this.DetailLevel = new Byte(args[0]);
            this.Data = args[1];
            this.setDetailLevel(this.DetailLevel);
        } else {
            this.setDetailLevel(this.DetailLevel);
        }
    }
    get Data() {
        return (new Short(this._data)).valueOf();
    }
    set Data(v) {
        this._data = (new Short(v)).valueOf();
    }
    setDetailLevel(DetailLevel) { // TODO turn into setter
        Types.mustBe('finiteNumber', DetailLevel);
        this.DetailLevel = new Byte(DetailLevel);
        this.Shift = ((BlockCoordinate.CHUNK_DETAIL_LEVELS - DetailLevel) - 1);
        this.Size = (1 << this.Shift);

        this.Mask = (this.Size - 1);
        let Xcomponent = (this.Mask << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X));
        let Ycomponent = (this.Mask << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y));
        let Zcomponent = (this.Mask << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z));

        this.Max = (Xcomponent | Ycomponent | Zcomponent);
    }
    translate(DirectionType, Length = 1) {
        Types.mustBe(Direction, DirectionType);
        Types.mustBe('finiteNumber', Length);
        let Xcomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X)) & this.Mask);
        let Ycomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y)) & this.Mask);
        let Zcomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z)) & this.Mask);

        Xcomponent += DirectionType.getValueonAxis(Axis.AXIS_X) * Length;
        Ycomponent += DirectionType.getValueonAxis(Axis.AXIS_Y) * Length;
        Zcomponent += DirectionType.getValueonAxis(Axis.AXIS_Z) * Length;

        if ((Xcomponent / this.Size) == 0) {
            Xcomponent = 0;
            Ycomponent++;
            if ((Ycomponent / this.Size) == 0) {
                Ycomponent = 0;
                Zcomponent++;
                if ((Zcomponent / this.Size) == 0) {
                    Zcomponent = 0;
                }
            }
        }

        Xcomponent = (Xcomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X));
        Ycomponent = (Ycomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y));
        Zcomponent = (Zcomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z));

        this.Data = (Xcomponent | Ycomponent | Zcomponent);
    }
    set(...args) { // TODO turn into setter(s)
        if (args.length == 1) {
            return this.setByData(args[0]);
        } else if (args.length == 2) {
            return this.setByAxisInt(args[0], args[1]);
        } else if (args.length == 3) {
            return this.setByIntIntInt(args[0], args[1], args[2]);
        }
    }
    setByData(Data) {
        Types.mustBe('finiteInteger', Data);
        this.Data = Data;
    }
    setByAxisInt(AxialComponent, NewValue) {
        Types.mustBe(Axis, AxialComponent);
        Types.mustBe('finiteInteger', NewValue);
        let Xcomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X)) & this.Mask);
        let Ycomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y)) & this.Mask);
        let Zcomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z)) & this.Mask);

        switch (AxialComponent) {
            case Axis.AXIS_Z:
                Zcomponent = (NewValue & this.Mask);
                break;
            case Axis.AXIS_Y:
                Ycomponent = (NewValue & this.Mask);
                break;
            case Axis.AXIS_X:
                Xcomponent = (NewValue & this.Mask);
                break;

            default:
                break;
        }
        Xcomponent = (Xcomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X));
        Ycomponent = (Ycomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y));
        Zcomponent = (Zcomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z));

        this.Data = (Xcomponent | Ycomponent | Zcomponent);
    }
    setByIntIntInt(NewX, NewY, NewZ) {
        Types.mustBeAll('finiteInteger', NewX, NewY, NewZ);
        let Xcomponent = (NewX & this.Mask);
        let Ycomponent = (NewY & this.Mask);
        let Zcomponent = (NewZ & this.Mask);

        Xcomponent = (Xcomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X));
        Ycomponent = (Ycomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y));
        Zcomponent = (Zcomponent << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z));

        this.Data = (Xcomponent | Ycomponent | Zcomponent);
    }
    getBlockIndex() { // TODO turn into getter
        return this.Data;
    }
    getX() { // TODO turn into getter
        return ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X)) & this.Mask);
    }
    getY() { // TODO turn into getter
        return ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y)) & this.Mask);
    }
    getZ() { // TODO turn into getter
        return ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z)) & this.Mask);
    }
    getXY() { // TODO turn into getter
        return (this.Data >> (this.Shift * (BlockCoordinate.BLOCK_BITSHIFT_Z + 1)));
    }
    next() {
        this.Data++;
    }
    skipAlongAxis(SkippingAxis) {
        Types.mustBe(Axis, SkippingAxis);
        let Xcomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X)) & this.Mask);
        let Ycomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y)) & this.Mask);
        let Zcomponent = ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z)) & this.Mask);

        let Skip = 0;
        switch (SkippingAxis) {
            case Axis.AXIS_X:
                Skip = ((this.Size - Xcomponent) << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X));
                break;

            case Axis.AXIS_Y:
                Skip = ((this.Size - Ycomponent) << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y));
                break;

            case Axis.AXIS_Z:
                Skip = ((this.Size - Zcomponent) << (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z));
                break;
        }
        this.Data += Skip;
    }
    end() { // TODO turn into getter
        return (this.Data > this.Max || this.Data < 0);
    }
    copy(ArgumentCoordinates) {
        Types.mustHaveAll(ArgumentCoordinates, "Data", "DetailLevel");
        Types.mustBeAll('finiteInteger', ArgumentCoordinates.Data, ArgumentCoordinates.DetailLevel);
        this.Data = ArgumentCoordinates.Data;
        this.setDetailLevel(ArgumentCoordinates.DetailLevel);
    }
    clone() {
        return new BlockCoordinate(this.DetailLevel, this.Data);
    }
    equals(Arg) {
        Types.mustHaveAll(Arg, "Data", "DetailLevel");
        return (Arg.Data == this.Data && Arg.DetailLevel.equals(this.DetailLevel));
    }
    getValueonAxis(AxialComponent) {
        Types.mustBe(Axis, AxialComponent);
        switch (AxialComponent) {
            case Axis.AXIS_X:
                return ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_X)) & this.Mask);
            case Axis.AXIS_Y:
                return ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Y)) & this.Mask);
            case Axis.AXIS_Z:
                return ((this.Data >> (this.Shift * BlockCoordinate.BLOCK_BITSHIFT_Z)) & this.Mask);
            default:
                return 0;
        }
    }
    hashCode() { // TODO turn into getter
        return this.Data;
    }
}

BlockCoordinate.HALF_BLOCK = 0.5;
BlockCoordinate.CHUNK_EDGE_SIZE = 32;
BlockCoordinate.BLOCK_BITMASK = 31;
BlockCoordinate.BLOCK_BITSHIFT_X = 2;
BlockCoordinate.BLOCK_BITSHIFT_Y = 1;
BlockCoordinate.BLOCK_BITSHIFT_Z = 0;
BlockCoordinate.BLOCKS_PER_CHUNK = 32768;
BlockCoordinate.CHUNK_DETAIL_LEVELS = 6;