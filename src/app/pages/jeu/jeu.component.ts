import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';





@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
})

export class JeuComponent {
  uploadForm: FormGroup;


  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder, private cd: ChangeDetectorRef,) {
    this.uploadForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }



  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      const fileControl = this.uploadForm.get('image') as FormControl;
      fileControl.setValue(file);
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
