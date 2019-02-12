import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { DetailBooksComponent } from './components/detail-books/detail-books.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { OffersComponent } from './components/offers/offers.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] }, //TODO: Only users auth
  { path: 'book/:id', component: DetailBooksComponent },
  { path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard] }, //TODO: Only users auth
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },  //TODO: Only users auth
  { path: '**', component: Page404Component } // ** siempre debe ir abajo, atrapa todas las que no encuentra
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
