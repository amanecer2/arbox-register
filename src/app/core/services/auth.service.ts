import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ILogin} from "../../../interface/login.interface";
import {getLocalStorage} from "./arbox.service";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _currentUser$ = new BehaviorSubject<ILogin.LoginInterface>(getLocalStorage('login'));
    readonly currentUser$: Observable<ILogin.LoginInterface>;

    constructor() {
        this.currentUser$ = this._currentUser$.asObservable();
    }

    setUser(user: ILogin.LoginInterface) {
        this._currentUser$.next(user);
    }

    getToken$() {
        return this.currentUser$
            .pipe(
                map((user: ILogin.LoginInterface) => {
                    return user && user.token ? user.token : undefined;
                })
            );
    }

    getCurrentUser$() {
        return this.currentUser$;
    }

    getUserId$() {
        return this.currentUser$
            .pipe(
                map((user: ILogin.LoginInterface) => {
                    return user && user.user.id;
                })
            );
    }
}
