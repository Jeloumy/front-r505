import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResults: any[] = [];
  query?: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(async params => {
      this.query = params['req'];
      this.searchTournament(params['req']);
    })
  }

  searchTournament(searchTerm: string) {
    this.apiService.searchTournament(searchTerm)
      .then((result) => {
        this.searchResults = result;
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche :', error);
      });
  }
}
