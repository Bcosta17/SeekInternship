import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCandidaturasComponent } from './aluno-candidaturas.component';

describe('AlunoCandidaturasComponent', () => {
  let component: AlunoCandidaturasComponent;
  let fixture: ComponentFixture<AlunoCandidaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoCandidaturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoCandidaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
