import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAlunoComponent } from './register-aluno.component';

describe('RegisterAlunoComponent', () => {
  let component: RegisterAlunoComponent;
  let fixture: ComponentFixture<RegisterAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
