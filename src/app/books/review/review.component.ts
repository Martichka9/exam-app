import { Component, OnInit, Input } from '@angular/core';
import { ABook } from "../../models/book.model"
import { BooksService } from '../books.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() aBook : ABook;
  constructor(private bServ : BooksService) { }

  ngOnInit() {
  }

}
