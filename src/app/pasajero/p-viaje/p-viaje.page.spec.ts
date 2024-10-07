import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PViajePage } from './p-viaje.page';

describe('PViajePage', () => {
  let component: PViajePage;
  let fixture: ComponentFixture<PViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
