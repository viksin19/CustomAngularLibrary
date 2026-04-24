# vikram-tables

An Angular library for displaying data in tabular format with built-in sorting, filtering, and pagination features.

## Features

- **Client-side sorting**: Sort columns in ascending or descending order
- **Global search**: Search across all visible columns
- **Column-specific filters**: Filter individual columns
- **Pagination**: Navigate through data with customizable page sizes
- **Configurable styling**: Enable/disable SCSS-based styling
- **Custom templates**: Support for custom cell templates
- **TypeScript support**: Full TypeScript definitions and interfaces

## Installation

### For development (from source)

```bash
git clone https://github.com/viksin19/CustomAngularLibrary.git
cd CustomAngularLibrary
npm install
```

### As a dependency (once published)

```bash
npm install vikram-tables
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { VikramTablesComponent, TableColumn } from 'vikram-tables';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [VikramTablesComponent],
  template: `
    <vikram-tables
      [data]="products"
      [columns]="columns"
      [enableGlobalSearch]="true"
      [enableColumnFilters]="true"
      [enableSorting]="true"
    ></vikram-tables>
  `
})
export class ProductsComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Book', price: 20, category: 'Education' }
  ];

  columns: TableColumn<Product>[] = [
    { field: 'id', header: 'ID', sortable: true, type: 'number' },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'price', header: 'Price', sortable: true, type: 'number' },
    { field: 'category', header: 'Category', filterable: true }
  ];
}
```

### Advanced Configuration

```typescript
columns: TableColumn[] = [
  {
    field: 'name',
    header: 'Product Name',
    sortable: true,
    filterable: true,
    width: '200px'
  },
  {
    field: 'price',
    header: 'Price',
    sortable: true,
    type: 'number',
    template: customPriceTemplate // TemplateRef for custom rendering
  }
];
```

## API Reference

### VikramTablesComponent Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `any[]` | `[]` | Array of data objects to display |
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `pageSizeOptions` | `number[]` | `[10, 25, 50]` | Available page sizes |
| `defaultPageSize` | `number` | `10` | Initial page size |
| `enableGlobalSearch` | `boolean` | `true` | Enable global search input |
| `enableColumnFilters` | `boolean` | `true` | Enable per-column filters |
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `filterPlaceholder` | `string` | `'Search...'` | Placeholder for global search |
| `noDataMessage` | `string` | `'No records found'` | Message when no data |
| `enableStyles` | `boolean` | `true` | Apply built-in SCSS styles |

### VikramTablesComponent Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `sortChange` | `{ field: string \| null, direction: SortDirection }` | Emitted when sort changes |
| `filterChange` | `{ filters: Record<string, string>, globalSearch: string }` | Emitted when filters change |
| `pageChange` | `{ page: number, pageSize: number }` | Emitted when page changes |

### TableColumn Interface

```typescript
interface TableColumn<T = any> {
  field: keyof T | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date';
  width?: string;
  template?: TemplateRef<any>;
  headerClass?: string;
  cellClass?: string;
}
```

## Development

### Building the Library

```bash
# Build the vikram-tables library
ng build vikram-tables

# Build the demo application
ng build demo-app
```

### Running the Demo

```bash
# Start the demo application
npm start
# or
ng serve demo-app
```

Navigate to `http://localhost:4200` to see the demo.

### Running Tests

```bash
# Test the library
ng test vikram-tables

# Test the demo app
ng test demo-app
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue on GitHub.
