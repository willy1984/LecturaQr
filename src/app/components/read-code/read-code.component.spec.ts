import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCodeComponent } from './read-code.component';

describe('ReadCodeComponent', () => {
  let component: ReadCodeComponent;
  let fixture: ComponentFixture<ReadCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
