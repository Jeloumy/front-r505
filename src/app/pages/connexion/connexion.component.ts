// connexion.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  loginData = {
    identifier: '',  // identifier peut être soit l'email soit le pseudo
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit() {
    this.authService.login(this.loginData).then((response) => {
      // Traiter la réponse, gérer le token, rediriger vers la page d'accueil, etc.
      console.log(response);
    }).catch((error) => {
      // Gérer les erreurs, afficher un message d'erreur, etc.
      console.error(error);
    });
    this.router.navigate(['']);
  }
}

