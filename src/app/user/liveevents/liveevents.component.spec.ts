import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveeventsComponent } from './liveevents.component';

describe('LiveeventsComponent', () => {
  let component: LiveeventsComponent;
  let fixture: ComponentFixture<LiveeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
