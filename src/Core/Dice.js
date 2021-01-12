/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var Core;
(function (Core) {
    /**
     *
     * @author Impaler
     * @class
     */
    var Dice = /** @class */ (function () {
        function Dice() {
            if (this.Generator === undefined) {
                this.Generator = null;
            }
            this.Generator = new java.util.Random();
            this.seed(0);
        }
        Dice.prototype.seed = function (Seed) {
            this.Generator.setSeed(Seed);
        };
        Dice.prototype.roll$int$int = function (Min, Max) {
            return this.Generator.nextInt(Max - Min + 1) + Min;
        };
        Dice.prototype.roll = function (Min, Max) {
            if (((typeof Min === 'number') || Min === null) && ((typeof Max === 'number') || Max === null)) {
                return this.roll$int$int(Min, Max);
            }
            else if (((typeof Min === 'number') || Min === null) && ((typeof Max === 'number') || Max === null)) {
                return this.roll$float$float(Min, Max);
            }
            else
                throw new Error('invalid overload');
        };
        Dice.prototype.roll$float$float = function (Min, Max) {
            return this.Generator.nextFloat() * (Max - Min) + Min;
        };
        Dice.serialVersionUID = 1;
        return Dice;
    }());
    Core.Dice = Dice;
    Dice["__class"] = "Core.Dice";
    Dice["__interfaces"] = ["java.io.Serializable"];
})(Core || (Core = {}));
