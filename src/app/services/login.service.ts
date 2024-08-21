import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import authenticatRequest from '../models/authenticatRequest';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  authenticate(auth: authenticatRequest) {
    return this._http.post<AuthenticatorResponse>(environment.PATH_URL + "login/authenticate", auth)
  }
}
