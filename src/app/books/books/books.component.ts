import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../books.service';
import { ABook } from '../../models/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @Input() books : Observable<ABook[]>;

  constructor(
    private BServ : BooksService
  ) { }

  ngOnInit() {
     this.books = this.BServ.getAllBooks();
  }
}
