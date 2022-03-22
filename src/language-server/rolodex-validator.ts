import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { RolodexAstType, Person } from './generated/ast';
import type { RolodexServices } from './rolodex-module';

/**
 * Map AST node types to validation checks.
 */
type RolodexChecks = { [type in RolodexAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class RolodexValidationRegistry extends ValidationRegistry {
    constructor(services: RolodexServices) {
        super(services);
        const validator = services.validation.RolodexValidator;
        const checks: RolodexChecks = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class RolodexValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
