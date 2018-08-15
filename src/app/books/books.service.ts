import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ABook } from "../models/book.model";
import { Observable } from "../../../node_modules/rxjs";

const baseUrl = "https://exam-app-bc38c.firebaseio.com/books";

@Injectable({
    providedIn: 'root'
})
export class BooksService{
    constructor(private http : HttpClient){}

    getAllBooks() {
        return this.http.get(`${baseUrl}.json`)
          .pipe(map((resp : Response) => {
            const books = Object.keys(resp);
            const booksList : ABook[] = [];
            for (const book of books) {
              booksList.push(new ABook(book, resp[book].author,resp[book].bestseller,resp[book].description,resp[book].genre,resp[book].imagePath,resp[book].title,resp[book].upvotes));
            }
    
            return booksList;
          }));
      }
}
