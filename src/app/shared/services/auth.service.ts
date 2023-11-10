import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_URL;
  token?: string;

  constructor(private http: HttpClient) {}



  inscription(userData: any) {
    // Utilisez HttpClient pour envoyer une requête POST vers l'API Laravel pour l'inscription
    return this.requestApi('/register', 'POST', userData);
  }

  login(loginData: any) {
    return this.requestApi('/auth/login', 'POST', loginData);
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




}
