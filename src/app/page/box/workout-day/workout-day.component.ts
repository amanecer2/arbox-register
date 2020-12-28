import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BoxStateService} from "../../../state/boxes/box-state.service";
import {AuthService} from "../../../core/services/auth.service";
import {ArboxService} from "../../../core/services/arbox.service";
import {distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
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
                private arboxService: ArboxService) {
    }

    ngOnInit() {
        const queryParams$: Observable<[number, string]> = this.route.url.pipe(
            filter(queryParams => !!queryParams[0].path && !!queryParams[1].path),
            map(queryParams => [+queryParams[0].path, queryParams[1].path])
        );

        this.dayWorkoutData$ = queryParams$
            .pipe(
                switchMap(([boxId, date]) =>
                    this.boxStateService.getState().pipe(
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
                    map(res => res.futureWorkouts.get(date) || {}),
                    distinctUntilChanged(),
                    tap((scheduleItem: IScheduleItem) => this.active = scheduleItem),
                )
            ));
    }

    onWorkoutHandler(schedule: IScheduleItem) {
        debugger;
        if (this.active === schedule) {
            this.arboxService.removeFutureWorkout(schedule);
        } else {
            this.active.schedule && this.arboxService.removeFutureWorkout(this.active);
            this.arboxService.setFutureWorkout(schedule);
        }
    }
}
