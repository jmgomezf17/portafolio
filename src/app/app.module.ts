import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ListProductComponent } from './components/admin/list-product/list-product.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// data base firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

//storage firebase
import { AngularFireStorageModule } from '@angular/fire/storage';

//External
import { NgxSpinnerModule } from 'ngx-spinner';
//import {NgxPaginationModule} from 'ngx-pagination';

//Services
import { AuthService } from './service/auth.service';
import { ProductService } from './service/product.service';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { DetailBooksComponent } from './components/detail-books/detail-books.component';
import { OffersComponent } from './components/offers/offers.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroComponent,
    DetailProductComponent,
    ListProductComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    Page404Component,
    ListBooksComponent,
    DetailBooksComponent,
    OffersComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    AngularFireStorageModule,
    
    //NgxPaginationModule
  ],
  providers: [
    AuthService,
    ProductService,
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
