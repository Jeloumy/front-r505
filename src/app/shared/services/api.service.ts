import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from "../../../environments/environment.development";
import {BACK_URL} from "../../../environments/environment.development";
import {from, Subject} from "rxjs";
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { User } from '../../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = API_URL;

  token?: string;
  isInit: boolean = false;
  initEvent: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.init();
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('apiToken');
  }
  public async init() {
    let urlParams = new URLSearchParams(window.location.search);

    // Recherche du token dans l'URL
    if (urlParams.has('token')) {
      let token = urlParams.get('token') as string;
      this.savTokens(token);
      this.router.navigate(['/']);
    } else {
      // Récupère le token dans le localStorage s'il existe
      this.token = localStorage.getItem('apiToken') ? JSON.parse(localStorage.getItem('apiToken') as string).token : undefined;
    }

    this.isInit = true;
    this.initEvent.next(true);
  }


  inscription(userData: any) {
    // Utilisez HttpClient pour envoyer une requête POST vers l'API Laravel pour l'inscription
    return this.requestApi('/register', 'POST', userData);
  }

  login(loginData: any): Promise<any> {
    return this.requestApi('/auth/login', 'POST', loginData).then(response => {
      if (response && response.token) {
        this.savTokens(response.token);
        // Enregistrer l'information isAdmin
        localStorage.setItem('admin', response.isAdmin ? '1' : '0');
      }
      return response;
    });
  }



  tournoi(tournamentData: any) {
    return this.requestApi('/tournoi', 'POST', tournamentData);
  }



  uploadFile(formData: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.requestApi('/jeu', 'POST', formData, { headers });
  }




  public async requestApi(action: string, method: string = 'GET', datas: any = {}, httpOptions: any = {}): Promise<any> {
    // if (!this.onlineStatusService.getIsOnline()) {
    //   console.log('no request because offline');
    //   return;
    // }

    const methodWanted = method.toLowerCase();
    let route = API_URL + action;

    let req = null;

    if (httpOptions.headers === undefined) {
      httpOptions.headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    if (this.token) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
      console.log("Token envoyé: ", this.token); // Ajouter pour le débogage
    }
    switch (methodWanted) {
      case 'post':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'patch':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'put':
        req = this.http.put(route, datas, httpOptions);
        break;
      case 'delete':
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.delete(route, httpOptions);
        break;
      default:
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.get(route, httpOptions);
        break;
    }
    return req.toPromise();
  }

  // Enregistre le token dans le localstorage et dans la variable token

  public savTokens(apiToken: string) {
    localStorage.setItem('apiToken', JSON.stringify({ token: apiToken }));
    this.token = apiToken;
    this.isAuthenticated.next(true);
  }


  // Vérifie si l'utilisateur est connecté
  isLogged(): boolean{
    return this.token !== undefined;
  }



  public get isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }
  searchTournament(searchTerm: string) {
    return this.requestApi(`/tournoi/search/${searchTerm}`);
  }

  getTournoiById(tournoiId: string | null): Promise<any> {
    return this.requestApi(`/tournoi/${tournoiId}`);
  }

  public isAdmin(): boolean {
    const adminValue = localStorage.getItem('admin');
    return adminValue === '1';
  }
  public savAdmin(adminValue: string) {
    localStorage.setItem('admin', adminValue);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(API_URL + '/auth/updateProfile', userData);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.put(API_URL + '/auth/updatePassword', passwordData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(API_URL + '/auth/deleteAccount');
  }

  logout() {
    localStorage.removeItem('apiToken');
    this.token = undefined;
    localStorage.removeItem('admin');
    this.isAuthenticated.next(false);
    return this.requestApi('/auth/logout'); // Assurez-vous que cela retourne une Promesse
  }
}
