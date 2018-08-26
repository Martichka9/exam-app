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
  private usrID : any;
  private isADMN = false;
  private temp = {};
  //OBS
  private admn : any;
  private likedBook : any;
  private addToMy : any;
  private myBooksList : any;

  constructor(private db: AngularFireDatabase,private router : Router,
    private toastr : ToastrService, private afs : AngularFirestore, private authServ : AuthService) {
    this.aBookRef = db.list(this.dbPath);
  }
 
  clear(){
    if(this.admn !== undefined){
      this.admn.unsubscribe();
    }
    if(this.likedBook !== undefined){
      this.likedBook.unsubscribe();
    }
    if(this.addToMy !== undefined){
      this.addToMy.unsubscribe();
    }
    if(this.myBooksList !== undefined){
      this.myBooksList.unsubscribe();
    }
  }

  isAdmin(id : string){
    this.admn = this.db.object(`/users/${this.currUser}`).snapshotChanges().subscribe(usr => {
      this.temp = usr.payload.val();
      if(this.temp !== null){
        if(this.temp['isAdmin']){
          this.isADMN = true
        }
      }else{this.isADMN = false;}
    },err => {this.isADMN = false;});
    return this.isADMN;
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
    this.newUpvotes = 0;
    this.likedBook = this.aBookRef.snapshotChanges().pipe(
    map(booksList =>
      booksList.map(c => ({ id: c.payload.key, ...c.payload.val() }))
    )).pipe(map(booksList => booksList.find(book => book.id === id))
    ).subscribe(book => {
      this.newUpvotes = book['upvotes'] + 1
      console.log(book['upvotes']);
      console.log(this.newUpvotes);
      this.aBookRef.update(id,{upvotes : this.newUpvotes}).catch(err => this.toastr.error(err, "Warning"));
    },err => this.toastr.error(err,"Error!"));
  }

  addInMyBooks(id : string){
    this.addToMy = this.db.list(`${this.usrList}/${this.currUser}/bCollection`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ data: c.payload.val() }))
      )
    ).subscribe(bCollection => {
        bCollection.forEach(element => {
        this.bCollection.push(element['data']);
      
      });

      bCollection.forEach(element => {
        if (this.bCollection.indexOf(element['id']) === -1){
            this.haveIt = false;
          }
        });
    });
    if(this.haveIt === false){
      this.db.list(`${this.usrList}/${this.currUser}/bCollection`).push(id).then(res => {
      this.haveIt = true;
      this.toastr.success("You successfully added this book to your collection!");
      this.router.navigate(['/my']);},
      res => this.toastr.warning(res,"Warning!"));
    } else {
      this.toastr.warning("You already have this book in your collection!");
      this.router.navigate(['/books']);
    }
}

  myBooks(){
    //this.myBooksList = this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
    return this.db.list(`${this.usrList}/${this.currUser}/bCollection`);
  }
}
