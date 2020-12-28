import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BoxStateService} from '../../state/boxes/box-state.service';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {AuthService} from "../../core/services/auth.service";
import {ArboxService} from "../../core/services/arbox.service";
import {addDays} from "date-fns";
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
       // debugger
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
                    const box = boxesState.boxes.get(boxesState.currentBox);
                    if (!box) {
                        return of(null);
                    }
                    return combineLatest(
                        this.arboxService.scheduleByDateList(userID, box.id, addDays(new Date(), 2)),
                        this.arboxService.scheduleByDateList(userID, box.id, addDays(new Date(), 3)),
                        this.arboxService.scheduleByDateList(userID, box.id, addDays(new Date(), 4)),
                        this.arboxService.scheduleByDateList(userID, box.id, addDays(new Date(), 5)),
                        this.arboxService.scheduleByDateList(userID, box.id, addDays(new Date(), 6)),
                        this.arboxService.scheduleByDateList(userID, box.id, addDays(new Date(), 7)),
                        of(boxesState)
                    );
                })
            )
            .subscribe(res => {
            });

        this.route.url.subscribe(queryParams => {
            const id = +queryParams[0].path;
            if (id === -1) {
                    this.boxStateService.getState(true).pipe(
                        take(1),
                        tap( currentBox => {
                            debugger
                          //  this.boxStateService.setCurrentBox([...currentBox.boxes][0][0]);
                            this.router.navigate(['../' + [...currentBox.boxes][0][0] ], {relativeTo: this.route});
                        })
                    ).subscribe();
            }
            this.boxStateService.setCurrentBox(id);
        });
    }

    navigateToDayWorkout(date) {
        this.router.navigate([date], {relativeTo: this.route});
    }

}
