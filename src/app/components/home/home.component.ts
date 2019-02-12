import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { BookInterface } from 'src/app/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books = [];
  public book = '';
  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.dataApi.getAllBooks().subscribe( books => {
      //console.log('boooksss', books);
      this.books = books;
    });
  }

}
