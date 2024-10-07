import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CHomePage } from './c-home.page';

describe('CHomePage', () => {
  let component: CHomePage;
  let fixture: ComponentFixture<CHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
