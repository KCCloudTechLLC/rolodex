import {
    createDefaultModule, createDefaultSharedModule, DefaultSharedModuleContext, inject,
    LangiumServices, LangiumSharedServices, Module, PartialLangiumServices
} from 'langium';
import { RolodexGeneratedModule, RolodexGeneratedSharedModule } from './generated/module';
import { RolodexValidationRegistry, RolodexValidator } from './rolodex-validator';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type RolodexAddedServices = {
    validation: {
        RolodexValidator: RolodexValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type RolodexServices = LangiumServices & RolodexAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const RolodexModule: Module<RolodexServices, PartialLangiumServices & RolodexAddedServices> = {
    validation: {
        ValidationRegistry: (services) => new RolodexValidationRegistry(services),
        RolodexValidator: () => new RolodexValidator()
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
export function createRolodexServices(context?: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    Rolodex: RolodexServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        RolodexGeneratedSharedModule
    );
    const Rolodex = inject(
        createDefaultModule({ shared }),
        RolodexGeneratedModule,
        RolodexModule
    );
    shared.ServiceRegistry.register(Rolodex);
    return { shared, Rolodex };
}
