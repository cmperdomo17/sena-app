import { Component, HostBinding } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { userModel } from '../../../models/User';
import { Router } from '@angular/router';
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

  error: string = '';
  showPassword: boolean = false;

  constructor(private loginService: LoginService) {}
  
  login() {
    if (!this.userAux.user_login || !this.userAux.user_pwd) {
      this.error = 'Por favor rellena todos los campos!';
      return;
    }
    this.error = this.loginService.error_message;
    this.loginService.validateLogin(this.userAux);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
