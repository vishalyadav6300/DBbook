import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoureventsComponent } from './yourevents.component';

describe('YoureventsComponent', () => {
  let component: YoureventsComponent;
  let fixture: ComponentFixture<YoureventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoureventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoureventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
