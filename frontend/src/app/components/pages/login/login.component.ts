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

  constructor(private loginService: LoginService) {}
  
  login() {
    this.loginService.validateLogin(this.userAux);
    this.error = this.loginService.error_message;
  }
}
