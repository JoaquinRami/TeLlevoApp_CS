import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PMisViajesPage } from './p-mis-viajes.page';

describe('PMisViajesPage', () => {
  let component: PMisViajesPage;
  let fixture: ComponentFixture<PMisViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PMisViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
