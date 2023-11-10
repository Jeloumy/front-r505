// connexion.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onLoginSubmit() {
    if (this.loginForm.valid) {
      const loginFormData = this.loginForm.value;

      this.authService.login(loginFormData).then(
        (response) => {
          // Traiter la réponse, gérer le token, rediriger vers la page d'accueil, etc.
          console.log(response);
          this.router.navigate(['']);
        },
        (error) => {
          // Gérer les erreurs, afficher un message d'erreur, etc.
          console.error(error);
        }
      );
    }
  }
}

