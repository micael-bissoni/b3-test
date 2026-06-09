export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: 'MAIN' | 'SHIPPING' | 'BILLING' | 'OTHER';
}

export interface EntityData {
  eik: string;
  type: string;
  name: string;
  abbreviation: string;
  vat: string | null;
  isActive: boolean;
  logo?: string;
  parentId?: string | null;
  addresses?: Address[];
}