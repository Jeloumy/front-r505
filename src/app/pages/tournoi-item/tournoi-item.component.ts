import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-tournoi-item',
  templateUrl: './tournoi-item.component.html',
  styleUrls: ['./tournoi-item.component.scss']
})
export class TournoiItemComponent implements OnInit {
  @Input() tournoi: any;
  teamId: string | null = null; // Ajoutez cette ligne pour déclarer teamId

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.teamId = this.apiService.getTeamId();
  }

  navigateToTournoi(tournoiId: number) {
    this.router.navigate(['/tournoi-details', tournoiId]);
  }
}
