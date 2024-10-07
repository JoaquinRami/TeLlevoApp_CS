import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PQrPage } from './p-qr.page';

describe('PQrPage', () => {
  let component: PQrPage;
  let fixture: ComponentFixture<PQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
