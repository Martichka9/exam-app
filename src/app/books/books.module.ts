import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { BooksRoutingModule } from '../routing/books.routings';
import { booksComponents } from './index';
import { BooksService } from './books.service';
import { MyBooksComponent } from './my-books/my-books.component';
import { BooksComponent } from './books/books.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule
  ],
  declarations: [
		...booksComponents,
		MyBooksComponent
	],
	providers: [
		BooksService
	],
	exports: [
		CommonModule,
		BooksComponent
	]
})
export class BooksModule { }
