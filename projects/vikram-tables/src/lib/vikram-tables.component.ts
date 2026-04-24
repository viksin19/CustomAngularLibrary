import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TableColumn,
  TableFilterChange,
  TablePageChange,
  TableSortChange,
  SortDirection
} from './table-column';

@Component({
  selector: 'vikram-tables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vikram-tables.component.html',
  styleUrls: ['./vikram-tables.component.scss']
})
export class VikramTablesComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSizeOptions: number[] = [10, 25, 50];
  @Input() defaultPageSize = 10;
  @Input() enableGlobalSearch = true;
  @Input() enableColumnFilters = true;
  @Input() enableSorting = true;
  @Input() filterPlaceholder = 'Search...';
  @Input() noDataMessage = 'No records found';
  @Input() enableStyles = true;

  @Output() sortChange = new EventEmitter<TableSortChange>();
  @Output() filterChange = new EventEmitter<TableFilterChange>();
  @Output() pageChange = new EventEmitter<TablePageChange>();

  globalSearchTerm = '';
  columnFilters: Record<string, string> = {};
  currentPage = 1;
  pageSize = this.defaultPageSize;
  sortField: string | null = null;
  sortDirection: SortDirection = null;
  filteredData: any[] = [];
  displayedData: any[] = [];
  totalRecords = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultPageSize'] && changes['defaultPageSize'].currentValue) {
      this.pageSize = this.defaultPageSize;
    }

    if (changes['data'] || changes['columns']) {
      this.resetPagination();
      this.refreshTable();
    }
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }

  refreshTable(): void {
    this.filteredData = this.applyFilterAndSearch(this.data || []);
    this.totalRecords = this.filteredData.length;
    const sorted = this.applySorting(this.filteredData);
    this.displayedData = this.applyPagination(sorted);
  }

  applyFilterAndSearch(rows: any[]): any[] {
    return rows.filter(row => {
      if (this.enableGlobalSearch && this.globalSearchTerm.trim()) {
        const searchTerm = this.globalSearchTerm.trim().toLowerCase();
        const found = this.columns.some(column => {
          const value = this.getCellValue(row, column);
          return value !== null && String(value).toLowerCase().includes(searchTerm);
        });
        if (!found) {
          return false;
        }
      }

      if (this.enableColumnFilters) {
        for (const column of this.columns) {
          if (!column.filterable) {
            continue;
          }

          const filterValue = (this.columnFilters[String(column.field)] || '').trim().toLowerCase();
          if (!filterValue) {
            continue;
          }

          const cellValue = String(this.getCellValue(row, column) ?? '').toLowerCase();
          if (!cellValue.includes(filterValue)) {
            return false;
          }
        }
      }

      return true;
    });
  }

  applySorting(rows: any[]): any[] {
    if (!this.enableSorting || !this.sortField || !this.sortDirection) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      const left = this.getValueForSort(a, this.sortField);
      const right = this.getValueForSort(b, this.sortField);
      const comparison = this.compare(left, right);
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  getValueForSort(row: any, field: string | null): unknown {
    if (field === null) {
      return null;
    }

    const column = this.columns.find(col => String(col.field) === field);
    const value = row?.[field];

    if (column?.type === 'date') {
      return value ? new Date(value).getTime() : null;
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    return value;
  }

  toField(field: unknown): string {
    return String(field);
  }

  applyPagination(rows: any[]): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  compare(a: unknown, b: unknown): number {
    if (a == null && b == null) {
      return 0;
    }
    if (a == null) {
      return -1;
    }
    if (b == null) {
      return 1;
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    const aString = String(a).toLowerCase();
    const bString = String(b).toLowerCase();
    return aString < bString ? -1 : aString > bString ? 1 : 0;
  }

  toggleSort(column: TableColumn): void {
    if (!this.enableSorting || !column.sortable) {
      return;
    }

    const field = String(column.field);
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    this.sortChange.emit({ field: this.sortField, direction: this.sortDirection });
    this.currentPage = 1;
    this.refreshTable();
  }

  updateGlobalSearch(term: string): void {
    this.globalSearchTerm = term;
    this.currentPage = 1;
    this.emitFilterChange();
    this.refreshTable();
  }

  updateColumnFilter(field: string, value: string): void {
    this.columnFilters[field] = value;
    this.currentPage = 1;
    this.emitFilterChange();
    this.refreshTable();
  }

  emitFilterChange(): void {
    this.filterChange.emit({
      filters: { ...this.columnFilters },
      globalSearch: this.globalSearchTerm
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.pageCount) {
      return;
    }

    this.currentPage = page;
    this.pageChange.emit({ page, pageSize: this.pageSize });
    this.refreshTable();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
    this.refreshTable();
  }

  resetPagination(): void {
    this.currentPage = 1;
    if (!this.pageSizeOptions.includes(this.pageSize)) {
      this.pageSize = this.defaultPageSize;
    }
  }

  getCellValue(row: any, column: TableColumn): any {
    return row?.[String(column.field)];
  }

  formatCellValue(value: unknown, type?: string): string {
    if (type === 'date' && value) {
      return new Date(value as string | number | Date).toLocaleDateString();
    }

    return value == null ? '' : String(value);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
