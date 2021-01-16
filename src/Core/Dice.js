/**
 *
 * @author Impaler
 */
import { Serializable } from "../other/Serializable.js";

export class Dice extends Serializable {
    constructor() {
        super();
        this.Generator = null;
        this.seed(0);
        this.uses = 0;
    }
    seed(Seed) {
        this.Generator = d3.randomLcg(Seed);
        this.uses = 0;
    }
    rollInt(Min, Max) {
        this.uses++;
        return Math.floor(this.Generator() * (Max - Min + 1) + Min);
    }
    roll(Min, Max) {
        if (((typeof Min === 'number') || Min === null) && ((typeof Max === 'number') || Max === null) && Math.round(Min) === Min && Math.round(Max) === Max) {
            return this.rollInt(Min, Max);
        } else if (((typeof Min === 'number') || Min === null) && ((typeof Max === 'number') || Max === null)) {
            return this.rollFloat(Min, Max);
        } else
            throw new Error('invalid overload');;
    }
    rollFloat(Min, Max) {
        this.uses++;
        return this.Generator() * (Max - Min) + Min;
    }
}
Dice.serialVersionUID = 1;
