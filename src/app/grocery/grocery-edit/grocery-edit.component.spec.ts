import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryEditComponent } from './grocery-edit.component';

describe('GroceryEditComponent', () => {
  let component: GroceryEditComponent;
  let fixture: ComponentFixture<GroceryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
