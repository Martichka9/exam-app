import { Injectable } from "@angular/core";
import { map, find } from "rxjs/operators";
import { ABook } from "../models/book.model";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore,  } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../authentication/authentication/auth.service";

const baseUrl = "https://exam-app-bc38c.firebaseio.com/books/";

@Injectable({
  providedIn: 'root'
})
export class BooksService{
  private dbPath = '/books';
  private usrList = "/userProfs";
  private currUser = localStorage.getItem('usrid');
  private bCollection = [];
  aBookRef : AngularFireList<ABook> = null;
  abookPath : string = baseUrl;
  bookReview : ABook;
  newUpvotes : number;
  ///obs
  public likedBook : any;
  public addToMy : any;
  public addToMyCheck : any;
  public removeBook : any;

  constructor(private db: AngularFireDatabase,private router : Router,
    private toastr : ToastrService, private afs : AngularFirestore, private authServ : AuthService) {
    this.aBookRef = db.list(this.dbPath);
  }
 
  clear(){
    if(this.likedBook !== undefined){
      this.likedBook.unsubscribe();
    }
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
  
  deleteBook(id :string, title: string){
    if (id !== null && id !== "" && id !== undefined){
      this.aBookRef.snapshotChanges().pipe(
        map(booksList =>
          booksList.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      ).pipe(map(booksList => booksList.find(book => book.id === id))
      ).subscribe(book => {
      },err => this.toastr.error(err,"Error!"));
      this.aBookRef.remove(id);
      this.toastr.warning(title + " book is permanently deleted.", "Warning!");
    }
    else{
      this.toastr.error("You are not permited to delete this record!, Error!");
    }
  }

  like(id:string){
    this.db.object(`books/${id}/upvotes`).query.ref.transaction(upvotes =>{
      return upvotes+1;
    });
  }
  
  readBook(id:string){
    this.router.navigate([`/read/${id}`]);

  }

  addInMyBooks(id : string){
    this.bCollection = [];
    //console.log(this.bCollection);
    this.addToMy = this.db.list(`${this.usrList}/${this.currUser}/bCollection`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, data: c.payload.val() }))
      )
    ).subscribe(books => {
      //console.log(books);
      const ids = Object.keys(books);
      for (const elem in ids) {
        this.bCollection.push(books[elem]['data'])
      }
      //console.log(this.bCollection)
      this.updateMyBooks(id);
    });
  }

  updateMyBooks(id : string){
    this.addToMy.unsubscribe();
    console.log(this.bCollection.indexOf(id));
    if(this.bCollection.indexOf(id) !== -1){
      this.toastr.warning("You already added this book to your collection!", "Warning!");
    }
    else{
      console.log("adding in collection");
      this.db.list(`${this.usrList}/${this.currUser}/bCollection`).push(id);
      this.toastr.success("You successfully added this book to your collection!", "Success!");
      this.router.navigate(['/my']);
    }
    
  }
  removeFromCollection(id : string, title: string){
    let temp = "";
    if (id !== null && id !== "" && id !== undefined){
      this.removeBook = this.db.list(`${this.usrList}/${this.currUser}/bCollection`).snapshotChanges().pipe(
        map(booksList =>
          booksList.map(c => ({ id: c.payload.key, data: c.payload.val()}))
        )
      ).pipe(map(booksList => booksList.find(book => book.data === id))
      ).subscribe(book => {
        temp = book.id;
        console.log(temp)
        this.db.list(`${this.usrList}/${this.currUser}/bCollection`).remove(temp);
        this.router.navigate(['/my']);
      },err => this.toastr.error(err,"Error!"));
      this.toastr.warning("You successfuly removed " + title + " from your collection.", "Warning!");

    }
    else{
      this.toastr.error("You are not permited to delete this record!, Error!");
    }
  }
  myBooks(){
    //this.myBooksList = this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
    return this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
  }
}
