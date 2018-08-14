import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from '../books/books/books.component';
import { EditBookComponent } from '../books/edit-book/edit-book.component';
import { CreateBookComponent } from '../books/create-book/create-book.component';
import { MyBooksComponent } from '../books/my-books/my-books.component';
import { AuthGuard } from '../authentication/authentication/auth.guard';

const booksRoutes : Routes = [
    { path: '', component: BooksComponent },
    { path: 'edit/:id', component: EditBookComponent, canActivate : [AuthGuard] },
    { path: 'add', component: CreateBookComponent, canActivate : [AuthGuard] },
    { path: 'my', component: MyBooksComponent, canActivate : [AuthGuard] }
  ]
  
@NgModule({
    imports: [ 
        CommonModule,
        RouterModule.forChild(booksRoutes) 
    ],
    exports: [ RouterModule ]
  })
  export class BooksRoutingModule {  }