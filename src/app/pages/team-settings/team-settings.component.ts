    import { Component, OnInit } from '@angular/core';
    import { FormGroup, FormControl, Validators } from '@angular/forms';
    import { ApiService } from '../../shared/services/api.service';
    import { ActivatedRoute, Router } from '@angular/router';

    @Component({
      selector: 'app-team-settings',
      templateUrl: './team-settings.component.html',
      styleUrls: ['./team-settings.component.scss']
    })
    export class TeamSettingsComponent implements OnInit {
      team: any;
      teamNameForm: FormGroup;
      teamDescriptionForm: FormGroup;
      teamLogoForm: FormGroup;
      newMemberPseudo: string = '';
      newCaptainPseudo: string = '';
      isCaptain: boolean = false;
      teamMembers: any[] = [];

      constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
        this.team = { name: '', description: '', logo:'' };
        this.teamNameForm = new FormGroup({
          teamName: new FormControl('', Validators.required)
        });
        this.teamDescriptionForm = new FormGroup({
          teamDescription: new FormControl('', Validators.required)
        });
        this.teamLogoForm = new FormGroup({
          teamLogo: new FormControl(null, Validators.required)
        });
      }

      ngOnInit(): void {
        const teamId = this.route.snapshot.params['teamId'];
        if (teamId) {
          this.loadTeam(teamId);
          this.loadTeamMembers(teamId);
        } else {
          // ...
        }
      }

      loadTeamMembers(teamId: string) {
        // Remplacer 'getTeamMembers' par la méthode appropriée de votre API
        this.apiService.getTeamMembers(teamId).then(members => {
          this.teamMembers = members;
        }).catch(error => console.error('Erreur lors du chargement des membres de l\'équipe:', error));
      }

      loadTeam(teamId: string) {
        this.apiService.getTeamById(teamId).then(team => {
          this.team = team;
          this.isCaptain = this.apiService.getUserId() === team.captain_id;
        }).catch(error => console.error('Erreur lors du chargement de léquipe:', error));
      }

      updateTeamName() {
        if (this.teamNameForm.valid) {
          const formData = new FormData();
          formData.append('name', this.teamNameForm.value.teamName);
          this.updateTeam(formData);
        }
      }

      updateTeamDescription() {
        if (this.teamDescriptionForm.valid) {
          const formData = new FormData();
          formData.append('description', this.teamDescriptionForm.value.teamDescription);
          this.updateTeam(formData);
        }
      }

      updateTeamLogo() {
        // @ts-ignore
        if (this.teamLogoForm.valid && this.teamLogoForm.get('teamLogo').value) {
          const formData = new FormData();
          // @ts-ignore
          formData.append('logo', this.teamLogoForm.get('teamLogo').value);
          this.updateTeam(formData);
        }
      }

      updateTeam(formData: FormData) {
        this.apiService.updateTeam(this.team.id, formData).then(() => {
          console.log('Informations de léquipe mises à jour');
          this.loadTeam(this.team.id); // Recharger les informations de l'équipe
        }).catch(error => console.error('Erreur lors de la mise à jour de léquipe:', error));
      }

      addUserToTeam() {
        this.apiService.addUserToTeam(this.team.id, this.newMemberPseudo).then(() => {
          console.log('Membre ajouté avec succès');
          this.loadTeam(this.team.id); // Recharger les informations de l'équipe
        }).catch(error => console.error('Erreur lors de lajout dun membre:', error));
      }

      setTeamCaptain() {
        this.apiService.setTeamCaptain(this.team.id, this.newCaptainPseudo).then(() => {
          console.log('Capitaine mis à jour avec succès');
          this.loadTeam(this.team.id); // Recharger les informations de l'équipe
        }).catch(error => console.error('Erreur lors du changement de capitaine:', error));
      }

      deleteTeam() {
        this.apiService.deleteTeam(this.team.id).then(() => {
          console.log('Équipe supprimée avec succès');
          this.router.navigate(['/']); // Rediriger vers la page d'accueil ou la liste des équipes
        }).catch(error => console.error('Erreur lors de la suppression de l\'équipe:', error));
      }

      onFileChange(event: any) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.teamLogoForm.patchValue({
            teamLogo: file
          });
        }
      }
    }

