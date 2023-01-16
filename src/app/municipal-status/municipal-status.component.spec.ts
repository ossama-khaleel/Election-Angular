import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalStatusComponent } from './municipal-status.component';

describe('MunicipalStatusComponent', () => {
  let component: MunicipalStatusComponent;
  let fixture: ComponentFixture<MunicipalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
