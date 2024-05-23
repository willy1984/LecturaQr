import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPkmComponent } from './details-pkm.component';

describe('DetailsPkmComponent', () => {
  let component: DetailsPkmComponent;
  let fixture: ComponentFixture<DetailsPkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPkmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsPkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
