import { Component } from '@angular/core';
import { VikramTablesComponent, TableColumn } from 'vikram-tables';

interface DemoRow {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VikramTablesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vikram-tables demo';

  tableData: DemoRow[] = [
    { id: 1, name: 'Sleek Lamp', category: 'Home', price: 32.5, available: true, createdAt: '2026-03-15' },
    { id: 2, name: 'Running Shoes', category: 'Sports', price: 85.0, available: true, createdAt: '2026-01-20' },
    { id: 3, name: 'Bluetooth Speaker', category: 'Audio', price: 59.99, available: false, createdAt: '2025-12-05' },
    { id: 4, name: 'Desk Organizer', category: 'Office', price: 16.75, available: true, createdAt: '2026-02-02' },
    { id: 5, name: 'Coffee Mug', category: 'Kitchen', price: 12.0, available: true, createdAt: '2026-04-01' },
    { id: 6, name: 'Yoga Mat', category: 'Fitness', price: 24.99, available: false, createdAt: '2026-03-09' },
    { id: 7, name: 'Notebook', category: 'Office', price: 7.5, available: true, createdAt: '2026-02-24' },
    { id: 8, name: 'Wireless Mouse', category: 'Computing', price: 29.99, available: true, createdAt: '2026-03-28' }
  ];

  tableColumns: TableColumn<DemoRow>[] = [
    { field: 'id', header: 'ID', sortable: true, filterable: true, type: 'number', width: '80px' },
    { field: 'name', header: 'Name', sortable: true, filterable: true, type: 'text' },
    { field: 'category', header: 'Category', sortable: true, filterable: true, type: 'text' },
    { field: 'price', header: 'Price', sortable: true, filterable: true, type: 'number' },
    { field: 'available', header: 'Available', sortable: true, filterable: true, type: 'text' },
    { field: 'createdAt', header: 'Created', sortable: true, filterable: true, type: 'date' }
  ];

  onSortChange(event: { field: string | null; direction: string | null }): void {
    console.log('Sort changed', event);
  }

  onFilterChange(event: { filters: Record<string, string>; globalSearch: string }): void {
    console.log('Filter changed', event);
  }

  onPageChange(event: { page: number; pageSize: number }): void {
    console.log('Page changed', event);
  }
}
