import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMunicipalStatusComponent } from './manage-municipal-status.component';

describe('ManageMunicipalStatusComponent', () => {
  let component: ManageMunicipalStatusComponent;
  let fixture: ComponentFixture<ManageMunicipalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMunicipalStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMunicipalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
