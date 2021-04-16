import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Rutas
import { APP_ROUTES } from "./app.routes";

// Modules
import { PagesModule } from "./pages/pages.module";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";

// temporal
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Servicios
import { ServiceModule } from "./services/service.module";
import { SharedModule } from "./shared/shared.module";
import { ThemeService } from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
