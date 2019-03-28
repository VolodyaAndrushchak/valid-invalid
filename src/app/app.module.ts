import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormEndpointComponent } from './components/input-form-endpoint/input-form-endpoint.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReqResViewComponent } from './components/req-res-view/req-res-view.component';
import { ReqResItemComponent } from './components/req-res-item/req-res-item.component';
import { TitleTestDataComponent } from './components/title-test-data/title-test-data.component';
import { StatusResponseDirective } from './directives/status-response.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormEndpointComponent,
    MainPageComponent,
    ReqResViewComponent,
    ReqResItemComponent,
    TitleTestDataComponent,
    StatusResponseDirective,
    HeaderComponent,
    FooterComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
