import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVagaComponent } from './edit-vaga.component';

describe('EditVagaComponent', () => {
  let component: EditVagaComponent;
  let fixture: ComponentFixture<EditVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVagaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
