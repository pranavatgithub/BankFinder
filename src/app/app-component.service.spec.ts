import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponentService } from './app-component.service';

describe('AppComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [],
    providers: []
  }));

  it('should be created', () => {
    const service: AppComponentService = TestBed.get(AppComponentService);
    expect(service).toBeTruthy();
  });
});
