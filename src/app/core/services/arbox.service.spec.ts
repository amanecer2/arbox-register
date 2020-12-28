import { TestBed } from '@angular/core/testing';

import { ArboxService } from './arbox.service';

describe('ArboxService', () => {
  let service: ArboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
