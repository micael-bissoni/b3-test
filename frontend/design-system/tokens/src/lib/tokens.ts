import { base } from './generated/base/index';
export { base };
import { brand1 } from './generated/brand-1/index';
export { brand1 };
import { brand2 } from './generated/brand-2/index';
export { brand2 };

export const brands = {
  'base': 'base',
  'brand1': 'brand-1',
  'brand2': 'brand-2',
} as const;

export type Brand = keyof typeof brands;
