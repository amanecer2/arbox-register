import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanLoad,
    Route,
    UrlSegment, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private _authService: AuthService,
                private _router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isLoggedin();
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedin();
    }
    
    private isLoggedin(): Observable<boolean> {
        return this._authService.currentUser$
            .pipe(
                take(1),
                map(user => {
                    return !!user;
                }),
                tap( isLoggedin => {
                    if (!isLoggedin) {
                        this._router.navigate(['/auth']);
                    }
                })
            );
    }
}
