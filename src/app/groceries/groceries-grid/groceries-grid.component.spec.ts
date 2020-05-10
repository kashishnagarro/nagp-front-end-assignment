import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesGridComponent } from './groceries-grid.component';

describe('GroceriesGridComponent', () => {
  let component: GroceriesGridComponent;
  let fixture: ComponentFixture<GroceriesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceriesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceriesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
