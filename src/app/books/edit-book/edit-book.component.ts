import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormGroup,FormControl, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ABook } from '../../models/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editABookForm : FormGroup;
  loadedBook : ABook;
  lBPath : string = "";

  constructor(private bServ: BooksService, private editFB: FormBuilder, private toastr: ToastrService, private router : Router) { }

  ngOnInit() {
    this.editABookForm = this.editFB.group({
      title: ["",[Validators.required]],
      author: ["",[Validators.required]],
      description: ["",[Validators.required]],
      genre: ["",[Validators.required]],
      imagePath: ["",[Validators.required]],
      bestseller: [0,[Validators.required]]
    });

    this.lBPath = this.router.url.toString().replace(`/books/edit/`,``);
    this.bServ.reviewBook(this.lBPath).snapshotChanges().pipe(
      map(booksList =>
        booksList.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    ).pipe(map(booksList => booksList.find(book => book.id === this.lBPath))
    ).subscribe(book => {
      this.editABookForm = this.editFB.group({
        title: [book['title'],[Validators.required]],
        author: [book['author'],[Validators.required]],
        description: [book['description'],[Validators.required]],
        genre: [book['genre'],[Validators.required]],
        imagePath: [book['imagePath'],[Validators.required]],
        bestseller: [book['bestseller'],[Validators.required]]
      });
  
    });
  }

  saveChanges(title : string,author: string, description: string, genre: string, imagePath: string,bestseller:string){
    this.bServ.editABook(this.lBPath, { title:this.editABookForm.get('title').value ,author:this.editABookForm.get('author').value, description:this.editABookForm.get('description').value, genre:this.editABookForm.get('genre').value, imagePath:this.editABookForm.get('imagePath').value,bestseller:this.editABookForm.get('bestseller').value });
  }
}

