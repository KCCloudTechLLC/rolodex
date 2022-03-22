"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolodexValidator = exports.RolodexValidationRegistry = void 0;
const langium_1 = require("langium");
/**
 * Registry for validation checks.
 */
class RolodexValidationRegistry extends langium_1.ValidationRegistry {
    constructor(services) {
        super(services);
        const validator = services.validation.RolodexValidator;
        const checks = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}
exports.RolodexValidationRegistry = RolodexValidationRegistry;
/**
 * Implementation of custom validations.
 */
class RolodexValidator {
    checkPersonStartsWithCapital(person, accept) {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }
}
exports.RolodexValidator = RolodexValidator;
//# sourceMappingURL=rolodex-validator.js.map