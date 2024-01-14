import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEquipeComponent } from './mon-equipe.component';

describe('MonEquipeComponent', () => {
  let component: MonEquipeComponent;
  let fixture: ComponentFixture<MonEquipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonEquipeComponent]
    });
    fixture = TestBed.createComponent(MonEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
