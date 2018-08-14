import { Injectable } from "@angular/core"; 
import { HttpHandler,HttpEvent,HttpRequest, HttpInterceptor } from "@angular/common/http"
import { Observable } from "rxjs";
import { AuthService } from "../authentication/authentication/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authServ : AuthService){}

    intercept(request: HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
        const token = this.authServ.getToken();
        if (token){
            request = request.clone({
                url: `${request.url}?auth=${token}`
            });
        }
        return next.handle(request);
    }
}