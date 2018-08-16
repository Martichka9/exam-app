import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { BooksRoutingModule } from '../routing/books.routings';
import { booksComponents } from './index';
import { BooksService } from './books.service';

import { environment } from "../environments/environment"
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
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
