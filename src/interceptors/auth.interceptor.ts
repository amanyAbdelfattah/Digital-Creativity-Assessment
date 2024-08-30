import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      const expiration = localStorage.getItem("token_expiration");
      if (new Date(expiration!) < new Date()) {
        this.authService.logOut();
        return EMPTY;
      } else {
        const cloned = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(cloned);
      }
    }
    else {
      return next.handle(req);
    }
  }
}
