import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayroomComponent } from './displayroom.component';

describe('DisplayroomComponent', () => {
  let component: DisplayroomComponent;
  let fixture: ComponentFixture<DisplayroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
