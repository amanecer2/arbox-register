import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BoxRoutingModule} from './box-routing.module';
import {BoxComponent} from './box.component';
import {WorkoutDayComponent} from "./workout-day/workout-day.component";


@NgModule({
    declarations: [
        BoxComponent,
        WorkoutDayComponent,
    ],
    imports: [
        CommonModule,
        BoxRoutingModule
    ]
})
export class BoxModule {
}
