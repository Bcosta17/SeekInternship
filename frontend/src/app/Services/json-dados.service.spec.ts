import { TestBed } from '@angular/core/testing';

import { JsonDadosService } from './json-dados.service';

describe('JsonDadosService', () => {
  let service: JsonDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
