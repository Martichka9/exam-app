import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

const baseUrl = "https://exam-app-bc38c.firebaseio.com/books/";

@Injectable()
export class BooksService{
    constructor(private http : HttpClient){}

    getAllBooks(){
        return this.http.get(`${baseUrl}.json`)
        .pipe(map((response : Response) => {
            console.log(response);
        }));
    }
}