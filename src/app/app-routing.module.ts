import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ConnexionComponent} from "./pages/connexion/connexion.component";
import {authGuard} from "./shared/guards/auth.guard";
import {TournoisComponent} from "./pages/tournois/tournois.component";

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'inscription', component: InscriptionComponent, canActivate: [authGuard] },
  { path: 'connexion', component: ConnexionComponent, canActivate: [authGuard]  },
  { path: 'tournoi', component: TournoisComponent, canActivate: [authGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
