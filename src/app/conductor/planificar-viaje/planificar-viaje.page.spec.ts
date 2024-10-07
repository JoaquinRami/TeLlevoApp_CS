import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanificarViajePage } from './planificar-viaje.page';

describe('PlanificarViajePage', () => {
  let component: PlanificarViajePage;
  let fixture: ComponentFixture<PlanificarViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
