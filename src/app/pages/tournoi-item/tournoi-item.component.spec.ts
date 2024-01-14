import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoiItemComponent } from './tournoi-item.component';

describe('TournoiItemComponent', () => {
  let component: TournoiItemComponent;
  let fixture: ComponentFixture<TournoiItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournoiItemComponent]
    });
    fixture = TestBed.createComponent(TournoiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
