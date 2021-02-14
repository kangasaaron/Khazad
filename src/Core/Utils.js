import { Types } from "../other/Types.js";

export const Utils = {
    padLeadingZero: function(number) {
        Types.mustBe('number', number);
        if (number < 10 && number >= 0) {
            return "0" + number.toString(10);
        } else if (number > -10 && number < 0) {
            return `-0${Math.abs(number)}`
        } else {
            return number.toString(10);
        }
    },
    upperCaseFirst: function(str) {
        Types.mustBe('string', str);
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}