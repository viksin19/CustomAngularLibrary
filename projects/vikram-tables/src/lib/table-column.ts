import { TemplateRef } from '@angular/core';

export type TableColumnType = 'text' | 'number' | 'date';
export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = any> {
  field: keyof T | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: TableColumnType;
  width?: string;
  template?: TemplateRef<{ $implicit: T[keyof T]; row: T; column: TableColumn<T> }>;
  headerClass?: string;
  cellClass?: string;
}

export interface TableSortChange {
  field: string | null;
  direction: SortDirection;
}

export interface TableFilterChange {
  filters: Record<string, string>;
  globalSearch: string;
}

export interface TablePageChange {
  page: number;
  pageSize: number;
}
