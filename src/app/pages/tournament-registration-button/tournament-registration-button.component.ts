import { Component, Input } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-tournament-registration-button',
  templateUrl: './tournament-registration-button.component.html',
  styleUrls: ['./tournament-registration-button.component.scss']
})
export class TournamentRegistrationButtonComponent {
  @Input() tournoiId!: string;
  @Input() teamId!: string | null;
  isRegistered: boolean = false;

  constructor(private apiService: ApiService) {}

  registerTeam() {
    if (this.teamId) {
      this.apiService.addTeamToTournament(this.tournoiId, this.teamId)
        .then(() => {
          this.isRegistered = true;
          // Gérer la réponse, afficher un message, etc.
        })
        .catch(error => {
          // Gérer l'erreur
        });
    } else {
      console.error('Team ID is null');
      // Gérer le cas où teamId est null
    }
  }


  leaveTournament() {
    this.apiService.leaveTournament(this.tournoiId)
      .then(() => {
        this.isRegistered = false;
        // Gérer la réponse, afficher un message, etc.
      })
      .catch(error => {
        // Gérer l'erreur
      });
  }
}
