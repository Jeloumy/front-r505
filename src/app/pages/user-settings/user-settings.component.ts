import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  nameForm: FormGroup = new FormGroup({});
  pseudoForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});



  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    this.pseudoForm = new FormGroup({
      pseudo: new FormControl('', [Validators.required])
    });

    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }


  updateName() {
    const userId = this.apiService.getUserId();
    if (userId) {
      this.apiService.updateProfile(userId, { name: this.nameForm.value.name })
        .then(response => {
          console.log('Mise à jour du nom réussie:', response);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du nom:', error);
        });
    } else {
      console.error('Erreur : ID utilisateur non trouvé');
    }
  }


  updatePseudo() {
    const userId = this.apiService.getUserId();
    if (userId) {
      this.apiService.updateProfile(userId, { pseudo: this.pseudoForm.value.pseudo })
        .then(response => {
          console.log('Mise à jour du pseudo réussie:', response);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du pseudo:', error);
        });
    }
  }

  onChangePassword() {
    const userId = this.apiService.getUserId();
    if (userId) {
      const passwordData = {
        oldPassword: this.passwordForm.value.oldPassword,
        newPassword: this.passwordForm.value.newPassword
      };
      this.apiService.changePassword(userId, passwordData)
        .then(response => {
          console.log('Changement de mot de passe réussi:', response);
        })
        .catch(error => {
          console.error('Erreur lors du changement de mot de passe:', error);
        });
    } else {
      console.error('Le formulaire de changement de mot de passe n\'est pas valide');
    }
  }


  onDeleteAccount() {
    const userId = this.apiService.getUserId();
    if (userId) {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
      if (confirmation) {
        this.apiService.deleteAccount(userId)
          .then(response => {
            console.log('Suppression du compte réussie:', response);
            // Logique de déconnexion et de redirection
          })
          .catch(error => {
            console.error('Erreur lors de la suppression du compte:', error);
          });
      }
    } else {
      console.error('Erreur : ID utilisateur non trouvé');
    }
  }

}
