import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { BooksRoutingModule } from '../routing/books.routings';
import { booksComponents } from './index';
import { BooksService } from './books.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule
  ],
  declarations: [
		...booksComponents
	],
	providers: [
		BooksService
	],
	exports: [
		CommonModule
	]
})
export class BooksModule { }
