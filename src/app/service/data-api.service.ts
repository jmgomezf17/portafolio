import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { BookInterface } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;

  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;
  public selectdBook: BookInterface = {
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

  constructor(private afs: AngularFirestore ) { 
    //this.booksCollection = afs.collection<BookInterface>('books');
    //this.books = this.booksCollection.valueChanges();
  }

  getAllBooks(){
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.books = this.booksCollection.snapshotChanges()
      .pipe( map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id; //Recuperar id del registro
          return data;
        })
      }));
  }

  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOneBook(idBook: string){
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe( map( action => {
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id; //Recuperar id del registro
        return data;
      }
    }));
  }

  addBooks(book: BookInterface): void{
    this.booksCollection.add(book);
  }

  updateBooks(book: BookInterface): void{
    let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }

  deleteBooks(idBook: string): void{
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }

}
