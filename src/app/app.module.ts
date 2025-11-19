import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BaComponent } from './ba/ba.component';
import { BcomComponent } from './bcom/bcom.component';
import { BscComponent } from './bsc/bsc.component';
import { CompscienceComponent } from './compscience/compscience.component';
import { BbaComponent } from './bba/bba.component';
import { MaComponent } from './ma/ma.component';
import { McomComponent } from './mcom/mcom.component';
import { AboutsarvodayaComponent } from './aboutsarvodaya/aboutsarvodaya.component';
import { NoticeComponent } from './notice/notice.component';
import { HostelComponent } from './hostel/hostel.component';
import { HttpClientModule } from '@angular/common/http';
import { HeadernavComponent } from './headernav/headernav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Activity1Component } from './activity1/activity1.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { GallaryComponent } from './gallary/gallary.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BaComponent,
    BcomComponent,
    BscComponent,
    CompscienceComponent,
    BbaComponent,
    MaComponent,
    McomComponent,
    AboutsarvodayaComponent,
    NoticeComponent,
    HostelComponent,
    HeadernavComponent,
    FooterComponent,
    LoginComponent,
    Activity1Component,
    DashbordComponent,
    GallaryComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
