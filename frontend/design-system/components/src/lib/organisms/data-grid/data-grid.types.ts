import { Type } from '@angular/core';

export interface DataGridRecord {
  id: string;
  [key: string]: unknown;
}

export interface DataGridColumn {
  id: string;
  label: string;
  key?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerComponent?: Type<unknown>;
  cellComponent?: Type<unknown>;
  cellConfig?: (record: DataGridRecord) => Record<string, unknown>;
}

export interface DataGridNestedConfig {
  columns: DataGridColumn[];
  dataKey: string;
  nestedConfig?: DataGridNestedConfig;
}

