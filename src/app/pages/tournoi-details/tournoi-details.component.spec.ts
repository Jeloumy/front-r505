import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoiDetailsComponent } from './tournoi-details.component';

describe('TournoiDetailsComponent', () => {
  let component: TournoiDetailsComponent;
  let fixture: ComponentFixture<TournoiDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournoiDetailsComponent]
    });
    fixture = TestBed.createComponent(TournoiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
