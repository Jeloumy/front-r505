import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from "../../../environments/environment.development";
import {BACK_URL} from "../../../environments/environment.development";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = API_URL;
  token?: string;
  isInit: boolean = false;
  initEvent: Subject<boolean> = new Subject<boolean>();

  private isAuthenticated: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.init();
  }

  public async init(){
    // Récupère le code dans l'url
    let urlParams = new URLSearchParams(window.location.search);

    // S'il y a un code dans l'url, on effectue une requête pour récupérer le token
    if(urlParams.has('code')){
      let code = urlParams.get('code') as string;

      // Effectue la requête sur le callback de l'API
      let res = await this.requestApi('/auth/callback', 'GET', {code});
      if(res && res.token){
        this.savTokens(res.token);
        this.router.navigate(['/']);
      }
    }else{
      // Sinon on récupère le token dans le localstorage s'il existe et on le stocke dans la variable token
      this.token = localStorage.getItem('apiToken') ? JSON.parse(localStorage.getItem('apiToken') as string).token : undefined;
    }

    // On indique que l'initialisation est terminée
    this.isInit = true;
    this.initEvent.next(true);
  }

  inscription(userData: any) {
    // Utilisez HttpClient pour envoyer une requête POST vers l'API Laravel pour l'inscription
    return this.requestApi('/register', 'POST', userData);
  }

  login(loginData: any) {
    return this.requestApi('/auth/login', 'POST', loginData);
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
  savTokens(apiToken: string){

    // Enregistre le token dans le localstorage
    localStorage.setItem('apiToken', JSON.stringify({
      token: apiToken,
    }));

    this.token = apiToken;

  }

  // Vérifie si l'utilisateur est connecté
  isLogged(): boolean{
    return this.token !== undefined;
  }

  // Déconnecte l'utilisateur
  logout(){
    localStorage.removeItem('apiToken');
    this.token = undefined;
  }

}
