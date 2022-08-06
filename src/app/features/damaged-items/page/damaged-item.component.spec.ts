import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedItemComponent } from './damaged-item.component';

describe('DamagedItemComponent', () => {
  let component: DamagedItemComponent;
  let fixture: ComponentFixture<DamagedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamagedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamagedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
