import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/User';
import { AppToken } from '../models/AppToken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  error_message: string = '';

  API_URI = 'http://localhost:3000/';

  token = AppToken.getInstance();

  constructor(private http: HttpClient, private router: Router) { }

  validateLogin(user: userModel) {
    console.log(user);
    return this.http.post(`${this.API_URI}`, user, { observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => {
        const token = response.body.token;
        this.token.setToken(token);
        this.router.navigate(['/home']);
      },
      (error) => {
        if(error.status == 403) {
          alert('¡Token invalido!');
        }
        else if(error.status == 401) {
          this.error_message = '¡Usuario o contraseña incorrectos!';
        }
      }
    );
  }

  logout() {
    this.token.setToken(null);
    this.router.navigate(['']);
  }
}


