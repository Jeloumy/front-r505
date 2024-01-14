import { Component, Input } from '@angular/core';
import { ApiService } from 'chemin-vers-ton-service/api.service';

@Component({
  selector: 'app-tournament-registration-button',
  templateUrl: './tournament-registration-button.component.html',
  styleUrls: ['./tournament-registration-button.component.scss']
})
export class TournamentRegistrationButtonComponent {
  @Input() tournamentId: number;
  @Input() isRegistered: boolean;

  constructor(private apiService: ApiService) {}

  toggleRegistration() {
    if (this.isRegistered) {
      this.leaveTournament();
    } else {
      this.registerToTournament();
    }
  }

  registerToTournament() {
    // Appelle la méthode du service pour s'inscrire au tournoi
    this.apiService.addTeamToTournament(this.tournamentId).subscribe(
      () => {
        // Mise à jour de l'état d'inscription
        this.isRegistered = true;
      },
      (error) => {
        // Gestion des erreurs
        console.error(error);
      }
    );
  }

  leaveTournament() {
    // Appelle la méthode du service pour se désinscrire du tournoi
    this.apiService.leaveTournament(this.tournamentId).subscribe(
      () => {
        // Mise à jour de l'état d'inscription
        this.isRegistered = false;
      },
      (error) => {
        // Gestion des erreurs
        console.error(error);
      }
    );
  }
}

