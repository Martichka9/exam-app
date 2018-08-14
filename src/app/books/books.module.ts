import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BooksComponent,
    CreateBookComponent,
    EditBookComponent]
})
export class BooksModule { }
