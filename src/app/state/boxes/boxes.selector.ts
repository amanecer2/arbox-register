import {createSelector, createFeatureSelector} from '@ngrx/store';
import {IBoxState} from './box.reducer';
import {REDUCER} from '../../constant/string.constant';
import {IAppStateStore} from '../index';

//const featureBoxes = createFeatureSelector<IBoxState>(`${REDUCER.BOXES}.boxes`);
const featureBoxes = createFeatureSelector<IAppStateStore>(`die`);

export const boxesSelector = createSelector(
    featureBoxes,
    boxes => {
        debugger
        return boxes
    }
);
