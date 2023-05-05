import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequsettimeoutComponent } from './requsettimeout.component';

describe('RequsettimeoutComponent', () => {
  let component: RequsettimeoutComponent;
  let fixture: ComponentFixture<RequsettimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequsettimeoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequsettimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
