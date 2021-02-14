/**
 *
 * @author Impaler
 */
import { Serializable } from "../other.js";
import { Types } from "../other/Types.js";

export class Dice extends Serializable() {
    constructor() {
        super();
        this.Generator = null;
        this.seed(0);
        this.uses = 0;
    }
    seed(Seed) { // TODO turn into setter
        Types.mustBe(Types.finiteNumber, Number(Seed));
        this.Generator = d3.randomLcg(Number(Seed));
        this.uses = 0;
    }
    rollInt(Min, Max) {
        Types.mustBeAll(Types.finiteInteger, Min, Max);
        Types.mustBeOK(() => Min <= Max);
        this.uses++;
        return Math.floor(this.Generator() * (Max - Min + 1) + Min);
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
        this.uses++;
        return this.Generator() * (Max - Min) + Min;
    }
}