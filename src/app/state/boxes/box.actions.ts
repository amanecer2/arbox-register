import { createAction, props } from '@ngrx/store';
import {IBoxData} from '../../../interface/box';
import {IScheduleItem} from "../../../interface/schedule";

const BOX = '[box]';

export const BOXES_ENUM = {
    SET_BOXES: `${BOX} set boxes`,
    SET_CURRENT_BOX_NAME: `${BOX} set current box id`,
    SET_FUTURE_WORKOUT: `${BOX} set future workout`,
    REMOVE_FUTURE_WORKOUT: `${BOX} remove future workout`,
    SET_WORKOUT: `${BOX} set workout`
};

export const setBoxes = createAction(
    BOXES_ENUM.SET_BOXES,
    props<{payload: IBoxData[]}>()
);

export const SetWorkout = createAction(
    BOXES_ENUM.SET_WORKOUT,
    props<{payload: {date: string, workouts: IScheduleItem[], boxId: number}}>()
);

export const setCurrentBoxName = createAction(
    BOXES_ENUM.SET_CURRENT_BOX_NAME,
    props<{payload: number}>()
);

export const setFutureWorkout = createAction(
    BOXES_ENUM.SET_FUTURE_WORKOUT,
    props<{payload: IScheduleItem}>()
);
export const removeFutureWorkout = createAction(
    BOXES_ENUM.REMOVE_FUTURE_WORKOUT,
    props<{payload: IScheduleItem}>()
);

