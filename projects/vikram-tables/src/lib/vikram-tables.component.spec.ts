import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikramTablesComponent } from './vikram-tables.component';

describe('VikramTablesComponent', () => {
  let component: VikramTablesComponent;
  let fixture: ComponentFixture<VikramTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikramTablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VikramTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
