import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ABook } from "../models/book.model";
import { Observable, empty } from "../../../node_modules/rxjs";
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
   tempTitle : string = "";
 
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
      .then(res => {this.toastr.info("Book updated successfuly!");
                    this.router.navigate(['/books']);},
            res => this.toastr.warning(res,"Warning!"))
      .catch(error => this.toastr.error(error, "Warning"));
  }

  createABook(newBook : ABook){
    this.aBookRef.push(newBook).then(res => {
      this.aBookRef.update(res['key'],{upvotes : 0});
      this.toastr.info("Book created successfuly!");
      this.router.navigate(['/books']);},
    res => this.toastr.warning(res,"Warning!"));
  }
  
  deleteBook(id :string){
    if (id !== null && id !== "" && id !== undefined){
      this.aBookRef.snapshotChanges().pipe(
        map(booksList =>
          booksList.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      ).pipe(map(booksList => booksList.find(book => book.id === id))
      ).subscribe(book => {
        this.tempTitle = book['title'];
      },err => this.toastr.error(err,"Error!"));
      this.aBookRef.remove(id);
      this.toastr.warning(this.tempTitle + " book is permanently deleted.", "Warning!");
    }
    else{
      this.toastr.error("You are not permited to delete this record!, Error!");
    }
  }

  like(id:string){
  }
}
