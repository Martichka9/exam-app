import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ABook } from "../models/book.model";
import { Observable } from "../../../node_modules/rxjs";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const baseUrl = "https://exam-app-bc38c.firebaseio.com/books/";

@Injectable({
  providedIn: 'root'
})
export class BooksService{
  private dbPath = '/books';
   aBookRef : AngularFireList<ABook> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.aBookRef = db.list(this.dbPath);
  }
 
  getAllBooks() : AngularFireList<ABook> {
    return this.aBookRef;
  }
}
