import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})


export class InscriptionComponent {
  userData = {
    name: '',
    email: '',
    pseudo: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  submitInscription() {

    this.authService.inscription(this.userData).then(
      (response) => {

        console.log('Inscription réussie', response);
      },
      (error) => {

        console.error('Erreur lors de l inscription', error);
      }
    );
  }
}

