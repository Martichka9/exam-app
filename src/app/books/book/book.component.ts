import { Component, OnInit, Input } from '@angular/core';
import { ABook } from '../../models/book.model';
import { BooksService } from '../books.service';
import { AuthService } from '../../authentication/authentication/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
 
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
 
  @Input() book: ABook;
 
  constructor(private bServ: BooksService, private authServ : AuthService, private router : Router) { }
 
  ngOnInit() {
  }

  review(id :string){
    this.router.navigate([`/books/review/${id}`]);
  }
}