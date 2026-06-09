import { describe, it, expect } from 'vitest';
import { VatSpecification } from './vat.validator';


describe('VatSpecification', () => {
  describe('pt-BR locale', () => {
    const spec = new VatSpecification('pt-BR');

    it('should return true for valid Portuguese VAT', () => {
      // Valid PT VAT: 501442600 (Google Portugal)
      expect(spec.isSatisfiedBy('501442600')).toBe(true);
    });

    it('should return false for invalid Portuguese VAT', () => {
      expect(spec.isSatisfiedBy('501442601')).toBe(false);
    });

    it('should return false for VAT with wrong length', () => {
      expect(spec.isSatisfiedBy('50144260')).toBe(false);
      expect(spec.isSatisfiedBy('5014426000')).toBe(false);
    });

    it('should return false for non-numeric VAT', () => {
      expect(spec.isSatisfiedBy('50144260A')).toBe(false);
    });
  });

  describe('es-ES locale', () => {
    const spec = new VatSpecification('es-ES');

    it('should return true for valid-looking Spanish VAT', () => {
      expect(spec.isSatisfiedBy('B12345678')).toBe(true);
    });

    it('should return false for invalid-looking Spanish VAT', () => {
      expect(spec.isSatisfiedBy('12345678')).toBe(false);
    });
  });
});
