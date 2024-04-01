import { TestBed } from '@angular/core/testing';

import { SelectedProductService } from './selected-product.service';

describe('SelectedProductService', () => {
  let service: SelectedProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
