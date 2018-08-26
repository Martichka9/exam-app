import { Injectable } from "@angular/core";
import { map, find } from "rxjs/operators";
import { ABook } from "../models/book.model";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../authentication/authentication/auth.service";
import { UserProfile } from "../models/user-profile.model";

const baseUrl = "https://exam-app-bc38c.firebaseio.com/books/";

@Injectable({
  providedIn: 'root'
})
export class BooksService{
  private dbPath = '/books';
  private docRef : any;
  private usrList = "/userProfs";
  private currUser = localStorage.getItem('usrid');
  aBookRef : AngularFireList<ABook> = null;
  abookPath : string = baseUrl;
  bookReview : ABook;
  tempTitle : string = "";
  newUpvotes : number;
    

  constructor(private db: AngularFireDatabase,private router : Router,
    private toastr : ToastrService, private afs : AngularFirestore, private authServ : AuthService) {
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
    this.docRef = this.afs.collection("books").doc(id).ref;
    console.log("docref");
    console.log(this.docRef);
    this.afs.firestore.runTransaction(transaction => 
      transaction.get(this.docRef).then((data) =>{
          this.newUpvotes = this.docRef.data.upvotes + 1;
          transaction.update(this.docRef, {upvotes: this.newUpvotes});
          this.toastr.success(this.docRef.data.title + " book liked!", "Succsess!");
        },error => {this.toastr.error(error)}));
  }

  addInMyBooks(id : string){
      this.db.list(`${this.usrList}/${this.currUser}/bCollection`).push(id).then(res => {
        this.toastr.info("You successfully added this book to your collection!");
        this.router.navigate(['/my']);},
      res => this.toastr.warning(res,"Warning!"));
  }

  myBooks(){
    return this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
  }
}
