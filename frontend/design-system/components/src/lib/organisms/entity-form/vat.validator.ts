import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Specification interface for business rules
 */
export interface Specification<T> {
  isSatisfiedBy(value: T): boolean;
}

/**
 * VAT Specification handling rules for different locales
 */
export class VatSpecification implements Specification<string> {
  constructor(private readonly locale: string) { }

  isSatisfiedBy(vat: string): boolean {
    if (!vat) return true;

    switch (this.locale) {
      case 'pt-BR':
        return this.validatePt(vat);
      case 'es-ES':
        return this.validateEs(vat);
      case 'en-GB':
        return this.validateGb(vat);
      default:
        // For other locales, we just check if it's not empty if we don't have specific rules
        return vat.length > 0;
    }
  }

  private validatePt(vat: string): boolean {
    if (!/^[0-9]{9}$/.test(vat)) return false;

    const added = Number(vat[0]) * 9 +
      Number(vat[1]) * 8 +
      Number(vat[2]) * 7 +
      Number(vat[3]) * 6 +
      Number(vat[4]) * 5 +
      Number(vat[5]) * 4 +
      Number(vat[6]) * 3 +
      Number(vat[7]) * 2;

    const res = added % 11;
    const checkDigit = res < 2 ? 0 : 11 - res;

    return checkDigit === Number(vat[8]);
  }

  private validateEs(vat: string): boolean {
    // Basic Spanish VAT pattern (NIF/CIF/NIE)
    return /^[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(vat);
  }

  private validateGb(vat: string): boolean {
    // Basic UK VAT pattern
    return /^(GB)?([0-9]{9}|[0-9]{12}|(GD|HA)[0-9]{3})$/.test(vat);
  }
}

/**
 * Dynamic VAT Validator Factory
 * @param locale The current locale to use for validation
 */
export function vatValidator(locale: string): ValidatorFn {
  const spec = new VatSpecification(locale);

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    return spec.isSatisfiedBy(value) ? null : { vatInvalid: true };
  };
}
