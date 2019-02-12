import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../service/data-api.service';
import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { UserInterface } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  private books: BookInterface[];
  ngOnInit() {
    this.getOffers();
    console.log('OFERTAS', this.books);
  }


  getOffers() {
    this.dataApi.getAllBooksOffers().subscribe(offers => this.books = offers);
  }

}
