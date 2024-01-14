import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BACK_URL} from "../../../environments/environment.development";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})

export class InscriptionComponent {
  inscriptionForm: FormGroup;
  BACK_URL=BACK_URL

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.inscriptionForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitInscription() {
    console.log('Début de la fonction submitInscription');
    if (this.inscriptionForm.valid) {
      console.log('Formulaire valide');
      const formData = this.inscriptionForm.value;

      this.apiService.inscription(formData).then(
        (response) => {
          console.log('Inscription réussie', response);
          this.apiService.savTokens(response.token);
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    }
  }
}
