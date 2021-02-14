import { createNewInterface } from "../other.js";

/**
 *
 * @author Dallas
 */
// export const Updatable = function Updatable(Base) {
//     let Updatable = class Updatable extends AbstractClass(Base) {
//         update() {
//             this.abstractFunction("Updatable", "update");
//         }
//     };
//     Updatable.Mixins = Updatable.Mixins || {};
//     Updatable.Mixins.Updatable = Updatable;
//     Updatable.isInterface = true;
//     return Updatable;
// }
// Updatable.isInterface = true;
export const Updatable = createNewInterface("Updatable", "update");