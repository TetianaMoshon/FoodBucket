import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {MainFrontendComponent} from "./components/main-frontend/main-frontend.component"

const appRoutes: Routes = [
    // {
    //     path:'',
    //     component: MainFrontendComponent,
    // },
    // {
    //     path:'admin',
    //     loadChildren:'src/app/components/main-frontend/frontend.module#MainFrontendModule'
    // },

];

export  const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

