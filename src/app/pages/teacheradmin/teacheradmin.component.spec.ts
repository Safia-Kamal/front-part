import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheradminComponent } from './teacheradmin.component';

describe('TeacheradminComponent', () => {
  let component: TeacheradminComponent;
  let fixture: ComponentFixture<TeacheradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacheradminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacheradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
