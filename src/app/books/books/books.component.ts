import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { map } from "rxjs/operators";
import { AuthService } from '../../authentication/authentication/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksList: any;
 
  constructor(private bServ : BooksService,private authServ : AuthService) { }
 
  ngOnInit() {
    this.getBooksList();
    this.bServ.clear();
  }
 
  getBooksList() {
    this.bServ.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(booksList => {
      this.booksList = booksList;
    });
  }
  
  ngOnDestroy() {
    this.bServ.clear();
  }
}
