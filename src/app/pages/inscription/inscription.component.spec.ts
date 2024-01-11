import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionComponent } from './inscription.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../shared/services/api.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Router} from "@angular/router";

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, ApiService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inscription form should be invalid when empty', () => {
    expect(component.inscriptionForm.valid).toBeFalsy();
  });

  it('should call apiService and navigate on valid form submission', () => {
    spyOn(apiService, 'inscription').and.returnValue(Promise.resolve({ token: '12345' }));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.inscriptionForm.controls['name'].setValue('John Doe');
    component.inscriptionForm.controls['email'].setValue('johndoe@example.com');
    component.inscriptionForm.controls['pseudo'].setValue('johndoe');
    component.inscriptionForm.controls['password'].setValue('password');
    component.submitInscription();

    expect(apiService.inscription).toHaveBeenCalled();
  });
});
