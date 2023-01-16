import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMunicipalNameComponent } from './manage-municipal-name.component';

describe('ManageMunicipalNameComponent', () => {
  let component: ManageMunicipalNameComponent;
  let fixture: ComponentFixture<ManageMunicipalNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMunicipalNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMunicipalNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
