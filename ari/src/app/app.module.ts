import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { AdminUserComponent } from './wait-room/admin-user/admin-user.component';
import { QuestionMenuComponent } from './question-menu/question-menu.component';
import { AnswerMenuComponent } from './answer-menu/answer-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    AdminUserComponent
    QuestionMenuComponent,
    AnswerMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
