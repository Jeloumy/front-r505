import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-mon-equipe',
  templateUrl: './mon-equipe.component.html',
  styleUrls: ['./mon-equipe.component.scss']
})
export class MonEquipeComponent implements OnInit {
  team: any = null;
  isCaptain: boolean = false;
  userId: string | undefined;
  private router: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.userId = this.apiService.getUserId(); // Assurez-vous que getUserId() renvoie une chaîne
    this.loadTeam();
  }

  loadTeam() {
    this.apiService.getTeamByUserId(this.userId).then(team => {
      this.team = team;
      // @ts-ignore
      this.isCaptain = this.team && +this.team.captain_id === +this.userId; // Convertit en nombre pour la comparaison
      console.log("Est capitaine:", this.isCaptain);
    }).catch(error => {
      console.error('Erreur lors du chargement de l\'équipe', error);
    });
  }

  createTeam() {
    this.router.navigate(['/create-team']);
  }

  openTeamSettings() {
    if(this.isCaptain) {
      this.router.navigate(['/team-settings', this.team.id]);
    }
  }

}
