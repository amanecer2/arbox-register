import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BoxStateService} from '../../state/boxes/box-state.service';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {AuthService} from "../../core/services/auth.service";
import {ArboxService} from "../../core/services/arbox.service";
import {addDays} from "date-fns";
import {IBoxState} from "../../state/boxes/box.reducer";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnInit {
    data$: Observable<any>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private boxStateService: BoxStateService,
                private authService: AuthService,
                private arboxService: ArboxService
    ) {
    }

    ngOnInit() {
        let currentId = 0;

        this.data$ = this.boxStateService.getState().pipe(
            map(res => {
                return res.workouts[res.currentBox] ? [...res.workouts[res.currentBox]] : [];
            })
        );

        const Box$ = this.boxStateService.getState();

        combineLatest(
            Box$.pipe(
                filter(boxdata => boxdata.currentBox !== currentId),
                tap(boxdata => currentId = boxdata.currentBox)),
            this.authService.getUserId$()
        )
            .pipe(
                untilDestroyed(this),
                switchMap(([boxesState, userID]) => {
                    return combineLatest(
                        this.arboxService.scheduleByDateList(userID, boxesState.boxes.get(boxesState.currentBox).id, addDays(new Date(), 1)),
                        this.arboxService.scheduleByDateList(userID, boxesState.boxes.get(boxesState.currentBox).id, addDays(new Date(), 2)),
                        this.arboxService.scheduleByDateList(userID, boxesState.boxes.get(boxesState.currentBox).id, addDays(new Date(), 3)),
                        of(boxesState)
                    );
                })
            )
            .subscribe(res => {
            });

        this.route.url.subscribe(queryParams => {
            this.boxStateService.setCurrentBox(+queryParams[0].path);
        });
    }

    navigateToDayWorkout(date) {
        this.router.navigate([date], {relativeTo: this.route});
    }

}
