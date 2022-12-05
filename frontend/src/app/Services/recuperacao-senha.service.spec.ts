import { TestBed } from '@angular/core/testing';

import { RecuperacaoSenhaService } from './recuperacao-senha.service';

describe('RecuperacaoSenhaService', () => {
  let service: RecuperacaoSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperacaoSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
