import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../service/data-api.service';

import { Params, ActivatedRoute } from '@angular/router';
import { BookInterface } from '../../models/book';

@Component({
  selector: 'app-detail-books',
  templateUrl: './detail-books.component.html',
  styleUrls: ['./detail-books.component.css']
})
export class DetailBooksComponent implements OnInit {

  private book: BookInterface = {
    titulo: '',
    idioma: '',
    descripcion: '',
    portada: '',
    precio: '',
    link_amazon: '',
    autor: '',
    oferta: ''
};

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const idBook = this.route.snapshot.params["id"];
    this.getDetails(idBook);
  }

  getDetails(idBook: string): void{
    this.dataApi.getOneBook(idBook).subscribe( book => {
      this.book = book;
    });
  }

}
