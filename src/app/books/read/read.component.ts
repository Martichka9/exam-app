import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ABook } from "../../models/book.model"
import { BooksService } from '../books.service';
import { map } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit,OnDestroy {
  private currentBook = "";
  private obsBook : any;
  @Input() aBook: ABook;

  constructor(private bServ : BooksService, private router : Router) { }

  ngOnInit() {
    this.currentBook = this.router.url.toString().replace("/read/","");
    //console.log(this.currentBook);
    this.obsBook = this.bServ.reviewBook(this.currentBook).snapshotChanges().pipe(
      map(booksList =>
        booksList.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    ).pipe(map(booksList => booksList.find(book => book.id === this.currentBook))
    ).subscribe(book => {
      this.aBook = book;
      //console.log(this.aBook['read'])
    });
  }

  ngOnDestroy(){
    this.obsBook.unsubscribe();
    if(this.bServ.addToMy !== undefined){
      this.bServ.addToMy.unsubscribe();
    }
    if(this.bServ.likedBook !== undefined){
      this.bServ.likedBook.unsubscribe();
    }
  }
}
