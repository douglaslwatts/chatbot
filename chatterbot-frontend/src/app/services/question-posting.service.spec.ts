import { TestBed } from '@angular/core/testing';

import { QuestionPostingService } from './question-posting.service';

describe('QuestionPostingService', () => {
  let service: QuestionPostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionPostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
