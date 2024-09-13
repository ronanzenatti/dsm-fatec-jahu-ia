import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalisePage } from './analise.page';

describe('AnalisePage', () => {
  let component: AnalisePage;
  let fixture: ComponentFixture<AnalisePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
