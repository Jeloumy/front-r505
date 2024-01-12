import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import {HttpClientModule} from "@angular/common/http";
import { ConnexionComponent } from './pages/connexion/connexion.component';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { TournoisComponent } from './pages/tournois/tournois.component';
import { JeuComponent } from './pages/jeu/jeu.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SearchComponent } from './pages/search/search.component';
import { ValidFileTypePipe } from './pipes/ValidFileType/valid-file-type.pipe';
import {CdkDropList} from "@angular/cdk/drag-drop";
import { ImageUploaderComponent } from './pages/image-uploader/image-uploader.component';
import { TournoiItemComponent } from './pages/tournoi-item/tournoi-item.component';
import { TournoiDetailsComponent } from './pages/tournoi-details/tournoi-details.component';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';


@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    AccueilComponent,
    ConnexionComponent,
    TournoisComponent,
    JeuComponent,
    MenuComponent,
    SearchComponent,
    ValidFileTypePipe,
    ImageUploaderComponent,
    TournoiItemComponent,
    TournoiDetailsComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    CdkDropList
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
