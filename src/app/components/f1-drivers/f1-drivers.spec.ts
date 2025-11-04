import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1DriversComponent } from './f1-drivers';

describe('F1DriversComponent', () => {
  let component: F1DriversComponent;
  let fixture: ComponentFixture<F1DriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1DriversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});