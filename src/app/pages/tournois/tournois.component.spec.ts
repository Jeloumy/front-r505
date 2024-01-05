import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoisComponent } from './tournois.component';

describe('TournoisComponent', () => {
  let component: TournoisComponent;
  let fixture: ComponentFixture<TournoisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournoisComponent]
    });
    fixture = TestBed.createComponent(TournoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
