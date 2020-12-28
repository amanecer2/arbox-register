import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ILogin} from "../../../interface/login.interface";
import {map} from "rxjs/operators";
import {getLocalStorage} from "../../utils/storage.utils";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _currentUser$ = new BehaviorSubject<ILogin.LoginInterface>(undefined);
    readonly currentUser$: Observable<ILogin.LoginInterface>;

    token = '';
    constructor() {
        const user = getLocalStorage<ILogin.LoginInterface>('login');
        this.setUser(user);

        this.currentUser$ = this._currentUser$.asObservable();
    }

    setUser(user: ILogin.LoginInterface) {
        this.token = user ? user.token : undefined;
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
    getToken() {
        return this.token;
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
