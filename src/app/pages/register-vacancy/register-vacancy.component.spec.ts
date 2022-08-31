import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVacancyComponent } from './register-vacancy.component';

describe('RegisterVacancyComponent', () => {
  let component: RegisterVacancyComponent;
  let fixture: ComponentFixture<RegisterVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVacancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
