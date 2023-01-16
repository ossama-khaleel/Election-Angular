import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElectiondurationComponent } from './manage-electionduration.component';

describe('ManageElectiondurationComponent', () => {
  let component: ManageElectiondurationComponent;
  let fixture: ComponentFixture<ManageElectiondurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageElectiondurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageElectiondurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
