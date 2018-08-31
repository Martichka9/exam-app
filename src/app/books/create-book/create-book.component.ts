import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ABook } from '../../models/book.model';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  createABookForm : FormGroup;
  constructor(private bServ: BooksService, private editFB: FormBuilder, private toastr: ToastrService, private router : Router) { }

  ngOnInit() {
    this.createABookForm = this.editFB.group({
      title: ["",[Validators.required]],
      author: ["",[Validators.required]],
      description: ["",[Validators.required]],
      genre: ["",[Validators.required]],
      imagePath: ["",[Validators.required]],
      read: ["",[Validators.required]],
      bestseller: [false,[Validators.required]]
    });
  }

  addABook(newBook : ABook){
    this.bServ.createABook(this.createABookForm.value);
  }
}
