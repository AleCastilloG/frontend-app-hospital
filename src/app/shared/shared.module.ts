import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

// Components
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

// Pipes
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  imports: [
    RouterModule,
    CommonModule, // biene con el uso de if, for, pipes
    PipesModule,
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    ModalUploadComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    ModalUploadComponent,
  ],
})
export class SharedModule {}
