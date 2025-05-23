import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleadminComponent } from './scheduleadmin.component';

describe('ScheduleadminComponent', () => {
  let component: ScheduleadminComponent;
  let fixture: ComponentFixture<ScheduleadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
