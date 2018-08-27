import { Component, OnInit,OnDestroy } from '@angular/core';
import { BooksService } from '../books.service';
import { map } from "rxjs/operators";
import { AuthService } from '../../authentication/authentication/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit,OnDestroy {
  private booksList: any;
  private obsBooks : any;
  private addToMy : any;
 
  constructor(private bServ : BooksService,private authServ : AuthService) { }
 
  ngOnInit() {
    this.getBooksList();
  }
 
  getBooksList() {
    this.obsBooks = this.bServ.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(booksList => {
      this.booksList = booksList;
    });
  }
  
  ngOnDestroy() {
    this.obsBooks.unsubscribe();
    if(this.bServ.addToMy !== undefined){
      this.bServ.addToMy.unsubscribe();
    }
    if(this.bServ.likedBook !== undefined){
      this.bServ.likedBook.unsubscribe();
    }
  }
}
