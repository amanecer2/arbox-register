import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IBoxState} from './box.reducer';
import {boxesSelector} from './boxes.selector';
import {Observable} from 'rxjs';
import {IBoxData} from '../../../interface/box';
import {removeFutureWorkout, setBoxes, setCurrentBoxName, setFutureWorkout, SetWorkout} from './box.actions';
import {REDUCER} from "../../constant/string.constant";
import {filter, map} from "rxjs/operators";
import {IScheduleItem} from "../../../interface/schedule";

@Injectable({
    providedIn: 'root'
})
export class BoxStateService {

    constructor(private store: Store<IBoxState>) {
    }

    getState(): Observable<IBoxState> {
        return this.store.pipe(
            select((dd: any) => {
                return dd[REDUCER.BOXES];
            }),
            filter(data => !!data.currentBox),
        );
    }

    getBoxWorkoutsData(): Observable<any> {
        return this.getState().pipe(
            map(res => {
                return res.workouts[res.currentBox] ? [...res.workouts[res.currentBox]] : [];
            })
        );
    }

    setBoxes(boxes: IBoxData[]) {
        this.store.dispatch(setBoxes({payload: boxes}));
    }

    setCurrentBox(boxName: number) {
        this.store.dispatch(setCurrentBoxName({payload: boxName}));
    }

    setWorkouts(boxId, date, workouts) {
        this.store.dispatch(SetWorkout({payload: {workouts, date, boxId}}));

    }

    setFutureWorkout(workout: IScheduleItem) {
        this.store.dispatch(setFutureWorkout({payload: workout}));
    }
    removeFutureWorkout(workout: IScheduleItem) {
        this.store.dispatch(removeFutureWorkout({payload: workout}));
    }
}
