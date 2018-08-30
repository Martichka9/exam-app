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
  private haveIt = true;
  aBookRef : AngularFireList<ABook> = null;
  abookPath : string = baseUrl;
  bookReview : ABook;
  tempTitle : string = "";
  newUpvotes : number;
  ///obs
  public likedBook : any;
  public addToMy : any;
  public addToMyCheck : any;
  private myBooksList : any;

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
    this.db.object(`books/${id}/upvotes`).query.ref.transaction(upvotes =>{
      return upvotes+1;
    });
  }
  
  readBook(id:string){
    this.router.navigate([`/read/${id}`]);

  }

  addInMyBooks(id : string){
    this.addToMy = this.db.list(`${this.usrList}/${this.currUser}/bCollection`).snapshotChanges()
    .subscribe(data => {
      if(data.length === 0){
        this.haveIt = false;
        this.checkMyBooks(false,id);
      }else{
        this.haveIt = true;
        this.checkMyBooks(true,id);
      }
    });
  }
  checkMyBooks (haveit : boolean, id: string){
      if(haveit === true){
        this.addToMy = this.db.list(`${this.usrList}/${this.currUser}/bCollection`).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ data: c.payload.val() }))
          )
        ).subscribe(bCollection => {
          bCollection.forEach(element => {
          if (element['data'] === id){
            this.haveIt = true;
            console.log("in have it");
          }
      });
      if(this.haveIt){
        this.updateMyBooks(id);
      }else{this.toastr.warning("You already have this book in your collection!", "Warning!")}
    });
    }
  }
  updateMyBooks(id:string){
    this.db.list(`${this.usrList}/${this.currUser}/bCollection`).push(id);
    this.toastr.success("You successfully added this book to your collection!", "Success!");
  }
  myBooks(){
    //this.myBooksList = this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
    return this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
  }
}
