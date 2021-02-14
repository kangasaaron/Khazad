/**
 *
 * @author Impaler
 */
import { Serializable } from "../other.js";
import { Types } from "../other/Types.js";

export class Dice extends Serializable() {
    _Generator = null;
    _seed = 0;
    _uses = 0;

    constructor() {
        super();
    }
    set seed(Seed) {
        Types.mustBe(Types.finiteNumber, Number(Seed));
        this._Generator = d3.randomLcg(Number(Seed));
        this._uses = 0;
    }
    rollInt(Min, Max) {
        Types.mustBeAll(Types.finiteInteger, Min, Max);
        Types.mustBeOK(() => Min <= Max);
        this._uses++;
        return Math.floor(this._Generator() * (Max - Min + 1) + Min);
    }
    roll(Min, Max) {
        if (!Min && !Max) return 0;
        Types.mustBeAll(Types.finiteNumber, Min, Max);
        Types.mustBeOK(() => Min <= Max);
        if (Types.are(Types.finiteInteger, Min, Max)) {
            return this.rollInt(Min, Max);
        } else if (((typeof Min === 'number') || Min === null) && ((typeof Max === 'number') || Max === null)) {
            return this.rollFloat(Min, Max);
        } else
            throw new Error('invalid overload');
    }
    rollFloat(Min, Max) {
        Types.mustBeAll(Types.finiteNumber, Min, Max);
        Types.mustBeOK(() => Min <= Max);
        this._uses++;
        return this._Generator() * (Max - Min) + Min;
    }
}