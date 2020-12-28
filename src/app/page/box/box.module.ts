import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BoxRoutingModule} from './box-routing.module';
import {BoxComponent} from './box.component';
import {WorkoutDayComponent} from "./workout-day/workout-day.component";
import {SharedModule} from "../../shared/shared.module";
import { IsInWorkoutPipe } from './is-in-workout.pipe';


@NgModule({
    declarations: [
        BoxComponent,
        WorkoutDayComponent,
        IsInWorkoutPipe,
    ],
    imports: [
        CommonModule,
        BoxRoutingModule,
        SharedModule
    ]
})
export class BoxModule {
}
