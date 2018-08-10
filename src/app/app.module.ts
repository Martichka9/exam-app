import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrService, ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationModule } from './authentication/authentication/authentication.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routing/app.routing';
import { AuthService } from './authentication/authentication/auth.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AuthenticationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [
    ToastrService,
    ReactiveFormsModule,
    AuthService/*,{ 
      provide: HTTP_INTERCEPTORS,
      useClass: JTWInterceptor,
      multi: true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
