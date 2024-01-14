import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import {Router} from "@angular/router";
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {
  searchTerm: string = '';

  constructor(protected apiService: ApiService, private router: Router
  ) {}

  onSearch() {
    this.router.navigate(['/search/'+this.searchTerm]);
  }

  onLogout() {
    this.apiService.logout().then(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }).catch((error: any) => {
      console.error(error);
    });
  }

}
