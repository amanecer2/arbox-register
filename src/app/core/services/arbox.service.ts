import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ILogin, IUserServer} from "../../../interface/login.interface";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {API} from "../../constant/api.constant";
import {catchError, switchMap, take, tap} from "rxjs/operators";
import {IBoxData, IBoxDataInterface} from "../../../interface/box";
import {STRING} from "../../constant/string.constant";
import {BoxStateService} from "../../state/boxes/box-state.service";
import {IScheduleItem} from "../../../interface/schedule";
import {format} from "date-fns";

@Injectable({
    providedIn: 'root'
})
export class ArboxService {

    constructor(private _http: HttpClient,
                private boxStateService: BoxStateService
    ) {
    }

    getState() {
        return this.boxStateService.getState();
    }

    login({email, password}:
              { email: string, password: string }): Observable<ILogin.LoginInterface> {

        return this._http
            .post<ILogin.LoginInterface>(API.login(email), {email, password})
            .pipe(
                tap(_loginData => setLocalStorage('login', _loginData)),

                //    tap(_loginData => this._http.post(API.registerUser(), {user: _loginData}).subscribe()),
            );
    }

    getUserMembership(userId) {
        return this._http.get<IMembership.MembershipInterface[]>(API.membership(userId)).pipe(
            tap(membership => {
                this.registerUserAtServer({
                    membrshipUserFk: membership[0].id,
                    userFk: membership[0].user_fk,
                })
                .subscribe();
            })
        );
    }

    registerUserAtServer(user: IUserServer) {
        return this._http.post(API.registerUser(), {user});
    }

    getBoxData(userId): Observable<IBoxDataInterface> {

        const boxData = getLocalStorage<IBoxData[]>(STRING.BOX);
        if (boxData) {
            // this._boxData$.next(boxData);
            this.boxStateService.setBoxes(boxData);
            return of(boxData);
        }
        const url = API.getBoxData(userId);
        return this._http.get<IBoxData[]>(url).pipe(
            tap(_boxData => setLocalStorage(STRING.BOX, _boxData)),
            // tap(_boxData => this._boxData$.next(_boxData)),
            tap((_boxData: IBoxData[]) => {
                this.boxStateService.setBoxes(_boxData);
            })
        );
    }

    removeFutureWorkout(schedule: IScheduleItem) {
        this._http.delete(API.scheduleWorkout() + '/' + schedule.schedule.id).subscribe();
        this.boxStateService.removeFutureWorkout(schedule);
    }

    setFutureWorkout(schedule: IScheduleItem) {
        this._http.post(API.scheduleWorkout(), {schedule}).subscribe();
        this.boxStateService.setFutureWorkout(schedule);
    }

    /**
     * Get schedule workouts for specific date
     * @param userID
     * @param boxId
     * @param date
     */
    scheduleByDateList(userID: number, boxId: number, date) {
        return this._http.get(API.scheduleByDateList(boxId, userID, date)).pipe(
            tap((res: any) => {
                const keys = Object.keys(res);
                const scheduleItem = res[keys[0]][0] as IScheduleItem[];
                this.boxStateService.setWorkouts(boxId, format(new Date(date), 'yyyy-MM-dd'), scheduleItem);
            })
        );
    }

    /**
     * The workout that the user already registered
     */
    getWeeklyRegisteredUserSchedule() {
        return this._http.post(API.getWeeklyRegisteredUserSchedule(), {})
            .pipe(
                tap(res => {
                    debugger
                }),
                catchError(err => {
                    debugger
                    return throwError(err)
                })
            );
    }
}

export function getLocalStorage<T>(name: string): T {
    return JSON.parse(localStorage.getItem(name));
}

export function setLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

