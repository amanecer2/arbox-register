import {ActionReducerMap} from '@ngrx/store';
import {REDUCER} from '../constant/string.constant';
import {_boxCreateReducer, boxesReducer, IBoxState} from './boxes/box.reducer';

export interface IAppStateStore {
    [REDUCER.BOXES]: IBoxState;
}

export const reducers: ActionReducerMap<IAppStateStore> = {
    [REDUCER.BOXES] : _boxCreateReducer,
};
