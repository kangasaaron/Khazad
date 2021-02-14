import { createNewInterface } from "./interface.js";

export const Serializable = createNewInterface("Serializable", "writeObject", "readObject", "readObjectNoData", { name: "serialVersionUID", value: 1, isStatic: true });