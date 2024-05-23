import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPkmComponent } from './list-pkm.component';

describe('ListPkmComponent', () => {
  let component: ListPkmComponent;
  let fixture: ComponentFixture<ListPkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPkmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
