import {NgModule} from '@angular/core';

import {AgmCoreModule} from '@agm/core';

import {appRouting} from './app.routing';
import {MainFrontendComponent} from './components/main-frontend/main-frontend.component';
import {MainBackendComponent} from './components/main-backend/main-backend.component';
import {MainFrontendModule} from "./components/main-frontend/frontend.module";
import {MainBackendModule} from "./components/main-backend/backend.module";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AppComponent} from "./app.component";
import {BsModalRef, CollapseModule, ModalModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
      MainFrontendComponent,
      MainBackendComponent,
      AppComponent,
      FooterComponent,
      NavbarComponent,

  ],
  entryComponents: [
  ],
  imports: [
      appRouting,
      MainFrontendModule,
      MainBackendModule,
      CollapseModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
