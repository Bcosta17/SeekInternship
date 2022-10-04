import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlunoComponent } from './new-aluno.component';

describe('NewAlunoComponent', () => {
  let component: NewAlunoComponent;
  let fixture: ComponentFixture<NewAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
