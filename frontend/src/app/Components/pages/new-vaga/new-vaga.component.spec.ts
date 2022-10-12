import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVagaComponent } from './new-vaga.component';

describe('NewVagaComponent', () => {
  let component: NewVagaComponent;
  let fixture: ComponentFixture<NewVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVagaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
