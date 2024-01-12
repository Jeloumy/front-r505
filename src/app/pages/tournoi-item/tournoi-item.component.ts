import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournoi-item',
  templateUrl: './tournoi-item.component.html',
  styleUrls: ['./tournoi-item.component.scss']
})
export class TournoiItemComponent {
  @Input() tournoi: any;

  constructor(private router: Router) {}

  navigateToTournoi(tournoiId: number) {
    this.router.navigate(['/tournoi', tournoiId]);
  }
}

