import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { map } from "rxjs/operators";
import { AuthService } from '../../authentication/authentication/auth.service';
import { ValueTransformer } from '../../../../node_modules/@angular/compiler/src/util';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  booksList = [];
  myBooks = [];
  private loadList : any;
 
  constructor(private bServ : BooksService,private authServ : AuthService) { }
 
  ngOnInit() {
    this.loadMyList();
    this.bServ.clear();
  }
  
  loadMyList(){
    //this.myBooks = 
    this.loadList = this.bServ.myBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ data: c.payload.val() }))
      )
    ).subscribe(booksList => {
      booksList.forEach(element => {
        this.booksList.push(element['data']);
      });      
      this.bServ.getAllBooks().snapshotChanges().pipe(
        map(books =>
          books.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(booksCol => {
        booksCol.forEach(element => {
          if (this.booksList.indexOf(element['id']) >= 0){
            this.myBooks.push(element);
          }  
        });
      });
    })
  }
  
  ngOnDestroy() {
    this.bServ.clear();
    this.loadList.unsubscribe();
  }
}
