import { Component, HostBinding } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { userModel } from '../../../models/User';
import { Router } from '@angular/router';
import { AppToken } from '../../../models/AppToken';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  @HostBinding('class') classes = 'formularioLogin';

  userAux: userModel = {
    user_id: 0,
    user_login: '',
    user_pwd: '',
    user_state: 0    
  };

  showPassword: boolean = false;
  token = AppToken.getInstance();
  error_message: string = '';

  constructor(private loginService: LoginService, private router: Router) {}
  
  login() {
    if (!this.userAux.user_login || !this.userAux.user_pwd) {
      this.error_message = 'Por favor rellena todos los campos!';
      return;
    }
    this.loginService.validateLogin(this.userAux)
    .subscribe(
      (response: HttpResponse<any>) => {
        const token = response.body.token;
        this.token.setToken(token);
        if(response.body.user_type==1){
          this.router.navigate(['/home']);
        }else if(response.body.user_type==0){
          this.router.navigate(['/user']);
        }
        
      },
      (error) => {
        if(error.status == 403) {
          alert('¡Token invalido!');
        }
        else if(error.status == 401 || error.status == 404) {
          this.error_message = '¡Usuario o contraseña incorrectos!';
        }
      }
    );
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
