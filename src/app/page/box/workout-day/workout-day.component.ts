import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {BoxStateService} from "../../../state/boxes/box-state.service";
import {AuthService} from "../../../core/services/auth.service";
import {ArboxService} from "../../../core/services/arbox.service";
import {delay, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ISchedule, IScheduleItem} from "../../../../interface/schedule";
import {Observable} from "rxjs";

@UntilDestroy()
@Component({
    selector: 'app-workout-day',
    templateUrl: './workout-day.component.html',
    styleUrls: ['./workout-day.component.scss'],
})
export class WorkoutDayComponent implements OnInit {

    dayWorkoutData$;
    currentDayWorkout$;

    private active = undefined;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private boxStateService: BoxStateService,
                private authService: AuthService,
                private arboxService: ArboxService,
                private _location: Location) {
    }

    ngOnInit() {
        const queryParams$: Observable<[number, string]> = this.route.url.pipe(
            map(queryParams => {
                const currentUrl = location.href.split('/');
                return [+currentUrl[currentUrl.length - 2], currentUrl[currentUrl.length - 1]];
            })
        );

        this.dayWorkoutData$ = queryParams$
            .pipe(
                switchMap(([boxId, date]) =>
                    this.boxStateService.getState(true).pipe(
                        tap( res => {
                            if (!res.currentBox) {
                               this._location.back();
                            }
                        }),
                        filter(res => !!res.workouts[boxId]),
                        map(res => {
                            return res.workouts[boxId] ? [...res.workouts[boxId]] : [];
                        }),
                        map(res => {
                            return res.find(workout => workout[0] === date);
                        })
                    ),
                )
            );

        this.currentDayWorkout$ = queryParams$.pipe(
            switchMap(([boxId, date]) =>
                this.boxStateService.getState().pipe(
                    map(res => {
                        console.log('currentDayWorkout$', res.futureWorkouts.get(date))
                        return res.futureWorkouts.get(date) || {}
                    }),
                    distinctUntilChanged(),
                    tap((scheduleItem: IScheduleItem) => this.active = scheduleItem),
                )
            ));
    }

    onWorkoutHandler(schedule: IScheduleItem) {
        if (this.active === schedule) {
            this.arboxService.removeFutureWorkout(schedule);
        } else {
            this.active.schedule && this.arboxService.removeFutureWorkout(this.active);
            this.arboxService.setFutureWorkout(schedule);
        }
    }
}
