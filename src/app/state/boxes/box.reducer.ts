import {createReducer, on, Action} from '@ngrx/store';
import {removeFutureWorkout, setBoxes, setCurrentBoxName, setFutureWorkout, SetWorkout} from './box.actions';
import {IBoxData} from '../../../interface/box';
import {getLocalStorage} from '../../core/services/arbox.service';
import {REDUCER, STRING} from '../../constant/string.constant';
import {IScheduleItem} from "../../../interface/schedule";

const boxes = getLocalStorage<IBoxData[]>(STRING.BOX);
const boxesMap = new Map<number, IBoxData>();

if (boxes) {
    boxes.forEach(box => boxesMap.set(box.id, box));
}

export type BoxWorkout = Map<string, IScheduleItem[]>; /// date. workouts

export interface IBoxesWorkout {
    [boxId: number]: BoxWorkout;
}

export interface IBoxState {
    boxes: Map<number, IBoxData>;
    workouts: IBoxesWorkout;
    currentBox: number | undefined;
    futureWorkouts: Map<string, IScheduleItem>;
    ddd: any;
}

const initialState: IBoxState = {
    boxes: boxesMap,
    workouts: {},
    currentBox: undefined,
    futureWorkouts: new Map(),
    ddd: null
};

export const _boxCreateReducer = createReducer<IBoxState>(
    initialState,
    on(setBoxes, (state, {payload}) => {
        payload.forEach(box => state.boxes.set(box.id, box));
        return {
            ...state,
            ...{boxes: state.boxes}
        };
    }),
    on(setCurrentBoxName, (state, {payload}) => {
        return {
            ...state,
            currentBox: payload
        };
    }),
    on(setFutureWorkout, (state , {payload}) => {
        const futureWorkouts = newReferance(state.futureWorkouts);

        const workout = futureWorkouts.get(payload.schedule.date)

        if (!workout) {
            futureWorkouts.set(payload.schedule.date, payload);
        }

        if (workout && workout !== payload) {
            futureWorkouts.set(payload.schedule.date, payload);
        }

        return {
            ...state,
            futureWorkouts,
        };
    }),
    on(removeFutureWorkout, (state , {payload}) => {
        const futureWorkouts = state.futureWorkouts;

        const workout = futureWorkouts.get(payload.schedule.date)

        if (workout) {
            futureWorkouts.delete(payload.schedule.date);
        }

        return {
            ...state,
            futureWorkouts: newReferance(futureWorkouts),
        };
    }),
    on(SetWorkout, (state, {payload}) => {
        const {boxId, date, workouts} = payload;
        console.log('_workouts');
        let __workouts = {...state.workouts};

        if (!__workouts[boxId]) {
            console.log('_workouts is emtpy');
            __workouts[boxId] = new Map();
        }
        console.log('_workouts', __workouts[boxId])

        __workouts[boxId].set(date, workouts);
        return {
            ...state,
            workouts: __workouts,
            ddd: workouts
        };
    })
);

export function boxesReducer(state: IBoxState, action: Action) {
    return _boxCreateReducer(state, action);
}

function newReferance<T>(map: Map<any, any>): Map<any, any> {
    /*map.get = function (ref) {
        return function (k) {
            return Object.assign({}, ref.call(this, k));
        };
    }(map.get);*/
    const map1 = new Map<any, any>([...map]);
    return map1;
}
