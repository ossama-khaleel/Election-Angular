import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCandidateComponent } from './all-candidate.component';

describe('AllCandidateComponent', () => {
  let component: AllCandidateComponent;
  let fixture: ComponentFixture<AllCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
