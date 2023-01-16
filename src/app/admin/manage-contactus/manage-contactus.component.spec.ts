import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactusComponent } from './manage-contactus.component';

describe('ManageContactusComponent', () => {
  let component: ManageContactusComponent;
  let fixture: ComponentFixture<ManageContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
