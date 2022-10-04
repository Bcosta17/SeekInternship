import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpresaComponent } from './new-empresa.component';

describe('NewEmpresaComponent', () => {
  let component: NewEmpresaComponent;
  let fixture: ComponentFixture<NewEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
