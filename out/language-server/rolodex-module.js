"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRolodexServices = exports.RolodexModule = void 0;
const langium_1 = require("langium");
const module_1 = require("./generated/module");
const rolodex_validator_1 = require("./rolodex-validator");
/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
exports.RolodexModule = {
    validation: {
        ValidationRegistry: (services) => new rolodex_validator_1.RolodexValidationRegistry(services),
        RolodexValidator: () => new rolodex_validator_1.RolodexValidator()
    }
};
/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
function createRolodexServices(context) {
    const shared = (0, langium_1.inject)((0, langium_1.createDefaultSharedModule)(context), module_1.RolodexGeneratedSharedModule);
    const Rolodex = (0, langium_1.inject)((0, langium_1.createDefaultModule)({ shared }), module_1.RolodexGeneratedModule, exports.RolodexModule);
    shared.ServiceRegistry.register(Rolodex);
    return { shared, Rolodex };
}
exports.createRolodexServices = createRolodexServices;
//# sourceMappingURL=rolodex-module.js.map