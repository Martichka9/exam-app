import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ABook } from "../models/book.model";
import { Observable } from "../../../node_modules/rxjs";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Router } from "../../../node_modules/@angular/router";
import { Toast, ToastrService } from "../../../node_modules/ngx-toastr";

const baseUrl = "https://exam-app-bc38c.firebaseio.com/books/";

@Injectable({
  providedIn: 'root'
})
export class BooksService{
  private dbPath = '/books';
   aBookRef : AngularFireList<ABook> = null;
   abookPath : string = baseUrl;
   bookReview : ABook;
 
  constructor(private db: AngularFireDatabase,private router : Router, private toastr : ToastrService) {
    this.aBookRef = db.list(this.dbPath);
  }
 
  getAllBooks() : AngularFireList<ABook> {
    return this.aBookRef;
  }

  reviewBook(bookPath : string) {
    return this.db.list(`${this.dbPath}`);
  }

  editABook(key: string, value: any): void {
      this.aBookRef.update(key, value)
      .then(res => this.toastr.info("Book updated successfuly!"),
            res => this.toastr.warning(res,"Warning!"))
      .catch(error => this.toastr.error(error, "Warning"));
  }

  createABook(newBook : ABook){
    this.aBookRef.push(newBook).then(res => this.toastr.info("Book updated successfuly!"),
    res => this.toastr.warning(res,"Warning!"));
  }
}
