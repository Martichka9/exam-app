import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../routing/books.routings';
import { booksComponents } from './index';
import { BooksService } from './books.service';
import { BookComponent } from './book/book.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule
  ],
  declarations: [
		...booksComponents
	],
	providers: [
    BooksService
	],
	exports: [
    CommonModule,
    BookComponent
	]
})
export class BooksModule { }
