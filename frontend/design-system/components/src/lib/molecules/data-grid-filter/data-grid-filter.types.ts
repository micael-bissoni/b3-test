import { Type } from '@angular/core';

export interface FilterConfig {
  id: string;
  label: string;
  component: Type<unknown>;
  options: string[];
}

export interface FilterState {
  [key: string]: Set<string> | string | number | boolean | undefined;
}

