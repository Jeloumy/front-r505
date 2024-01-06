import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../shared/services/api.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Router} from "@angular/router";

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnexionComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, ApiService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call apiService and navigate on valid form submission', () => {
    spyOn(apiService, 'login').and.returnValue(Promise.resolve({ token: '12345' }));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.loginForm.controls['identifier'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password');
    component.onLoginSubmit();

    expect(apiService.login).toHaveBeenCalled();
  });
});
