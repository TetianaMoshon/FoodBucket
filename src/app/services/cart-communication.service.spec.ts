import { TestBed, inject } from '@angular/core/testing';

import { CartCommunicationService } from './cart-communication.service';

describe('CartCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartCommunicationService]
    });
  });

  it('should be created', inject([CartCommunicationService], (service: CartCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
