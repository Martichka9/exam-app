import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../routing/books.routings';
import { booksComponents } from './index';
import { BooksService } from './books.service';

import { environment } from "../environments/environment"
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
