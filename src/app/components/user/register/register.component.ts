import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

//Storage firebase
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private email: string = '';
  private password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) {}

  ngOnInit() {
  }

  onAddUser(){
      this.authService.registerUser(this.email, this.password)
      .then( (res) => {

        //Obtener el usuario y actualizar para adicionar la imagen
        this.authService.isAuth().subscribe( user => {
          if(user){
           
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then( () => {
              //console.log('usuario actualizado');
              this.onLoginRedirect();
            }).catch( (error) => {
              console.log('error', error);
            } );
          }

        });

        //this.onLoginRedirect();
      }).catch(err => console.log('error: ', err.message));
  }

  onUpLoad(e){
    //console.log(e.target.files[0]);

    //Generar id unico para la imagen a subir en caso de tener el mismo nombre
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `profile/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); //ruta y fichero

    this.uploadPercent = task.percentageChanges();
    //Obtener la url
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
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

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

}
