import { Component, OnInit, Input } from '@angular/core';
import { ABook } from "../../models/book.model"
import { BooksService } from '../books.service';
import { map } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private currentBook : string = "";

  @Input() aBook : ABook;
  constructor(private bServ : BooksService,private router : Router) { }

  ngOnInit() {
    if(this.router.url.toString().search(`/books/my/review/`) === 0){
      this.currentBook = this.router.url.toString().replace(`/books/my/review/`,``);
      console.log(this.router.url.toString().replace(`/books/my/review/`,``));
    }else{
      this.currentBook = this.router.url.toString().replace(`/books/review/`,``);
      console.log(this.router.url.toString().replace(`/books/review/`,``));
    }

    this.bServ.reviewBook(this.currentBook).snapshotChanges().pipe(
      map(booksList =>
        booksList.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    ).pipe(map(booksList => booksList.find(book => book.id === this.currentBook))
    ).subscribe(book => {
      this.aBook = book;
    });
  }

}
