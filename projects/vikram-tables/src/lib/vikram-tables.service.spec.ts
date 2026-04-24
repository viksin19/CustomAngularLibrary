import { TestBed } from '@angular/core/testing';

import { VikramTablesService } from './vikram-tables.service';

describe('VikramTablesService', () => {
  let service: VikramTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VikramTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
