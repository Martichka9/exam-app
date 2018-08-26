import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authentication/authentication/auth.service";
import { BooksService } from '../books/books.service';
import { map } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  booksList: any = [];

  constructor(private authServ : AuthService,private bServ : BooksService, private router : Router) { }

  ngOnInit() {
    this.bServ.isAdmin(localStorage.getItem('usrid'));
    this.getBooksList();
    //this.bServ.clear();
  }

  getBooksList() {
    this.bServ.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(booksList => {
      for (let i = 0; i < 3; i++) {
        this.booksList.push(booksList[i]);
      }
    });
  }
  goToSignin(){
    this.router.navigate(['/signin']);
  }
  goToSignup(){
    this.router.navigate(['/signup']);
  }
  goToBooks(){
    this.router.navigate(['/books']);
  }

  ngOnDestroy() {
    this.bServ.clear();
  }
}
