import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BambooComponent } from './bamboo.component';

describe('BambooComponent', () => {
  let component: BambooComponent;
  let fixture: ComponentFixture<BambooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BambooComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BambooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
