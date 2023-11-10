// connexion.component.ts

import { Component } from '@angular/core';
import { AuthService } from './path-to-your-auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  loginData = {
    identifier: '',  // identifier peut être soit l'email soit le pseudo
    password: ''
  };

  constructor(private authService: AuthService) {}

  onLoginSubmit() {
    this.authService.login(this.loginData).then((response) => {
      // Traiter la réponse, gérer le token, rediriger vers la page d'accueil, etc.
      console.log(response);
    }).catch((error) => {
      // Gérer les erreurs, afficher un message d'erreur, etc.
      console.error(error);
    });
  }
}

