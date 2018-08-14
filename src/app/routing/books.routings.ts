import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from '../books/books/books.component';
import { EditBookComponent } from '../books/edit-book/edit-book.component';
import { CreateBookComponent } from '../books/create-book/create-book.component';

const booksRoutes : Routes = [
    { path: 'all', component: BooksComponent },
    { path: 'edit/:id', component: EditBookComponent },
    { path: 'add', component: CreateBookComponent }
  ]
  
@NgModule({
    imports: [ 
        CommonModule,
        RouterModule.forChild(booksRoutes) 
    ],
    exports: [ RouterModule ]
  })
  export class BooksRoutingModule {  }