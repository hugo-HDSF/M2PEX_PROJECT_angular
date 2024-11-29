import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChemicalComponent } from './add-chemical.component';

describe('AddChemicalComponent', () => {
  let component: AddChemicalComponent;
  let fixture: ComponentFixture<AddChemicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChemicalComponent],
    });
    fixture = TestBed.createComponent(AddChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
