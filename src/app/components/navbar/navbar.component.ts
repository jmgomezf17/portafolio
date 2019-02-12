import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public app_name = "Portafolio Personal";
  public isLogged: boolean = false;

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
      this.authService.isAuth().subscribe( auth => {
        if(auth){
          this.isLogged = true;
        }else{
          this.isLogged = false;
        }
      });
  }

  onLogout(){
    this.afsAuth.auth.signOut();
  }

}
