"use strict";
/******************************************************************************
 * This file was generated by langium-cli 0.3.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflection = exports.RolodexAstReflection = exports.isPerson = exports.Person = exports.isModel = exports.Model = exports.isGreeting = exports.Greeting = void 0;
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
const langium_1 = require("langium");
exports.Greeting = 'Greeting';
function isGreeting(item) {
    return exports.reflection.isInstance(item, exports.Greeting);
}
exports.isGreeting = isGreeting;
exports.Model = 'Model';
function isModel(item) {
    return exports.reflection.isInstance(item, exports.Model);
}
exports.isModel = isModel;
exports.Person = 'Person';
function isPerson(item) {
    return exports.reflection.isInstance(item, exports.Person);
}
exports.isPerson = isPerson;
class RolodexAstReflection {
    getAllTypes() {
        return ['Greeting', 'Model', 'Person'];
    }
    isInstance(node, type) {
        return (0, langium_1.isAstNode)(node) && this.isSubtype(node.$type, type);
    }
    isSubtype(subtype, supertype) {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            default: {
                return false;
            }
        }
    }
    getReferenceType(referenceId) {
        switch (referenceId) {
            case 'Greeting:person': {
                return exports.Person;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
}
exports.RolodexAstReflection = RolodexAstReflection;
exports.reflection = new RolodexAstReflection();
//# sourceMappingURL=ast.js.map