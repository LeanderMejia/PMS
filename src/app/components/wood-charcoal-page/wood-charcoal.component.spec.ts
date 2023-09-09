import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodCharcoalComponent } from './wood-charcoal.component';

describe('WoodCharcoalComponent', () => {
  let component: WoodCharcoalComponent;
  let fixture: ComponentFixture<WoodCharcoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoodCharcoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WoodCharcoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
