import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
    },
    {
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        path: 'app',
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
    },
    {
        path: '**',
        redirectTo: 'box',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
