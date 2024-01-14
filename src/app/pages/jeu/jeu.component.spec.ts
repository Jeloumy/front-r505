import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeuComponent } from './jeu.component';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../shared/services/api.service';
import { ValidFileTypePipe } from '../../pipes/ValidFileType/valid-file-type.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JeuComponent', () => {
  let component: JeuComponent;
  let fixture: ComponentFixture<JeuComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeuComponent, ValidFileTypePipe],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, ApiService],
      schemas: [NO_ERRORS_SCHEMA] // Utilisé pour ignorer les éléments inconnus dans le template
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour vérifier la logique de 'onFileChange'
  it('should handle file change', () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const event = {
      target: { files: [mockFile] }
    };

    component.onFileChange(event as any);

    const imageControl = component.uploadForm.controls['image'] as FormControl;
    expect(imageControl.value).toEqual(mockFile);
    expect(component.isValidFileType).toBeTrue();
  });



  // Test pour vérifier la logique de 'onSubmit'
  it('should submit form data', () => {
    // Préparation des données mock
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    component.uploadForm.controls['name'].setValue('Test Game');
    component.uploadForm.controls['image'].setValue(mockFile);
    component.isValidFileType = true;

    // Espionner sur la méthode uploadFile de ApiService
    const uploadSpy = spyOn(apiService, 'uploadFile').and.returnValue(Promise.resolve({ success: true }));

    // Appeler onSubmit
    component.onSubmit();

    // Création de l'objet FormData attendu
    const expectedFormData = new FormData();
    expectedFormData.append('name', 'Test Game');
    expectedFormData.append('image', mockFile);

    // Vérifier que la méthode uploadFile a été appelée avec le bon FormData
    expect(uploadSpy).toHaveBeenCalledWith(expectedFormData);
  });
});
