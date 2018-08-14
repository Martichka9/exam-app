import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private BServ : BooksService) { }

  ngOnInit() {
    console.log(this.BServ.getAllBooks());
  }

}
