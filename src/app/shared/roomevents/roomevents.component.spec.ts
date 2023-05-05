import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomeventsComponent } from './roomevents.component';

describe('RoomeventsComponent', () => {
  let component: RoomeventsComponent;
  let fixture: ComponentFixture<RoomeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
