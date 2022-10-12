import { TestBed } from '@angular/core/testing';

import { AutentificacaoGuard } from './autentificacao.guard';

describe('AutentificacaoGuard', () => {
  let guard: AutentificacaoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutentificacaoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
