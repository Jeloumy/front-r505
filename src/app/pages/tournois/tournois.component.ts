import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.scss'],
})

export class TournoisComponent {
  TournoiForm: FormGroup;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.TournoiForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      begin_date: ['', Validators.required],
      end_date: ['', Validators.required],
      jeu_id: ['', Validators.required],
    });
  }

  submitTournoi() {
    console.log('Début de la fonction submitInscription');
    if (this.TournoiForm.valid) {
      console.log('Formulaire valide');
      const formData = this.TournoiForm.value;

      this.apiService.tournoi(formData).then(
        (response) => {
          console.log('création tournoi réussie', response);

          this.router.navigate(['']);
        },
        (error) => {
          console.error('Erreur lors de l\'tournoi', error);
        }
      );
    }
  }
}
