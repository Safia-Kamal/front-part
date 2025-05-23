import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentadminComponent } from './studentadmin.component';

describe('StudentadminComponent', () => {
  let component: StudentadminComponent;
  let fixture: ComponentFixture<StudentadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
