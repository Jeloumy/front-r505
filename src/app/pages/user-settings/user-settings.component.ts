import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  updateForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Formulaire pour mettre à jour le pseudo
    this.updateForm = this.fb.group({
      pseudo: ['', Validators.required]
    });

    // Formulaire pour changer le mot de passe
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitUpdate() {
    if (this.updateForm.valid) {
      const updateData = this.updateForm.value;
      this.apiService.updateProfile(updateData).subscribe(
        response => {
          console.log('Mise à jour du profil réussie', response);
          // Vous pouvez ajouter ici une redirection ou une notification
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil', error);
        }
      );
    }
  }

  submitChangePassword() {
    if (this.changePasswordForm.valid) {
      const passwordData = this.changePasswordForm.value;
      this.apiService.changePassword(passwordData).subscribe(
        response => {
          console.log('Changement de mot de passe réussi', response);
          // Redirection ou notification
        },
        error => {
          console.error('Erreur lors du changement de mot de passe', error);
        }
      );
    }
  }

  deleteAccount() {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      this.apiService.deleteAccount().subscribe(
        response => {
          console.log('Compte supprimé avec succès', response);
          this.router.navigate(['/accueil']); // Ou une autre route appropriée
        },
        error => {
          console.error('Erreur lors de la suppression du compte', error);
        }
      );
    }
  }
}

