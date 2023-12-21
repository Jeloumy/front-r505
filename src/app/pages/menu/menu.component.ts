import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {
  searchTerm: string = '';

  constructor(
    private router: Router
  ) {}

  onSearch() {
    this.router.navigate(['/search/'+this.searchTerm]);
  }
}
