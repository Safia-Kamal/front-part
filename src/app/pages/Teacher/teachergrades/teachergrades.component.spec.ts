import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachergradesComponent } from './teachergrades.component';

describe('TeachergradesComponent', () => {
  let component: TeachergradesComponent;
  let fixture: ComponentFixture<TeachergradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachergradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachergradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
