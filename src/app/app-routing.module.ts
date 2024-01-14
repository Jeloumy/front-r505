import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ConnexionComponent} from "./pages/connexion/connexion.component";
import {authGuard} from "./shared/guards/auth.guard";
import {TournoisComponent} from "./pages/tournois/tournois.component";
import {JeuComponent} from "./pages/jeu/jeu.component";
import { SearchComponent } from "./pages/search/search.component";
import {TournoiDetailsComponent} from "./pages/tournoi-details/tournoi-details.component";
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import {MonEquipeComponent} from "./pages/mon-equipe/mon-equipe.component";
import {CreateTeamComponent} from "./pages/create-team/create-team.component";
import {TeamSettingsComponent} from "./pages/team-settings/team-settings.component";

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'inscription', component: InscriptionComponent, canActivate: [authGuard] },
  { path: 'connexion', component: ConnexionComponent, canActivate: [authGuard]  },
  { path: 'tournoi', component: TournoisComponent, canActivate: [authGuard]  },
  { path: 'jeu', component: JeuComponent, canActivate: [authGuard]  },
  { path: 'search/:req', component: SearchComponent, canActivate: [authGuard]   },
  { path: 'tournoi-details/:id', component: TournoiDetailsComponent, canActivate: [authGuard]  },
  { path: 'mon-equipe', component: MonEquipeComponent, canActivate: [authGuard]  },
  { path: 'profil', component: UserSettingsComponent, canActivate: [authGuard]  },
  { path: 'create-team', component: CreateTeamComponent, canActivate: [authGuard] },
  { path: 'team-settings', component: TeamSettingsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
