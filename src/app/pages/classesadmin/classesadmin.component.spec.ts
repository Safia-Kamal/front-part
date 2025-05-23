import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesadminComponent } from './classesadmin.component';

describe('ClassesadminComponent', () => {
  let component: ClassesadminComponent;
  let fixture: ComponentFixture<ClassesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
