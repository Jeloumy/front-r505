import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-tournoi-details', // Remplacez par le sélecteur approprié
  templateUrl: './tournoi-details.component.html', // Le chemin vers votre fichier HTML
  styleUrls: ['./tournoi-details.component.scss'] // Le chemin vers votre fichier CSS (si applicable)
})
export class TournoiDetailsComponent implements OnInit {
  tournoi: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const tournoiId = this.route.snapshot.paramMap.get('id');
    this.apiService.getTournoiById(tournoiId).then(tournoi => {
      this.tournoi = tournoi;
    });
  }
}
