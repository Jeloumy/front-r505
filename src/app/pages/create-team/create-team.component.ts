import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {
  team = {
    name: '',
    description: '',
    logo: null
  };

  constructor(private apiService: ApiService) {}

  onFileChange(file: File | null) {
    // @ts-ignore
    this.team.logo = file;
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.team.name);
    formData.append('description', this.team.description);

    // @ts-ignore
    if (this.team.logo && this.team.logo instanceof File) {
      formData.append('logo', this.team.logo);
    } else {
      // Gérer le cas où le logo n'est pas un fichier valide
      console.error('Logo is required and must be a file');
      return;
    }

    this.apiService.createTeam(formData).then(response => {
      console.log('Équipe créée avec succès:', response);
      // Gérer la réponse
    }).catch(error => {
      console.error('Erreur lors de la création de l\'équipe:', error);
      // Gérer l'erreur
    });
  }
}

