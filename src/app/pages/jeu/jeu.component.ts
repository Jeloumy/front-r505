import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
})
export class JeuComponent {
  uploadForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {
    this.uploadForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onFileChanged(file: File | null) {
    if (file) {
      const fileControl = this.uploadForm.get('image') as FormControl;
      fileControl.setValue(file);
    } else {
      (this.uploadForm.get('image') as FormControl).reset();
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      console.log('Formulaire valide');
      const formData = new FormData();
      formData.append('name', this.uploadForm.get('name')?.value);
      formData.append('image', this.uploadForm.get('image')?.value);

      this.apiService.uploadFile(formData).then(
        (response: any) => {
          console.log('Upload réussi', response);
          this.router.navigate(['']);
        },
        (error: any) => {
          console.error('Erreur lors de l\'upload', error);
        }
      );
    }
  }
}
