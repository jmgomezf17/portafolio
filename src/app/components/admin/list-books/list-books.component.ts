import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../service/data-api.service';
import { BookInterface } from '../../../models/book';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../../service/auth.service';
import { UserInterface } from '../../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe( userRole => {
          //console.log('Roless: ', userRole);
          this.isAdmin = Object.assign({}, userRole.roles); // asigno un objeto
          this.isAdmin = this.isAdmin.hasOwnProperty('admin'); // verificar si existe la propiedad
        });
      }
    });
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe( books => {
      this.books = books;
     // console.log('boksss', this.books);
    });
  }

  onDeleteBook(idBook: string){
    const confirmacion = confirm('Are you sure?');
    if(confirmacion){
      this.dataApi.deleteBooks(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface){
    this.dataApi.selectdBook = Object.assign({}, book);
  }

  resetForm(bookForm?: NgForm): void{
    this.dataApi.selectdBook = {
      id:null,
      titulo: '',
      idioma: '',
      descripcion: '',
      portada: '',
      precio: '',
      link_amazon: '',
      autor: '',
      oferta: '',
    };
  }

}
