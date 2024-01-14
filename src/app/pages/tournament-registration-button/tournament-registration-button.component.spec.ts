import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentRegistrationButtonComponent } from './tournament-registration-button.component';

describe('TournamentRegistrationButtonComponent', () => {
  let component: TournamentRegistrationButtonComponent;
  let fixture: ComponentFixture<TournamentRegistrationButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentRegistrationButtonComponent]
    });
    fixture = TestBed.createComponent(TournamentRegistrationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
