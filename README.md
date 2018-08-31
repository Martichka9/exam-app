# ExamApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
It's using Firebase Realtime database as a DB provider and angularfire2 lybrary for interacting with the database.
For the styles is used Bootswatch Sketchy theme.

It's set to work with e-mail - password authentication and it is authenticating users through Firebase auth() functions.
Incuded are two types of users - ordinary users and administartor.

Database rules of reading / writing data are set as per below:
 - all can read (set to be able to show a few books on home screen without authentication)
 - only authenticated users can write to the books DB
 - all can write to the users DB (needed to set roles of users on signing up)

For CRUD operations depending on the page loaded, are used lists for the Home, All books, Collection, Review pages, add a book and remove such to / from collection. Objects and refs along with the push, set, update, delete and transaction methods are used for the related buttons for creating, deleting, updating and upvoting a book . 

Ordinary users are able only to review all books, up vote for book/s, add them to their collection and read book/s.
Only users with admin role can create, update or delete books from database.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
