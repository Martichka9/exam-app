import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../books.service';
import { ABook } from '../../models/book.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksList: any;
 
  constructor(private bServ : BooksService) { }
 
  ngOnInit() {
    this.getBooksList();
  }
 
  getBooksList() {
    // Use snapshotChanges().map() to store the key
    this.bServ.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(booksList => {
      this.booksList = booksList;
    });
  }
}
