import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ValidFileTypePipe } from '../../pipes/ValidFileType/valid-file-type.pipe';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
})
export class JeuComponent {
  uploadForm: FormGroup;
  isValidFileType = true; // Ajout d'une propriété pour suivre la validité du type de fichier

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


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      const validFileTypePipe = new ValidFileTypePipe(); // Créez une instance du pipe
      this.isValidFileType = validFileTypePipe.transform(file); // Utilisez le pipe

      if (this.isValidFileType) {
        const fileControl = this.uploadForm.get('image') as FormControl;
        fileControl.setValue(file);
      } else {
        (this.uploadForm.get('image') as FormControl).reset();
      }
    }
  }


  onSubmit() {
    if (this.uploadForm.valid && this.isValidFileType) { // Vérifiez également la validité du type de fichier avant de soumettre
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
