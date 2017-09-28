import { TestBed, inject } from '@angular/core/testing';

import { SearchHelpersService } from './search-helpers.service';

describe('SearchHelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchHelpersService]
    });
  });

  it('should be created', inject([SearchHelpersService], (service: SearchHelpersService) => {
    expect(service).toBeTruthy();
  }));
});
