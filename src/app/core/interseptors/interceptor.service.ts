import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {switchMap, take, tap} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._authService.getToken$()
            .pipe(
                take(1),
                switchMap((token: string | undefined) => {
                    return next.handle(updateRequest(req, token)).pipe();
                })
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