import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PHomePage } from './p-home.page';

describe('PHomePage', () => {
  let component: PHomePage;
  let fixture: ComponentFixture<PHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
