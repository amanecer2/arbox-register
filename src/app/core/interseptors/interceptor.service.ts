import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, switchMap, take, tap} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {ArboxService} from "../services/arbox.service";
import {ILogin} from "../../../interface/login.interface";

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService,
                private arboxService: ArboxService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._authService.token;

        return next.handle(updateRequest(req, token)).pipe(
            catchError( err => {
                if (err.status === 401 && token) {
                    this._authService.getCurrentUser$().pipe(
                        tap( (currentUser: ILogin.LoginInterface) => {
                            return this.arboxService.getUserMembership(currentUser.user.id);
                        })
                    ).subscribe();
                }
                return throwError(err);
            } )
        );
    }

    getToken() {
        return  this._authService.getToken$()
            .pipe(
                take(1)
            );
    }
}

export function updateRequest(req: HttpRequest<any>, token): HttpRequest<any> {
    req = req.clone({
        setHeaders: {
            ...(token ? {'accessToken': token.toString()} : {}),
        }
    });
    return req;
}