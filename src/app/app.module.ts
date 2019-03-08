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

@NgModule({
  declarations: [
    AppComponent,
    InputFormEndpointComponent,
    MainPageComponent,
    ReqResViewComponent,
    ReqResItemComponent
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
