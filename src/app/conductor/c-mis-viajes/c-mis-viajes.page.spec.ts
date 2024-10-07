import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CMisViajesPage } from './c-mis-viajes.page';

describe('CMisViajesPage', () => {
  let component: CMisViajesPage;
  let fixture: ComponentFixture<CMisViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CMisViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
