import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BoxComponent} from "./box.component";
import {WorkoutDayComponent} from "./workout-day/workout-day.component";


const routes: Routes = [
    {
        path: ':id',
        component: BoxComponent,
        pathMatch: 'full'
    },
    {
        path: ':id/:data',
        component: WorkoutDayComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoxRoutingModule {
}
