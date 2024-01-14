import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss']
})
export class TeamSettingsComponent implements OnInit {
  team: any;
  newCaptainPseudo: string = '';
  newMemberPseudo: string = '';
  selectedFile: File | null = null;
  isCaptain: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.params['teamId'];
    this.loadTeam(teamId);
  }

  loadTeam(teamId: string) {
    this.apiService.getTeamById(teamId).then(team => {
      this.team = team;
      this.isCaptain = this.apiService.getUserId() === team.captain_id;
    }).catch(error => console.error('Erreur lors du chargement de l\'équipe:', error));
  }

  updateTeamName(newName: string) {
    if (this.isCaptain) {
      const formData = new FormData();
      formData.append('name', newName);
      this.updateTeam(formData);
    }
  }

  updateTeamDescription(newDescription: string) {
    if (this.isCaptain) {
      const formData = new FormData();
      formData.append('description', newDescription);
      this.updateTeam(formData);
    }
  }

  updateTeamLogo() {
    if (this.isCaptain && this.selectedFile) {
      const formData = new FormData();
      formData.append('logo', this.selectedFile, this.selectedFile.name);
      this.updateTeam(formData);
    }
  }

  updateTeam(formData: FormData) {
    this.apiService.updateTeam(this.team.id, formData).then(() => {
      console.log('Informations de l\'équipe mises à jour');
      this.loadTeam(this.team.id); // Recharger les informations de l'équipe
    }).catch(error => console.error('Erreur lors de la mise à jour de l\'équipe:', error));
  }

  addUserToTeam() {
    if (this.isCaptain) {
      this.apiService.addUserToTeam(this.team.id, this.newMemberPseudo).then(() => {
        console.log('Membre ajouté avec succès');
        this.loadTeam(this.team.id); // Recharger les informations de l'équipe
      }).catch(error => console.error('Erreur lors de l\'ajout d\'un membre:', error));
    }
  }

  setTeamCaptain(newCaptainPseudo: string) {
    if (this.isCaptain) {
      this.apiService.setTeamCaptain(this.team.id, newCaptainPseudo).then(() => {
        console.log('Capitaine mis à jour avec succès');
        this.loadTeam(this.team.id); // Recharger les informations de l'équipe
      }).catch(error => console.error('Erreur lors du changement de capitaine:', error));
    }
  }

  deleteTeam() {
    if (this.isCaptain) {
      this.apiService.deleteTeam(this.team.id).then(() => {
        console.log('Équipe supprimée avec succès');
        this.router.navigate(['/']); // Rediriger vers la page d'accueil ou la liste des équipes
      }).catch(error => console.error('Erreur lors de la suppression de léquipe:', error));
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
