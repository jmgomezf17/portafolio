import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string = '';
  private password: string = '';

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res) => {
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('error: ', err.message));;
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res) => {
      //console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('error: ', err.message));
  }

  onLoginFacebook(){
    this.authService.loginFacebookUser()
    .then((res) => {
      //console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('error: ', err.message));
  }

  onLogout(){
    this.authService.logoutUser();
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }
}
