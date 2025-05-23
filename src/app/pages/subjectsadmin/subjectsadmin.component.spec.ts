import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsadminComponent } from './subjectsadmin.component';

describe('SubjectsadminComponent', () => {
  let component: SubjectsadminComponent;
  let fixture: ComponentFixture<SubjectsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
