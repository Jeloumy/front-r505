import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournoisComponent } from './tournois.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../shared/services/api.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Router} from "@angular/router";

describe('TournoisComponent', () => {
  let component: TournoisComponent;
  let fixture: ComponentFixture<TournoisComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TournoisComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, ApiService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoisComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tournoi form should be invalid when empty', () => {
    expect(component.TournoiForm.valid).toBeFalsy();
  });

  it('should call apiService and navigate on valid form submission', () => {
    spyOn(apiService, 'tournoi').and.returnValue(Promise.resolve({ success: true }));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.TournoiForm.controls['name'].setValue('Tournoi Test');
    component.TournoiForm.controls['description'].setValue('Description Test');
    component.TournoiForm.controls['begin_date'].setValue('2022-01-01');
    component.TournoiForm.controls['end_date'].setValue('2022-01-02');
    component.TournoiForm.controls['jeu_id'].setValue('1');
    component.submitTournoi();

    expect(apiService.tournoi).toHaveBeenCalled();
  });
});
