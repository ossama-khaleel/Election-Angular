import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedComponent } from './voted.component';

describe('VotedComponent', () => {
  let component: VotedComponent;
  let fixture: ComponentFixture<VotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
