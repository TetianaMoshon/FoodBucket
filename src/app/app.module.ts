import {NgModule} from '@angular/core';

import {AgmCoreModule} from '@agm/core';

import {appRouting} from './app.routing';
import {MainFrontendComponent} from './components/main-frontend/main-frontend.component';
import {MainBackendComponent} from './components/main-backend/main-backend.component';
import {MainFrontendModule} from "./components/main-frontend/frontend.module";
import {MainBackendModule} from "./components/main-backend/backend.module";

@NgModule({
  declarations: [
      MainFrontendComponent,
      MainBackendComponent,
  ],
  entryComponents: [
  ],
  imports: [
      appRouting,
      MainFrontendModule,
      MainBackendModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
    })
  ],
  providers: [],
  bootstrap: [MainFrontendComponent]
})
export class AppModule { }
